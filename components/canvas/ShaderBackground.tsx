'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform vec3  u_c1; uniform vec3 u_c2;
uniform vec3  u_c3; uniform vec3 u_c4;
uniform vec3  u_bg;

// Smooth min for metaballs
float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_res.x / u_res.y;

    vec2 m = (u_mouse / u_res.xy) * 2.0 - 1.0;
    m.x *= u_res.x / u_res.y;

    float t = u_time * 0.4;

    // Create a few moving "bubbles" (distance fields)
    vec2 p1 = vec2(sin(t*0.5)*0.8, cos(t*0.3)*0.6);
    vec2 p2 = vec2(cos(t*0.6)*0.7, sin(t*0.4)*0.8);
    vec2 p3 = vec2(sin(t*0.7+2.0)*0.5, cos(t*0.5+1.0)*0.7);
    vec2 p4 = m * 0.5; // Follow mouse slowly

    // Distance to each point
    float d1 = length(p - p1) - 0.4;
    float d2 = length(p - p2) - 0.5;
    float d3 = length(p - p3) - 0.3;
    float d4 = length(p - p4) - 0.35;

    // Blend them smoothly (metaballs)
    float k = 0.6; // smoothness
    float d = smin(d1, d2, k);
    d = smin(d, d3, k);
    d = smin(d, d4, k);

    // Color mixing based on distance to individual points
    float w1 = 1.0 / (pow(length(p - p1), 2.0) + 0.01);
    float w2 = 1.0 / (pow(length(p - p2), 2.0) + 0.01);
    float w3 = 1.0 / (pow(length(p - p3), 2.0) + 0.01);
    float w4 = 1.0 / (pow(length(p - p4), 2.0) + 0.01);
    float sum = w1 + w2 + w3 + w4;

    vec3 blobColor = (u_c1 * w1 + u_c2 * w2 + u_c3 * w3 + u_c4 * w4) / sum;

    // Soft edge for the blob
    float alpha = smoothstep(0.1, -0.1, d);

    // Add some inner glow/specular
    float innerGlow = smoothstep(-0.2, -0.6, d);
    blobColor += innerGlow * 0.2;

    vec3 finalColor = mix(u_bg, blobColor, alpha * 0.7); // 0.7 for translucency

    // Grain
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233)) + u_time)*43758.5453)*0.03;
    finalColor += grain;

    gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
}
`;

const DARK_C  = [[0.48,0.14,0.93], [0.01,0.45,0.83], [0.88,0.36,0.96], [0.06,0.71,0.83]]; // violet, cyan
const DARK_BG = [0.02,0.01,0.12];

const LIGHT_C = [[0.78,0.65,0.99], [0.65,0.90,0.99], [0.95,0.72,1.00], [0.46,0.91,0.99]];
const LIGHT_BG= [0.98,0.98,0.98];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function ShaderBackground() {
  const ref   = useRef<HTMLCanvasElement>(null);
  const theme = useRef('dark');
  const mouse = useRef({ x: 0, y: 0 });
  const { resolvedTheme } = useTheme();

  useEffect(() => { theme.current = resolvedTheme ?? 'dark'; }, [resolvedTheme]);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const gl = canvas.getContext('webgl'); if (!gl) return;

    const mk = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mk(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes=U('u_res'), uTime=U('u_time'), uMouse=U('u_mouse');
    const uC=[U('u_c1'),U('u_c2'),U('u_c3'),U('u_c4')];
    const uBg=U('u_bg');

    // Remove the invalid '0.8B' and replace with 0.88 for DARK_C[2][0]
    let curC = [[0.48,0.14,0.93], [0.01,0.45,0.83], [0.88,0.36,0.96], [0.06,0.71,0.83]] as number[][];
    let curBg = [...DARK_BG];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0,0,canvas.width,canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    const onM = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onT = (e: TouchEvent) => { if(e.touches[0]) mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    window.addEventListener('mousemove', onM, { passive: true });
    window.addEventListener('touchmove', onT, { passive: true });

    const start = performance.now();
    let raf: number;
    const render = () => {
      const palC = theme.current === 'light' ? LIGHT_C : [[0.48,0.14,0.93], [0.01,0.45,0.83], [0.88,0.36,0.96], [0.06,0.71,0.83]];
      const palBg = theme.current === 'light' ? LIGHT_BG : DARK_BG;

      curC = curC.map((c,i) => c.map((v,j) => lerp(v, palC[i][j], 0.05)));
      curBg = curBg.map((v,i) => lerp(v, palBg[i], 0.05));

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now()-start)/1000);
      
      // smoothly interpolate mouse towards actual position so bubbles follow smoothly
      let targetMx = mouse.current.x;
      let targetMy = canvas.height - mouse.current.y;
      
      gl.uniform2f(uMouse, targetMx, targetMy);
      uC.forEach((u,i) => gl.uniform3fv(u, curC[i]));
      gl.uniform3fv(uBg, curBg);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onM);
      window.removeEventListener('touchmove', onT);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}

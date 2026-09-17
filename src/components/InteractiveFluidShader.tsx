import { useEffect, useRef } from 'react';

export default function InteractiveFluidShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) {
      console.warn("WebGL not supported in this environment.");
      return;
    }

    // Shaders Compilation
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      // Fractional Brownian Motion for viscous architectural distortion
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        // Slow time coefficient
        float t = u_time * 0.06;
        
        // Mouse coordinate mapping with aspect ratio correction
        vec2 m = (u_mouse * 2.0 - 1.0);
        m.x *= u_resolution.x / u_resolution.y;

        float distToMouse = length(p - m);
        float mouseInfluence = smoothstep(1.5, 0.0, distToMouse) * 0.4;
        
        // Triple nested Domain Warping
        vec2 q = vec2(
          fbm(p + vec2(0.0, 0.0) + vec2(t * 0.3, t * 0.15)),
          fbm(p + vec2(5.2, 1.3) + vec2(-t * 0.15, t * 0.2))
        );
        
        vec2 pWarped = p + q * 1.4;
        pWarped += m * mouseInfluence;
        
        vec2 r = vec2(
          fbm(pWarped + 3.5 * q + vec2(1.7, 9.2) + t * 0.1),
          fbm(pWarped + 3.5 * q + vec2(8.3, 2.8) - t * 0.18)
        );
        
        float f = fbm(pWarped + 3.0 * r);
        
        // Premium Cinematic Palette: Obsidian, Graphite, Smoked Titanium, Subtle Bronze Ribbons
        // Obsidian #0B0C0E (0.043, 0.047, 0.055)
        vec3 color1 = vec3(0.043, 0.047, 0.055); 
        // Graphite #15171A (0.082, 0.090, 0.102)
        vec3 color2 = vec3(0.082, 0.090, 0.102); 
        // Deep Graphite #202328 (0.125, 0.137, 0.157)
        vec3 color3 = vec3(0.125, 0.137, 0.157); 
        // Deep Bronze #765D3E (0.463, 0.365, 0.243)
        vec3 color4 = vec3(0.32, 0.25, 0.17); 
        
        vec3 col = mix(color1, color2, clamp(length(q), 0.0, 1.0));
        col = mix(col, color3, clamp(length(r.x), 0.0, 1.0));
        col = mix(col, color4, clamp(f * f * 0.6, 0.0, 0.5));
        
        // Subtle light bronze highlights #A88B62 (0.659, 0.545, 0.384) on fluid ridges
        col += vec3(0.659, 0.545, 0.384) * (f * 0.08);
        
        // Vignette to blend seamlessly with #0B0C0E
        float vignette = smoothstep(1.6, 0.2, length(p));
        col *= vignette;
        
        gl_FragColor = vec4(col, 0.65);
      }
    `;

    const createShader = (glContext: WebGLRenderingContext, type: number, source: string) => {
      const shader = glContext.createShader(type);
      if (!shader) return null;
      glContext.shaderSource(shader, source);
      glContext.compileShader(shader);
      if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        console.error(glContext.getShaderInfoLog(shader));
        glContext.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");

    let animationFrameId: number;
    let startTime = performance.now();

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
      mouseRef.current.targetY = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleResize();

    const render = (now: number) => {
      // Smooth lerp mouse coordinates
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, (now - startTime) * 0.001);
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (program) gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-70"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

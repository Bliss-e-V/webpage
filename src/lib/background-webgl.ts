/**
 * WebGL2 GPU particle background — same dynamics as the former p5 sketch
 * (noise-steered flow + central gravity + velocity damping + vertical color bands).
 */

const TEX_WIDTH = 512;
const POINT_SIZE = 2;
const FADE_ALPHA = 25 / 255;
/** Matches p5.TWO_PI * 8 * noise in the original sketch */
const ANGLE_SCALE = 8 * Math.PI * 2;

const NOISE_GLSL = `
vec3 mod289_3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289_4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289_4(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289_3(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const SIM_FS = `#version 300 es
precision highp float;
precision highp int;

uniform sampler2D u_prev;
uniform float u_frame;
uniform float u_canvasSize;
uniform float u_dt;
uniform float u_noiseScale;
uniform float u_velocityDecay;
uniform float u_maxVelocity;
uniform float u_gravityStrength;
uniform float u_gravityEq;
uniform vec3 u_noiseOffset;
uniform int u_numParticles;

${NOISE_GLSL}

float hash2(float a, float b) {
  vec3 p3 = fract(vec3(a * 0.1031, b * 0.1030, a + b) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

out vec4 fragColor;

void main() {
  int i = int(gl_FragCoord.x);
  if (i >= u_numParticles) {
    fragColor = vec4(0.0);
    return;
  }

  vec4 prev = texelFetch(u_prev, ivec2(i, 0), 0);
  vec2 pos = prev.xy;
  vec2 vel = prev.zw;

  vec2 center = vec2(u_canvasSize * 0.5);
  float ns = u_noiseScale;
  float nz = u_frame * ns * 0.5;
  float n = snoise(vec3(pos * ns, nz) + u_noiseOffset) * 0.5 + 0.5;
  float a = ${ANGLE_SCALE.toFixed(10)} * n;

  vec2 g = center - pos;
  g /= (u_canvasSize * 0.5);
  g /= u_gravityEq;
  float gm = length(g);
  g = gm > 1e-6 ? normalize(g) * pow(gm, 1.0 / u_gravityStrength) : vec2(0.0);

  float dx = cos(a) + g.x;
  float dy = sin(a) + g.y;
  vel.x += dx - u_velocityDecay * vel.x;
  vel.y += dy - u_velocityDecay * vel.y;
  vel = clamp(vel, vec2(-u_maxVelocity), vec2(u_maxVelocity));
  pos += u_dt * vel;

  if (pos.x < 0.0 || pos.x > u_canvasSize || pos.y < 0.0 || pos.y > u_canvasSize) {
    float salt = u_frame + float(i) * 0.001;
    pos = vec2(hash2(float(i), salt + 5.0) * u_canvasSize,
               hash2(float(i), salt + 6.0) * u_canvasSize);
    vel = (vec2(hash2(float(i), salt + 7.0), hash2(float(i), salt + 8.0)) * 2.0 - 1.0) * u_maxVelocity;
  }

  fragColor = vec4(pos, vel);
}
`;

const VS_PASS = `#version 300 es
precision highp float;
layout(location = 0) in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FS_FADE = `#version 300 es
precision highp float;
out vec4 fragColor;
void main() {
  fragColor = vec4(0.0, 0.0, 0.0, ${FADE_ALPHA.toFixed(10)});
}
`;

const VS_POINTS = `#version 300 es
precision highp float;
uniform sampler2D u_state;
uniform float u_canvasSize;
layout(location = 0) in float a_index;
out float v_posY;
void main() {
  int i = int(a_index);
  vec4 data = texelFetch(u_state, ivec2(i, 0), 0);
  vec2 pos = data.xy;
  v_posY = pos.y;
  vec2 ndc = (pos / u_canvasSize) * 2.0 - 1.0;
  ndc.y *= -1.0;
  gl_Position = vec4(ndc, 0.0, 1.0);
  gl_PointSize = ${POINT_SIZE.toFixed(1)};
}
`;

const FS_POINTS = `#version 300 es
precision highp float;
in float v_posY;
uniform float u_canvasSize;
out vec4 fragColor;

void main() {
  float y = v_posY;
  float dx = u_canvasSize / 8.0;

  vec3 c0 = vec3(1.0, 0.0, 0.0);
  vec3 c1 = vec3(1.0, 0.0, 0.0);
  vec3 c2 = vec3(1.0, 0.5, 0.0);
  vec3 c3 = vec3(1.0, 1.0, 0.0);
  vec3 c4 = vec3(0.0, 1.0, 0.0);
  vec3 c5 = vec3(0.0, 0.0, 1.0);
  vec3 c6 = vec3(0.5, 0.0, 1.0);
  vec3 c7 = vec3(0.5, 0.0, 1.0);

  vec3 cols[8];
  cols[0] = c0; cols[1] = c1; cols[2] = c2; cols[3] = c3;
  cols[4] = c4; cols[5] = c5; cols[6] = c6; cols[7] = c7;

  vec3 col = cols[7];
  for (int i = 1; i < 8; i++) {
    float edge = float(i) * dx;
    if (y < edge) {
      float m = edge - y;
      if (m < dx) m = dx - m;
      m /= dx;
      vec3 ca = cols[i - 1];
      vec3 cb = cols[i];
      col = mix(ca, cb, m);
      break;
    }
  }
  fragColor = vec4(col, 1.0);
}
`;

function compile(
  gl: WebGL2RenderingContext,
  type: number,
  src: string,
): WebGLShader {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const err = gl.getShaderInfoLog(sh) || "shader compile failed";
    gl.deleteShader(sh);
    throw new Error(err);
  }
  return sh;
}

function linkProgram(
  gl: WebGL2RenderingContext,
  vs: WebGLShader,
  fs: WebGLShader,
): WebGLProgram {
  const p = gl.createProgram()!;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    const err = gl.getProgramInfoLog(p) || "link failed";
    gl.deleteProgram(p);
    throw new Error(err);
  }
  return p;
}

function initFloatTex(
  gl: WebGL2RenderingContext,
  internal: number,
): { tex: WebGLTexture; fbo: WebGLFramebuffer } | null {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const fbo = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    internal,
    TEX_WIDTH,
    1,
    0,
    gl.RGBA,
    gl.FLOAT,
    null,
  );
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    tex,
    0,
  );
  const ok =
    gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
  if (!ok) {
    gl.deleteTexture(tex);
    gl.deleteFramebuffer(fbo);
    return null;
  }
  return { tex, fbo };
}

function fillInitialState(
  numParticles: number,
  canvasSize: number,
  maxVelocity: number,
): Float32Array {
  const data = new Float32Array(TEX_WIDTH * 4);
  const c = canvasSize * 0.5;
  const w = canvasSize * 0.2;
  for (let i = 0; i < numParticles; i++) {
    const rx = Math.random();
    const ry = Math.random();
    const rvx = Math.random() * 2 * maxVelocity - maxVelocity;
    const rvy = Math.random() * 2 * maxVelocity - maxVelocity;
    data[i * 4] = c + (rx * 2 - 1) * w;
    data[i * 4 + 1] = c + (ry * 2 - 1) * w;
    data[i * 4 + 2] = rvx;
    data[i * 4 + 3] = rvy;
  }
  return data;
}

export type BackgroundWebGLOptions = {
  canvas: HTMLCanvasElement;
};

export function initBackgroundWebGL(o: BackgroundWebGLOptions): (() => void) | null {
  const gl = o.canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
    depth: false,
    stencil: false,
  });
  if (!gl) {
    console.warn("[background-webgl] WebGL2 not available");
    return null;
  }

  const ext = gl.getExtension("EXT_color_buffer_float");
  if (!ext) {
    console.warn("[background-webgl] EXT_color_buffer_float missing; GPU sim disabled");
    return null;
  }

  let internal: number = gl.RGBA32F;
  let pairA = initFloatTex(gl, internal);
  if (!pairA) {
    internal = gl.RGBA16F;
    pairA = initFloatTex(gl, internal);
  }
  if (!pairA) {
    console.warn("[background-webgl] Float render targets not supported");
    return null;
  }
  const pairB = initFloatTex(gl, internal);
  if (!pairB) {
    console.warn("[background-webgl] Second float render target failed");
    return null;
  }

  const vsPass = compile(gl, gl.VERTEX_SHADER, VS_PASS);
  const simFs = compile(gl, gl.FRAGMENT_SHADER, SIM_FS);
  const progSim = linkProgram(gl, vsPass, simFs);
  gl.deleteShader(simFs);

  const fadeFs = compile(gl, gl.FRAGMENT_SHADER, FS_FADE);
  const progFade = linkProgram(gl, vsPass, fadeFs);
  gl.deleteShader(fadeFs);

  const vsPt = compile(gl, gl.VERTEX_SHADER, VS_POINTS);
  const fsPt = compile(gl, gl.FRAGMENT_SHADER, FS_POINTS);
  const progPt = linkProgram(gl, vsPt, fsPt);
  gl.deleteShader(vsPt);
  gl.deleteShader(fsPt);
  gl.deleteShader(vsPass);

  const quadVbo = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, quadVbo);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const indexBuf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, indexBuf);
  const indices = new Float32Array(TEX_WIDTH);
  for (let i = 0; i < TEX_WIDTH; i++) indices[i] = i;
  gl.bufferData(gl.ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  const quadVao = gl.createVertexArray()!;
  gl.bindVertexArray(quadVao);
  gl.bindBuffer(gl.ARRAY_BUFFER, quadVbo);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const pointsVao = gl.createVertexArray()!;
  gl.bindVertexArray(pointsVao);
  gl.bindBuffer(gl.ARRAY_BUFFER, indexBuf);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);

  gl.bindVertexArray(null);

  const locSim = {
    prev: gl.getUniformLocation(progSim, "u_prev"),
    frame: gl.getUniformLocation(progSim, "u_frame"),
    canvasSize: gl.getUniformLocation(progSim, "u_canvasSize"),
    dt: gl.getUniformLocation(progSim, "u_dt"),
    noiseScale: gl.getUniformLocation(progSim, "u_noiseScale"),
    velocityDecay: gl.getUniformLocation(progSim, "u_velocityDecay"),
    maxVelocity: gl.getUniformLocation(progSim, "u_maxVelocity"),
    gravityStrength: gl.getUniformLocation(progSim, "u_gravityStrength"),
    gravityEq: gl.getUniformLocation(progSim, "u_gravityEq"),
    noiseOffset: gl.getUniformLocation(progSim, "u_noiseOffset"),
    numParticles: gl.getUniformLocation(progSim, "u_numParticles"),
  };

  const locPt = {
    state: gl.getUniformLocation(progPt, "u_state"),
    canvasSize: gl.getUniformLocation(progPt, "u_canvasSize"),
  };

  let readTex = pairA.tex;
  let writeTex = pairB.tex;
  let writeFbo = pairB.fbo;

  const fboForTex = (t: WebGLTexture) =>
    t === pairA.tex ? pairA.fbo : pairB.fbo;

  let frame = 0;
  let noiseOff = [0, 0, 0] as [number, number, number];
  let raf = 0;

  let windowW = window.innerWidth;
  let windowH = window.innerHeight;
  const renderMobile = () => windowW < 630;
  let numParticles = renderMobile() ? 250 : 500;
  let canvasSize = renderMobile()
    ? windowW
    : 0.8 * Math.min(windowW / 2, windowH);

  const maxVelocity = 130;
  const dt = 0.05;
  const gravityStrength = 1;
  const gravityEq = 0.7;

  function rebuildSize() {
    windowW = window.innerWidth;
    windowH = window.innerHeight;
    const mob = renderMobile();
    numParticles = mob ? 250 : 500;
    canvasSize = mob ? windowW : 0.8 * Math.min(windowW / 2, windowH);
    const px = Math.max(1, Math.floor(canvasSize));
    o.canvas.width = px;
    o.canvas.height = px;
    o.canvas.style.width = `${px}px`;
    o.canvas.style.height = `${px}px`;
    if (mob) o.canvas.style.opacity = "0.5";
    else {
      o.canvas.style.opacity = "1";
      updatePosition();
    }

    const initial = fillInitialState(numParticles, px, maxVelocity);
    for (const t of [pairA.tex, pairB.tex]) {
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texSubImage2D(
        gl.TEXTURE_2D,
        0,
        0,
        0,
        TEX_WIDTH,
        1,
        gl.RGBA,
        gl.FLOAT,
        initial,
      );
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
    frame = 0;
    readTex = pairA.tex;
    writeTex = pairB.tex;
    writeFbo = pairB.fbo;
  }

  function updatePosition() {
    const canvas = o.canvas;
    const recent = document.getElementById("speaker-series");
    if (!recent) return;

    const scroll = window.scrollY;
    const distanceToRecent = recent.getBoundingClientRect().top - window.innerHeight;
    const denom = scroll + distanceToRecent;
    const fractionToRecent = denom > 1e-6 ? scroll / denom : 0;

    if (fractionToRecent < 1) {
      const globalOffset = (1 - fractionToRecent) * windowW;
      const localOffset =
        (0.5 - fractionToRecent) * (windowW / 2 - canvasSize);
      const margin = globalOffset + localOffset;
      canvas.style.marginLeft = `calc(${margin}px - 50%)`;
      canvas.style.opacity = "1";
    } else {
      const margin = (0.5 - 1) * (windowW / 2 - canvasSize);
      canvas.style.marginLeft = `calc(${margin}px - 50%)`;
      canvas.style.opacity = `${Math.max(
        20,
        100 -
          Math.abs(
            recent.getBoundingClientRect().top - window.innerHeight,
          ) /
            8,
      )}%`;
    }
  }

  rebuildSize();

  function frameLoop() {
    const w = o.canvas.width;
    const h = o.canvas.height;
    const px = Math.max(1, Math.floor(w));
    const noiseScale = 2 / px;
    const velocityDecay = 7 / px;

    // --- simulation (read readTex → write writeTex via writeFbo) ---
    gl.bindFramebuffer(gl.FRAMEBUFFER, writeFbo);
    gl.viewport(0, 0, TEX_WIDTH, 1);
    gl.useProgram(progSim);
    gl.uniform1i(locSim.prev, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, readTex);
    gl.uniform1f(locSim.frame, frame);
    gl.uniform1f(locSim.canvasSize, px);
    gl.uniform1f(locSim.dt, dt);
    gl.uniform1f(locSim.noiseScale, noiseScale);
    gl.uniform1f(locSim.velocityDecay, velocityDecay);
    gl.uniform1f(locSim.maxVelocity, maxVelocity);
    gl.uniform1f(locSim.gravityStrength, gravityStrength);
    gl.uniform1f(locSim.gravityEq, gravityEq);
    gl.uniform3f(locSim.noiseOffset, noiseOff[0], noiseOff[1], noiseOff[2]);
    gl.uniform1i(locSim.numParticles, numParticles);

    gl.bindVertexArray(quadVao);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // --- fade + draw to screen (sample freshly written writeTex) ---
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, w, h);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.useProgram(progFade);
    gl.bindVertexArray(quadVao);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    gl.useProgram(progPt);
    gl.uniform1i(locPt.state, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, writeTex);
    gl.uniform1f(locPt.canvasSize, px);
    gl.bindVertexArray(pointsVao);
    gl.drawArrays(gl.POINTS, 0, numParticles);

    gl.disable(gl.BLEND);

    // ping-pong for next step
    const t = readTex;
    readTex = writeTex;
    writeTex = t;
    writeFbo = fboForTex(writeTex);

    frame++;

    raf = requestAnimationFrame(frameLoop);
  }

  function onScrollResize() {
    if (!renderMobile()) updatePosition();
  }

  const onPointerUp = () => {
    noiseOff = [
      Math.random() * 500,
      Math.random() * 500,
      Math.random() * 500,
    ];
  };

  if (!renderMobile()) {
    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize);
  }

  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("resize", rebuildSize, { passive: true });

  raf = requestAnimationFrame(frameLoop);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScrollResize);
    window.removeEventListener("resize", onScrollResize);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("resize", rebuildSize);
    gl.deleteProgram(progSim);
    gl.deleteProgram(progFade);
    gl.deleteProgram(progPt);
    gl.deleteTexture(pairA.tex);
    gl.deleteTexture(pairB.tex);
    gl.deleteFramebuffer(pairA.fbo);
    gl.deleteFramebuffer(pairB.fbo);
    gl.deleteBuffer(quadVbo);
    gl.deleteBuffer(indexBuf);
    gl.deleteVertexArray(quadVao);
    gl.deleteVertexArray(pointsVao);
  };
}

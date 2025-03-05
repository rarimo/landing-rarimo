// Inspired by https://www.reactbits.dev/backgrounds/aurora

import { Color, Mesh, Program, Renderer, Triangle } from 'ogl'
import { useEffect, useRef } from 'react'

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const getFragmentShader = (isDark: boolean) => `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     bool isInBetween = (float(i) / 2.0) <= factor;         \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  vec3 currentColor = colors[index];                        \
  vec3 nextColor = colors[index + 1];                       \
  float range = (float(index + 1) / 2.0) - (float(index) / 2.0); \
  float lerpFactor = (factor - (float(index) / 2.0)) / range; \
  finalColor = mix(currentColor, nextColor, lerpFactor);    \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  vec3 colors[3];
  colors[0] = uColorStops[0];
  colors[1] = uColorStops[1];
  colors[2] = uColorStops[2];

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);

  float intensity = ${isDark ? '0.4 * height' : 'clamp(0.2 * height, 0.0, 0.8)'};

  float midPoint = 0.25;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.4, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = mix(vec3(0.0), rampColor, clamp(intensity * 1.5, 0.0, 1.0));

  fragColor = vec4(auroraColor, auroraAlpha);
}
`

interface AuroraProps {
  colorStops?: string[]
  amplitude?: number
  blend?: number
  time?: number
  speed?: number

  isDarkMode?: boolean
}

export default function Aurora(props: AuroraProps) {
  const {
    colorStops = ['#47E7A7', '#2BDC5D', '#47E7A7'],
    amplitude = 1.0,
    blend = 0.73,
    isDarkMode = false,
  } = props
  const propsRef = useRef<AuroraProps>(props)
  propsRef.current = props

  const ctnDom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctn = ctnDom.current
    if (!ctn) return

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    })

    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    gl.canvas.style.backgroundColor = 'transparent'

    // eslint-disable-next-line prefer-const
    let program: Program | undefined

    function resize() {
      if (!ctn) return
      const width = ctn.offsetWidth
      const height = ctn.offsetHeight
      renderer.setSize(width, height)

      if (program) {
        program.uniforms.uResolution.value = [width, height]
      }
    }
    window.addEventListener('resize', resize)

    const geometry = new Triangle(gl)
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv
    }

    const colorStopsArray = colorStops.map(hex => {
      const c = new Color(hex)
      return [c.r, c.g, c.b]
    })

    program = new Program(gl, {
      vertex: VERT,
      fragment: getFragmentShader(isDarkMode),
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })
    ctn.appendChild(gl.canvas)

    let animateId = 0
    const update = (t: number) => {
      animateId = requestAnimationFrame(update)
      const { time = t * 0.01, speed = 0.8 } = propsRef.current
      if (program) {
        program.uniforms.uTime.value = time * speed * 0.1
        program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0
        program.uniforms.uBlend.value = propsRef.current.blend ?? blend
        const stops = propsRef.current.colorStops ?? colorStops
        program.uniforms.uColorStops.value = stops.map((hex: string) => {
          const c = new Color(hex)
          return [c.r, c.g, c.b]
        })
        renderer.render({ scene: mesh })
      }
    }
    animateId = requestAnimationFrame(update)

    resize()

    return () => {
      cancelAnimationFrame(animateId)
      window.removeEventListener('resize', resize)
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas)
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amplitude, isDarkMode])

  return <div ref={ctnDom} className='absolute inset-0 z-[-1] h-full w-full' />
}

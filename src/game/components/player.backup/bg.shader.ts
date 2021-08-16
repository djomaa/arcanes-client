import { Position } from '../../helpers/position.class';

export const fragment = `#version 300 es
precision mediump float;
uniform vec2      u_resolution;
uniform float     u_time;
uniform float     u_alpha;
uniform vec2      u_speed;
uniform float     u_shift;
uniform sampler2D uSampler;

in vec2 vTextureCoord;

out vec4 oColor;


float rand(vec2 n) {
  return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float noise(vec2 n) {
  const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
  return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}
float fbm(vec2 n) {
  float total = 0.0, amplitude = 0.4;
  for (int i = 0; i < 4; i++) {
    total += noise(n) * amplitude;
    n += n;
    amplitude *= 0.6;
  }
return total;
}

void main() {
  const vec3 c1 = vec3(240.0/255.0, 127.0/255.0, 19.0/255.0);
  const vec3 c2 = vec3(128.0/255.0, 9.0/255.0, 9.0/255.0);
  const vec3 c3 = vec3(0.0, 0.0, 0.0);
  const vec3 c4 = vec3(200.0/255.0, 200.0/255.0, 200.0/255.0);
  const vec3 c5 = vec3(0.6);
  const vec3 c6 = vec3(0.9);
  vec2 p = gl_FragCoord.xy * 10.0 / u_resolution.xx;
  float q = fbm(p - u_time * 0.1);
  vec2 r = vec2(fbm(p + q + u_time * u_speed.x - p.x - p.y), fbm(p + q - u_time * u_speed.y));
  vec3 c = mix(c1, c2, fbm(p + r)) + mix(c3, c4, r.x) - mix(c5, c6, r.y);
  float grad = gl_FragCoord.y / u_resolution.y;
  vec4 fire = vec4(c * cos(u_shift * gl_FragCoord.y / u_resolution.y), u_alpha);
  fire.xyz *= 0.6-grad;
  float test = 0.6-grad;
  if(r.x > 0.5 || r.y > 0.5 || fbm(p + r) > 0.5 || test < 0.2 ){
    fire.w = 0.2;
  }

  vec4 fg = texture(uSampler, vTextureCoord);

  // oColor.r = fg.r * (1.0 - oColor.r) + oColor.r;
  // oColor.g = fg.g;
  // oColor.b = fg.b;

  fire.r *= 2.5;
  // oColor = fire;
  oColor = fg * (1.0-fire.r);
  oColor.a = 1.0;
  oColor.r += fire.r;

}`;

export const vert = `#version 300 es

in vec2 aVertexPosition;
in vec2 aTextureCoord;

uniform mat3 projectionMatrix;

out vec2 vTextureCoord;

void main(void){
   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
   vTextureCoord = aTextureCoord;
}

`

export const fragment1 = `
  precision mediump float;
  uniform vec2      resolution;
  uniform float     time;
  uniform float     alpha;
  uniform vec2      speed;
  uniform float     shift;
  
  float rand(vec2 n) {
    return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }
  
  float noise(vec2 n) {
    const vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
  }
  
  float fbm(vec2 n) {
    float total = 0.0, amplitude = 0.4;
    for (int i = 0; i < 4; i++) {
      total += noise(n) * amplitude;
      n += n;
      amplitude *= 0.6;
    }
    return total;
  }
  
  void main() {
  
    const vec3 c1 = vec3(240.0/255.0, 127.0/255.0, 19.0/255.0);
    const vec3 c2 = vec3(128.0/255.0, 9.0/255.0, 9.0/255.0);
    const vec3 c3 = vec3(0.0, 0.0, 0.0);
    const vec3 c4 = vec3(200.0/255.0, 200.0/255.0, 200.0/255.0);
    const vec3 c5 = vec3(0.6);
    const vec3 c6 = vec3(0.9);

    vec2 p = gl_FragCoord.xy * 10.0 / resolution;
    float q = fbm(p - time * 0.1);
    vec2 r = vec2(fbm(p + q + time * speed.x - p.x - p.y), fbm(p + q - time * speed.y));
    vec3 c = mix(c1, c2, fbm(p + r)) + mix(c3, c4, r.x) - mix(c5, c6, r.y);
    float grad = gl_FragCoord.y / resolution.y;
    gl_FragColor = vec4(c * cos(shift * gl_FragCoord.y / resolution.y), 1.0);
    gl_FragColor.xyz *= 0.6-grad;
    float test = 0.6-grad;
    float testVal = 0.5;
    if(r.x > 0.5 || r.y > 0.5 || fbm(p + r) > 0.5 || test < 0.2 ){
      gl_FragColor.w = 0.2;
    }
  }
`;

export const uniforms = (resolution: Position) => ({
  u_resolution: {
    x: resolution.x,
    y: resolution.y,
  },
  alpha: 1.0,
  u_shift: 2.0,
  u_time: 0.0,
  u_speed: {
    x: 5,
    y: 0.4
  }
});

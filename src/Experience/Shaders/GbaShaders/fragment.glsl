varying vec2 vUv;

uniform sampler2D uDiffuseTexture;
uniform sampler2D uAlphaTexture;

uniform float uMouse;

vec2 getSubUv (vec2 uv, float index){
    float ind = index/4.0;
    vec2 uv1 = uv/4.0;

    uv1.y += 3.0/4.0;
    uv1.x += floor(fract(ind)* 4.0)/4.0;
    uv1.y -= floor(fract(ind/4.0)*4.0)/4.0;

    return uv1;
}

void main () {

    float index = mix(1.0, 15.0, uMouse);

    vec2 subUv = getSubUv(vUv, index);

    vec3 diffuseTexture = texture2D(uDiffuseTexture, subUv).rgb;
    vec3 alphaTexture = texture2D(uAlphaTexture, subUv).rgb;

    vec4 color = vec4(diffuseTexture, alphaTexture.r);

    gl_FragColor = color;
}
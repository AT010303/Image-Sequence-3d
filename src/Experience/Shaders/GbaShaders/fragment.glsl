varying vec2 vUv;

void main () {
    vec4 color = vec4(vUv, 0.0, 1.0);
    gl_FragColor = color;
}
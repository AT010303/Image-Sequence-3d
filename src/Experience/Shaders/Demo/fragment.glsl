varying vec2 vUv;

uniform sampler2D uImageTexture;

void main (){
    vec4 color = texture2D(uImageTexture, vUv);

    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    gl_FragColor = color;
}
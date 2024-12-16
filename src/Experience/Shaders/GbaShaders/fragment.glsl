varying vec2 vUv;

uniform sampler2D uDiffuseTexture;
uniform sampler2D uAlphaTexture;
uniform sampler2D uMvTexture;
uniform sampler2D uPositionTexture;

uniform float uMouse;

vec2 getSubUv (vec2 uv, float index){
    // calculating normalized index relative to number of columns in the grid. 4 in our case
    float ind = index/4.0;

    // Shrinks the UV coordinates to fit one cell of the 4x4 grid.
    // Dividing by 4 maps the UV range of (0, 1) for the entire texture to (0, 0.25) for each cell.
    vec2 uv1 = uv/4.0;

    // Offsets the y coordinate upward by 3/4 of the texture height to start from the top row (the grid is 4x4, so rows are 1/4 tall).
    uv1.y += 3.0/4.0;

    // Horizontal offset
    // fract(ind) * 4.0 isolates the fractional part of ind to determine the column within the grid (0 to 3).
    // floor(...) / 4.0 maps this to the range (0, 0.25, 0.5, 0.75), corresponding to each column's start position.
    uv1.x += floor(fract(ind)* 4.0)/4.0;

    // Vertical offset
    // Divides ind by 4.0 to calculate the row index, then adjusts y downward by the appropriate amount (0, 0.25, 0.5, or 0.75).
    uv1.y -= floor(fract(ind/4.0)*4.0)/4.0;

    return uv1;
}

// blending of textures with next frame texture
vec4 getMap(sampler2D map, sampler2D alpha, float blend, vec2 uv, vec2 nextUv){

    // Get the diffuse texture color
    vec4 diffuse = texture2D(map, uv);
    float alphaTexture = texture2D(alpha, uv).r; // alpha value of the current frame
    diffuse.a = alphaTexture; // Set the alpha value of the current frame

    // Get the diffuse texture color of the next frame
    vec4 diffuseNext = texture2D(map, nextUv);
    float alphaTextureNext = texture2D(alpha, nextUv).r; // alpha value of the next frame
    diffuseNext.a = alphaTextureNext; // Set the alpha value of the next frame

    // Mix the two textures based on the blend factor
    return mix(diffuse, diffuseNext, blend);
}

void main () {

    // Index of the texture to display
    float index = mix(1.0, 15.0, uMouse);

    float blend = fract(index);

    // // Get the UV coordinates for the current texture
    vec2 subUv = getSubUv(vUv, index);
    vec2 subUvNext = getSubUv(vUv, index + 1.0);

    vec4 diffuseMap = getMap(uDiffuseTexture, uAlphaTexture, blend, subUv, subUvNext);

    vec4 color = diffuseMap;

    gl_FragColor = color;
}
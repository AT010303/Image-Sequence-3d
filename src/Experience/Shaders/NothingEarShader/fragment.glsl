varying vec2 vUv;
varying vec4 vTransformedPosition;

uniform sampler2D uDiffuseTexture;
uniform sampler2D uAlphaTexture;

uniform float uProgress;
uniform float uDisplacementStrength;

uniform float uMouse;

vec2 getSubUv (vec2 uv, float index){
    // calculating normalized index relative to number of columns in the grid. 4 in our case
    float ind = index/6.0;

    // Shrinks the UV coordinates to fit one cell of the 4x4 grid.
    // Dividing by 4 maps the UV range of (0, 1) for the entire texture to (0, 0.25) for each cell.
    vec2 uv1 = uv/6.0;

    uv1.y += 5.0/6.0;

    // Horizontal offset
    uv1.x += floor(fract(ind)* 6.0)/6.0;

    // Vertical offset
    uv1.y -= floor(fract(ind/6.0)*6.0)/6.0;

    return uv1;
}

// blending of textures with next frame texture
vec4 getMap(sampler2D map, sampler2D alpha, float blend, vec2 uv, vec2 nextUv){

    // Get the diffuse texture color
    vec4 diffuse = texture2D(map, uv);
    float alphaTexture = texture2D(alpha, uv).r; // alpha value of the current frame
    diffuse.a = alphaTexture; // Set the alpha value of the current frame

    // Get the diffuse texture color of the next frame
    vec4 diffuseNext = texture2D(map, nextUv );
    float alphaTextureNext = texture2D(alpha, nextUv).r; // alpha value of the next frame
    diffuseNext.a = alphaTextureNext; // Set the alpha value of the next frame

    // Mix the two textures based on the blend factor
    return mix(diffuse, diffuseNext, blend);
}

// calculating displacement of the texture based on the displacement map
vec2 getDisplacement(sampler2D map, vec2 uv, float strength){
    // Get the displacement data from the texture
    vec4 tData = texture2D(map, uv);
    // Convert the displacement data to a vec2 in the range (-1, 1)
    vec2 displacement = tData.rg;
    // Normalize the displacement to the range (-1, 1) and scale it by the strength factor
    displacement = (displacement - 0.5) * 2.0;
    displacement *= strength;// scale the displacement
    return displacement;
}

vec3 getMotionVectorMap(vec4 transformedPosition){
    vec4 mv = transformedPosition;
    vec3 color = abs(mv.xyz);
    return color;
}

void main () {

    // Index of the texture to display
    float index = mix(1.0, 35.0, uMouse);

    float blend = fract(index);

    // // Get the UV coordinates for the current texture
    vec2 subUv = getSubUv(vUv, index);
    vec2 subUvNext = getSubUv(vUv, index + 1.0);

    float udispStrengthDemo = 0.003;
    // vec2 displacement
    // vec2 displacement = getDisplacement(uMvTexture, subUv, uDisplacementStrength);
    // vec2 displacementNext = getDisplacement(uMvTexture, subUvNext, uDisplacementStrength);

    vec4 diffuseMap = getMap(uDiffuseTexture, uAlphaTexture, blend, subUv, subUvNext);

    vec4 color = diffuseMap;

    gl_FragColor = color;
}
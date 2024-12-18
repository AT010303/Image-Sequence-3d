import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

import fragmentShader from '../Shaders/Phone2aShader/fragment.glsl';
import vertexShader from '../Shaders/Phone2aShader/vertex.glsl';

const Phone2aTexture = shaderMaterial(
    {
        uDiffuseTexture : new THREE.Texture(),
        uAlphaTexture : new THREE.Texture(),
        uMvTexture : new THREE.Texture(),
        uProgress : 0,
        uDisplacementStrength : 0.00333,
        uMouse : 0
    },
    vertexShader,
    fragmentShader
);

export default Phone2aTexture;
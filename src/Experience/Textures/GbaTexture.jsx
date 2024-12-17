import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

import fragmentShader from '../Shaders/GbaShaders/fragment.glsl';
import vertexShader from '../Shaders/GbaShaders/vertex.glsl';

const GbaTexture = shaderMaterial(
    {
        uDiffuseTexture : new THREE.Texture(),
        uAlphaTexture : new THREE.Texture(),
        uMvTexture : new THREE.Texture(),
        uPositionTexture: new THREE.Texture(),
        uProgress : 0,
        uDisplacementStrength : 0.00333,
        uMouse : 0
    },
    vertexShader,
    fragmentShader
);

export default GbaTexture;
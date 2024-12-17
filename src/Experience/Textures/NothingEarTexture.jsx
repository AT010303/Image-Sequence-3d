import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

import fragmentShader from '../Shaders/NothingEarShader/fragment.glsl';
import vertexShader from '../Shaders/NothingEarShader/vertex.glsl';

const NothingEarTexture = shaderMaterial(
    {
        uDiffuseTexture : new THREE.Texture(),
        uAlphaTexture : new THREE.Texture(),
        uDisplacementStrength : 0.00333,
        uProgress : 0,
        uMouse : 0
    },
    vertexShader,
    fragmentShader
);

export default NothingEarTexture;
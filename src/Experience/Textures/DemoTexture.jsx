import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

import fragmentShader from '../Shaders/Demo/fragment.glsl';
import vertexShader from '../Shaders/Demo/vertex.glsl';

const DemoTexture = shaderMaterial(
    {
        uImageTexture : new THREE.Texture(),
    },
    vertexShader,
    fragmentShader
);

export default DemoTexture;
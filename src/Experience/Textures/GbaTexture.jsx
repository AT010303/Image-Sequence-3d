import { shaderMaterial } from '@react-three/drei';

import fragmentShader from '../Shaders/GbaShaders/fragment.glsl';
import vertexShader from '../Shaders/GbaShaders/vertex.glsl';

const GbaTexture = shaderMaterial(
    {

    },
    vertexShader,
    fragmentShader
);

export default GbaTexture;
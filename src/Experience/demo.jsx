import { useKTX2 } from "@react-three/drei";
import { extend } from "@react-three/fiber";
// import { useControls } from "leva";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import DemoTexture from "./Textures/DemoTexture.jsx";

extend({ DemoTexture });

DemoTexture.key = THREE.MathUtils.generateUUID();

const Demo = () => {

    const texture2 = useKTX2('/gba_images/gameboy_diffuse-high.ktx2');
    console.log(texture2);
    
    texture2.colorSpace = THREE.LinearSRGBColorSpace;
    const textureRef = useRef();
    const meshRef = useRef();
    

    const TextureMaterialProp = useMemo(()=> ({
        uImageTexture: texture2,
    }),[texture2]);

    return (
        <>
            <mesh ref={meshRef}>
                <planeGeometry args={[1, 1]} />
                <demoTexture { ...TextureMaterialProp} ref={textureRef} side = {THREE.DoubleSide} transparent = {true} key={DemoTexture.key}/>
            </mesh>
        </>
    );
};

useKTX2.preload('/demoFile/phone_color_3.ktx2');
export default Demo;
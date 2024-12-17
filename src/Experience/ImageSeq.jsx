import { useKTX2, useTexture } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import GbaTexture from "./Textures/GbaTexture";

extend({ GbaTexture });

GbaTexture.key = THREE.MathUtils.generateUUID();

const ImageSeq = () => {

    const diffuseTexture  = useKTX2('/gba_images/gameboy_diffuse-high.ktx2');
    diffuseTexture.colorSpace = THREE.LinearSRGBColorSpace;
    const alphaTexture = useKTX2('/gba_images/gameboy_alpha-high.ktx2');
    alphaTexture.colorSpace = THREE.LinearSRGBColorSpace;
    const mvTexture = useKTX2('/gba_images/gameboy_mv-high.ktx2');
    mvTexture.colorSpace = THREE.LinearSRGBColorSpace;
    const positionTexture = useKTX2('/gba_images/gameboy_position-high.ktx2');
    positionTexture.colorSpace = THREE.LinearSRGBColorSpace;
    const textureRef = useRef();
    const meshRef = useRef();

    window.addEventListener('mousemove', (e) => {
        textureRef.current.uMouse = e.clientX / window.innerWidth;
        meshRef.current.rotation.x = (e.clientX / window.innerWidth) * 0.1;
        meshRef.current.rotation.y = (e.clientY / window.innerHeight) * 0.1;
    });

    const controls = useControls({
        progress : { value: 0, min: 0, max: 1, step: 0.01 },
        uDisplacementStrength: { value: 0.00333, min: 0, max: 0.005, step: 0.0001 }
    });
    
    const TextureMaterialProp = useMemo(()=> ({
        uDiffuseTexture: diffuseTexture,
        uAlphaTexture: alphaTexture,
        uMvTexture: mvTexture,
        uPositionTexture: positionTexture,
        uProgress : controls.progress,
        uDisplacementStrength: controls.uDisplacementStrength,
        uMouse: new THREE.Vector2()
    }),[diffuseTexture, alphaTexture, mvTexture, positionTexture, controls.progress, controls.uDisplacementStrength]);

    return (
        <>
            <mesh ref={meshRef}>
                <planeGeometry args={[1, 1]} />
                {/* <meshBasicMaterial map={texture} /> */}
                <gbaTexture { ...TextureMaterialProp} ref={textureRef} side = {THREE.DoubleSide} transparent = {true} key={GbaTexture.key}/>
            </mesh>
        </>
    );
};
useTexture.preload('/gba_images/gameboy_diffuse-medium.jpg');
export default ImageSeq;
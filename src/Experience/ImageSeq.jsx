import { useKTX2, useTexture } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import GbaTexture from "./Textures/GbaTexture";

extend({ GbaTexture });

const ImageSeq = () => {

    const diffuseTexture  = useKTX2('/gba_images/gameboy_diffuse-high.ktx2');
    const alphaTexture = useKTX2('/gba_images/gameboy_alpha-high.ktx2');
    const textureRef = useRef();

    window.addEventListener('mousemove', (e) => {
        textureRef.current.uMouse = e.clientX / window.innerWidth;
    });
    
    const TextureMaterialProp = useMemo(()=> ({
        uDiffuseTexture: diffuseTexture,
        uAlphaTexture: alphaTexture,
        uMouse: new THREE.Vector2()
    }),[diffuseTexture, alphaTexture]);

    return (
        <>
            <mesh >
                <planeGeometry args={[1, 1]} />
                {/* <meshBasicMaterial map={texture} /> */}
                <gbaTexture { ...TextureMaterialProp} ref={textureRef} side = {THREE.DoubleSide} transparent = {true}/>
            </mesh>
        </>
    );
};
useTexture.preload('/gba_images/gameboy_diffuse-medium.jpg');
export default ImageSeq;
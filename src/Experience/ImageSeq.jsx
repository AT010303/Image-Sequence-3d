import { useKTX2, useTexture } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import GbaTexture from "./Textures/GbaTexture";

extend({ GbaTexture });

GbaTexture.key = THREE.MathUtils.generateUUID();

const ImageSeq = () => {

    const diffuseTexture  = useKTX2('/gba_images/gameboy_diffuse-high.ktx2');
    const alphaTexture = useKTX2('/gba_images/gameboy_alpha-high.ktx2');
    const mvTexture = useKTX2('/gba_images/gameboy_mv-high.ktx2');
    const positionTexture = useKTX2('/gba_images/gameboy_position-high.ktx2');
    const textureRef = useRef();

    window.addEventListener('mousemove', (e) => {
        textureRef.current.uMouse = e.clientX / window.innerWidth;
    });
    
    const TextureMaterialProp = useMemo(()=> ({
        uDiffuseTexture: diffuseTexture,
        uAlphaTexture: alphaTexture,
        uMvTexture: mvTexture,
        uPositionTexture: positionTexture,
        uMouse: new THREE.Vector2()
    }),[diffuseTexture, alphaTexture, mvTexture, positionTexture]);

    return (
        <>
            <mesh >
                <planeGeometry args={[1, 1]} />
                {/* <meshBasicMaterial map={texture} /> */}
                <gbaTexture { ...TextureMaterialProp} ref={textureRef} side = {THREE.DoubleSide} transparent = {true} key={GbaTexture.key}/>
            </mesh>
        </>
    );
};
useTexture.preload('/gba_images/gameboy_diffuse-medium.jpg');
export default ImageSeq;
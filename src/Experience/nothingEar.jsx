import { useTexture } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import NothingEarTexture from "./Textures/NothingEarTexture.jsx";

extend({ NothingEarTexture });

NothingEarTexture.key = THREE.MathUtils.generateUUID();

const NothingEar = () => {

    const diffuseTexture  = useTexture('/nothingEar/NothingEar6x6.jpg');
    // diffuseTexture.colorSpace = THREE.LinearSRGBColorSpace;
    const alphaTexture = useTexture('/nothingEar/alpha6x6.jpg');
    // alphaTexture.colorSpace = THREE.LinearSRGBColorSpace;
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
        uDisplacementStrength: controls.uDisplacementStrength,
        uProgress: controls.progress,
        uMouse: new THREE.Vector2()
    }),[diffuseTexture, alphaTexture, controls.uDisplacementStrength, controls.progress]);

    return (
        <>
            <mesh ref={meshRef}>
                <planeGeometry args={[1, 1]} />
                {/* <meshBasicMaterial map={texture} /> */}
                <nothingEarTexture { ...TextureMaterialProp} ref={textureRef} side = {THREE.DoubleSide} transparent = {true} key={NothingEarTexture.key}/>
            </mesh>
        </>
    );
};
export default NothingEar;
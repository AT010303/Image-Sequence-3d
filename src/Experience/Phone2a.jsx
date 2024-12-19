import { useKTX2 } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import Phone2aTexture from "./Textures/Phone2aTexture.jsx";

extend({ Phone2aTexture });

Phone2aTexture.key = THREE.MathUtils.generateUUID();

const Phone2a = () => {

    const diffuseTexture  = useKTX2('/phone2a/ColorTexture3Cmp.ktx2');
    diffuseTexture.colorSpace = THREE.LinearSRGBColorSpace;
    const alphaTexture = useKTX2('/phone2a/Alpha3Cmp.ktx2');
    alphaTexture.colorSpace = THREE.LinearSRGBColorSpace;
    const mvTexture = useKTX2('/phone2a/MVTexture3Cmp.ktx2');
    mvTexture.colorSpace = THREE.LinearSRGBColorSpace;
    

    // mvTexture.colorSpace = THREE.LinearSRGBColorSpace;
    const textureRef = useRef();
    const meshRef = useRef();

    window.addEventListener('mousemove', (e) => {
        textureRef.current.uMouse = e.clientX / window.innerWidth;
        // mesh paralaax
        // meshRef.current.rotation.x = (e.clientY / window.innerHeight) * 0.1;
        // meshRef.current.rotation.y = (e.clientX / window.innerWidth) * 0.1;
    });

    const controls = useControls({
        progressPhone : { value: 0, min: 0, max: 1, step: 0.01 },
        uDisplacementStrengthPhone: { value: 1, min: 1, max: 100, step: 10 }
    });
    
    const TextureMaterialProp = useMemo(()=> ({
        uDiffuseTexture: diffuseTexture,
        uAlphaTexture: alphaTexture,
        uMvTexture: mvTexture,
        uProgress : controls.progressPhone,
        uDisplacementStrength: controls.uDisplacementStrengthPhone,
        uMouse: new THREE.Vector2()
    }),[diffuseTexture, alphaTexture, mvTexture, controls.progressPhone, controls.uDisplacementStrengthPhone]);

    return (
        <>  
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                {/* <meshBasicMaterial map={diffuseTexture} /> */}
                <phone2aTexture { ...TextureMaterialProp} ref={textureRef} side = {THREE.DoubleSide} transparent = {false} key={Phone2aTexture.key}/>
            </mesh>
        </>
    );
};
export default Phone2a;
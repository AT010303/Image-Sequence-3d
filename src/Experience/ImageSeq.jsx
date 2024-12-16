import { extend } from "@react-three/fiber";

import GbaTexture from "./Textures/GbaTexture";

extend({ GbaTexture });

const ImageSeq = () => {
    return (
        <>
            <mesh >
                <planeGeometry args={[1, 1]} />
                <gbaTexture />
            </mesh>
        </>
    );
};
export default ImageSeq;
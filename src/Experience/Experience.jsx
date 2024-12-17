import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';

import ImageSeq from './ImageSeq';

const Experience = () => {
    return (
        <>
            <Canvas camera={{ position: [0, 0, 1]}} gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }} >
                <Perf position={'top-left'} />
                <CameraControls />
                <ImageSeq />
            </Canvas>
        </>
    );
};

export default Experience;

import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';

// import Demo from './demo.jsx';
// import ImageSeq from './ImageSeq.jsx';
// import NothingEar from './nothingEar.jsx';
import Phone2a from './Phone2a';

const Experience = () => {
    return (
        <>
            <Canvas
                camera={{ position: [0, 0, 0.7] }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
            >
                <Perf position={'top-left'} />
                <CameraControls />
                {/* <NothingEar /> */}
                {/* <ImageSeq /> */}
                {/* <Demo /> */}
                <Phone2a />
            </Canvas>
        </>
    );
};

export default Experience;

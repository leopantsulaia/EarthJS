import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Earth = ({
  simulationSpeed,
  earthTextureToUse,
  earthTrisAmount,
  settingsAreLow,
  ...props
}) => {
  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.y += simulationSpeed * 0.0008;
  });

  const texture = useMemo(
    () => new THREE.TextureLoader().load(earthTextureToUse),
    [earthTextureToUse]
  );

  return (
    <mesh {...props} ref={mesh} scale={[2, 2, 2]}>
      <sphereGeometry args={[1, earthTrisAmount, earthTrisAmount]} />
      {settingsAreLow ? (
        <meshStandardMaterial
          attach="material"
          roughness={0.7}
          metalness={0.05}
          dithering={true}>
          <primitive attach="map" object={texture} />
        </meshStandardMaterial>
      ) : (
        <meshBasicMaterial attach="material">
          <primitive attach="map" object={texture} />
        </meshBasicMaterial>
      )}
    </mesh>
  );
};

export default Earth;

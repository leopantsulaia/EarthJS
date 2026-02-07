import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

const Clouds = ({
  simulationSpeed,
  cloudsTextureToUse,
  settingsAreLow,
  ...props
}) => {
  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.y += simulationSpeed * 0.0015;
  });

  const texture = useMemo(
    () => new THREE.TextureLoader().load(cloudsTextureToUse),
    [cloudsTextureToUse]
  );

  return (
    <mesh {...props} ref={mesh} scale={[2.005, 2.005, 2.005]}>
      <sphereGeometry args={[1, 64, 64]} />
      {settingsAreLow ? (
        <meshStandardMaterial attach="material" transparent={true}>
          <primitive attach="map" object={texture} />
        </meshStandardMaterial>
      ) : (
        <meshBasicMaterial attach="material" transparent={true}>
          <primitive attach="map" object={texture} />
        </meshBasicMaterial>
      )}
    </mesh>
  );
};

export default Clouds;
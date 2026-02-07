import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

const Moon = ({ simulationSpeed, moonTextureToUse, moonTrisAmount, settingsAreLow, ...props }) => {
  let angle = 0;
  let radius = 5;
  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.y -= 0.001 * simulationSpeed;
    angle += Math.acos(1 - Math.pow(0.01 / radius, 2) / 2) * simulationSpeed;
    mesh.current.position.z = radius * Math.cos(angle);
    mesh.current.position.x = radius * Math.sin(angle);
  });

  const texture = useMemo(() => new THREE.TextureLoader().load(moonTextureToUse), [moonTextureToUse]);

  return (
    <mesh {...props} ref={mesh} scale={[0.4, 0.4, 0.4]}>
      <sphereGeometry args={[1, moonTrisAmount, moonTrisAmount]} />
      {settingsAreLow ? (
        <meshStandardMaterial attach="material" roughness={1}>
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

export default Moon;

import React, { useRef, useState, useEffect } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "react-three-fiber";

const SettingsButton = ({
  simulationSpeed,
  settingsAreLow,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);
  const mesh = useRef();

  useFrame(() => {
    if (settingsAreLow) {
      mesh.current.rotation.x =
        simulationSpeed * (Math.sin(Date.now() * 0.001) * Math.PI * 0.01);
      mesh.current.rotation.y =
        simulationSpeed * (Math.sin(Date.now() * 0.001) * Math.PI * 0.004);
      mesh.current.rotation.z =
        simulationSpeed * (Math.sin(Date.now() * 0.001) * Math.PI * 0.015);
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[0.15, 0.15, 0.15]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Text depthTest={true} fillOpacity={0.85}>
        Toggle {settingsAreLow ? "Low" : "High"} Settings
      </Text>
    </mesh>
  );
};

export default SettingsButton;
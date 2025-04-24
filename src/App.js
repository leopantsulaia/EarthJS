import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import clouds3k from "./images/3k_earth_clouds.webp";
import clouds1080p from "./images/1080p_earth_clouds.webp";
import TwoKEarth from "./images/2k_earth_daymap.webp";
import FourKEarth from "./images/4k_earth_daymap.webp";
import moon720p from "./images/720p_moon.webp";
import moon360p from "./images/360p_moon.webp";

export const Earth3JS = () => {
  const [settingsAreLow, setSettingsAreLow] = useState(true);
  const [earthTextureToUse, setEarthTextureToUse] = useState(FourKEarth);
  const [moonTextureToUse, setMoonTextureToUse] = useState(moon720p);
  const [cloudsTextureToUse, setCloudsTextureToUse] = useState(clouds3k);
  const [earthTrisAmount, setEarthTrisAmount] = useState(128);
  const [moonTrisAmount, setMoonTrisAmount] = useState(32);

  const [simulationSpeed, setSimulationSpeed] = useState(1);

  const toggleGraphics = () => {
    if (earthTextureToUse === TwoKEarth) {
      setEarthTextureToUse(FourKEarth);
    } else {
      setEarthTextureToUse(TwoKEarth);
    }

    if (cloudsTextureToUse === clouds3k) {
      setCloudsTextureToUse(clouds1080p);
    } else {
      setCloudsTextureToUse(clouds3k);
    }

    if (earthTextureToUse === moon360p) {
      setMoonTextureToUse(moon720p);
    } else {
      setMoonTextureToUse(moon360p);
    }

    if (earthTrisAmount === 128) {
      setEarthTrisAmount(32);
    } else {
      setEarthTrisAmount(128);
    }

    if (moonTrisAmount === 32) {
      setMoonTrisAmount(16);
    } else {
      setMoonTrisAmount(32);
    }

    if (settingsAreLow) {
      setSettingsAreLow(false);
    } else {
      setSettingsAreLow(true);
    }
  };

  const Earth = (props) => {
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.y += simulationSpeed * 0.0008;
    });

    const texture = useMemo(
      () => new THREE.TextureLoader().load(earthTextureToUse),
      [],
    );

    return (
      <mesh {...props} ref={mesh} scale={[2, 2, 2]}>
        <sphereBufferGeometry args={[1, earthTrisAmount, earthTrisAmount]} />
        {settingsAreLow && (
          <meshStandardMaterial
            attach="material"
            roughness={0.7}
            metalness={0.05}
            dithering={true}
          >
            <primitive attach="map" object={texture} />
          </meshStandardMaterial>
        )}
        {!settingsAreLow && (
          <meshBasicMaterial attach="material">
            <primitive attach="map" object={texture} />
          </meshBasicMaterial>
        )}
      </mesh>
    );
  };

  const Clouds = (props) => {
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.y += simulationSpeed * 0.001;
    });

    const texture = useMemo(
      () => new THREE.TextureLoader().load(cloudsTextureToUse),
      [],
    );

    return (
      <mesh {...props} ref={mesh} scale={[2.005, 2.005, 2.005]}>
        <sphereBufferGeometry transparent={true} args={[1, 64, 64]} />
        {settingsAreLow && (
          <meshStandardMaterial attach="material" transparent={true}>
            <primitive attach="map" object={texture} />
          </meshStandardMaterial>
        )}
        {!settingsAreLow && (
          <meshBasicMaterial attach="material" transparent={true}>
            <primitive attach="map" object={texture} />
          </meshBasicMaterial>
        )}
      </mesh>
    );
  };

  const Moon = (props) => {
    let angle = 0;
    let radius = 5;
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.y -= 0.001 * simulationSpeed;
      angle += Math.acos(1 - Math.pow(0.01 / radius, 2) / 2) * simulationSpeed;
      mesh.current.position.z = radius * Math.cos(angle);
      mesh.current.position.x = radius * Math.sin(angle);
    });

    const texture = useMemo(
      () => new THREE.TextureLoader().load(moonTextureToUse),
      [],
    );

    return (
      <mesh {...props} ref={mesh} scale={[0.4, 0.4, 0.4]}>
        <sphereBufferGeometry
          transparent={true}
          args={[1, moonTrisAmount, moonTrisAmount]}
        />

        {settingsAreLow && (
          <meshStandardMaterial attach="material" roughness={1}>
            <primitive attach="map" object={texture} />
          </meshStandardMaterial>
        )}
        {!settingsAreLow && (
          <meshBasicMaterial attach="material">
            <primitive attach="map" object={texture} />
          </meshBasicMaterial>
        )}
      </mesh>
    );
  };

  const SettingsButton = (props) => {
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

  return (
    <>
      <head>
        <title>Earth 3JS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <main style={{ maxHeight: "100vh", overflow: "hidden" }}>
        <Canvas
          camera={{ position: [0, 0, 8.5], fov: 40 }}
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            backgroundImage: "url('/earth3JS/8k_stars.webp')",
            backgroundSize: "cover",
            backgroundColor: "black",
            boxShadow:
              "0 0 200px rgba(0,0,0,0.4) inset, 0 0 300px rgba(0,0,0,1) inset",
          }}
        >
          <Earth position={[0, -0.1, 0]} />
          <Clouds position={[0, -0.1, 0]} />
          <Moon position={[3, 0, 2]} />
          <SettingsButton position={[-1.55, 2.5, 0]} onClick={toggleGraphics} />
          {settingsAreLow && (
            <>
              <ambientLight intensity={0.1} color="#ffffff" />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                castShadow
                color="#fffff5"
              />
              <pointLight
                position={[-5, 5, 1]}
                intensity={0.2}
                angle={0}
                penumbra={0}
                castShadow
                color="#fffff5"
              />
            </>
          )}
          <OrbitControls />
        </Canvas>
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            backgroundColor: "#ccc",
            opacity: 0.5,
            paddingLeft: 2,
            paddingRight: 2,
          }}
        ></div>
      </main>
    </>
  );
};

export default Earth3JS;

import React from "react";
import { Canvas } from "@react-three/fiber";

const EarthMain = ({
  simulationSpeed,
  setSimulationSpeed,
  earthTextureToUse,
  earthTrisAmount,
  settingsAreLow,
  cloudsTextureToUse,
  moonTextureToUse,
  moonTrisAmount,
  handleToggleGraphics,
  Clouds,
  Earth,
  Moon,
  SettingsButton,
  Slider,
  Typography,
  OrbitControls,
}) => (
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
      }}>
      <Earth
        position={[0, -0.1, 0]}
        simulationSpeed={simulationSpeed}
        earthTextureToUse={earthTextureToUse}
        earthTrisAmount={earthTrisAmount}
        settingsAreLow={settingsAreLow}
      />
      <Clouds
        position={[0, -0.1, 0]}
        simulationSpeed={simulationSpeed}
        cloudsTextureToUse={cloudsTextureToUse}
        settingsAreLow={settingsAreLow}
      />
      <Moon
        position={[3, 0, 2]}
        simulationSpeed={simulationSpeed}
        moonTextureToUse={moonTextureToUse}
        moonTrisAmount={moonTrisAmount}
        settingsAreLow={settingsAreLow}
      />
      <SettingsButton
        position={[-1.55, 2.5, 0]}
        simulationSpeed={simulationSpeed}
        settingsAreLow={settingsAreLow}
        onClick={handleToggleGraphics}
      />
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
        right: 20,
        top: 25,
        opacity: 0.85,
        paddingLeft: 2,
        paddingRight: 2,
        width: 100,
      }}>
      <Slider
        size="small"
        value={simulationSpeed}
        onChange={(_, newValue) => setSimulationSpeed(newValue)}
        valueLabelDisplay="auto"
        step={0.25}
        marks
        min={0}
        max={10}
      />
      <Typography color="primary" style={{ fontSize: 12 }}>
        Simulation Speed
      </Typography>
    </div>
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        backgroundColor: "#ccc",
        opacity: 0.5,
        paddingLeft: 2,
        paddingRight: 2,
      }}>
      <Typography style={{ fontSize: 12 }}>
        <a
          href="https://www.solarsystemscope.com/textures/"
          target="_blank"
          rel="noopener noreferrer">
          Earth, Clouds, and Moon Texture Source
        </a>
        &emsp;|&emsp;
        <a
          href="https://photojournal.jpl.nasa.gov/catalog/PIA12348"
          target="_blank"
          rel="noopener noreferrer">
          Background Texture Source
        </a>
      </Typography>
    </div>
  </main>
);

export default EarthMain;

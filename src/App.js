import {
  React,
  useState,
  clouds3k,
  clouds1080p,
  TwoKEarth,
  FourKEarth,
  moon720p,
  moon360p,
  EarthMain,
  Clouds,
  Earth,
  Moon,
  SettingsButton,
  Slider,
  Typography,
  OrbitControls,
} from "./imports/imports.js";

export const Earth3JS = () => {
  const [settingsAreLow, setSettingsAreLow] = useState(true);
  const [earthTextureToUse, setEarthTextureToUse] = useState(FourKEarth);
  const [moonTextureToUse, setMoonTextureToUse] = useState(moon720p);
  const [cloudsTextureToUse, setCloudsTextureToUse] = useState(clouds3k);
  const [earthTrisAmount, setEarthTrisAmount] = useState(128);
  const [moonTrisAmount, setMoonTrisAmount] = useState(32);
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  const toggleGraphics = () => {
    setEarthTextureToUse(
      earthTextureToUse === TwoKEarth ? FourKEarth : TwoKEarth
    );
    setCloudsTextureToUse(
      cloudsTextureToUse === clouds3k ? clouds1080p : clouds3k
    );
    setMoonTextureToUse(moonTextureToUse === moon360p ? moon720p : moon360p);
    setEarthTrisAmount(earthTrisAmount === 128 ? 32 : 128);
    setMoonTrisAmount(moonTrisAmount === 32 ? 16 : 32);
    setSettingsAreLow(!settingsAreLow);
  };

  return (
    <EarthMain
      simulationSpeed={simulationSpeed}
      setSimulationSpeed={setSimulationSpeed}
      earthTextureToUse={earthTextureToUse}
      earthTrisAmount={earthTrisAmount}
      settingsAreLow={settingsAreLow}
      cloudsTextureToUse={cloudsTextureToUse}
      moonTextureToUse={moonTextureToUse}
      moonTrisAmount={moonTrisAmount}
      handleToggleGraphics={toggleGraphics}
      Clouds={Clouds}
      Earth={Earth}
      Moon={Moon}
      SettingsButton={SettingsButton}
      Slider={Slider}
      Typography={Typography}
      OrbitControls={OrbitControls}
    />
  );
};

export default Earth3JS;

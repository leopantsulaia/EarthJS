const toggleGraphics = ({ settingsAreLow, setSettingsAreLow, earthTextureToUse, setEarthTextureToUse, moonTextureToUse, setMoonTextureToUse, cloudsTextureToUse, setCloudsTextureToUse, earthTrisAmount, setEarthTrisAmount, moonTrisAmount, setMoonTrisAmount, TwoKEarth, FourKEarth, moon360p, moon720p, clouds1080p, clouds3k }) => {
  setEarthTextureToUse(earthTextureToUse === TwoKEarth ? FourKEarth : TwoKEarth);
  setCloudsTextureToUse(cloudsTextureToUse === clouds3k ? clouds1080p : clouds3k);
  setMoonTextureToUse(moonTextureToUse === moon360p ? moon720p : moon360p);
  setEarthTrisAmount(earthTrisAmount === 128 ? 32 : 128);
  setMoonTrisAmount(moonTrisAmount === 32 ? 16 : 32);
  setSettingsAreLow(!settingsAreLow);
};

export default toggleGraphics;

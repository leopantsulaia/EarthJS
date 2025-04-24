import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Slider, Typography } from "@mui/material";
import clouds3k from "../images/3k_earth_clouds.webp";
import clouds1080p from "../images/1080p_earth_clouds.webp";
import TwoKEarth from "../images/2k_earth_daymap.webp";
import FourKEarth from "../images/4k_earth_daymap.webp";
import moon720p from "../images/720p_moon.webp";
import moon360p from "../images/360p_moon.webp";
import Moon from "../components/Moon/Moon.js";
import Earth from "../components/Earth/Earth.js";
import Clouds from "../components/Clouds/Clouds.js";
import SettingsButton from "../settings/SettingsButton";
import EarthMain from "../components/EarthMain.js";

export {
    React,
    useRef,
    useMemo,
    useState,
    useEffect,
    Canvas,
    useFrame,
    Text,
    OrbitControls,
    THREE,
    Slider,
    Typography,
    clouds3k,
    clouds1080p,
    TwoKEarth,
    FourKEarth,
    moon720p,
    moon360p,
    Moon,
    Earth,
    Clouds,
    SettingsButton,
    EarthMain,
    
};
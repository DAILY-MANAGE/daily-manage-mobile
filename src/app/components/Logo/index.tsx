import React from "react";
import { Image } from "react-native";
import logo from "../../../assets/icon.png";

interface LogoProps {
  style?: any;
}

export default function Logo({ style }: LogoProps) {
  return (
    <Image style={style} source={logo} />
  );
}
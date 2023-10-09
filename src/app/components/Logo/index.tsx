import React from "react";
import { Image, StyleSheet } from "react-native";
import logo from "../../../assets/icon.png";

interface LogoProps {
  height?: number;
  width?: number;
}

export default function Logo({ height = 104, width = 104 }: LogoProps) {
  return (
    <Image style={styles.logo} source={logo} width={width} height={height} />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 104,
    height: 104,
  },
});

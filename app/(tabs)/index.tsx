import { Link } from "expo-router";

import React from "react";

import { View, Pressable } from "react-native";

import FormItem from "../components/FormItem";
import FabButton from "../components/FabButton";
import CustomSearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <>
      <CustomSearchBar />
      <FormItem />
      <FabButton />
    </>
  );
}

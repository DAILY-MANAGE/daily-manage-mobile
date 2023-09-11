import React from "react";
import FormItem from "../components/FormItem";
import FabButton from "../components/FabButton";
import CustomSearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <>
      <CustomSearchBar />
      <FormItem id={1} estado="Ativo" nome="Turbo / Gerador" dataCriacao={11092023} />
      <FabButton />
    </>
  );
}

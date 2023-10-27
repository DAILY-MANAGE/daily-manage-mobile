import React from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ENDPOINT } from "../../../utils/endpoints";
import { CardFormulario } from "../(components)/CardFormulario";
import { IdStorage } from "../../../hooks/useId";
import axios from "axios";
import CustomButton from "../../components/Button";

export const formularioid = IdStorage.getId();

export default function Formularios() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <CustomButton title="Criar Formulario" onPress={() => router.push('criarFormulario')} />
      <Pressable
        onPress={async () =>
          router.push({
            pathname: `/formulario/[${formularioid}]`,
            params: { id: `${formularioid}` },
          })
        }
        style={styles.formularioContainer}
      >
        <CardFormulario />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formularioContainer: {
    paddingTop: 8,
    height: "auto",
    width: "100%",
    gap: 8,
  },
  container: {
    gap: 8,
    height: "100%",
    width: "100%",
    padding: 16,
    flexDirection: "column",
    margin: 0,
  },
});

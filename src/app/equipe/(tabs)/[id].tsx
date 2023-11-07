import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ENDPOINT } from "../../../utils/endpoints";
import { CardFormulario } from "../(components)/CardFormulario";
import { IdStorage } from "../../../hooks/useId";
import axios from "axios";
import CustomButton from "../../components/Button";
import { Button, Icon, Overlay } from "@rneui/themed";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const formularioid = IdStorage.getId();

export default function Formularios() {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <CustomButton title="Criar Formulario" onPress={() => router.push('criarFormulario')} />
      <Pressable
        onPress={() => setVisible(!visible)}
        style={styles.formularioContainer}
      >
        <CardFormulario />
      </Pressable>
      <Overlay
        overlayStyle={styles.overlayStyle}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <View style={styles.overlayHeader}>
          <Text style={styles.overlayTitle}>O que você deseja fazer com o formulário?</Text>
          <FontAwesome name="close" size={24} onPress={toggleOverlay}/>
        </View>
        <View style={styles.actions}>
          <CustomButton
            icon={
              <Icon
                name="eye"
                type="font-awesome"
                color="white"
                size={25}
                iconStyle={{ marginRight: 10 }}
              />
            }
            title="Ver"
            color="black"
            buttonStyle={styles.button}
            onPress={() => { }}
          />
          <CustomButton
            icon={
              <Icon
                name="edit"
                type="font-awesome"
                color="white"
                size={25}
                iconStyle={{ marginRight: 10 }}
              />
            }
            title="Editar"
            color="orange"
            buttonStyle={styles.button}
            onPress={() => { }}
          />
        </View>

      </Overlay>
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
  actions: {
    alignItems: "center",
    width: "100%",
    height: "auto",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  overlayStyle: {
    borderRadius: 16,
    padding: 16,
    width: "90%",
    height: "auto",
    margin: 0,
    gap: 16,
  },
  overlayHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 8, 
  },
  overlayTitle: {
    paddingTop: 8,
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    width: 160,  
    height: 56
  }
});

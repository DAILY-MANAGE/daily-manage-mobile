import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Overlay } from "@rneui/themed";
import ButtonComponent from "../../../components/Button";
import InputComponent from "../../../components/Input";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";

interface OverlayEquipeProps {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  onPress: () => any;
  editable: boolean;
}

export default function OverlayEquipe({
  value,
  setValue,
  onPress,
  editable,
}: OverlayEquipeProps) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const onPressSave = () => {
    onPress();
    toggleOverlay();
    router.replace("equipes");
  };

  return (
    <View>
      <ButtonComponent onPress={toggleOverlay} title="+ Nova equipe" />

      <Overlay
        overlayStyle={styles.overlayStyle}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Criar nova Equipe</Text>
          <FontAwesome name="close" size={24} onPress={toggleOverlay} />
        </View>

        <InputComponent
          placeholder="Digite o nome da Equipe"
          label="Nome da Equipe"
          autoComplete="name"
          value={value}
          setValue={setValue}
          editable={editable}
        />
        <ButtonComponent onPress={onPressSave} title="Salvar" />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    bottom: 0,
    position: "absolute",
  },
  overlayStyle: {
    borderRadius: 16,
    padding: 16,
    width: "90%",
    height: "auto",
    margin: 0,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 8,
  },
  title: {
    paddingTop: 8,
    textAlign: "center",
    fontSize: 20,
  },
});

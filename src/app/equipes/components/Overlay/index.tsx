import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Overlay } from "@rneui/themed";
import ButtonComponent from "../../../components/Button";
import InputComponent from "../../../components/Input";

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

  return (
    <View>
      <ButtonComponent onPress={toggleOverlay} title='Nova Equipe +' />
      <Overlay
        overlayStyle={styles.overlayStyle}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Text style={styles.title}>Nova Equipe</Text>
        <InputComponent
          placeholder='Digite o nome da Equipe'
          label='Nome da Equipe'
          autoComplete='name'
          value={value}
          setValue={setValue}
          editable={editable}
        />
        <ButtonComponent onPress={onPress} title='Salvar' />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 16,
    padding: 16,
    width: "90%",
    height: "auto",
    margin: 0,
    gap: 16,
  },
  title: {
    paddingTop: 8,
    textAlign: "center",
    fontSize: 20,
  },
});

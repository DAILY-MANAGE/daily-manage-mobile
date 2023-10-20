import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Overlay } from "@rneui/themed";
import ButtonComponent from "../../components/Button";
import InputComponent from "../../components/Input";

interface OverlayFormularioProps {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  onPress: () => any;
  editable: boolean;
}

export default function OverlayFormulario({
  value,
  setValue,
  onPress,
  editable,
}: OverlayFormularioProps) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <ButtonComponent onPress={toggleOverlay} title='Novo Formulário +' />
      <Overlay
        overlayStyle={styles.overlayStyle}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Text style={styles.title}>Novo Formulário</Text>
        <InputComponent
          placeholder='Digite o nome do Formulário'
          value={value}
          setValue={setValue}
          label='Nome do Formulário'
          editable={editable}
          autoComplete='name'
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

import React, { useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { CardFormulario } from "../(components)/CardFormulario";
import { IdStorage } from "../../../hooks/useId";
import CustomButton from "../../components/Button";
import { BottomSheet, Icon, ListItem, Overlay } from "@rneui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SearchBar from "../../components/SearchBar";

export const equipeid = IdStorage.getId();

export default function Formularios() {
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState("");

  const options = [
    {
      title: "Editar Nome",
      onPress: () => {},
    },
    {
      title: "Deletar Formulário",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => {},
    },
  ];

  const router = useRouter();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      router.replace("equipe");
    }, 500);
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <SearchBar value={search} onChangeText={setSearch} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CustomButton
          title="Criar Formulario"
          onPress={() => router.push("criarFormulario")}
        />
        <Pressable
          delayLongPress={500}
          onLongPress={() => {
            setIsVisible(!isVisible), console.log("oadimawoimdaoiwd");
          }}
          onPress={() => setVisible(!visible)}
          style={styles.formularioContainer}
        >
          <CardFormulario />
        </Pressable>
        <Overlay
          overlayStyle={styles.overlayStyle}
          isVisible={visible}
          onBackdropPress={toggleOverlay}
        >
          <View style={styles.overlayHeader}>
            <Text style={styles.overlayTitle}>O que você deseja fazer?</Text>
            <FontAwesome name="close" size={24} onPress={toggleOverlay} />
          </View>
          <View style={styles.actions}>
            <CustomButton
              icon={
                <Icon
                  name="check"
                  type="font-awesome"
                  color="white"
                  size={25}
                  iconStyle={{ marginRight: 10 }}
                />
              }
              title="Responder"
              color="black"
              buttonStyle={styles.button}
              onPress={() => {
                router.replace("(formulario)/editar");
              }}
            />
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
              title="Ver respostas"
              buttonStyle={styles.buttonRight}
              onPress={() => {}}
            />
          </View>
        </Overlay>
      </ScrollView>
      <BottomSheet
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(!isVisible)}
      >
        {options.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </>
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
    backgroundColor: "white"
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
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 8,
  },
  overlayTitle: {
    paddingTop: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonRight: {
    width: "auto",
    height: 48,
    backgroundColor:
      "rgb(77,68,226), linear-gradient(90deg, rgba(77,68,226,1) 35%, rgba(87,30,139,1) 100%)",
  },
  button: {
    width: "auto",
    height: 48,
    backgroundColor: "black",
  },
});

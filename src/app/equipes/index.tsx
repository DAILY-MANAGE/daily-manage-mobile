import { Text, View, StyleSheet, Pressable } from "react-native";
import ButtonComponent from "../components/Button";
import { useRouter } from "expo-router";
import CardComponent from "./components/Card";

interface EquipesProps {
  title: string;
  content?: any;
}

const equipes = [
  {
    title: "Operadores de Área",
    content: "Descrição",
  },
];

export default function Equipes({ title, content }: EquipesProps) {
  const router = useRouter();

  const goToEquipe= () => router.push("equipe")

  return (
    <View style={styles.container}>
      <ButtonComponent onPress={() => router.push("criarEquipe")} title='Nova Equipe +' />
      <Pressable style={styles.cards} onPress={goToEquipe}>
        {equipes.map((equipe, id) => {
          return (
            <CardComponent
              key={id}
              title={equipe.title}
              content={equipe.content}
            />
          );
        })}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
 cards: {
  gap: 16,
 },
  container: {
    height: "100%",
    width: "100%",
    padding: 16,
    flexDirection: "column",
    gap: 16,
  },
});

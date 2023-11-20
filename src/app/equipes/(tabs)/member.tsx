import {
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { CardTeamMember } from "../(components)/CardTeamMember";
import SearchBar from "../../components/SearchBar";

export default function Equipes() {
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      router.replace("equipes");
    }, 500);
  }, []);

  const router = useRouter();

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <>
      <SearchBar placeholder="Pesquisar equipes..." value={search} onChangeText={handleSearch} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CardTeamMember search={search}/>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    bottom: 0,
    width: "100%",
    height: "auto",
    position: "absolute",
  },
  container: {
    height: "100%",
    width: "100%",
    padding: 16,
    flexDirection: "column",
    margin: 0,
    backgroundColor: "white"
  },
  equipeContainer: {
    paddingTop: 8,
    height: "auto",
    width: "100%",
    gap: 8,
  },
});

import { View } from "react-native";
import Login, { setIsLoggedIn } from "../(auth)";
import Equipes from "../equipe";

export default function Provider() {
  return (
    <>
      {setIsLoggedIn() &&
        <Equipes />
      } : {
        <Login />
      }
    </>
  );
}
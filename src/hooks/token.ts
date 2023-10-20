import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (token: string) => {
 try {
  await AsyncStorage.setItem("token", token);
 } catch (error) {
  console.log(error);
 }
};

export const getToken = async () => {
 try {
  const token = await AsyncStorage.getItem("token");
  if (token !== null) {
   return token;
  }
 } catch (error) {
  console.log(error);
 }
};
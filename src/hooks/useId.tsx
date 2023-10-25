import AsyncStorage from "@react-native-async-storage/async-storage";

interface IdProps {
 id?: string | number;
}

const setId = async (id: IdProps) => {
 try {
   await AsyncStorage.setItem("id", JSON.stringify(id));
 } catch (error) {
   console.log(error);
 }
};

const getId = async (): Promise<IdProps | null> => {
 try {
   const id = await AsyncStorage.getItem("id");
   if (id !== null) {
     return JSON.parse(id);
   }
 } catch (error) {
   console.log(error);
 } 
 return null;
};

export const IdStorage = {
 setId,
 getId,
};
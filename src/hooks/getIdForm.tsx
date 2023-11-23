import AsyncStorage from "@react-native-async-storage/async-storage";

interface IdProps {
 id?: string | number;
}

const setIdForm = async (id: IdProps) => {
 try {
   await AsyncStorage.setItem("idformulario", JSON.stringify(id));
 } catch (error) {
   console.log(error);
 }
};

const getIdForm = async (): Promise<IdProps | null> => {
 try {
   const id = await AsyncStorage.getItem("idformulario");
   if (id !== null) {
     return JSON.parse(id);
   }
 } catch (error) {
   console.log(error);
 } 
 return null;
};

export const IdStorage = {
 setIdForm,
 getIdForm,
};
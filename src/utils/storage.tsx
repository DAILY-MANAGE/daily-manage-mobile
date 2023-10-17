import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = new Storage({
 storageBackend: AsyncStorage,
 defaultExpires: (1000 * 3600 * 24) / 2,
 sync: {
 }
});
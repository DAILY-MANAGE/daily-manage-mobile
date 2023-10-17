import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageProps {
 token?: string,
 username?: string
}

export default function LocalStorage({ token, username }: StorageProps) {
 const storage = new Storage({
  storageBackend: AsyncStorage,
  defaultExpires: (1000 * 3600 * 24) / 2,
  sync: {
  }
 });

 storage.save({
  key: 'loginState',
  data: {
   username: username,
   token: token
  },
  expires: 1000 * 3600
 });
}
import { useState } from 'react';
import Login, { setIsLoggedIn } from './login/index';
import { Text } from 'react-native'
import Equipes from '../equipe';

const isLoggedIn = setIsLoggedIn;

export default function Root() {
 const [isLoading, setIsLoading] = useState(false)
 return (
  <>
   {isLoading && <Text>Carregando...</Text>}
   {!isLoading && (
    <>
     {isLoggedIn && <Equipes />}
     {!isLoggedIn && <Login />}
    </>
   )}
  </>
 );
}
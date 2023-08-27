import CookieManager from '@react-native-cookies/cookies';

import axios, { AxiosResponse } from 'axios';

import { ToastAndroid } from 'react-native';
import B64Encrypt from '../utils/useBase64';
import { useRouter } from 'expo-router';

const loginCookieKey = 'login_token'

const registerPath = `/auth/register`;
const loginPath = `/auth/login`;

const B64EncryptObject = B64Encrypt();
let authenticatedToken = null;

require("dotenv").config();

const instance = axios.create({
    baseURL: 'http://10.68.21.237:8080',//process.env.API_ENDPOINT,
});

function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
}

export interface CustomResponse extends AxiosResponse {
    errors?: string[];
}

export interface LoginData {
    usuario: string;
    senha: string;
    lembrarSenha?: boolean;
}

export interface RegisterData {
    usuario: string;
    senha: string;
    confirmarSenha?: string;
}

interface RequestType extends AxiosResponse<any, any> {
    errors?: string[]
}

const useAuthHandler = () => {
    const router = useRouter();

    const succesfullyAuthenticated = (message: string = 'Login realizado com sucesso!') => {
        showToast(message);
        router.push('/(tabs)');
    };

    const unsuccesfullyAuthenticated = (
        message: string = 'Não foi possível realizar o login.'
    ) => {
        showToast(message);
    };

    const encodeArray = (arr: LoginData | RegisterData) => {
        const stringfiedArray = JSON.stringify(arr);
        const encodedJSON = B64EncryptObject.encodeText(stringfiedArray);
        return encodedJSON;
    }

    const rememberPassword = (data: LoginData | RegisterData) => {
        const encodedArray = encodeArray(data);
        if (!encodedArray) {
            return
        }
        /* CookieManager.set(loginCookieKey, encodedArray, {
            expires: 30,
        }); */
    }

    const login = (loginData?: LoginData) => {
        if (!loginData) return;

        instance
            .post(loginPath, loginData)
            .then((response: RequestType) => {
                console.log(response);
                if (response.errors) {
                    response.errors.forEach((message: string) => {
                        unsuccesfullyAuthenticated(message);
                    })
                }
                if (response.status == 200) {
                    succesfullyAuthenticated();
                    if (loginData.lembrarSenha) {
                        rememberPassword(loginData);
                    }
                }
            })
            .catch((error) => {
                const responseData = error.response.data
                if (responseData.errors) {
                    responseData.errors.forEach((message: string) => {
                        unsuccesfullyAuthenticated(message);
                    })
                }
            });
    };

    const isLoggedIn = async () => {

        const withCookie = async () => {

            const getDecodedJSON = () => {
                const tokenCookie = CookieManager.get(loginCookieKey);
                if (!tokenCookie) {
                    return
                }

                const decodedCookie = B64EncryptObject.decodeText(/* tokenCookie */);
                if (!decodedCookie) {
                    return;
                }

                const decodedJSON = JSON.parse(decodedCookie);
                return decodedJSON;
            };

            const decodedJSON = getDecodedJSON();
            if (!decodedJSON) return;

            const requestParams = {
                params: decodedJSON,
            };

            return instance
                .get(loginPath, requestParams)
                .then((response: CustomResponse) => {
                    console.log(response);
                    if (response.status == 200) {
                        succesfullyAuthenticated();
                        return true;
                    } else {
                        // checar mensagem de erro
                        if (!response.errors) {
                            unsuccesfullyAuthenticated();
                            return;
                        }
                        unsuccesfullyAuthenticated();
                        return;
                    }
                })
                .catch((error) => {
                    if (!error.message) return;
                    unsuccesfullyAuthenticated(error.message);
                });
        };

        const hasAuthTokenInCookies = CookieManager.get(loginCookieKey);
        if (hasAuthTokenInCookies) {
            return await withCookie()
        }

        return false;
    }

    const register = (registerData: RegisterData) => {
        const registerParams = {
            params: registerData,
        };
        instance
            .post(registerPath, registerParams)
            .then((response) => {
                if (response.status == 201) {
                    rememberPassword(registerData)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return {
        login,
        register,
        isLoggedIn
    };
};

export default useAuthHandler;
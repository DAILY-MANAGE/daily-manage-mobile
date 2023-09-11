import { AxiosResponse } from "axios";
import axios from "react-native-axios";
import B64Encrypt from "../utils/useBase64";
import { useRouter } from "expo-router";
import { ToastAndroid } from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";

const registerPath = `/auth/register`;
const loginPath = `/auth/login`;

const B64EncryptObject = B64Encrypt();

const axiosInstance = axios.create({
    baseURL: "http://10.68.21.237:8080",
});

function showToast(message: any) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
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
export interface CustomResponse extends AxiosResponse {
    errors?: string[];
}
interface RequestType extends AxiosResponse<any, any> {
    errors?: string[];
}

const useAuthHandler = () => {
    const router = useRouter();

    const succesfullyAuthenticated = (
        message: string = "Login realizado com sucesso!"
    ) => {
        showToast(message);
        router.push("/(tabs)");
    };

    const unsuccesfullyAuthenticated = (
        message: string = "Não foi possível realizar o login."
    ) => {
        showToast(message);
    };

    const encodeArray = (arr: LoginData | RegisterData) => {
        const stringfiedArray = JSON.stringify(arr);
        const encodedJSON = B64EncryptObject.encodeText(stringfiedArray);
        return encodedJSON;
    };

    const rememberPassword = (data: LoginData | RegisterData) => {
        const encodedArray = encodeArray(data);
        if (!encodedArray) {
            return;
        }
    };

    const login = (loginData?: LoginData) => {
        if (!loginData) return;

        axiosInstance
            .post(loginPath, loginData)
            .then((response: RequestType) => {
                console.log(response);
                if (response.errors) {
                    response.errors.forEach((message: string) => {
                        unsuccesfullyAuthenticated(message);
                    });
                }
                if (response.status == 200) {
                    succesfullyAuthenticated();
                    if (loginData.lembrarSenha) {
                        rememberPassword(loginData);
                    }
                }
            })
            .catch((error) => {
                const responseData = error.response.data;
                if (responseData.errors) {
                    responseData.errors.forEach((message: string) => {
                        unsuccesfullyAuthenticated(message);
                    });
                }
            });
    };

    const register = (registerData: RegisterData) => {
        const registerParams = {
            params: registerData,
        };
        axiosInstance
            .post(registerPath, registerParams)
            .then((response) => {
                if (response.status == 201) {
                    rememberPassword(registerData);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return {
        login,
        register,
    };
};

export default useAuthHandler;

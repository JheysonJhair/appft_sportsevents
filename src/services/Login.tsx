import axios from "axios";
import { Login } from "../types/User";

//---------------------------------------------------------------- LOGIN
export const login = async (loginData: Login) => {
  try {
    const response = await axios.post(
      "https://esappsoccer.ccontrolz.com/api/user/login",
      loginData
    );
    return response.data;
  } catch (error) {
    console.error("API: Error al iniciar sesión", error);
    throw new Error("API: Error al iniciar sesión");
  }
};

//---------------------------------------------------------------- GET RENIEC
export const fetchUserDataByDNI = async (dni: any) => {
  try {
    const apiToken =
      "901d54ab5fe9c766c418c0c2557320ce14ddf9fea5439dacf3190f9c6a6b972b";
    const url = `https://apiperu.dev/api/dni/${dni}?api_token=${apiToken}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("API: Error al obtener datos del usuario por DNI");
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "API: No se encontraron datos");
    }

    return data.data;
  } catch (error) {
    console.error("API: Error al obtener datos del usuario por DNI", error);
    throw new Error("API: Error al obtener datos del usuario por DNI");
  }
};

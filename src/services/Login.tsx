import axios from "axios";
import { Login } from "../types/User";

const API_URL = "https://esappsoccer-production.up.railway.app/api";

//---------------------------------------------------------------- LOGIN
export const login = async (loginData: Login) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/login`,
      loginData
    );
    return response.data;
  } catch (error) {
    console.error("API: Error al iniciar sesión", error);
    throw new Error("API: Error al iniciar sesión");
  }
};

//---------------------------------------------------------------- GET RENIEC
export const fetchUserDataByDNI = async (dni: string) => {
  try {
    const url = `${API_URL}/user/Reniec/${dni}`;

    const response = await fetch(url, {
      method: 'GET'
    });

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

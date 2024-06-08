import axios from "axios";
import { Login } from "../types/User";

export const login = async (loginData: Login) => {
  try {
    const response = await axios.post(
      "https://esappsoccer.ccontrolz.com/api/user/login",
      loginData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al iniciar sesión");
  }
};

//---------------------------------------------------------------- GET RENIEC
export const fetchUserDataByDNI = async (dni: any) => {
  const apiToken =
    "4120358d7de5e4283fb3128d6feacb73d8f1c8fa7e06db57d963892ca74d6038";
  const url = `https://apiperu.dev/api/dni/${dni}?api_token=${apiToken}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || "No data found");
  }

  return data.data;
};

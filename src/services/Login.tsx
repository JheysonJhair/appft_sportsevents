import axios from 'axios';
import { Login } from "../types/User";

export const login = async (loginData: Login) => {
  try {
    const response = await axios.post('https://esappsoccer.ccontrolz.com/api/user/login', loginData);
    
    return response.data;
  } catch (error) {
    throw new Error('Error al iniciar sesión');
  }
};

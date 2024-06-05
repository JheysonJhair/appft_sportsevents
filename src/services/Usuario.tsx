import axios from "axios";
import { User } from "../types/User";
interface ApiResponse {
  msg: string;
  success: boolean;
  data: User[];
}
const API_URL = "https://esappsoccer.ccontrolz.com/api";

//---------------------------------------------------------------- GET USER
export async function obtenerUsuarios(): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/user`);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const responseData: ApiResponse = await response.json();
    if (!responseData.success) {
      throw new Error(responseData.msg);
    }
    return responseData.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

//---------------------------------------------------------------- VERIFICATE MAIL -  VERIFICATE CODE => USER

export const enviarVerificacionEmail = async (email: string) => {
  try {
    const response = await fetch(`${API_URL}/mailValidation?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al enviar");
    }
    return response;
  } catch (error) {
    console.error("Error al enviar el email", error);
    throw error;
  }
};

export const verificarCodigo = async (Email: string, Code: string) => {
  try {
    const response = await axios.post(`${API_URL}/user/validate`, {
      Email,
      Code,
    });
    return response.data;
  } catch (error) {
    console.error("Error al verificar el código", error);
    throw error;
  }
};

//---------------------------------------------------------------- POST USER
export async function crearUsuario(
  usuario: Partial<User>
): Promise<{ msg: string; success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/user/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) {
      throw new Error("Error al crear el usuario");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error);
  }
}

//---------------------------------------------------------------- PUT USER
export async function actualizarUsuario(usuario: Partial<User>): Promise<void> {
  try {
    const url = `${API_URL}/user/update`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }
  } catch (error) {
    throw new Error("Error al actualizar el usuario: " + error);
  }
}

//---------------------------------------------------------------- GET USER ID
export async function obtenerUsuarioPorId(
  usuarioId: number
): Promise<User | null> {
  try {
    const url = `${API_URL}/user/${usuarioId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener el usuario");
    }
    const responseData: ApiResponse = await response.json();
    if (!responseData.success) {
      throw new Error(responseData.msg);
    }
    return responseData.data[0] || null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

//---------------------------------------------------------------- DELETE USER
export async function eliminarUsuario(usuarioId: number): Promise<void> {
  try {
    const url = `${API_URL}/user/${usuarioId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }
    return response.json();
  } catch (error) {
    throw new Error("Error al eliminar el usuario: " + error);
  }
}

//---------------------------------------------------------------- BLOCK USER
export async function bloquearUsuario(id: number) {
  try {
    const response = await fetch(`${API_URL}/user/blockUser/${id}`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Error al bloquear el usuario");
    }
    return response.json();
  } catch (error) {
    console.error("Error al bloquear el usuario:", error);
    throw new Error("Hubo un error al bloquear el usuario");
  }
}

//---------------------------------------------------------------- UNLOCK USER
export async function desbloquearUsuario(id: number) {
  try {
    const response = await fetch(`${API_URL}/user/unLockUser/${id}`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Error al desbloquear el usuario");
    }
    return response.json();
  } catch (error) {
    console.error("Error al desbloquear el usuario:", error);
    throw new Error("Hubo un error al desbloquear el usuario");
  }
}

import { Usuario } from "../types/Usuario";

interface ApiResponse {
  msg: string;
  success: boolean;
  data: Usuario[];
}

export async function obtenerUsuarios(): Promise<Usuario[]> {
  try {
    const response = await fetch("https://zonafitbk.ccontrolz.com/api/user");
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

export async function crearUsuario(usuario: Partial<Usuario>): Promise<void> {
  try {
    const response = await fetch("https://zonafitbk.ccontrolz.com/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) {
      throw new Error("Error al crear el usuario");
    }
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error);
  }
}

export async function eliminarUsuario(usuarioId: number): Promise<void> {
  try {
    const url = `https://zonafitbk.ccontrolz.com//api/users/${usuarioId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }
  } catch (error) {
    throw new Error("Error al eliminar el usuario: " + error);
  }
}

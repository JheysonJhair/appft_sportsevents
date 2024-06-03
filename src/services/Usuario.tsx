import { Usuario } from "../types/User";

interface ApiResponse {
  msg: string;
  success: boolean;
  data: Usuario[];
}

export async function obtenerUsuarios(): Promise<Usuario[]> {
  try {
    const response = await fetch("https://esappsoccer.ccontrolz.com/api/user");
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


export async function crearUsuario(usuario: Partial<Usuario>): Promise<{ msg: string; success: boolean }> {
  try {
    const response = await fetch("https://esappsoccer.ccontrolz.com/api/user/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) {
      throw new Error("Error al crear el usuario");
    }
    const responseData: { msg: string; success: boolean } = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error);
  }
}

export async function actualizarUsuario(usuario: Partial<Usuario>): Promise<void> {
  try {
    const url = `https://esappsoccer.ccontrolz.com/api/user/update`;
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

export async function obtenerUsuarioPorId(usuarioId: number): Promise<Usuario | null> {
  try {
    const url = `https://esappsoccer.ccontrolz.com/api/user/${usuarioId}`;
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

export async function eliminarUsuario(usuarioId: number): Promise<void> {
  try {
    const url = `https://esappsoccer.ccontrolz.com/api/user/${usuarioId}`;
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

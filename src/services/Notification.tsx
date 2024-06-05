import { Notification } from "../types/Notification";
const API_URL = "https://esappsoccer.ccontrolz.com/api";

interface ApiResponse<T> {
  msg: string;
  success: boolean;
  data: T;
}

//---------------------------------------------------------------- GET MANAGEMENT ID
export async function notificacionesGerenciaId(
  managementId: number
): Promise<Notification[]> {
  try {
    const response = await fetch(
      `${API_URL}/notification/getManagementById/${managementId}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener las notificaciones");
    }
    const responseData: ApiResponse<Notification[]> = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error al obtener las notificaciones:", error);
    throw error;
  }
}

export async function insertarNotificacion(
  message: string,
  userId: number,
  managementId: number
): Promise<{ msg: string; success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/notification/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Message: message,
        IdUser: userId,
        IdManagement: managementId,
      }),
    });
    if (!response.ok) {
      throw new Error("Error al insertar la notificación");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    console.error("Error al insertar la notificación:", error);
    throw error;
  }
}


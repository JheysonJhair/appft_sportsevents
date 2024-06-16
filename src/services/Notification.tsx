import axios from "axios";

const API_URL = "https://esappsoccer-production.up.railway.app/api";

//---------------------------------------------------------------- GET AREA ID NOTIFICATION
export const traerNotificacionesArea = async (user: any) => {
  try {
    if (user) {
      const response = await fetch(
        `${API_URL}/notification/getAreaById/${user.areaIdArea}`
      );
      if (response.ok) {
        const result = await response.json();
        if (result && result.data) {
          return result.data;
        } else {
          console.error(
            "API: Error - No se recibieron datos de notificaciones en el formato esperado"
          );
          return [];
        }
      } else {
        console.error(
          `API: Error en la solicitud de notificaciones: ${response.statusText}`
        );
        return [];
      }
    }
  } catch (error) {
    console.error("API: Error al obtener notificaciones", error);
    return [];
  }
};

//---------------------------------------------------------------- POST NOTIFICATION
export async function insertarNotificacion(
  Message: string,
  IdUser: number,
  IdArea: number
): Promise<{ msg: string; success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/notification/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Message, IdUser, IdArea }),
    });
    if (!response.ok) {
      throw new Error("API: Error al insertar la notificación");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    console.error("API: Error al insertar la notificación", error);
    throw new Error(`API: Error al insertar la notificación: ${error}`);
  }
}

//---------------------------------------------------------------- GET LAST NOTIFICATION
export const getLastNotification = async () => {
  try {
    const response = await fetch(`${API_URL}/notification-all/getLast`);
    if (!response.ok) {
      throw new Error("API: Error al obtener la última notificación");
    }
    return await response.json();
  } catch (error) {
    console.error("API: Error al obtener la última notificación", error);
    return {
      success: false,
      msg: "API: Error al obtener la última notificación",
      error,
    };
  }
};

//---------------------------------------------------------------- POST NOTIFICATION LAST
export async function insertNotification(
  dateDay: any,
  time: any,
  message: any
) {
  try {
    await axios.post(`${API_URL}/notification-all/insert`, {
      DateDay: dateDay,
      Time: time,
      Message: message,
    });
  } catch (error) {
    console.error("API: Error al insertar la notificación", error);
  }
}

//---------------------------------------------------------------- DELETE NOTIFICATION
export const eliminarNotificacion = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/notification/${id}`);
    if (!response.data.success) {
      throw new Error("API: Error al eliminar la notificación");
    }
    return response.data;
  } catch (error) {
    console.error("API: Error al eliminar la notificación", error);
    throw new Error(`API: Error al eliminar la notificación: ${error}`);
  }
};

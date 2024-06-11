const API_URL = "https://esappsoccer.ccontrolz.com/api";
import axios from "axios";
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
            "Error: No se recibieron datos de notificaciones en el formato esperado"
          );
          return [];
        }
      } else {
        console.error(
          "Error en la solicitud de notificaciones:",
          response.statusText
        );
        return [];
      }
    }
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    return [];
  }
};

//---------------------------------------------------------------- POST .NOTIFICATION
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
      body: JSON.stringify({
        Message: Message,
        IdUser: IdUser,
        IdArea: IdArea,
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

//---------------------------------------------------------------- GET .NOTIFICATION LAST
export const getLastNotification = async () => {
  try {
    const response = await fetch(`${API_URL}/notification-all/getLast`);
    if (!response.ok) {
      throw new Error("Failed to fetch latest notification");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching latest notification:", error);
    return { success: false, msg: "Error fetching latest notification", error };
  }
};

//---------------------------------------------------------------- POST .NOTIFICATION LAST
export async function insertNotification(
  dateDay: any,
  time: any,
  message: any
) {
  try {
    const response = await axios.post(`${API_URL}/notification-all/insert`, {
      DateDay: dateDay,
      Time: time,
      Message: message,
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error al insertar notificación:", error);
  }
}

//---------------------------------------------------------------- DELETE NOTIFICATION
export const eliminarNotificacion = async (id: number) => {
  console.log("jola"+id)
  try {
    const response = await axios.delete(`${API_URL}/notification/${id}`);
    if (!response.data.success) {
      throw new Error("Error al eliminar la notificación");
    }
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la notificación:", error);
    throw error;
  }
};
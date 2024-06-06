const API_URL = "https://esappsoccer.ccontrolz.com/api";

//---------------------------------------------------------------- GET MANAGEMENT ID NOTIFICATION
export const fetchNotifications = async (user: any) => {
  try {
    if (user) {
      const response = await fetch(
        `${API_URL}/notification/getManagementById/${user.areaIdArea}`
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

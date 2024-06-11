import { Management } from "../types/Management";

const API_URL = "https://esappsoccer.ccontrolz.com/api";

//---------------------------------------------------------------- GET MANAGEMENT
export const fetchGerencias = async (): Promise<Management[]> => {
  try {
    const response = await fetch(`${API_URL}/management`);
    if (!response.ok) {
      throw new Error("API: Error al obtener los datos de gerencias");
    }
    const data = await response.json();
    if (data.success) {
      return data.data as Management[];
    } else {
      throw new Error(`API: ${data.msg || "Error fetching gerencias data."}`);
    }
  } catch (error) {
    console.error("API: Error al obtener los datos de gerencias:", error);
    throw new Error("API: Error fetching gerencias data.");
  }
};

//---------------------------------------------------------------- POST MANAGEMENT
export const crearGerencia = async (
  NameManagement: string
): Promise<{ success: boolean; msg: string }> => {
  try {
    const response = await fetch(`${API_URL}/management/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ NameManagement }),
    });
    if (!response.ok) {
      throw new Error("API: Error al crear la gerencia");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("API: Error al crear la gerencia:", error);
    throw new Error(`API: Error al crear la gerencia: ${error}`);
  }
};

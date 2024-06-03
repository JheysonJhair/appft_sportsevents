import { Management } from "../types/Management";
const API_URL = "http://esappsoccer.ccontrolz.com/api";

export const fetchGerencias = async (): Promise<Management[]> => {
  try {
    const response = await fetch(`${API_URL}/management`);
    const data = await response.json();
    if (data.success) {
      return data.data as Management[];
    } else {
      throw new Error("Error fetching gerencias data.");
    }
  } catch (error) {
    throw new Error("Error fetching gerencias data.");
  }
};

export const crearGerencia = async (
  NameManagement: string
): Promise<{ success: boolean; msg: string }> => {
  const response = await fetch(`${API_URL}/management/insert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ NameManagement }),
  });
  return response.json();
};

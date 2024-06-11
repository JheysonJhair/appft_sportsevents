import { Area } from "../types/Area";

const API_URL = "https://esappsoccer.ccontrolz.com/api";

//---------------------------------------------------------------- GET AREA MANAGEMNET ID
export async function fetchAreasByManagementId(gerenciaId: any) {
  const response = await fetch(
    `${API_URL}/area/getManagementById/${gerenciaId}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error("API: Error fetching areas data");
  }
  return data;
}

//---------------------------------------------------------------- GET AREA
export const fetchAreas = async (): Promise<Area[]> => {
  try {
    const response = await fetch(`${API_URL}/area`);
    const data = await response.json();
    if (data.success) {
      return data.data as Area[];
    } else {
      throw new Error("API: Error fetching gerencias data.");
    }
  } catch (error) {
    throw new Error("API: Error fetching gerencias data.");
  }
};

//---------------------------------------------------------------- POST AREA
export const crearArea = async (
  NameArea: string,
  IdManagement: number
): Promise<{ success: boolean; msg: string }> => {
  const response = await fetch(`${API_URL}/area/insert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ NameArea, IdManagement }),
  });
  return response.json();
};

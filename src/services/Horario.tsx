import { Field } from "../types/Field";

interface ApiResponse {
  msg: string;
  success: boolean;
  data: Field[];
}
const API_URL = "https://esappsoccer.ccontrolz.com/api";

//---------------------------------------------------------------- GET FIELD 1
export async function obtenerHorarioCancha1(): Promise<Field[]> {
  try {
    const response = await fetch(`${API_URL}/field1/GetAllTotal`);
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

//---------------------------------------------------------------- POST FIELD 1
export async function crearHorarioCancha1(
  horario: Partial<Field>
): Promise<{ msg: string; success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/field1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(horario),
    });
    if (!response.ok) {
      throw new Error("Error al crear el horario para la cancha 1");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al crear la cancha 1: " + error);
  }
}

//---------------------------------------------------------------- DELETE FIELD 1
export async function eliminarHorarioCancha1(
  horarioId: number
): Promise<{ IdArea: number; msg: string; success: boolean }> {
  try {
    const url = `${API_URL}/field1/${horarioId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar horario de la cancha 1");
    }
    const responseData: { IdArea: number; msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al eliminar el horario de la cancha 1 " + error);
  }
}

//---------------------------------------------------------------- GET FIELD 1 BY ID
export async function obtenerHorarioCancha1PorId(id: number): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/field1/getById/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }

    const responseData = await response.json();
    if (responseData.success) {
      return responseData.data;
    } else {
      throw new Error(responseData.msg);
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

//---------------------------------------------------------------- GET FIELD 2
export async function obtenerHorarioCancha2(): Promise<Field[]> {
  try {
    const response = await fetch(`${API_URL}/field2/GetAllTotal`);
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

//---------------------------------------------------------------- POST FIELD 2
export async function crearHorarioCancha2(
  horario: Partial<Field>
): Promise<{ msg: string; success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/field2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(horario),
    });
    if (!response.ok) {
      throw new Error("Error al crear el horario para la cancha 2");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al crear la cancha 2: " + error);
  }
}

//---------------------------------------------------------------- DELETE FIELD 2
export async function eliminarHorarioCancha2(
  IdField: number,
  Shift: string,
  Area: string,
  DateWeekendRange: string,
  Rol: number
): Promise<{ IdArea: number; msg: string; success: boolean }> {
  try {
    const url = `https://esappsoccer.ccontrolz.com/api/field2/deleteField`;
    const body = {
      IdField,
      Shift,
      Area,
      DateWeekendRange,
      Rol,
    };
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Error al eliminar horario de la cancha 2");
    }

    const responseData: { IdArea: number; msg: string; success: boolean } =
      await response.json();

    return responseData;
  } catch (error) {
    throw new Error("Error al eliminar el horario de la cancha 2 " + error);
  }
}

//---------------------------------------------------------------- GET FIELD 2 BY ID
export async function obtenerHorarioCancha2PorId(id: number): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/field2/getById/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }

    const responseData = await response.json();
    if (responseData.success) {
      return responseData.data;
    } else {
      throw new Error(responseData.msg);
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

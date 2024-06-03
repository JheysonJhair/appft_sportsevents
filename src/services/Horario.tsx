import { Field } from "../types/Field";

interface ApiResponse {
  msg: string;
  success: boolean;
  data: Field[];
}
//----------------------------------------------------------------CANCHA1
export async function obtenerHorarioCancha1(): Promise<Field[]> {
  try {
    const response = await fetch(
      "https://esappsoccer.ccontrolz.com/api/field1/GetAllTotal"
    );
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

export async function crearHorarioCancha1(
  horario: Partial<Field>
): Promise<{ msg: string; success: boolean }> {
  try {
    const response = await fetch(
      "https://esappsoccer.ccontrolz.com/api/field1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(horario),
      }
    );
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

export async function eliminarHorarioCancha1(horarioId: number): Promise<void> {
  try {
    const url = `https://esappsoccer.ccontrolz.com/api/field1/${horarioId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar horario de la cancha 1");
    }
  } catch (error) {
    throw new Error("Error al eliminar el horario de la cancha 1 " + error);
  }
}
//----------------------------------------------------------------CANCHA2

export async function obtenerHorarioCancha2(): Promise<Field[]> {
  try {
    const response = await fetch(
      "https://esappsoccer.ccontrolz.com/api/field2/GetAllTotal"
    );
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

export async function crearHorarioCancha2(
  horario: Partial<Field>
): Promise<{ msg: string; success: boolean }> {
  try {
    const response = await fetch(
      "https://esappsoccer.ccontrolz.com/api/field2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(horario),
      }
    );
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

export async function eliminarHorarioCancha2(horarioId: number): Promise<void> {
  try {
    const url = `https://esappsoccer.ccontrolz.com/api/field2/${horarioId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar eL horario de la cancha 2");
    }
  } catch (error) {
    throw new Error("Error al eliminar el horario de la cancha 2 " + error);
  }
}

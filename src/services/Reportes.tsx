import { ReportDay } from "../types/DayReport";

const API_URL = "https://esappsoccer.ccontrolz.com/api";

//---------------------------------------------------------------- GET REPORTS
export const fetchReports = async (): Promise<ReportDay[]> => {
  try {
    const response = await fetch(`${API_URL}/report`);
    if (!response.ok) {
      throw new Error("API: Error al obtener los reportes");
    }
    const data = await response.json();
    if (data.success) {
      return data.data as ReportDay[];
    } else {
      throw new Error(`API: ${data.msg}`);
    }
  } catch (error) {
    console.error("API: Error al obtener los reportes", error);
    throw new Error("API: Error al obtener los reportes");
  }
};

//---------------------------------------------------------------- POST REPORT
export async function crearReporte(
  reporte: Partial<ReportDay>
): Promise<{ msg: string; success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/report/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reporte),
    });
    if (!response.ok) {
      throw new Error("API: Error al crear el reporte");
    }
    const responseData: { msg: string; success: boolean } = await response.json();
    return responseData;
  } catch (error) {
    console.error("API: Error al crear el reporte", error);
    throw new Error(`API: Error al crear el reporte: ${error}`);
  }
}

///////////////////////////////////////////////////////////////////////////////////// REPORTS GRAPHICS

//================================================================ USER
export async function fetchUserData(startDate: string, endDate: string) {
  try {
    const requestBody = JSON.stringify({
      StartDate: startDate,
      EndDate: endDate,
    });

    const response = await fetch(`${API_URL}/user/GetUserByDateRange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error("API: Error al obtener los datos de usuario");
    }

    const responseData = await response.json();

    if (responseData.success) {
      return responseData.data;
    } else {
      throw new Error(`API: ${responseData.msg}`);
    }
  } catch (error) {
    console.error("API: Error al obtener los datos de usuario", error);
    throw new Error("API: Error al obtener los datos de usuario");
  }
}

//================================================================ FIELD 1
export async function fetchReservationData(startDate: string, endDate: string) {
  try {
    const requestBody = JSON.stringify({
      StartDate: startDate,
      EndDate: endDate,
    });

    const response = await fetch(`${API_URL}/field1/GetField1ByDateRange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error("API: Error al obtener los datos de reservación del campo 1");
    }

    const responseData = await response.json();

    if (responseData.success) {
      return responseData.data;
    } else {
      throw new Error(`API: ${responseData.msg}`);
    }
  } catch (error) {
    console.error("API: Error al obtener los datos de reservación del campo 1", error);
    throw new Error("API: Error al obtener los datos de reservación del campo 1");
  }
}

//================================================================ FIELD 2
export async function fetchChannel2Data(startDate: string, endDate: string) {
  try {
    const requestBody = JSON.stringify({
      StartDate: startDate,
      EndDate: endDate,
    });

    const response = await fetch(`${API_URL}/field2/GetField2ByDateRange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error("API: Error al obtener los datos de reservación del campo 2");
    }

    const responseData = await response.json();

    if (responseData.success) {
      return responseData.data;
    } else {
      throw new Error(`API: ${responseData.msg}`);
    }
  } catch (error) {
    console.error("API: Error al obtener los datos de reservación del campo 2", error);
    throw new Error("API: Error al obtener los datos de reservación del campo 2");
  }
}

//================================================================ INFORMES
export async function fetchAdministratorReports(
  startDate: string,
  endDate: string
) {
  try {
    const requestBody = JSON.stringify({
      StartDate: startDate,
      EndDate: endDate,
    });

    const response = await fetch(`${API_URL}/report/reporte/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error("API: Error al obtener los informes del administrador");
    }

    const responseData = await response.json();

    if (responseData.success) {
      return responseData.data;
    } else {
      throw new Error(`API: ${responseData.msg}`);
    }
  } catch (error) {
    console.error("API: Error al obtener los informes del administrador", error);
    throw new Error("API: Error al obtener los informes del administrador");
  }
}

//================================================================ NOTIFICATION
export async function fetchAdministratorReservations(
  startDate: string,
  endDate: string
) {
  try {
    const requestBody = JSON.stringify({
      StartDate: startDate,
      EndDate: endDate,
    });

    const response = await fetch(
      `${API_URL}/notification-all/ReportNotification/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );

    if (!response.ok) {
      throw new Error("API: Error al obtener las reservas del administrador");
    }

    const responseData = await response.json();

    if (responseData.success) {
      return responseData.data;
    } else {
      throw new Error(`API: ${responseData.msg}`);
    }
  } catch (error) {
    console.error("API: Error al obtener las reservas del administrador", error);
    throw new Error("API: Error al obtener las reservas del administrador");
  }
}

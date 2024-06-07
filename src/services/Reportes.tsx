import { ReportDay } from "../types/DayReport";

const API_URL = "https://esappsoccer.ccontrolz.com/api";
//---------------------------------------------------------------- GET REPORTS
export const fetchReports = async (): Promise<ReportDay[]> => {
  try {
    const response = await fetch(`${API_URL}/report`);
    const data = await response.json();
    if (data.success) {
      return data.data as ReportDay[];
    } else {
      throw new Error("Error fetching report data.");
    }
  } catch (error) {
    throw new Error("Error fetching report data.");
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
      throw new Error("Error al crear el reporte");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al crear el reporte: " + error);
  }
}

//================================================================ REPORTS GRAPHICS
export const fetchReservationsByDateRange = async (
  startDate: string,
  endDate: string
): Promise<ReportDay[]> => {
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

    const responseData = await response.json();

    if (response.ok && responseData.success) {
      return responseData.data as ReportDay[];
    } else {
      throw new Error("Error fetching reservation reports data.");
    }
  } catch (error) {
    throw new Error("Error fetching reservation reports data: " + error);
  }
};

import { DayReport } from "../types/DayReport";

export const fetchReports = async (): Promise<DayReport[]> => {
  try {
    const response = await fetch("http://esappsoccer.ccontrolz.com/api/report");
    const data = await response.json();
    if (data.success) {
      return data.data as DayReport[];
    } else {
      throw new Error("Error fetching report data.");
    }
  } catch (error) {
    throw new Error("Error fetching report data.");
  }
};

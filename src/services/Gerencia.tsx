import { Management } from "../types/Management";

export const fetchGerencias = async (): Promise<Management[]> => {
  try {
    const response = await fetch("http://esappsoccer.ccontrolz.com/api/management");
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

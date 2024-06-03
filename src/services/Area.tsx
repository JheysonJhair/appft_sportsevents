// En tu archivo services/Area.js

export async function fetchAreasByManagementId(gerenciaId:any) {
    const response = await fetch(`http://esappsoccer.ccontrolz.com/api/area/getManagementById/${gerenciaId}`);
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.msg || "Error fetching areas data");
    }
  
    return data;
  }
  
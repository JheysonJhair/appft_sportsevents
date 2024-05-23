import axios from 'axios';

interface WeatherResponse {
  list: {
    main: {
      temp: number;
    };
  }[];
}

export const getWeather = async (location: string): Promise<WeatherResponse> => {
  const API_KEY = 'bb97cd7b6645e62724e98782b850968e';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

  const response = await axios.get<WeatherResponse>(BASE_URL, {
    params: {
      q: location,
      units: 'metric',
      appid: API_KEY,
    },
  });
  return response.data;
};

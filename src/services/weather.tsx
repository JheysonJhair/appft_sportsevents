import axios from 'axios';

interface WeatherResponse {
  list: {
    main: {
      temp: number;
    };
  }[];
}

export const getWeather = async (location: string): Promise<WeatherResponse> => {
  const API_KEY = '7718d61b43ca0d9eed1d0054f1fa715d';
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

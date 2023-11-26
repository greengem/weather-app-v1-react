import mockWeatherData from './mockData';

const API_ENDPOINT_CURRENT = "https://api.weatherbit.io/v2.0/current";
const API_ENDPOINT_DAILY = "https://api.weatherbit.io/v2.0/forecast/daily";
const API_ENDPOINT_HOURLY = "https://api.weatherbit.io/v2.0/forecast/hourly";
const API_KEY = import.meta.env.VITE_WEATHERBIT_API_KEY;

interface Location {
  lat?: number;
  lon?: number;
  city?: string;
  state?: string;
  country?: string;
}

export const fetchCurrentWeatherData = async (location: Location) => {
    try {
        let endpoint = `${API_ENDPOINT_CURRENT}?key=${API_KEY}`;

        if (location.lat && location.lon) {
            endpoint += `&lat=${location.lat}&lon=${location.lon}`;
        } else if (location.city) {
            endpoint += `&city=${location.city}`;
            if (location.state) endpoint += `,${location.state}`;
            if (location.country) endpoint += `&country=${location.country}`;
        }

        const response = await fetch(endpoint);

        if (response.status === 429 || !response.ok) {
            return { data: mockWeatherData.current, isMock: true };
        }
        return { data: await response.json(), isMock: false };

    } catch {
        return { data: mockWeatherData.current, isMock: true };
    }
};

export const fetchDailyForecast = async (location: Location, days: number = 10) => {
    try {
        let endpoint = `${API_ENDPOINT_DAILY}?key=${API_KEY}&days=${days}`;

        if (location.lat && location.lon) {
            endpoint += `&lat=${location.lat}&lon=${location.lon}`;
        } else if (location.city) {
            endpoint += `&city=${location.city}`;
            if (location.state) endpoint += `,${location.state}`;
            if (location.country) endpoint += `&country=${location.country}`;
        }

        const response = await fetch(endpoint);

        if (response.status === 429 || !response.ok) {
            return { data: mockWeatherData.daily, isMock: true };
        }
        return { data: await response.json(), isMock: false };

    } catch {
        return { data: mockWeatherData.daily, isMock: true };
    }
};

export const fetchHourlyForecast = async (location: Location) => {
    try {
        let endpoint = `${API_ENDPOINT_HOURLY}?key=${API_KEY}&hours=24`;

        console.log(`Requesting hourly forecast data from endpoint: ${endpoint}`);
        
        if (location.lat && location.lon) {
            endpoint += `&lat=${location.lat}&lon=${location.lon}`;
        } else if (location.city) {
            endpoint += `&city=${location.city}`;
            if (location.state) endpoint += `,${location.state}`;
            if (location.country) endpoint += `&country=${location.country}`;
        }

        const response = await fetch(endpoint);
        const result = await response.json();

        if (response.status === 429 || !response.ok) {
            console.error(`API request failed with status: ${response.status}`);
            console.error(`Error details: ${JSON.stringify(result)}`);
            return { data: mockWeatherData.hourly, isMock: true };
        }
        return { data: result, isMock: false };

    } catch (error) {
        console.error(`An exception occurred: ${error}`);
        return { data: mockWeatherData.hourly, isMock: true };
    }
};

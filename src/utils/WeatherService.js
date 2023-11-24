import mockWeatherData from './mockData';

const API_ENDPOINT_CURRENT = "https://api.weatherbit.io/v2.0/current";
const API_ENDPOINT_DAILY = "https://api.weatherbit.io/v2.0/forecast/daily";
const API_KEY = import.meta.env.VITE_WEATHERBIT_API_KEY;

export const fetchCurrentWeatherData = async (location) => {
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

        if (response.status === 429) return mockWeatherData.current;
        if (!response.ok) throw new Error();
        return await response.json();

    } catch {
        return mockWeatherData.current;
    }
};

export const fetchDailyForecast = async (location, days=7) => {
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

        if (response.status === 429) return mockWeatherData.daily;
        if (!response.ok) throw new Error();
        return await response.json();

    } catch {
        return mockWeatherData.daily;
    }
};

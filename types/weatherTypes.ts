export interface WeatherData {
    current: CurrentWeatherData | null;
    forecast: ForecastData[] | null;
    hourly: HourlyForecastData[] | null;
    usingMockData: boolean;
}

export interface HourlyForecastData {
    time: string;
    temp: number;
  }
  
  
export interface CurrentWeatherData {
    city_name: string;
    country_code: string;
    temp: number;
    app_temp: number;
    precip: number;
    pres: number;
    uv: number;
    rh: number;
    vis: number;
    aqi: number;
    wind_spd: number;
    wind_cdir?: string;
    wind_dir: number;
    sunrise: string;
    sunset: string;
}

export interface ForecastData {
    valid_date: string;
    wind_spd: number;
    wind_dir: number;
    temp: number;
    max_temp: number;
    min_temp: number;
    high_temp: number;
    low_temp: number;
    app_max_temp: number;
    app_min_temp: number;
    pop: number;
    precip: number;
    snow: number;
    snow_depth: number;
    slp: number;
    pres: number;
    dewpt: number;
    rh: number;
    weather: {
      icon: string;
      code: string;
      description: string;
    };
    clouds_low: number;
    clouds_mid: number;
    clouds_hi: number;
    clouds: number;
    vis: number;
    max_dhi: number;
    uv: number;
    moon_phase: number;
    moon_phase_lunation: number;
    moonrise_ts: number;
    moonset_ts: number;
    sunrise_ts: number;
    sunset_ts: number;
}

type AirPollutionProps = {
    aqi: number;
};

export default function AirPollution({ aqi }: AirPollutionProps) {
    const getAirQualityLevel = (aqi: number) => {
        if (aqi <= 50) return 'Good';
        if (aqi <= 100) return 'Moderate';
        if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
        if (aqi <= 200) return 'Unhealthy';
        if (aqi <= 300) return 'Very Unhealthy';
        return 'Hazardous';
    };

    return (
        <p className='text-xl'>{aqi} - {getAirQualityLevel(aqi)}</p>
    );
}

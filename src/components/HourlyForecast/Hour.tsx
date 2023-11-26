interface HourProps {
    hour: HourData;
}

interface HourData {
    timestamp_local: string;
    temp: number;
    weather: {
        icon: string;
    };
}

const Hour: React.FC<HourProps> = ({ hour }) => {
    return(
        <div className="flex flex-col items-center space-y-4 font-semibold">
            <div>{new Date(hour.timestamp_local).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div>
                <img src={`https://cdn.weatherbit.io/static/img/icons/${hour.weather.icon}.png`} alt="Weather Icon" className='w-5 h-5' />
            </div>
            <div>{hour.temp}°C</div>
        </div>
    )
}

export default Hour;
interface HourProps {
    hour: HourData;
}

interface HourData {
    time: string;
    temp: number;
}

const Hour: React.FC<HourProps> = ({ hour }) => {
    return(
        <div className="text-center font-semibold space-y-5">
            <div>{hour.time}</div>
            <div>Icon</div>
            <div>{hour.temp}</div>
        </div>
    )
}

export default Hour;
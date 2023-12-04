import React from 'react';
import WindArrow from './WindArrow';


function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
}

function formatDayAndMonth(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}`;
}

function getBackgroundColor(percentage) {
    if (percentage <= 10) return 'bg-green-500';
    if (percentage <= 50) return 'bg-yellow-500';
    return 'bg-red-500';
}

function Day({ day, isFirst }) {
    const decimalPrecip = day.precip;
    const percentagePrecip = Math.round(decimalPrecip * 100);
    const bgColorClass = getBackgroundColor(percentagePrecip); // Get the appropriate background color

    return (
        <div className={`flex-grow flex-shrink max-w-28 py-10 rounded-large text-sm text-center ${isFirst ? 'bg-gradient-to-b from-custom-start to-custom-end active shadow-2xl' : ''}`}>
            <div className='day-name mb-1 font-bold text-white'>
                {isFirst ? 'Today' : getDayOfWeek(day.valid_date)}
            </div>
            <div className={`day-date mb-5 ${isFirst ? 'text-white' : 'text-gray-400'}`}>
                {formatDayAndMonth(day.valid_date)}
            </div>
            <img src={`https://cdn.weatherbit.io/static/img/icons/${day.weather.icon}.png`} alt="Weather Icon" className='day-image mb-6 h-auto inline' />
            <div className={`day-maxtemp mb-30 ${isFirst ? 'text-white' : 'text-gray-400'}`}>{day.max_temp}°C</div>
            <div className={`day-mintemp mb-5 ${isFirst ? 'text-white' : 'text-gray-400'}`}>{day.min_temp}°C</div>
            <div className='text-gray-400 mb-4'><WindArrow direction={day.wind_dir} /> {day.wind_spd} m/s</div>
            <div className={`${bgColorClass} text-white rounded-full inline items-center justify-center py-1 px-3 shadow-xl`}>
                {percentagePrecip}%
            </div>
        </div>
    );
}

export default Day;

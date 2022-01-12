import React from "react";
import moment from 'moment-timezone';

export const WeatherData = ({data, address}) => {

    const d = new Date();
        let date = d.toString().split(' ').splice(0,3).join(' ');

        let time = new Date().toLocaleString('en-US',{hour:'numeric',minute:'numeric'});

        

        const deg = data.current.wind_deg;
        const points = [ 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW' ];
        const windDir = points[Math.round(deg / 45) % 8];
        const wind = (data.current.wind_speed).toFixed();
        const gust = (wind * 1.5).toFixed();
    //     const gust = () => {if (data.current.wind_gust === 'undefined') {
    //          ;  
    //     } else {
    //         (data.current.wind_gust).toFixed();
    //     }
    // }
    function refreshPage() {
        window.location.reload(false);
      }
    // const parentRef = useRef();

        // const gusts = (gust).toFixed() + ' mph';

        function switchImage(condition) {
            const image = {
                '01d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699118/icons/smallSunShadow_wh9eed.png',
                '01n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699145/icons/smallMoonShadow_yc5vom.png',
                '02d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641971374/icons/imageFewClouds_gz2nuy.png',
                '02n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641971377/icons/imageFewCloudsNight_pvdbtj.png',
                '03d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699093/icons/smallPartlyCloudyShadow_egwyl7.png',
                '03n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699078/icons/smallPartlyCloudyNightShadow_xalsjo.png',
                '04d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699849/icons/smallCloudyShadow_krernp.png',
                '04n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699849/icons/smallCloudyShadow_krernp.png',
                '09d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699091/icons/smallPartlyCloudyRainShadow_wglhla.png',
                '09n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699087/icons/smallPartlyCloudyNightShowerShadow_acdvma.png',
                '10d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699104/icons/smallRainShadow_wbuqyd.png',
                '10n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699104/icons/smallRainShadow_wbuqyd.png',
                '11d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699181/icons/lightningStorm_qasj5h.png',
                '11n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699181/icons/lightningStorm_qasj5h.png',
                '13d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699116/icons/smallSnowShadow_cxqhox.png',
                '13n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699116/icons/smallSnowShadow_cxqhox.png',
                '50d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641700135/icons/smallFogShadow_pcosu5.png',
                '50n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641700135/icons/smallFogShadow_pcosu5.png',
                'default': 'no image'
            }
            return image[condition] 
        }

    const condition = (data.current.weather[0].icon);

    return (
        <div>
            {data.alerts ?
                <div>
                    <div>
                        {data.alerts[0].description}
                    </div>
                </div> : 
                ''
            }
            
            <div className='currently'>
                <div className='locale'>
                    <p onClick={refreshPage}>{address}</p>
                    <p className='dateTime'>{date},&nbsp;{time}</p>
                </div>
                
                <div className='innerTop'>
                    <p><span>{(data.current.temp).toFixed()}&deg;</span></p>
                    <img src={switchImage(condition)} style={{height: '120px', width: '120px'}} alt='weather icon'/>
                    
                </div>
                <div className='wind'>Wind: <span>{windDir}&nbsp;{wind}</span> mph Gusts: <span>{gust}</span> mph</div>
                
                <div className='innerCurrent'>
                    
                    <p>RH: <span>{data.current.humidity}</span> %</p>
                    <p>Press: <span>{data.current.pressure}</span> mb</p>
                </div>
                <div className='innerCurrent'>
                    <p>Td: <span>{(data.current.dew_point).toFixed()}&deg;</span></p>
                    <p> <span>{data.current.weather[0].description}</span></p>
                </div>
            </div>

            <hr/>
        
            <div className='hourly'>
            {data.hourly.map(hour => {
                 const deg = hour.wind_deg;
                 const points = [ 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW' ];
                 const windDir = points[Math.round(deg / 45) % 8];
                 const wind = (hour.wind_speed).toFixed();
                 const gusts = (wind * 1.5).toFixed();
                //  const wind = windDir + ' at ' + gusts;

                 const condition = (hour.weather[0].icon);
                
                return (
                    <div className='hour'>
                        <p>{moment.unix(hour.dt).tz(data.timezone).format('h a')}</p>
                        <p><span>{(hour.temp).toFixed()}&deg;</span></p>
                        <p><span>{(hour.dew_point).toFixed()}&deg;</span></p>
                        <p style={{display: 'flex', flexDirection: 'row'}}><span>{(hour.pressure).toFixed()}</span>&nbsp;mb</p>
                        <p><span>{windDir}&nbsp;{gusts}</span>&nbsp;mph</p>
                        <img src={switchImage(condition)}  style={{height: '40px', width: '40px'}} alt='hourly icon'/>
                    </div>
                )
            })}
            </div>

            <hr/>

            <div className='daily'>
            {data.daily.map(day => {
                const condition = (day.weather[0].icon);
                return (
                    <div className= {
                        (day.weather[0].icon === '02d') ? 'day cloudy' : 
                        (day.weather[0].icon === '03d') ? 'day cloudy' :
                        (day.weather[0].icon === '04d') ? 'day cloudy' :
                        (day.weather[0].icon === '02n') ? 'day cloudyNight' :
                        (day.weather[0].icon === '03n') ? 'day cloudyNight' :
                        (day.weather[0].icon === '04n') ? 'day cloudyNight' :
                        (day.weather[0].icon === '01d') ? 'day clear' : 
                        (day.weather[0].icon === '01n') ? 'day clearNight' : 
                        (day.weather[0].main === 'Snow') ? 'day snow' : 
                        (day.weather[0].main === 'Rain') ? 'day rain' : 
                        (day.weather[0].main === 'Thunderstorm') ? 'day thunderstorm' : 'day clear'
                      }>
                        {/* <div className='day'> */}
                            <p>{moment.unix(day.dt).tz(data.timezone).format('ddd')}</p>
                            <p>Hi:&nbsp;<span>{(day.temp.max).toFixed()}&deg;</span></p> 
                            <p>Lo:&nbsp;<span>{(day.temp.min).toFixed()}&deg;</span></p>
                            <p>Pre:&nbsp;<span>{((day.pop)*100).toFixed()}&nbsp;%</span></p> 
                            <img src={switchImage(condition)}  style={{height: '50px', width: '50px'}} alt='hourly icon'/>
                        {/* </div> */}
                    </div>
                )
            })}
            </div>
        </div>
    );
};

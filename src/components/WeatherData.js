import React from "react";
import moment from 'moment-timezone';

export const WeatherData = ({data, address}) => {

    const d = new Date();
        let date = d.toString().split(' ').splice(0,3).join(' ');

        let time = new Date().toLocaleString('en-US',{hour:'numeric',minute:'numeric'});

        const deg = data.current.wind_deg;
                    const points = [ 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW' ];
                    const windDir = points[Math.round(deg / 45) % 8];
                    const wind = windDir + ' ' + (data.current.wind_speed).toFixed() + ' mph';
                    const gusts = (data.current.wind_gust).toFixed() + ' mph';

    const condition = (data.current.weather[0].icon);

    function switchImage(condition) {
        const image = {
            '01d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699118/icons/smallSunShadow_wh9eed.png',
            '01n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699145/icons/smallMoonShadow_yc5vom.png',
            '02d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699681/icons/smallFewCloudsShadow_pigd0c.png',
            '02n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699685/icons/smallFewCloudsMoonShadow_zqmhdy.png',
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
                    <p>{address}</p>
                    <p className='dateTime'>{date},&nbsp;{time}</p>
                </div>
                
                <div className='innerTop'>
                    <p>{(data.current.temp).toFixed()}&deg;</p>
                    <img src={switchImage(condition)} style={{height: '120px', width: '120px'}} alt='weather icon'/>
                    
                </div>
                <p className='wind'>Wind:&nbsp;{wind}&nbsp;Gusts:&nbsp;{gusts}</p>
                <div className='innerCurrent'>
                    
                    <p>RH: {data.current.humidity} %</p>
                    <p>Press:{data.current.pressure} mb</p>
                </div>
                <div className='innerCurrent'>
                    <p>Td: {(data.current.dew_point).toFixed()}&deg;</p>
                    <p> {data.current.weather[0].description}</p>
                </div>
                
                
            </div>

            <hr/>
        
            <div className='hourly'>
            {data.hourly.map(hour => {
                 const deg = hour.wind_deg;
                 const points = [ 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW' ];
                 const windDir = points[Math.round(deg / 45) % 8];
                 const gusts = (hour.wind_gust).toFixed() + ' mph';
                //  const wind = windDir + ' at ' + gusts;

                 const condition = (hour.weather[0].icon);
                function switchImage(condition) {
                    const image = {
                        '01d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699118/icons/smallSunShadow_wh9eed.png',
                        '01n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699145/icons/smallMoonShadow_yc5vom.png',
                        '02d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699681/icons/smallFewCloudsShadow_pigd0c.png',
                        '02n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699685/icons/smallFewCloudsMoonShadow_zqmhdy.png',
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
                return (
                    <div className='hour'>
                        <p>{moment.unix(hour.dt).tz(data.timezone).format('h a')}</p>
                        <p>{(hour.temp).toFixed()}&deg;</p>
                        <p>{(hour.dew_point).toFixed()}&deg;</p>
                        <p style={{display: 'flex', flexDirection: 'row'}}>{(hour.pressure).toFixed()} <span>&nbsp;mb</span></p>
                        <p>{windDir}&nbsp;{gusts}</p>
                        <img src={switchImage(condition)}  style={{height: '40px', width: '40px'}} alt='hourly icon'/>
                    </div>
                )
            })}
            </div>

            <hr/>

            <div className='daily'>
            {data.daily.map(day => {
                const condition = (day.weather[0].icon);
                function switchImage(condition) {
                    const image = {
                        '01d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699118/icons/smallSunShadow_wh9eed.png',
                        '01n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699145/icons/smallMoonShadow_yc5vom.png',
                        '02d': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699681/icons/smallFewCloudsShadow_pigd0c.png',
                        '02n': 'https://res.cloudinary.com/jjdonnel/image/upload/v1641699685/icons/smallFewCloudsMoonShadow_zqmhdy.png',
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
                return (
                    <div className='day'>
                        <p>{moment.unix(day.dt).tz(data.timezone).format('ddd')}</p>
                        <p>Hi:&nbsp;{(day.temp.max).toFixed()}&deg;</p> 
                        <p>Lo:&nbsp;{(day.temp.min).toFixed()}&deg;</p>
                        <p>Pre:&nbsp;{((day.pop)*100).toFixed()}&nbsp;%</p> 
                        <img src={switchImage(condition)}  style={{height: '50px', width: '50px'}} alt='hourly icon'/>
                    </div>
                )
            })}
            </div>
        </div>
    );
};

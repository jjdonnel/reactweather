import {React, useState, useRef } from "react";
import moment from 'moment-timezone';

export const WeatherData = ({data, address, lat, long}) => {

    const d = new Date();
        let date = d.toString().split(' ').splice(0,3).join(' ');
        let time = new Date().toLocaleString('en-US',{hour:'numeric',minute:'numeric'});

        const deg = data.current.wind_deg;
        const points = [ 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW' ];
        const windDir = points[Math.round(deg / 45) % 8];
        const wind = (data.current.wind_speed).toFixed();
        const gust = (wind * 1.5).toFixed();

    function refreshPage() {
        window.location.reload(false);
      }

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

    const [alert, setAlert] = useState(false);

    // function showAlert() {
        
    //     setStyle('alert');

    // }
    function switchPre(text) {
        const pre = {
            'Rain': 'Rain',
            'Snow': 'Snow',
            'Clouds': 'Pre',
            'Clear': 'Pre',
            'Thunderstorm': 'Tstorm',
            'Drizzle': 'Drizzle',
            'Mist': 'Mist'

        }
        return pre[text]
    }
    
    // const getCityData = async () => {
    // let inputAddress =  React.createRef();
    // const H = window.H;
    //     var platform = new H.service.Platform({
    //       "apikey": atHereApi
    //       });
    //     var geocoder = platform.getSearchService();
    //                 geocoder.geocode(
    //                     {
    //                       q: inputAddress.current.value
    //                     }, loc => {
    //                         console.log(loc);
    //                         showAddress(loc);
    //                     }, error => {
    //                         console.error(error);
    //                     }
                
    //             );

    //       await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`)
    //       .then(response => response.data)
    //       .then(result => {
    //         setWeather(result);
    //         console.log(result);
    //       });
    // }
    
    
    const infoRef = useRef();
    const currentRef = useRef();

    const [ isToggled, setIsToggled ] = useState(false);
    const [ isExpanded, setIsExpanded ] = useState(false);

    return (
        <div>    
            <div className='locale'>
                    {/* <form onSubmit={getCityData}>
                        <input type='text' placeholder={address}/>
                    </form> */}
                    <p>{address}</p>
                    <p className='dateTime'>{date},&nbsp;{time}</p>
                </div>

                {data.alerts ?
                <div>
                    <div className='alertName' onClick={() => setAlert(!alert)}>
                        {data.alerts[0].event}
                    </div>
                    <div className='alert' ref={infoRef} 
                        style={ alert ? {height: infoRef.current.scrollHeight + 'px'} : {height: '0px'}}>
                            {data.alerts[0].description}
                        <hr/>
                    </div>
                </div> :
                ''
            }
            <button className='radarButton' onClick={(e) => setIsToggled(!isToggled)}>radar</button>
            
            <div className='currently' ref={currentRef} onClick={(e) => setIsExpanded(!isExpanded)}
                style={isExpanded ? {height: currentRef.current.scrollHeight + 'px', overflow: 'hidden'} : {height: '35vh', overflow: 'hidden'}}>
                <button className='reloadButton' onClick={refreshPage}>reload</button>
                
                <div className='innerTop'>
                    <p><span>{(data.current.temp).toFixed()}&deg;</span></p>
                    <img src={switchImage(condition)} style={{height: '9rem', width: '9rem'}} alt='weather icon'/>
                    
                </div>
                <p style={{textAlign: 'center', fontSize: '2.5rem'}}>{data.current.weather[0].description}</p>
                <div className='wind'>Wind: <span>{windDir}&nbsp;{wind}</span> mph Gusts: <span>{data.current.wind_gust ? (data.current.wind_gust).toFixed() : gust}</span> mph</div>
               
                <br/>
                <div className='innerCurrent'>
                    <p>Dew Point: <span>{(data.current.dew_point).toFixed()}&deg;</span></p>
                    <p>Feels Like: <span>{(data.current.feels_like).toFixed()}&deg;</span></p>
                    <p>RH: <span>{data.current.humidity}</span> %</p>
                    <p>Pressure: <span>{data.current.pressure}</span> mb</p>
                    <p>Visibility: <span>{(data.current.visibility/5280).toFixed()}</span> mi</p>
                    <p>Sunrise: <span>{moment.unix(data.current.sunrise).tz(data.timezone).format('h:mm a')}</span></p>
                    <p>Sunset: <span>{moment.unix(data.current.sunset).tz(data.timezone).format('h:mm a')}</span></p>
                </div>
            </div>

            <hr/>

            <div className='radar' ref={infoRef} style={isToggled ? {height: infoRef.current.scrollHeight + 'px', overflow: 'hidden'} : {height: '0px', overflow: 'hidden'}}>
                    <iframe src={`https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=${lat}&lon=${long}&zoom=5`} title='radarImagery' name='radar'style={{height: '55vh', width: '148%'}}/>
                </div>
        
            <div className='hourly'>
            {data.hourly.map(hour => {
                 const deg = hour.wind_deg;
                 const points = [ 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW' ];
                 const windDir = points[Math.round(deg / 45) % 8];
                 const wind = (hour.wind_speed).toFixed();
                 const gusts = (wind * 1.5).toFixed();
                 const condition = (hour.weather[0].icon);
                
                return (
                    <div className='hour'>
                        <p>{moment.unix(hour.dt).tz(data.timezone).format('h a')}</p>
                        <p className='hourTemp'><span>{(hour.temp).toFixed()}&deg;</span></p>
                        <img src={switchImage(condition)}  style={{height: '4rem', width: '4rem'}} alt='hourly icon'/>
                        <br/>
                        <p><span>{windDir}&nbsp;{gusts}</span>&nbsp;mph</p>
                        <p><span>{(hour.dew_point).toFixed()}&deg;</span>&nbsp;dew</p>
                        <p style={{display: 'flex', flexDirection: 'row'}}><span>{(hour.pressure).toFixed()}</span>&nbsp;mb</p>
                        
                        </div>
                )
            })}
            </div>

            <hr/>

            <div className='daily'>
            {data.daily.map(day => {
                const condition = (day.weather[0].icon);
                const text = (day.weather[0].main);
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
                        <p style={{whiteSpace: 'nowrap', textAlign: 'center'}}>{moment.unix(day.dt).tz(data.timezone).format('ddd M/D')}</p>
                        <img className='dailyImage' src={switchImage(condition)}  style={{height: '50px', width: '50px', textAlign: 'center'}} alt='hourly icon'/>
                        <p>Hi:&nbsp;<span>{(day.temp.max).toFixed()}&deg;</span></p> 
                        <p>Lo:&nbsp;<span>{(day.temp.min).toFixed()}&deg;</span></p>
                        <p style={{width: '5rem'}}>{switchPre(text)}:&nbsp;<span>{((day.pop)*100).toFixed()}&nbsp;%</span></p> 
                        
                    </div>
                )
            })}
            </div>
            
        </div>
    );
};

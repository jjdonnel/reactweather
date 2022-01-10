import React from "react";

const Form = (props) => {
    return (
        <form onSubmit = {props.loadWeather}>
            <input type='text' name='city' placeholder='Choose City'/>  
            <input type='text' name='country' placeholder='Choose Country'/>  
            <button>Get Weather</button>
        </form>
    )

}

export default Form;
import React,{useState} from 'react';
import {useStateValue} from '../stateManager';
import '../Login/style.css'

const Login = () => {
    const [state,setState] = useState({
        username:'',
        password:'',
        background:'four'
    })

    const [value, dispatch] = useStateValue();

    const handleChange = (e) => {
        setState({...state,
            [e.target.name]:e.target.value
        })
    }

    const signin = () => {
        var data = {
            username:state.username,
            password:state.password
        }
        fetch('http://emessengerapi.azurewebsites.net/api/signin',{
            method:"POST",
            body:JSON.stringify(data),
            mode:'no-cors',
            headers:{'Content-Type':'application/json'} 
        }).then((res) => {
            return res.json()
        }).then((res) => {
            console.log()
            if(res.status === 'success'){
               window.location = res.location + "/" + res.session
            }
        })
    }
    
    return (
        <div className={`login-container ${state.background}`}>
            <div className="loginForm">
                <h3 className="loginTitle">Messenger</h3>
                <div className="form-group">
                    <div className="username-group">
                        <input name="username" type="text" placeholder='username' svalue={state.username} onChange={handleChange}/>
                    </div>
                    <div className="password-group">
                        <input name="password" type="password" placeholder="password" value={state.password} onChange={handleChange}/>
                    </div>
                    <div className="login-button">
                        <button className="btn login-btn" onClick={() => signin()}>Login.</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
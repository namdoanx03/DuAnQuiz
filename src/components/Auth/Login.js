import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../services/apiService'
import { toast } from 'react-toastify';

const Login = (props) => {

    const navigate = useNavigate()

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const handleLogin = async() =>{
        //validate

        //submit api
        let data = await postLogin(email, password)
        console.log('check--', data, +data.EC, data.EM)
        if (data && +data.EC === 0) {
            toast.success(data.EM)
            navigate("/")
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM)
        }

    }

    return(
        <div className="login-container">
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                Namdoanx
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, Who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type={"email"} className='form-control' 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type={"password"} className='form-control' 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button className='btn-submit'
                        onClick={() => handleLogin()}
                    >Login to Namdoanx</button>
                </div>
                <div className= 'text-center'>
                    <span className="back" onClick={() => {navigate("/")}}> &#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}
export default Login
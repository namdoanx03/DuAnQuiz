import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postRegister } from '../services/apiService'
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Register.scss'
import Language from '../Header/Language';

const Register = (props) => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const [isShowPassword, setIsShowPassword] = useState(false)

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    const handleRegister = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("invalid Email")
            return
        }
        if (!password) {
            toast.error("invalid Password")
            return
        }

        //submit api
        let data = await postRegister(email, password, username)
        if (data && +data.EC === 0) {
            toast.success(data.EM)
            navigate("/login")
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM)
        }

    }
    return (
        <div className="register-container">
            <div className='header'>
                <span>Already have an account?</span>
                <button onClick={() => { navigate("/login") }}>Sign in</button>
                <Language/>
            </div>
            <div className='title col-4 mx-auto'>
                Namdoanx
            </div>
            <div className='welcome col-4 mx-auto'>
                Start your journey ?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email(*)</label>
                    <input type={"email"} className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group pass-group'>
                    <label>Password(*)</label>
                    <input type={isShowPassword ? "text" : "password"} className='form-control' 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {isShowPassword ? 
                        <span className ="icons-eye" onClick={() => setIsShowPassword(false)}><FaEye />
                        </span>
                        :
                        <span className="icons-eye" onClick={() => setIsShowPassword(true)}><FaEyeSlash />
                        </span>
                        
                    }
 
                </div>
                <div className='form-group'>
                    <label>Username</label>
                    <input type={"text"} className='form-control'
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <button className='btn-submit'
                        onClick={() => handleRegister()}
                    >Create my free account</button>
                </div>
                <div className='text-center'>
                    <span className="back" onClick={() => { navigate("/login") }}> &#60;&#60; Go to Login</span>
                </div>
            </div>
        </div>
    )
}
export default Register
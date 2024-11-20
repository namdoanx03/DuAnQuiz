import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postLogOut } from '../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';

const Header = ()=>  {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    console.log("check", account)
    const dispatch = useDispatch()
    // console.log("check account", account)

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    }
    const handleRegister = () => {
        navigate("/register");
    }
    const handleLogOut = async() => {
        let res = await postLogOut("account.email", account.refresh_token)
        if(res && res.EC === 0){
            // clear data redux
            dispatch(doLogout())
            navigate("/login");
        }else{
            toast.error(res.EM)
        }
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className='navbar-brand'>Namdoanx</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/users" className='nav-link'>User</NavLink>
                        <NavLink to="/admin" className='nav-link'>Admin</NavLink>
                        
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ? 
                        <>
                            <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                            <button className='btn-signup' onClick={() => handleRegister()}>Sign up</button>
                        </>
                        :
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogOut()}>Log out</NavDropdown.Item>
                        </NavDropdown>
                        }
                        <Language/>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
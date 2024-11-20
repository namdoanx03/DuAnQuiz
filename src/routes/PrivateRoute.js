import { useSelector } from "react-redux" // trich xuat data trong redex
import { Navigate } from "react-router-dom"

const PrivateRoute = (props) =>{
    // console.log("check props", props)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    if(!isAuthenticated){
        return <Navigate to ="/login"></Navigate> //redirect
    }
    return (
        <div>
            {props.children}
        </div>
    )
}
export default PrivateRoute
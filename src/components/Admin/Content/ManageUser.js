import ModalCreateUser from "./ModalCreateUser"
import  './ManageUser.scss'
import { FcPlus } from "react-icons/fc"
import TableUser from "./TableUser"
import { useEffect, useState } from "react"
import { getAllUser } from "../../services/apiService"
import ModalUpdateUser from "./ModalUpdateUser"

const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})

    const [listUsers, setListUsers] = useState([])

    //componentDidmount
    useEffect(() => {
        fetchListUsers()
    }, [])
    // get list user
    const fetchListUsers = async () => {
        let res = await getAllUser()
        console.log(res)
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true)
        setDataUpdate(user)
        // console.log("check--",user)
    }

    return (
        <div className="manage-user-container">
            <div className="title" >
                Manage User 
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() =>  setShowModalCreateUser(true)}>
                        <FcPlus /> Add new user</button>
                </div>
                <div className="table-users-container">
                    <TableUser listUsers={listUsers}
                    handleClickBtnUpdate = {handleClickBtnUpdate}
                    />
                </div>
                <ModalCreateUser 
                    show={showModalCreateUser}
                    setShow = {setShowModalCreateUser}
                    fetchListUsers = {fetchListUsers}
                />
                <ModalUpdateUser
                    show = {showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate = {dataUpdate}
                />
            </div>
        </div>
    )
}
export default ManageUser
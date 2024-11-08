import ModalCreateUser from "./ModalCreateUser"
import  './ManageUser.scss'
import { FcPlus } from "react-icons/fc"
import TableUser from "./TableUser"
import { useEffect, useState } from "react"
import { getAllUser, getUserWithPaginate } from "../../services/apiService"
import ModalUpdateUser from "./ModalUpdateUser"
import ModalViewUser from "./ModalViewUser"
import ModalDeleteUser from "./ModalDeleteUser"

const ManageUser = (props) => {
    const LIMIT_USER = 6
    const[pageCount, setPageCount] = useState(0)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})
    const [dataDelete, setDataDelete] = useState({})

    const [listUsers, setListUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    //componentDidmount
    useEffect(() => {
        // fetchListUsers()
        fetchListUsersWithPaginate(1)
    }, [])
    // get list user
    const fetchListUsers = async () => {
        let res = await getAllUser()
        console.log(res)
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }
    const fetchListUsersWithPaginate = async (page) => { //get nguoi dung theo kieu phan trang
        let res = await getUserWithPaginate(page, LIMIT_USER)
        if (res.EC === 0) {
            // console.log("check res-dt", res.DT)
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true)
        setDataUpdate(user)
        // console.log("check--",user)
    }
    const resetUpdateData = () => {
        setDataUpdate({})
    }
    const handleClickBtnView = (user) => {
        setShowModalViewUser(true)
        setDataUpdate(user)
    } 
    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true)
        setDataDelete(user)
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
                    <TableUser 
                    listUsers={listUsers}
                    handleClickBtnView={handleClickBtnView}
                    handleClickBtnUpdate = {handleClickBtnUpdate}
                    handleClickBtnDelete={handleClickBtnDelete}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    />
                    
                </div>
                <ModalCreateUser 
                    show={showModalCreateUser}
                    setShow = {setShowModalCreateUser}
                    fetchListUsers = {fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show = {showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate = {dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataUpdate={dataUpdate}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete = {dataDelete}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}
export default ManageUser
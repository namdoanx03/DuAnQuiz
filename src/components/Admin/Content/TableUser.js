import { useState } from "react"


const TableUser = (props) => {

    const {listUsers} =props

    
    return (
        <>
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0  &&
                    listUsers.map((item, index) => {
                        return (
                            <tr key={`table-user-${index}`}>    
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button className="btn btn-success">View</button>
                                    <button className="btn btn-danger mx-3">Delete</button>
                                    <button className="btn btn-warning">Update</button>
                                </td>
                            </tr>
                        )
                    })
                    }
                    {listUsers && listUsers.length === 0 &&
                    <tr>
                        <td colSpan={'4'}>Not found data</td>
                    </tr>
                    }
                </tbody>
            </table>
        </>
    )
}
export default TableUser
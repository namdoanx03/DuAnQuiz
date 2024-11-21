import SideBar from "./SideBar"
import "./Admin.scss"
import { FaBars } from "react-icons/fa"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import PerfectScrollbar from 'react-perfect-scrollbar'
import { NavDropdown } from "react-bootstrap"
import Language from "../Header/Language"

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed}/>
            </div>
            <div className="admin-content">
                <div className="admin-header" onClick={() => setCollapsed(!collapsed)}>
                    <span>
                        <FaBars className="leftside" />
                    </span>
                    <div className="rightside">
                        <Language />
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item >Log out</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className="admin-main">
                    <PerfectScrollbar> 
                        {/* phan muon cuon chuot se duoc dat trong  PerfectScrollbar*/}
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
                        
        </div>
    )
}
export default Admin
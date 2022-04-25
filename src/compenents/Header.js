import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";
import "../Styles/Header.css";
import {useAuth} from "./auth";


const Header = () => {
    const auth = useAuth()
    const [menuCollapse, setMenuCollapse] = useState(false)
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    const navigate = useNavigate();

    function navigateToProject() {
      navigate('/project/create')
    }
    function navigateToCriteria() {
        navigate('/criteria')
    }
    function navigateToAlternatives() {
        navigate('/alternatives')
    }

    function navigateToHome() {
        navigate('/home')
    }

    function navigateToAHP() {
        navigate('/fuzzyAHP')
    }

    function navigateToTopsis() {
        navigate('/fuzzyTopsis')
    }

    function logout() {
        auth.logout()
        navigate('/login')
    }

    function navigateToResults() {
        navigate('/results')
    }

    return (
        <>
            <div id="header">
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div className="logotext">
                            {/* small and big change using menucollapse state */}
                            <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
                        </div>
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? (
                                <FiArrowRightCircle/>
                            ) : (
                                <FiArrowLeftCircle/>
                            )}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem onClick={navigateToHome} active={true} icon={<FiHome />}>
                                Home
                            </MenuItem>
                            <MenuItem onClick={navigateToProject} icon={<FaList />}>New Project</MenuItem>
                            <MenuItem onClick={navigateToCriteria}icon={<FaRegHeart />}>Criteria</MenuItem>
                            <MenuItem onClick={navigateToAlternatives}icon={<RiPencilLine />}>Alternatives</MenuItem>
                            <MenuItem onClick={navigateToAHP} icon={<BiCog />}>Fuzzy AHP  </MenuItem>
                            <MenuItem onClick={navigateToTopsis} icon={<BiCog />}>Fuzzy TOPSIS  </MenuItem>
                            <MenuItem onClick={navigateToResults} icon={<BiCog />}>Results  </MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem onClick={logout} icon={<FiLogOut />}>Logout</MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>
    );
};

export default Header;
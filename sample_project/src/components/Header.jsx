import React, { useEffect, useState } from "react";
import { RiMenuFoldLine } from "react-icons/ri";
import { Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { Popover } from "@mui/material";
import { IoPersonSharp } from "react-icons/io5";
import "./Header.css"
import { useAppContext } from "./Appprovider";
import { MdOutlineContactSupport } from "react-icons/md";


const Header = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const { postApi, updateToken } = useAppContext()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const logout = () => {
        var url = "user/logout"
        var data = {}
        postApi(url, data).then((response) => {
            if (response.data) {
                localStorage.clear();
                updateToken("")
                navigate("/")
            }
        })
            .catch((error) => {
                console.log("Error :", error)
            })
    }


    return (
        <div className="header_whole_container">
            <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "100%" }}>
                    <RiMenuFoldLine
                        cursor="pointer"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        size={30}
                    />
                </div>
                <div style={{ justifyContent: "flex-end" }}>
                    <BsPersonCircle
                        onClick={handleClick}
                        cursor="pointer"
                        size={30}
                    />
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        style={{ marginTop: "10px" }}
                        elevation={20}
                    >
                        <div style={{ padding: '20px' }}>
                            <div onClick={() => navigate("/myProfile")} className="popover_text_container">
                                <IoPersonSharp size={20} cursor="pointer" />
                                <text>
                                    My Profile
                                </text>
                            </div>
                            <div onClick={() => logout()} className="popover_text_container">
                                <TbLogout size={20} cursor="pointer" />
                                <text>
                                    Log Out
                                </text>
                            </div>
                        </div>
                    </Popover>
                </div>
            </div>
            <Drawer
                open={sidebarOpen}
                width="300px"
                closable={false}
                placement="left"
                onClose={() => setSidebarOpen(false)}
            >
                <div className="sidebar_container">
                    <div onClick={() => navigate("/aboutUs")} className="sidebar_content_container">
                        <MdOutlineContactSupport size={20} />
                        <text>About Us</text>
                    </div>
                    <div onClick={() => navigate("/contactUs")} className="sidebar_content_container">
                        <MdOutlineContactSupport size={20} />
                        <text>Contact Us</text>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default Header;

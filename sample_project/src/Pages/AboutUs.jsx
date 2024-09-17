import React, { useEffect } from "react";
import { useAppContext } from "../components/Appprovider";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";



const AboutUs = () => {
    const { msgGetApi, token } = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (token == "" || token == null || token == undefined) {
            navigate("/")
        }
        else {
            msgGetApi()
        }
    }, [])

    return (
        <div>
            <Header />
            <div className="page_container">
                <text>About Us</text>
            </div>
        </div>
    )
}


export default AboutUs;
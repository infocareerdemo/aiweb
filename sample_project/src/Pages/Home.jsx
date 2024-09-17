import React, { useEffect } from "react";
import Header from "../components/Header";
import { useAppContext } from "../components/Appprovider";
import { useNavigate } from "react-router-dom";


const Home = () => {

    const { token } = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (token == "" || token == null || token == undefined) {
            navigate("/")
        }
    }, [])

    return (
        <div>
            <Header />
            <div className="page_container">
                <text>Welcome To ......</text>
            </div>
        </div>
    )
}


export default Home;
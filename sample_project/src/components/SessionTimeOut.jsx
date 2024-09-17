import React, { useEffect } from "react";
import { useAppContext } from "./Appprovider";
import { useNavigate } from "react-router-dom";


const SessionTimeOut = ({ children }) => {
    const { sessionStatus, updateToken } = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(sessionStatus, "sessionStatus")
        if (sessionStatus == 403) {
            localStorage.clear();
            updateToken("")
            navigate("/")
        }
    }, [sessionStatus])

    return (
        <div>
            {children}
        </div>
    )
}


export default SessionTimeOut;
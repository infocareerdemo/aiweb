import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const Appprovider = ({ children }) => {
    const baseUrl = "http://localhost:7001/api/v1/"
    const [userToken, setToken] = useState("")
    var token = localStorage.getItem("token")
    const [sessionStatus, setSessionStatus] = useState("")
    useEffect(() => {
        if (token !== null && token !== undefined && token !== "") {
            setToken(token)
        }
    }, [token])

    const updateToken = (newValue) => {
        setToken(newValue)
    }

    const postApi = (url, data) => {
        let api = "";
        if (userToken !== "") {
            api = axios.create({
                baseURL: baseUrl,
                headers: { Authorization: userToken },
                validateStatus: function (status) {
                    return true;
                },
            });
        }
        else {
            api = axios.create({
                baseURL: baseUrl,
                validateStatus: function (status) {
                    return true;
                },
            });
        }
        return api
            .post(url, data).then((response) => {
                if (response.status == 403) {
                    setSessionStatus(response.status)
                    return response
                }
                else {
                    return response
                }
            })
            .catch((error) => {
                return error;
            })
    }

    const getApi = (url, data) => {
        const api = axios.create({
            baseURL: baseUrl,
            headers: { Authorization: userToken },
            validateStatus: function (status) {
                return true;
            },
        });
        return api
            .post(url, data).then((response) => {
                if (response.status == 403) {
                    setSessionStatus(response.status)
                    return response
                }
                else {
                    return response
                }
            })
            .catch((error) => {
                return error;
            })
    }

    const msgGetApi = () => {
        const api = axios.create({
            baseURL: baseUrl,
            headers: { Authorization: userToken },
            validateStatus: function (status) {
                return true;
            },
        });
        return api
            .get("user/msg").then((response) => {
                if (response.status == 403) {
                    setSessionStatus(response.status)
                    return response
                }
                else {
                    return response
                }
            })
            .catch((error) => {
                return error;
            })
    }

    const updateSessionStatus = (newValue) => {
        setSessionStatus(newValue)
    }

    return (
        <AppContext.Provider value={{ postApi, updateToken, getApi, msgGetApi, token, sessionStatus, updateSessionStatus }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
import axios from "axios"

const commonConfig = {
    headers: {
        "Content-Type": ["application/json"],
        Accept: ["image/png", "image/jpeg", "image/jpg", "application/json",],
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    }

}
export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig
    })
}

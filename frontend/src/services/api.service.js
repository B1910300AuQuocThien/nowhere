import axios from "axios"

const commonConfig = {
    headers: {
        "Content-Type": ["application/json"],
        Accept: ["image/png", "image/jpeg", "image/jpg", "application/json",]
    }

}
export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig
    })
}

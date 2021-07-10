import axios from "axios";

export const getAccounts = () => axios.get("/api/accounts/");

export const updateAccount = (payload) => {
    let id = payload._id;
    delete payload._id;
    return axios.patch(`/api/accounts/${id}`, payload);
}
import axios from "axios";

export const getAccounts = () => axios.get("/api/accounts/");

export const updateAccount = (payload) => axios.patch(`/api/accounts/${payload._id}`, payload);
import axios from "axios";

export const getAccounts = () => axios.get("/api/accounts/");
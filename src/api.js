import axios from "axios";
const SEARCH_LINK = import.meta.env.VITE_COINCAP_SEARCH_LINK;
const api = axios.create({
  baseURL: SEARCH_LINK,
  headers: {
    accept: "application/json",
  },
});

export const getAssets = () => {
  return api.get().then((res) => res.data);
};

export const getAssetById = (id) => {
  return api.get("", { params: { ids: id } }).then((res) => res.data);
};
export const getAssetHistory = (id, interval, start, end) => {
  return api
    .get(`${id}/history`, { params: { interval, start, end } })
    .then((res) => res.data);
};

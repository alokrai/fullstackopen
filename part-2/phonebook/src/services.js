import axios from "axios";
const baseURL = "http://localhost:3002/persons";

export const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

export const create = (newObj) => {
  const request = axios.post(baseURL, newObj);
  return request.then((response) => response.data);
};

export const update = (id, newObj) => {
  const request = axios.put(`${baseURL}/${id}`, newObj);
  return request.then((response) => response.data);
};

export const deletePerson = (id) => {
  if (window.confirm("you sure you wanna delete this bro?")) {
    return axios.delete(`${baseURL}/${id}`);
  }
};

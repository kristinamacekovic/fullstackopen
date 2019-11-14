import axios from "axios";

const baseUrl = "/api/persons";

const add = newPerson => {
  const request = axios.post(baseUrl, newPerson);
  return request.then(response => response.data);
};

const deleteEntry = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
};

const updateEntry = (id, changedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, changedObject);
  return request.then(response => response.data);
};

export default {
  add,
  deleteEntry,
  updateEntry,
};

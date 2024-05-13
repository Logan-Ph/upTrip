import axios from "./axios";

const options = {
    withCredentials: true,
};

export async function addNewCollection(name, description) {
    return axios.post('/add-new-collection', {name, description}, options);
}

export async function editCollection(id, name, description) {
    return axios.post('/edit-collection', {id, name, description}, options)
}


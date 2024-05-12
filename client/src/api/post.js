import axios from "./axios";

const options = {
    withCredentials: true,
};

export async function addNewCollection(name, description) {
    if (!name || !description) {
        return Promise.reject("Name and Description are required");
    }
    return axios.post('/add-new-collection', {name, description}, options);
}


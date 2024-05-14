import axios from "./axios";

const options = {
    withCredentials: true,
};

export async function addNewCollection(name, description) {
    if (!name) {
        return Promise.reject("Name is required");
    }
    return axios.post('/add-new-collection', {name, description}, options);
}


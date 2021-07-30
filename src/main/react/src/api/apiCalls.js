import axios from "axios";

export const signup = (body) => {
    return axios.post("/token/register", body);
};

export const login = (creds, name) => {
    {
        return axios.post(`/token/${name}`, creds);
    }
}
export const logout = () => {
    return axios.post('/api/1.0/logout')
}

export const setAuthorizationHeader = ({isLoggedIn, token}) => {
    if (isLoggedIn) {
        //btoa username ve passwordubase64'e çevirir
        //username ve passwordu birleştirir
        const authorizationHeaderValue = `Bearer ${token}`;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else {
        //kullanıcı çıkış yaptıktan sonra kullanıcılar listesinde adı görünecek
        delete axios.defaults.headers['Authorization']
    }
}


export const getNotes = () => {
    return axios.get('/api/note/getNotes');
}

export const addNote = (body, category, userName) => {
    return axios.post(`/api/note/${userName}/${category}`, body);
}

export const addNoteToLibrary = (userName, note) => {
    return axios.post(`/api/library/addLibrary/${userName}`, note);
}
export const getLibraryNotes = (userName) => {
    return axios.get(`/api/library/getLibraryNotes/${userName}`);
}
//profile için
export const getUser = (userName) => {
    return axios.get(`/api/user/getUser/${userName}`);
}
//update
export const updateUser = (userName, body) => {
    return axios.post(`/api/user/updateUser/${userName}`, body);
}
//search
export const searchNote = (category) => {
    return axios.get(`/api/note/searchNote/${category}`);
}

export const getNoteData = (noteId) => {
    return axios.get(`/api/note/noteData/${noteId}`);
}
//admin sayfasında user göstermek için
export const getUsers = () => {
    return axios.get('/api/user/getUsers');
}
//admin user silmek için
export const deleteUser1 = (userName) => {
    return axios.delete(`/api/user/deleteUser1/${userName}`);
}
//admin not silme
export const deleteNotes = (noteId) => {
    return axios.delete(`/api/note/deleteNotes/${noteId}`);
}

//kütüphaneden not silme
export const deleteNotesFromLibrary = (noteId, userName) => {
    return axios.delete(`/api/library/deleteLibrary/${noteId}/${userName}`);
}

export const getNoteByUserName = (userName) => {
    return axios.get(`/api/note/getNotesByUser/${userName}`);
}
//hakkında sayfası
export const getAbout = (userName) => {
    return axios.get(`/api/about/getAbout/${userName}`);
}

export const updateAbout = (userName, body) => {
    return axios.post(`/api/about/createAbout/${userName}`, body);
}


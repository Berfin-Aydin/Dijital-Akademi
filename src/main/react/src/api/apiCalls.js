import axios from "axios";

export const signup = (body) => {
    return axios.post("/token/register", body);
};

export const login = creds => {
    {
        return axios.post('/token', creds);
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

export const addNoteToLibrary = (userName, note ) => {
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
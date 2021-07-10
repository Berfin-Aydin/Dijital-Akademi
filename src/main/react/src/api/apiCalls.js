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

export const addNote = (body, category) => {
    return axios.post(`/api/note/${category}`, body);
}

import axios from 'axios';

let userInfo = null;

export const getUser = async () => {
    if (userInfo === null) {
        try {
            userInfo = (await axios.get('/api/me')).data;
        } catch {
            return false;
        }
    }
    return userInfo;
}

export const login = (username, password) => {
    return axios.post('/login', { username, password }, { withCredentials: true }).then(res => { console.log(res); return res.data });
};

export const logout = () => {
    return axios.get('/logout').then(res => res.data);
};

import axios from 'axios';

let userInfo;

export const getUser = () => {
    if (userInfo === undefined) {
        axios.get('/api/me').then(res => {
            userInfo = res.data;
        }).catch(console.error);
    } 
    return userInfo;
}

export const login = (username, password) => {
    return axios.post('/login', { username, password }, { withCredentials: true }).then(res => { console.log(res); return res.data });
};

export const logout = () => {
    return axios.get('/logout').then(res => res.data);
};

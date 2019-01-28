import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-react-burger-28ede.firebaseio.com/'
});

export default instance;
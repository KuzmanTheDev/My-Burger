import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-project-86df1.firebaseio.com/'
})

export default instance;
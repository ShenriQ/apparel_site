import {api_base_url} from './constant';
import axios from 'axios';


// headers : {
//     Accept : "application/json",
//     "Content-Type" : "application/json",
//     'Access-Control-Allow-Origin' : '*',
//     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
// }

const doGet = (url, body) => {
    return axios({
        method  :'get',
        url : api_base_url + url,
        withCredentials: false,
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
        data : body
    })
} 

const doPost = (url, body) => {
    return axios({
        method  :'post',
        url : api_base_url + url,
        withCredentials: false,
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        data : body
    })
} 

const doPostFile = async (url, formData, onSuccess, onFail) => {
    axios({
        method  :'post',
        url : api_base_url + url,
        withCredentials: false,
        headers : {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
        data : formData
    })
    .then((response) => { return onSuccess(response.data); })
    .catch((error) => { return onFail(error); })
} 

export default {doGet, doPost, doPostFile}
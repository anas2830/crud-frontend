import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/index';
import axios from 'axios';
import {Provider} from 'react-redux';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

const jwt_secret = 'eLY4Un0NvFOpoSz4YE00fe8j8OdAxQrYkkuuIztdWoE6rE2nM3vXVFysaRIT33ZG';
let token = cookie.get('token');

if(token){
  jwt.verify(token, jwt_secret, function(err, decoded) {
    if(err){
      token = null;
      cookie.remove('token');
    }else{
      if(decoded.iss !== 'http://localhost:8000/api/auth/login'){
        token = null;
        cookie.remove('token');
      }
    }
  });
}

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

if(token){
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.post("http://localhost:8000/api/auth/me").then( res => {
    store.dispatch({type: "SET_LOGIN", payload: res.data});
    render();
  });
}else{
  render();
}



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

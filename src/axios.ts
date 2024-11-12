import axios from 'axios';
import { baseURL } from './url';

export default axios.create({
  baseURL: baseURL,
  timeout: 50000,
  withCredentials: false,
})
// .interceptors.request.use(
//   (config) => {
//     // const token = localStorage.getItem('access_token');
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzMwNzU0ZGJkY2U1NmU3ZDEyZWY1NjUiLCJpYXQiOjE3MzEyMjkwMjgsImV4cCI6MTczMTMxNTQyOH0.NKeiBNg4eQbGy-jTw47V7eCmVFLmAGC1s1XUoxYkQp0';
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );



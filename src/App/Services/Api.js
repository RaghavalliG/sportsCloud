
import axios from 'axios'
var base_url = 'https://nodeserver.mydevfactory.com:1448/';
var condition = navigator.onLine ? 'online' : 'offline';

export const Network = (endpoint, method, body) => {
  console.log("network",endpoint,body.token,method)
  return new Promise((resolve, reject) => {
    if (condition === 'online') {
      console.log(`${base_url}${endpoint}`,method)
      
      if (body && body.token && body.token !=='') {
        console.log('+++++++++++++++++++++++++++++++++++++', body)
        var header = body
        // header['token'] = body.token
      }else{
        var header = {
          'Content-Type': 'application/json'
        }
      }
      console.log('+++++++++++++++++++++++++++++++++++++', header)

      axios.request({
        method: method,
        url: `${base_url}${endpoint}`,
        headers: header,
        data: body,  
      })
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          // console.log("error========>", error);
          // Toast.show('Something went wrong. Please try again !')
          reject(error)
        });
    } else {
      alert("OFFLINE")
    }
  });
}
import * as types from '../constants/actionTypes';
import $ from 'jquery';
import API from '../components/api'
import history from '../history';
// export const fetchGetToken = (params) => {
//     return (dispatch) => {
//         var settings = {
//             "url": API.GetToken,
//             "method": "POST",
//             "headers": {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//             "data": {
//               "grant_type": "password",
//               "userName": "johan@example.com",
//               "password": "Pass@word1"
//             }
//           }
//           $.ajax(settings).done(function (response) {
//           })
//           .then(response => {
//             window.localStorage.setItem('portal_token', response.access_token);
//         })
//         .catch(err => {
//         });
//     };
// }

export const fetchLoginData = (params) => {
    return (dispatch) => {
        var settings = {
            "url": API.GetToken,
            "method": "POST",
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            "data": {
              "grant_type": "password",
              "userName": params.username,
              "password": params.password
            }
          }
          $.ajax(settings).done(function (response) {
          })
          .then(response => {
            window.localStorage.setItem('portal_token', response.access_token);
            dispatch(fetchLoginDataSuccess(response));
            history.push('/product')
        })
        .catch(err => {
            dispatch(fetchLoginDataFail(err.responseJSON.error_description));
        });
    };
}

//login fail
export const fetchLoginDataFail = (param) => {
    return {
        type: types.FETCH_LOGIN_FAIL,
        error:param
    }
}

//login success
export const fetchLoginDataSuccess = (data) => {
    
    return {
        type: types.FETCH_LOGIN_SUCCESS,
        UserName:data.userName,
        Role:data.roles
    }
}



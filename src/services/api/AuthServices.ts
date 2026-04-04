import { API_URL } from '../../appconfig';
import fetch from '../../helpers/fetch';
import Auth from '../../modules/Auth';
import { UserResponse } from '../main/model';
import { ApplicationInfo } from '../map/models/Application';
import { get, patch } from './index';

const authService = {
  login,
  isAccess,
  getAppInfo,
  getCapabilities,
  updatePassword,
};

function login(username: string, password: string): Promise<UserResponse> {
    return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  .then(res => {
    if (res.status === 200) {
      let user = res.data as UserResponse;
      return Promise.resolve(user);
    } else {
      return Promise.reject(res.data);
    }
  })
  .catch(err => Promise.reject('Sai tài khoản hoặc mật khẩu'));
}

async function getAppInfo(id: string, isAnonymous = false): Promise<ApplicationInfo> {
  // Get a token from api server using the fetch api

  try {
    let url = `${API_URL}/auth/appinfo/${id}`;
    let result: ApplicationInfo;
    if (!isAnonymous && Auth.isUserAuthenticated()) {
      var response = await get(url);
      result = response.data;
    } else {
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      var response = await fetch(url + '/anonymous', { method: 'GET', headers });
      result = response.data;
    }
    return result;
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function getCapabilities(): Promise<string[]> {
  // Get a token from api server using the fetch api

  try {
    let url = `${API_URL}/auth/capabilities`;
    var response = await get(url);
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
}

function isAccess(id: string): Promise<boolean> {
  // Get a token from api server using the fetch api
  return get(`${API_URL}/auth/isaccess/${id}`)
    .then((r) => r.data)
    .catch((e) => Promise.reject(e.Message));
}


function updatePassword(currentPassword: string, newPassword: string): Promise<string> {
  // Get a token from api server using the fetch api
  return patch(`${API_URL}/sys/user/cpwd`, JSON.stringify({
    currentPassword,
    newPassword
  }))
    .then(res => {
      if (res.status === 200) {
        return Promise.resolve(res.data.message);
      } else {
        return Promise.reject(res.data.message);
      }
    })
    .catch(err => {
      return Promise.reject('Mật khẩu hiện tại không đúng')
    });
}
export default authService;

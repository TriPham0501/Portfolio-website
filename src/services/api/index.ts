import { API_URL } from '../../appconfig';
import fetch from '../../helpers/fetch';
import Auth from '../../modules/Auth';
const headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');

export const odata = {
  get: async (url: string, body?: BodyInit) => {
    const result = await get(url, body);
    if (result.status === 200) return result.data.value;
    throw new Error(result.data);
  },
  post: async (url: string, body?: BodyInit) => {
    const result = await post(url, body);
    if (result.status === 201) return result.data;
    else throw new Error(result.data);
  },
  put: async (url: string, body?: BodyInit) => {
    const result = await put(url, body);
    if (result.status === 204) return result.data;
    else throw new Error(result.data);
  },
  patch: async (url: string, body?: BodyInit) => {
    const result = await patch(url, body);
    if (result.status === 200) return result.data;
    else throw new Error(result.data);
  },
  delete: async (url: string) => {
    const result = await _delete(url);
    if (result.status === 204) return true;
    else throw new Error(result.data);
  }
}

export class OData {
  public request = new Request();

  public set authorize(v: boolean) {
    this.request.authorize = v;
  }

  get = async (url: string, body?: BodyInit) => {
    const result = await this.request.get(url, body);
    if (result.status === 200) return result.data.value;
    throw new Error(result.data);
  }
  post = async (url: string, body?: BodyInit) => {
    const result = await this.request.post(url, body);
    if (result.status === 201) return result.data;
    else throw new Error(result.data);
  }
  put = async (url: string, body?: BodyInit) => {
    const result = await this.request.put(url, body);
    if (result.status === 204) return result.data;
    else throw new Error(result.data);
  }
  patch = async (url: string, body?: BodyInit) => {
    const result = await this.request.patch(url, body);
    if (result.status === 200) return result.data;
    else throw new Error(result.data);
  }
  delete = async (url: string) => {
    const result = await this.request._delete(url);
    if (result.status === 204) return true;
    else throw new Error(result.data);
  }
}

export class Request {
  public authorize: boolean = false;
  public post(url: string, body?: BodyInit) {
    this.authorize && pushAuthorizeToHeader(url);
    return fetch(url, {
      method: 'POST',
      body, headers
    });
  }
  public get(url: string, body?: BodyInit) {
    this.authorize && pushAuthorizeToHeader(url);
    return fetch(url, {
      method: 'GET',
      body,
      headers
    });
  }

  public put(url: string, body?: BodyInit) {
    this.authorize && pushAuthorizeToHeader(url);
    return fetch(url, {
      method: 'PUT', body, headers
    });
  }
  public patch(url: string, body?: BodyInit) {
    this.authorize && pushAuthorizeToHeader(url);
    return fetch(url, {
      method: 'PATCH', body, headers
    });
  
  }
  public _delete(url: string, body?: BodyInit) {
    this.authorize && pushAuthorizeToHeader(url);
    return fetch(url, { method: 'DELETE', headers, body });
  }
}

var request = new Request();
request.authorize = true;
export function post(url: string, body?: BodyInit) {
  return request.post(url, body);
}
export async function get(url: string, body?: BodyInit) {
  return request.get(url, body);
}
export function put(url: string, body?: BodyInit) {
  return request.put(url, body);
}
export function patch(url: string, body?: BodyInit) {
  return request.patch(url, body);
}

export function _delete(url: string, body?: BodyInit) {
  return request._delete(url, body);
}

function pushAuthorizeToHeader(url: string) {
  if (Auth.isUserAuthenticated()) {
    if (headers.get('Authorization')) // nếu có giá trị rồi thì xóa gán lại
    { headers.delete('Authorization'); }
    let token = Auth.getToken() as string;
    if (url && url.startsWith(API_URL)) {
      token = 'Bearer ' + token;
    }
    headers.append('Authorization', token);
  } else {
    Auth.deauthenticateUser();
    location.href = '/login';
  }
}
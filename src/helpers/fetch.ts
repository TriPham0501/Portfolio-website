import { mapConfig } from '../constants/map.constant';

interface FetchResponse {
  status: number; data: any;
}

export default function _fetch(url: string, options?: RequestInit): Promise<FetchResponse> {
  // performs api calls sending the required authentication headers
  const headers = new Headers(options && options.headers);
  return new Promise((resolve, reject) => {
    fetch(url, {
      ...options,
      headers
    })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') > -1) {
            res.json().then(data => {

              // trong data nếu có đối tượng url chứa link service thì điều chỉnh
              if (url.search('layerinfo') > -1 || url.search('appinfo') > -1) {
                replareUrl(data);
              }
              resolve({ status: res.status, data } as FetchResponse);
            });
          } else {
            res.text().then(data => {
              resolve({ status: res.status, data });
            })

          }
        }
        else {
          reject({ status: res.status, data: res.statusText });
        }
      }
      );
  });
}

function replareUrl(obj: any) {
  if (obj instanceof Object) {
    let keys = Object.keys(obj);
    if (keys.length > 0) {
      for (const key of keys) {
        if (typeof obj[key] === 'string') {
          let value = obj[key];
          if (value.search('FeatureServer') !== -1 || value.search('MapServer') !== -1) {
            if (!value.startsWith('http')) {
              obj[key] = mapConfig.arcgisUrl + value;
            }
          }
        } else {
          replareUrl(obj[key]);
        }

      }
    }
  } else if (Array.isArray(obj)) {
    for (const item of obj) {
      replareUrl(item);
    }
  }
}
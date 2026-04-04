import { API_URL } from '../../appconfig';
import fetch from '../../helpers/fetch';
import LayerInfo from '../../models/LayerInfo';
import Auth from '../../modules/Auth';
import { get } from './index';
export async function getLayerInfos(isAnonymous = false): Promise<LayerInfo[]> {
  try {
    var url = API_URL + '/auth/layerinfos';
    let result: LayerInfo[] = [];
    if (!isAnonymous && Auth.isUserAuthenticated()) {
      var response = await get(url);
      result = response.data as LayerInfo[];
    } else {
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      var response = await fetch(url + '/anonymous', { method: 'GET', headers });
      result = response.data as LayerInfo[];
    }
    return result;
  } catch (error) {
    return Promise.reject(error.Message);
  }
}
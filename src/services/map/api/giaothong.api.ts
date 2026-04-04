import GiaoThong from '../models/GiaoThong';
export default class GiaoThongAPI  {

  async search(text:string): Promise<GiaoThong[]> {
    return [];
    // const filter = `$filter=tenConDuong`;
    // const orderby = `$orderby=TenCon  Duong`
    // const top = `$limit=10`


    // const url = PATH + `?${filter}&${orderby}&${top}`;
    // const headers = new Headers();
    // headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'application/json');
    // const result = await fetch(url, {
    //   method: 'GET',
    //   headers
    // });
    // return result.data.value;
  }

}
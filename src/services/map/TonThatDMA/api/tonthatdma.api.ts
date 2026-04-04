import { API_URL } from '../../../../appconfig';
import fetch from '../../../../helpers/fetch'; //../../../helpers/fetch
var defaultPath = API_URL + '/ton-that-dma';
const URL = {
  laySanLuongKhachHangTrenDMA: defaultPath + '/SelectSanLuongKhachHangTrenDMA',
};



export async function laySanLuongKhachHangTrenDMA(body: {
  maDMA: string;
  nam: number;
  ky: number;
  ngayThangTruoc: number;
  ngayThangNay: number;
}) {
  const url = `${URL.laySanLuongKhachHangTrenDMA}?maDMA=${body.maDMA}&nam=${body.nam}&ky=${body.ky}&ngayThangTruoc=${body.ngayThangTruoc}&ngayThangNay=${body.ngayThangNay}`;
  var response = await fetch(url);
  if (response.status === 200) return response.data;
  else throw new Error(response.data);
}





import { API_URL } from "../../../../appconfig";
import fetch from "../../../../helpers/fetch";
import { SanLuongKhachHang } from "../models/sanluongkhachhang.model";
var defaultPath = API_URL + "/rest/san-luong-kh";
const URL_API = {
  topSanLuong: defaultPath + "/topsanluong",
  laySanLuong: defaultPath + "/SelectSanLuong",
  layBieuDo12Thang: defaultPath + "/bieuDo12Thang",
};

export async function layTopSanLuong(body: {
  nam: number;
  ky: number;
  maKhuVuc: string;
}): Promise<Array<SanLuongKhachHang>> {
  let url = URL_API.topSanLuong + `?nam=${body.nam}&ky=${body.ky}`;
  body.maKhuVuc &&
    (url += `&maKhuVuc=${body.maKhuVuc !== undefined ? body.maKhuVuc : null}`);
  const response = await fetch(url);
  if (response.status === 200) return response.data;
  else throw new Error(response.data);
}
export async function laySanLuong(body: {
  nam: number;
  ky: number;
  gioiHanSoLuong?: number;
  tieuThuTu?: number;
  tieuThuDen?: number;
  chiSoTu?: number;
  chiSoDen?: number;
  giaBieuTu?: number;
  giaBieuDen?: number;
  maKhuVuc?: string;
}): Promise<Array<SanLuongKhachHang>> {
  let url =
    URL_API.laySanLuong +
    `?nam=${body.nam}&ky=${body.ky}&gioiHanSoLuong=${
      body.gioiHanSoLuong || 100
    }`;
  body.tieuThuTu &&
    (url += `&tieuThuTu=${
      body.tieuThuTu !== undefined ? body.tieuThuTu : null
    }`);
  body.tieuThuDen &&
    (url += `&tieuThuDen=${
      body.tieuThuDen !== undefined ? body.tieuThuDen : null
    }`);
  body.chiSoTu &&
    (url += `&chiSoTu=${body.chiSoTu !== undefined ? body.chiSoTu : null}`);
  body.chiSoDen &&
    (url += `&chiSoDen=${body.chiSoDen !== undefined ? body.chiSoDen : null}`);
  body.giaBieuTu &&
    (url += `&giaBieuTu=${
      body.giaBieuTu !== undefined ? body.giaBieuTu : null
    }`);
  body.giaBieuDen &&
    (url += `&giaBieuDen=${
      body.giaBieuDen !== undefined ? body.giaBieuDen : null
    }`);
  body.maKhuVuc &&
    (url += `&maKhuVuc=${body.maKhuVuc !== undefined ? body.maKhuVuc : null}`);
  const response = await fetch(url);
  if (response.status === 200) return response.data;
  else throw new Error(response.data);
}
export async function layBieuDo12Thang(body: { soDB: string }) {
  const { soDB } = body;
  const url = URL_API.layBieuDo12Thang + "/" + soDB;
  const response = await fetch(url);
  if (response.status === 200) return response.data;
  else throw new Error(response.data);
}

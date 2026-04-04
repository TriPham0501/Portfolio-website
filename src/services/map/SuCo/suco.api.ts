import { API_URL } from '../../../appconfig';
import { get } from "../../api/index";
import { NhanVien } from "./model";


export async function layDanhSachNhanVienXuLy(): Promise<Array<NhanVien>> {
    try {
        const response = await get(API_URL + `/rest/su-co/nhanvienxuly`);
        return response.data;
    } catch (err) {
        return  [];
    }

}
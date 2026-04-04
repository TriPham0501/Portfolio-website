import { SanLuongKhachHangActionType } from "./sanluongkhachhang.action-types";
import { SanLuongKhachHang } from "../SanLuongKhachHang/models/sanluongkhachhang.model";

export type SanLuongKhachHangAction = {
  type: SanLuongKhachHangActionType.SetBieuDo, bieuDos?: SanLuongKhachHang[]
}

import { SanLuongKhachHangAction } from "./sanluongkhachhang.action-rule";
import { SanLuongKhachHang } from "./models/sanluongkhachhang.model";
import { SanLuongKhachHangActionType } from "./sanluongkhachhang.action-types";

export type Model = {
  bieuDos?: SanLuongKhachHang[]
};

export const defaultState: Model = {
};

function reducer(state: Model = defaultState, action: SanLuongKhachHangAction): Model {
  switch (action.type) {
    case SanLuongKhachHangActionType.SetBieuDo:
      return { ...state, bieuDos: action.bieuDos };
    default:
      return state;
  }
}


export default reducer;
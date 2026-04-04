import { KhachHangMatNuoc } from '../models/khachhangmatnuoc.model';

export async function khachHangMatNuoc (params: { tuNgay: Date, denNgay?: Date }):Promise<KhachHangMatNuoc[]>{
  // var tuNgayS = moment(params.tuNgay).format('YYYY-MM-DD'),
  //  denNgayS = params.denNgay? moment(params.denNgay).format('YYYY-MM-DD'):'';
  // const response =await fetch(defaultPath+'/KhachHangMatNuoc'+`?tuNgay=${tuNgayS}&denNgay=${denNgayS}`);
  // if(response.status === 200) return response.data;
  // else throw new Error(response.data);
  return [];
}
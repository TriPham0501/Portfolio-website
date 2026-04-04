import { APPLICATION } from './app.constant';

export const BASEMAP = {
  INDEX_HANH_CHINH: 6,
  MaHuyenTP: 'MaHuyen',
  MaPhuongXa: 'MaXa',
  MaDuong: 'MaDuong',
};

export const mapConfig: {
  maQuanHuyen: string,
  maPhuongXa: string,
  maDuong: string,
  quanHuyenUrl: string;
  phuongXaUrl: string;
  arcgisUrl: string;
  printService: string;
  geometryService: string;
  center: number[];
  scale: number;
  proxy?: string;
  createUser: string;
  createDate: string;
  updateUser: string;
  updateDate: string;
} = {
  maQuanHuyen: '',
  maPhuongXa: '',
  maDuong: '',
  quanHuyenUrl: '',
  phuongXaUrl: '',
  arcgisUrl: '',
  printService: '',
  geometryService: '',
  center: [],
  scale: 0,
  createUser: 'NguoiTao',
  createDate: 'NgayTao',
  updateUser: 'NguoiCapNhat',
  updateDate: 'NgayCapNhat'
}

export const SERVICE_PRINT =
  'https://ditagis.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task';


export const LAYER = {
  BASE_MAP: 'basemap',
  BE_CHUA: 'bechuaLYR',
  BE_VIEN_THONG: 'bevienthongLYR',
  BIEN_BAO: 'bienbaoLYR',
  BTS: 'btsLYR',
  CAP_VIEN_THONG: 'capvienthongLYR',
  CAU_DUONG_BO: 'cauduongboLYR',
  CAY_XANH: 'cayxanhLYR',
  CONG_SO: 'congsoLYR',
  DEN_CHIEU_SANG: 'denchieusangLYR',
  DEN_TIN_HIEU: 'dentinhieuLYR',
  DIEM_DAU_NOI: 'diemdaunoiLYR',
  DONG_HO_TONG: 'DONGHOTONG',
  DONG_HO_KHACH_HANG: 'DONGHOKHACHHANG',
  GIAI_PHAN_CACH: 'giaiphancachLYR',
  GIAO_LO: 'giaoloLYR',
  HO_GA: 'hogaLYR',
  MAT_SONG: 'matsongLYR',
  NHA_MAY_NUOC: 'nhamaynuocLYR',
  ONG_PHAN_PHOI: 'ONGPHANPHOI',
  ONG_TRUYEN_DAN: 'ONGTRUYENDAN',
  TD_CHIEUSANG: 'tdchieusangLYR',
  TIEU_DAO: 'tieudaoLYR',
  TIM_SONG: 'timsongLYR',
  TRAM_BOM: 'trambomLYR',
  TUYEN_DAY_DIEN_NGAM: 'tuyendaydienngamLYR',
  TUYEN_DAY_DIEN_NGAM_NOI: 'tuyendaydienngamnoiLYR',
  TUYEN_DAY_DIEN_NOI: 'tuyendaydiennoiLYR',
  TUYEN_ONG_THOAT_NUOC: 'tuyenongthoatnuocLYR',
  VAN: 'VAN',
  DIEM_SU_CO: 'SUCO',
  DMA: 'DMA',
  GanMoiDongHoLYR: 'GMDH_DONGHONUOC',
  GanMoiDongHoOngNganhLYR: 'GMDH_ONGNGANH',
  DiDoiDongHoLYR: 'DDDH_DONGHONUOC',
  DiDoiDongHoOngNganhLYR: 'DDDH_ONGNGANH',
  DiemDanhGiaLYR:'DIEMDANHGIA',
  //Table
  INDEX_MAU_KIEM_NGHIEM_TBL:1
};

export const MAP = {
  CENTER: [106.345496, 10.380322],
  ZOOM: 10
};

export const APP_LAYER = {
  //[APPLICATION.["Quản lý mạng lưới"]]: ['*'],
  [APPLICATION.QuanLyMangLuoi]: ['*',LAYER.DiemDanhGiaLYR],
  [APPLICATION.QuanLySuCo]: ['*'],
  [APPLICATION.TiepNhanSuCo]: [LAYER.DIEM_SU_CO, LAYER.BASE_MAP,],
  [APPLICATION.QuanLyTonThat]: [LAYER.DMA, LAYER.BASE_MAP, LAYER.DONG_HO_TONG, LAYER.DONG_HO_KHACH_HANG],
  [APPLICATION.QuanLySanLuong]: [LAYER.BASE_MAP, LAYER.DONG_HO_KHACH_HANG],
  [APPLICATION.GiamSatNhanVien]: ['*']
};


export const FIELDS_NO_EDIT = [
  'MaQuan',
  'MaPhuong',
  'SHAPE_Length',
  'MaHuyen',
  'MaXa',
  'OBJECTID',
  'IDSuCo',
  'MaDMA',
  'GlobalID',
  'DoiQuanLy',
  'NVXuLy',
  'TGGiaoXuLy',
  'TGPhanAnh',
  'created_user',
  'created_date',
  'last_edited_user',
  'last_edited_date'
];
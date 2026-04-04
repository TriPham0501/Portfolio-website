export default interface HanhChinh {
  MaHuyenTP?: string;
  MaPhuongXa?: string;
  TenHuyenTP?: string;
  TenPhuongXa?: string;
}

export interface HanhChinhHuyenEntity {
  maQuanHuyen: string;
  tenQuanHuyen: string;
  loaiDoThi: number;
  stt: number;
  phuongXas?: HanhChinhXaEntity[];
  quanHuyenGis: Partial<HanhChinhHuyenGisEntity>;
}

export interface HanhChinhHuyenGisEntity {
  maQuanHuyen: string;
  maQuanHuyenGis: string;
}
export interface HanhChinhXaGisEntity {
  maPhuongXa: string;
  maPhuongXaGis: string;
}

export interface HanhChinhXaEntity {
  maPhuongXa: string;
  tenPhuongXa: string;
  maQuanHuyen: string;
  loai: number;
  dienTich: number;
  phuongXaGis: Partial<HanhChinhXaGisEntity>;
  quanHuyen: HanhChinhHuyenEntity;
}

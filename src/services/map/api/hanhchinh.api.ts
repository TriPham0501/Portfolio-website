import { API_URL } from '../../../appconfig';
import { BaseService } from '../../api/IService';
import { HanhChinhHuyenEntity, HanhChinhXaEntity } from '../models/HanhChinh';

export class QuanHuyenApi extends BaseService<HanhChinhHuyenEntity, string>{
  constructor() {
    super(API_URL, 'rest/hanh-chinh-huyen');
  }
}

export class PhuongXaApi extends BaseService<HanhChinhXaEntity, string>{
  constructor() {
    super(API_URL, 'rest/ranh-gioi-hanh-chinh');
  }
}
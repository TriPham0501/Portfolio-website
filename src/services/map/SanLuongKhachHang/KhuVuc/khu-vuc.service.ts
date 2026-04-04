import { API_URL } from "../../../../appconfig";
import { BaseService } from "../../../../services/api/IService";
import { KhuVucEntity } from "./khu-vuc.interface";
export class KhuVucService extends BaseService<KhuVucEntity, string> {
  constructor() {
    super(API_URL, "rest/gan-moi/dm/khu-vuc");
  }
}
export const khuVucService = new KhuVucService();

import { Dispatch } from "redux";
import { LAYER } from "../../../constants/map.constant";
import attributesUtils from "../../../map-lib/attributes.utils";
import { AllModelReducer } from "../../../reducers/main.reducer";
import { alertActions, loading } from "../../main/action";
import { laySanLuong, layTopSanLuong } from "./api/sanluongkhachhang.api";
import {
  DongHoKhachHang,
  DongHoKhachHangField,
} from "./models/donghokhachhang.model";
import { SanLuongKhachHang } from "./models/sanluongkhachhang.model";

/**
 * Thao tác tìm kiếm dữ liệu đồng hồ khách hàng theo GIS
 */
export const timKiemGIS = (params: {
  loaiMucDichSD?: number;
  operator?: string;
  coDongHo?: number;
  danhBoKH?: string;
  skip?: number;
}) => {
  return async (
    dispatch: Dispatch,
    getState: () => AllModelReducer
  ): Promise<DongHoKhachHang[] | null> => {
    try {
      dispatch(loading.loadingReady());
      const state = getState();
      const view = state.map.view;
      if (!view) throw new Error("Không xác định được view");

      // lay layer dong ho khach hang
      let dhkhLayer = view.map.findLayerById(
        LAYER.DONG_HO_KHACH_HANG
      ) as __esri.FeatureLayer;
      dhkhLayer.customParameters = { resultRecordCount: "80" };
      if (!dhkhLayer)
        throw new Error("Không xác định được lớp đồng hồ khách hàng");

      const { coDongHo, operator, danhBoKH, loaiMucDichSD, skip } = params;
      var where = [];
      if (danhBoKH) {
        where.push(`${DongHoKhachHangField.SoDB} = '${danhBoKH}'`);
      }
      if (loaiMucDichSD) {
        where.push(`${DongHoKhachHangField.MucDichSuDung} = ${loaiMucDichSD}`);
      }
      if (coDongHo) {
        where.push(
          `${DongHoKhachHangField.CoDongHo} ${operator || "="} ${coDongHo}`
        );
      }
      where.push(`${DongHoKhachHangField.SoDB} IS NOT NULL`);
      // nếu khôn tìm thấy điều kiện thì xuất lỗi
      if (where.length === 0) {
        dispatch(alertActions.info("Vui lòng chọn điều kiện lọc..."));
        return null;
      }
      let query = dhkhLayer.createQuery();
      query.returnGeometry = false;
      query.outFields = [
        DongHoKhachHangField.OBJECTID,
        DongHoKhachHangField.SoDB,
        DongHoKhachHangField.TenThueBao,
        DongHoKhachHangField.SoNhaMoi,
        DongHoKhachHangField.MaHuyen,
        DongHoKhachHangField.MaXa,
      ];
      query.returnDistinctValues = true;
      query.where = where.join(" AND ");
      query.num = 1000;
      if (skip) {
        query.start = skip;
      }
      const results = await dhkhLayer.queryFeatures(query, params);
      if (!skip) {
        dispatch(
          alertActions.success(
            `Có ${results.features.length} đồng hồ khách hàng`
          )
        );
      }
      const features = results.features;
      for (const feature of features) {
        try {
          feature.attributes = await attributesUtils.convert({
            layer: dhkhLayer,
            attributes: feature.attributes,
          });
        } catch (error) {}
      }
      return features.map((m) => m.attributes as DongHoKhachHang);
    } catch (error) {
      dispatch(alertActions.error(error && error.message));
    } finally {
      dispatch(loading.loadingFinish());
    }
    return null;
  };
};

export const goToDongHoKhachHang = (params: {
  objectId?: number;
  openPopup?: boolean;
  danhBo?: string;
}) => {
  return async (
    dispatch: Dispatch,
    getState: () => AllModelReducer
  ): Promise<boolean> => {
    try {
      dispatch(loading.loadingReady());
      const state = getState();
      const view = state.map.view;
      if (!view) throw new Error("Không xác định được view");

      // lay layer dong ho khach hang
      let dhkhLayer = view.map.findLayerById(
        LAYER.DONG_HO_KHACH_HANG
      ) as __esri.FeatureLayer;
      if (!dhkhLayer)
        throw new Error("Không xác định được lớp đồng hồ khách hàng");

      const { objectId, openPopup, danhBo } = params;
      var where = [];
      if (objectId) {
        where.push(`${DongHoKhachHangField.OBJECTID} = ${objectId}`);
      }
      if (danhBo) {
        where.push(`${DongHoKhachHangField.SoDB} = '${danhBo}'`);
      }

      // nếu khôn tìm thấy điều kiện thì xuất lỗi
      if (where.length === 0) {
        dispatch(alertActions.info("Vui lòng chọn điều kiện lọc..."));
        return false;
      }

      const results = await dhkhLayer.queryFeatures({
        where: where.join(" AND "),
        returnGeometry: true,
        outFields: ["*"],
        outSpatialReference: view.spatialReference,
      });

      if (results.features.length > 0) {
        view.goTo({
          target: results.features,
          scale:
            view.scale > dhkhLayer.minScale ? dhkhLayer.minScale : undefined,
        });

        if (openPopup === true) {
          view.popup.open({
            features: results.features,
            updateLocationEnabled: true,
          });
        }
      } else {
        dispatch(alertActions.error("Đồng hồ này chưa có trong dữ liệu GIS"));
      }

      return true;
    } catch (error) {
      dispatch(alertActions.error(error && error.message));
    } finally {
      dispatch(loading.loadingFinish());
    }
    return false;
  };
};

export const timKiemSanLuong = (params: {
  loaiTruyVan: number;
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
}) => {
  return async (dispatch: Dispatch): Promise<SanLuongKhachHang[] | null> => {
    try {
      dispatch(loading.loadingReady());
      if (params.loaiTruyVan == 1) {
        const response = await layTopSanLuong(params);
        return response;
      } else if (params.loaiTruyVan === 2) {
        const response = await laySanLuong(params);
        return response;
      }
    } catch (error) {
      dispatch(alertActions.error(error && error.message));
    } finally {
      dispatch(loading.loadingFinish());
    }
    return null;
  };
};

export function selectedDHKH(feature?: __esri.Graphic) {
  return (dispatch: Dispatch, getState: () => AllModelReducer) => {
    try {
      dispatch(loading.loadingReady());
      dispatch(alertActions.info(`Đang tải dữ liệu tiêu thụ...`));

      dispatch(alertActions.clear());
    } catch (error) {
      dispatch(alertActions.error(error && error.message));
    } finally {
      dispatch(loading.loadingFinish());
    }
  };
}

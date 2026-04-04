import { Dispatch } from "redux";
import { LAYER } from "../../../constants/map.constant";
import MSG from "../../../constants/MSG";
import Auth from "../../../modules/Auth";
import { alertActions, loading } from "../../main/action";
import { MapSuCoActionType } from "./action-types";
import { MapSuCoAction } from "./EAction";
import { Model, ModelConstant, SEARCH_OUTFIELDS, TrangThai } from "./model";
// Esri
import attributesUtils from "../../../map-lib/attributes.utils";
import FeatureLayer from "../../../map-lib/layers/FeatureLayer";
import hanhChinhUtils from "../../../map-lib/support/HanhChinhUtils";
import { AllModelReducer } from "../../../reducers/main.reducer";

export const setInfos = (datas: any): MapSuCoAction => ({
  type: MapSuCoActionType.INFO_QUERY_SUCCESS,
  datas,
});

/**
 *
 * @param layer Sự cố layer
 */
export const timKiemTheoTrangThai = (code: string) => {
  return (dispatch: Dispatch<any>, getState: () => AllModelReducer) => {
    let wheres: string[] = [];
    const layer = getLayer(getState());

    if (layer) {
      dispatch(loading.loadingReady());
      layer.definitionExpression
        ? wheres.push(`(${layer.definitionExpression})`)
        : null;
      code !== null
        ? wheres.push(`${ModelConstant.TrangThai} = ${code}`)
        : null;
      const query = {
        where: wheres.join(" AND "),
        outFields: SEARCH_OUTFIELDS,
        returnGeometry: false,
        orderByFields: ["TGPhanAnh DESC"],
      };
      queryFeatures({ layer, query, dispatch });
    } else {
      dispatch(alertActions.error(MSG.KHONG_TIM_THAY_LAYER));
    }
  };
};
/**
 *
 * @param layer Sự cố layer
 */
export const timKiem = (where: string) => {
  return (dispatch: Dispatch<any>, getState: () => AllModelReducer) => {
    let wheres: string[] = [];
    const layer = getLayer(getState());

    where ? wheres.push(`${where}`) : null;
    if (layer) {
      dispatch(loading.loadingReady());
      layer.definitionExpression
        ? wheres.push(`(${layer.definitionExpression})`)
        : ["1=1"];
      const query = {
        where: wheres.join(" AND "),
        outFields: SEARCH_OUTFIELDS,
        returnGeometry: false,
        orderByFields: ["TGPhanAnh DESC"],
      };
      queryFeatures({ layer, query, dispatch });
    } else {
      dispatch(alertActions.error(MSG.KHONG_TIM_THAY_LAYER));
    }
  };
};

export const emptyInfos = (): MapSuCoAction => ({
  type: MapSuCoActionType.INFO_QUERY_EMPTY,
});

/**
 * Lưu dữ liệu sự cố
 * @param layer Sự cố layerr
 * @param info Thông tin
 * @param geometry Vị trí
 */
export const phanAnhSuCo = (info: Model, geometry?: __esri.Point) => {
  return async (
    dispatch: Dispatch<any>,
    getState: () => AllModelReducer
  ): Promise<boolean> => {
    const state = getState();
    const layer = getLayer(state);
    const view = state.map.view;
    if (layer && view) {
      try {
        dispatch(loading.loadingReady());
        const user = Auth.getUser(); // Lây user
        if (!geometry) {
          throw new Error("Không xác định vị trí");
        }
        if (!info.DiaChi) {
          throw new Error("Không xác định địa chỉ");
        }
        // lấy dữ liệu hành chính tại điểm tiếp nhận phản ánh
        const hanhChinh = await hanhChinhUtils.getHanhChinhByGeometry(
          view,
          geometry
        );
        if (!hanhChinh) {
          throw new Error("Sự cố không thuộc địa bàn quản lý");
        }
        // tạo attributes
        const attributes = {
          TrangThai: TrangThai.MoiTiepNhan,
          SDTPhanAnh: info.SDTPhanAnh,
          NguoiPhanAnh: info.NguoiPhanAnh,
          DiaChi: info.DiaChi,
          NoiDungPhanAnh: info.GhiChu,
          TGPhanAnh: new Date().getTime(),
          ThongTinPhanAnh: info.ThongTinPhanAnh,
          NguyenNhan: info.NguyenNhan,
          MaPhuongXa: hanhChinh.MaPhuong,
          MaHuyenTP: hanhChinh.MaQuan,
          MaQuan: info.MaQuan,
          MaPhuong: info.MaPhuong,
          created_user: user ? user.username : "",
          created_date: new Date().getTime(),
        } as Model;

        // tạo graphic
        const featureAdd = {
          attributes,
          geometry,
        } as any;

        // cập nhật dữ liệu với service
        const result = await layer.applyEdits({
          addFeatures: [featureAdd],
        });

        if (result.addFeatureResults[0].error) {
          throw new Error(result.addFeatureResults[0].error);
        } else {
          const id = await layIDSuCo(
            layer,
            result.addFeatureResults[0].objectId
          );
          dispatch(alertActions.success("Mã sự cố: " + id)); // thông báo
          dispatch(newIdSuCo(id));
          return true;
        }
      } catch (error) {
        dispatch(alertActions.error(error ? error.message : MSG.CO_LOI_XAY_RA));
        return false;
      } finally {
        dispatch(loading.loadingFinish());
      }
    } else {
      dispatch(alertActions.error(MSG.KHONG_TIM_THAY_LAYER));
      return false;
    }
  };

  function newIdSuCo(id: string): MapSuCoAction {
    return { type: MapSuCoActionType.NEW_ID_SUCO, id };
  }
  function layIDSuCo(layer: FeatureLayer, objectId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      layer
        .queryFeatures({
          where: `OBJECTID = ${objectId}`,
          outFields: [ModelConstant.IDSuCo],
          returnGeometry: false,
        })
        .then((results) => {
          const feature = results.features[0];
          resolve(feature.attributes[ModelConstant.IDSuCo]);
        });
    });
  }
};

export const setLayer = (layer: FeatureLayer) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: MapSuCoActionType.SET_LAYER, layer });
    if (layer) {
      let wheres: string[];
      layer.definitionExpression
        ? (wheres = [`(${layer.definitionExpression})`])
        : (wheres = ["1=1"]);
      const result = await layer.queryFeatures({
        outFields: SEARCH_OUTFIELDS,
        returnGeometry: false,
        orderByFields: ["TGPhanAnh DESC"],
        where: wheres.join(" AND "),
      });

      dispatch(initialItems(result.features.map((m) => m.attributes)));
    } else {
      dispatch(alertActions.error(MSG.KHONG_TIM_THAY_LAYER));
    }
  };
};

export const addItem = (data: Model): MapSuCoAction => ({
  type: MapSuCoActionType.ADD_ITEM,
  data,
});

export const removeItem = (id: string): MapSuCoAction => ({
  type: MapSuCoActionType.REMOVE_ITEM,
  id,
});

/* Used only by actions for sockets */
export const initialItems = (datas: Model[]): MapSuCoAction => ({
  type: MapSuCoActionType.INITIAL_ITEMS,
  datas,
});

export const addNewItemSocket = (data: Model) => {
  return (dispatch: Dispatch, getState: () => AllModelReducer) => {
    getState().mapSuCo.socket.emit("add-item", data);
  };
};

export const removeItemSocket = (id: string) => {
  return (dispatch: Dispatch, getState: () => AllModelReducer) => {
    getState().mapSuCo.socket.emit("remove-item", id);
  };
};

const getLayer = (state: AllModelReducer) => {
  return state.mapSuCo.layer;
};

function queryFeatures(params: {
  layer: FeatureLayer;
  query: {
    where: string;
    outFields: string[];
    returnGeometry: boolean;
    orderByFields: string[];
  };
  dispatch: Dispatch<any>;
}) {
  const { layer, query, dispatch } = params;
  layer
    .queryFeatures(query)
    .then(async (results) => {
      for (const feature of results.features) {
        try {
          feature.attributes = await attributesUtils.convert({
            layer,
            attributes: feature.attributes,
            maPhuong: "MaPhuong",
            maQuan: "MaQuan",
          });
        } catch (error) {}
      }
      dispatch(setInfos(results));
    })
    .catch((_) => dispatch(alertActions.error(MSG.CO_LOI_XAY_RA)))
    .always(() => dispatch(loading.loadingFinish()));
}

export function luuGiaoViec(nvGiaoViec: string | null) {
  return async (
    dispatch: Dispatch,
    getState: () => AllModelReducer
  ): Promise<boolean> => {
    try {
      // lấy lớp dữ liệu
      dispatch(loading.loadingReady());
      const view = getState().map.view;
      if (!view) throw new Error("");
      const diemSuCoLYR = view.popup.selectedFeature
        .layer as __esri.FeatureLayer;
      const idDiemSuCo = view.popup.selectedFeature.attributes.OBJECTID;

      // tạo đối tượng cập nhật
      const attributes = {
        objectId: idDiemSuCo,
        NVXuLy: nvGiaoViec,
        TrangThai: TrangThai.DangSua,
        TGGiaoXuLy: new Date().getTime(),
      };

      // cập nhật
      const result = await diemSuCoLYR.applyEdits({
        updateFeatures: [{ attributes } as __esri.Graphic],
      });
      // nếu xảy ra lỗi
      if (result.updateFeatureResults[0].error) {
        dispatch(loading.loadingFinish());
        throw new Error(result.updateFeatureResults[0].error);
      } else {
        dispatch(alertActions.success("Giao việc thành công"));
        dispatch(loading.loadingFinish());
      }

      return true;
    } catch (err) {
      dispatch(alertActions.error(err));
      dispatch(loading.loadingFinish());
      return false;
    } finally {
      dispatch(loading.loadingFinish());
    }
  };
}

export function listDiemSuCo(setWhere: string | null) {
  return async (
    dispatch: Dispatch,
    getState: () => AllModelReducer
  ): Promise<__esri.FeatureSet | undefined> => {
    let wheres: string[];
    const view = getState().map.view;
    if (!view) throw new Error("");
    // lấy lớp dữ liệu
    const suCoLYR = view.map.findLayerById(LAYER.DIEM_SU_CO) as FeatureLayer;
    suCoLYR.definitionExpression
      ? (wheres = [`(${suCoLYR.definitionExpression})`])
      : (wheres = ["1=1"]);
    setWhere ? wheres.push(setWhere) : null;

    if (suCoLYR) {
      try {
        // dispatch(loading.loadingReady());
        const result = await suCoLYR.queryFeatures({
          outFields: SEARCH_OUTFIELDS,
          returnGeometry: false,
          orderByFields: ["TGPhanAnh DESC"],
          where: wheres.join(" AND "),
          //where: `TrangThai='` + TrangThai.MoiTiepNhan + `'`
        });

        //dispatch(loading.loadingFinish());
        return result;
      } catch (err) {
        dispatch(alertActions.error(err));
        //dispatch(loading.loadingFinish());
        return undefined;
      } finally {
        //dispatch(loading.loadingFinish());
      }
    }
  };
}

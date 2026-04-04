import { Dispatch } from 'redux';
import { API_URL } from '../../../appconfig';
import { LAYER } from '../../../constants/map.constant';
import { AllModelReducer } from '../../../reducers/main.reducer';
import { alertActions, loading } from '../../main/action';
import MauQuanTrac from './models/MauQuanTrac';
import QueryTask = require('esri/tasks/QueryTask');
import Query = require('esri/tasks/support/Query');

export function getMonitoring(idDiemDanhGia: string | null) {
  return async (
    dispatch: Dispatch,
    getState: () => AllModelReducer
  ): Promise<__esri.FeatureSet | null> => {
    let mauKiemNghiem: __esri.FeatureSet | null = null;
    try {
      dispatch(loading.loadingReady());
      const layer = getLayer(getState());
      if (idDiemDanhGia) {
        var queryTask = new QueryTask({
          url: layer.url + '/' + LAYER.INDEX_MAU_KIEM_NGHIEM_TBL,
        });
        var queryTable = new Query();
        queryTable.returnGeometry = false;
        queryTable.outFields = ['*'];
        queryTable.where = `IDDiemDanhGia=` + "'" + idDiemDanhGia + "'";
        queryTable.orderByFields = ['NgayCapNhat DESC'];
        mauKiemNghiem = await queryTask.execute(queryTable);
      }
    } catch (error) {
      dispatch(alertActions.error(error && error.message));
    } finally {
      dispatch(loading.loadingFinish());
    }
    return mauKiemNghiem;
  };
}

export function themMoiQuanTrac(attributes: MauQuanTrac) {
  return async (
    dispatch: Dispatch,
    getState: () => AllModelReducer
  ): Promise<boolean> => {
    try {
      dispatch(loading.loadingReady());
      const layer = getLayer(getState());
      dispatch(alertActions.info(`Đang thêm mới quan trắc, vui lòng chờ...`));
      let form = new FormData();
      let url =
        layer.url + '/' + LAYER.INDEX_MAU_KIEM_NGHIEM_TBL + '/applyEdits';
      form.append('f', 'json');
      form.append('adds', JSON.stringify([{ attributes }]));
      const requestOptions = {
        method: 'POST',
        headers: {},
        body: form,
      };
      const result = await fetch(url, requestOptions);
      if (!result.ok) {
        throw new Error('Lỗi');
      }
     
      attributes.IDDiemDanhGia &&     dispatch(capNhatCanhBaoVuot(attributes.IDDiemDanhGia) as any);
    
      dispatch(alertActions.success(`Thêm mới thành công`));
      return false;
    } catch (error) {
      dispatch(alertActions.error(error && error.message));
    } finally {
      dispatch(loading.loadingFinish());
    }
    return true;
  };
}
export function capNhatQuanTrac(objectId: number, attributes: MauQuanTrac,idDiemDanhGia:string) {
  return async (
    dispatch: Dispatch,
    getState: () => AllModelReducer
  ): Promise<boolean> => {
    try {
      dispatch(loading.loadingReady());
      const layer = getLayer(getState());
      dispatch(alertActions.info(`Đang cập nhật quan trắc, vui lòng chờ...`));
      let form = new FormData();
      let url =
        layer.url + '/' + LAYER.INDEX_MAU_KIEM_NGHIEM_TBL + '/applyEdits';
      form.append('f', 'json');

      form.append(
        'updates',
        JSON.stringify([{ attributes: { ...attributes, objectId } }])
      );
      const requestOptions = {
        method: 'POST',
        headers: {},
        body: form,
      };
      const result = await fetch(url, requestOptions);
      if (result && !result.ok) {
        throw new Error('Lỗi');
      }
      setTimeout(() => {
        dispatch(capNhatCanhBaoVuot(idDiemDanhGia) as any);
      }, 1000);
     
      dispatch(alertActions.success(`Cập nhật thành công`));
      return true;
    } catch (error) {
      dispatch(alertActions.error(error && error.message));
    } finally {
      dispatch(loading.loadingFinish());
    }
    return false;
  };
}
export function xoaQuanTrac(objectId: number,idDiemDanhGia:string) {
  return async (
    dispatch: Dispatch,
    getState: () => AllModelReducer
  ): Promise<boolean> => {
    try {
      if (!objectId) {
        dispatch(alertActions.error('Không xác định được objectId'));
      }
      dispatch(loading.loadingReady());
      const layer = getLayer(getState());
      let form = new FormData();
      let url =
        layer.url + '/' + LAYER.INDEX_MAU_KIEM_NGHIEM_TBL + '/applyEdits';
      form.append('f', 'json');
      form.append('deletes', JSON.stringify(objectId));
      const requestOptions = {
        method: 'POST',
        headers: {},
        body: form,
      };
      const result = await fetch(url, requestOptions);
      if (result && !result.ok) {
        throw new Error('Lỗi');
      }
      dispatch(capNhatCanhBaoVuot(idDiemDanhGia) as any);
      dispatch(alertActions.success(`Xóa thành công`));
      return true;
    } catch (error) {
      dispatch(alertActions.error(error && error.message));
    } finally {
      dispatch(loading.loadingFinish());
    }
    return false;
  };
}

export function capNhatCanhBaoVuot(idDiemDanhGia:string) {
  return async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(loading.loadingReady());
      dispatch(
        alertActions.info(`Đang cập nhật lại cảnh báo vượt, vui lòng chờ...`)
      );
      // tao doi tuong graphic cap nhat thong qua mảng objectid
      const response = await fetch(
        API_URL + '/chat-luong-nuoc/capnhatvuotnguong/' + idDiemDanhGia,{method:'POST'}
      );
      if (response.ok) {
        dispatch(alertActions.info(`Cập nhật thành công`));
      } else {
        throw '';
      }

      return true;
    } catch (error) {
      dispatch(alertActions.error(error && error.message));
    } finally {
      dispatch(loading.loadingFinish());
    }
    return false;
  };
}

export type ResponseLoadDanhSach = {
  count: number;
  features: __esri.Graphic[];
};
export function getLayer(state: AllModelReducer): __esri.FeatureLayer {
  const view = state.map.view;
  if (view) {
    const layer = view.map.findLayerById(
      LAYER.DiemDanhGiaLYR
    ) as __esri.FeatureLayer;
    // kiem tra co ton tai lop du lieu hien trang su dung dat hay khong
    if (layer) {
      return layer;
    } else {
      // neu khong co thi bao loi
      throw new Error('Không xác định được lớp dữ liệu điểm đánh giá');
    }
  } else {
    throw new Error(`Không xác định được view engine`);
  }
}

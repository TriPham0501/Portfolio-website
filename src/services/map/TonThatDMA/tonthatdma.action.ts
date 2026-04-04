import { Dispatch } from 'redux';
import { khachHangMatNuoc } from './api/khachhangmatnuoc.api';
import { KhachHangMatNuoc } from './models/khachhangmatnuoc.model';
import { AllModelReducer } from '../../../reducers/main.reducer';
import { LAYER } from '../../../constants/map.constant';
import { DongHoKhachHangField } from '../SanLuongKhachHang/models/donghokhachhang.model';
import HighlightGraphic from '../../../map-lib/support/HighlightGraphic';
import { loading, alertActions } from '../../main/action';

let highlight: HighlightGraphic|null =null;
/**
 * Lấy danh sách khách hàng mất nước
 * @param params Thời gian khách hàng mất nước
 */
export const layKhachHangMatNuoc = (params: { tuNgay?: Date, denNgay?: Date, isHighlight?: boolean }) => {
  return async (dispatch: Dispatch, getState: () => AllModelReducer): Promise<KhachHangMatNuoc[] | null> => {
    try {
      dispatch(loading.loadingReady());
      highlight && highlight.clear();
      const { tuNgay, denNgay } = params;
      if (!tuNgay) throw new Error('Vui lòng chọn thời gian');
      const result = await khachHangMatNuoc({ tuNgay, denNgay });

      // highlight khach hang mat nuoc len ban do
      if (result.length > 0 && params.isHighlight === true) {
        // truy van geometry de highlight
        const state = getState();
        if (state.map.view) {
          const dhkhLayer = state.map.view.map.findLayerById(LAYER.DONG_HO_KHACH_HANG) as __esri.FeatureLayer;
          if (dhkhLayer) {
            // tao cau lenh where thong qua du lieu danh ba
            let where = `${DongHoKhachHangField.DBDongHoNuoc} in (${result.map(m => `'${m.DanhBa}'`).join(',')})`;
            const features = (await dhkhLayer.queryFeatures({
              where,
              returnGeometry: true,
              outSpatialReference: state.map.view.spatialReference,
              outFields: []
            })).features;
            if (features.length > 0) {
              // khoi tao highlight neu chua duoc khoi toa
              !highlight && (highlight = new HighlightGraphic(state.map.view));
              highlight.addAll(features);
              state.map.view.goTo(features);
            }
          } else {
            throw new Error('Không xác định được lớp dữ liệu đồng hồ khách hàng');
          }
        }
      }

      return result;
    } catch (error) {
      dispatch(alertActions.error(error && error.message));
    } finally {
      dispatch(loading.loadingFinish());
    }
    return null;
  }
}
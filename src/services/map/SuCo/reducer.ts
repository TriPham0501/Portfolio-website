import {
  AuthActionType,
  MapSuCoActionType,
} from "../../../actions/action-types";
// import FeatureLayer from "../../../map-lib/layers/FeatureLayer";
import { MapSuCoAction } from "./EAction";
import { Model as SuCoModel, ThongKe, TrangThai } from "./model";
export type Model = {
  chartData: ThongKe[];
  // infoDatas?: __esri.FeatureSet;
  newIDSuCo?: string;
  // socket: SocketIOClient.Socket;
  // layer?: FeatureLayer;
  items: SuCoModel[];
  modelSelected?: SuCoModel;
};

export const defaultState: Model = {
  chartData: [
    {
      name: "Chưa sửa",
      value: 1,
      code: TrangThai.MoiTiepNhan,
    },
    {
      name: "Đã sửa",
      value: 1,
      code: TrangThai.HoanThanh,
    },
    {
      name: "Đang sửa",
      value: 1,
      code: TrangThai.DangSua,
    },
  ],
  // socket: {} as any,
  items: [],
  // modelSelected:{NVTiepNhan:'Hồ Phương Hiếu',TGPhanAnh:new Date().getTime(),
};

function reducer(state: Model = defaultState, action: MapSuCoAction): Model {
  switch (action.type) {
    // case MapSuCoActionType.INFO_QUERY_SUCCESS:
    //   return { ...state, infoDatas: action.datas };
    // case MapSuCoActionType.INFO_QUERY_EMPTY:
    //   return { ...state, infoDatas: undefined };
    // case MapSuCoActionType.NEW_ID_SUCO:
    //   return { ...state, newIDSuCo: action.id };
    // case MapSuCoActionType.SET_LAYER:
    //   return { ...state, layer: action.layer as FeatureLayer };
    case MapSuCoActionType.INITIAL_ITEMS:
      let newChart = capNhatChart(action.datas);
      return { ...state, items: action.datas, chartData: newChart };
    case MapSuCoActionType.ADD_ITEM:
      return { ...state, items: [...state.items, action.data] };
    case MapSuCoActionType.REMOVE_ITEM:
      var items = [...state.items];
      const index = state.items.findIndex((f) => f.IDSuCo === action.id);
      if (index > -1) {
        items.splice(index, 1);
      }
      return { ...state, items };
    case AuthActionType.LOGOUT as any:
      return defaultState;
    default:
      return state;
  }
}

function capNhatChart(datas: SuCoModel[]) {
  let newChart = defaultState.chartData.slice();
  newChart.forEach((f) => {
    f.value = datas.filter((filter) => filter.TrangThai === f.code).length;
  });
  return newChart;
}

export default reducer;

import { combineReducers } from 'redux';
import mainReducer, { defaultState as mainState, Model as MainModel } from '../services/main/reducer';
import mapReducer, { defaultState as mapState, Model as MapModel } from '../services/map/reducer';
import mapSuCoReducer, { defaultState as mapSuCoState, Model as MapSuCoModel } from '../services/map/SuCo/reducer';



export type AllModelReducer = {
  main: MainModel,
  map: MapModel,
  mapSuCo: MapSuCoModel,
  

};

export const initialState: AllModelReducer = {
  main: mainState,
  map: mapState,
  mapSuCo: mapSuCoState,

};
const reducers = () => combineReducers({
  main: mainReducer,
  map: mapReducer,
  mapSuCo: mapSuCoReducer,
  
});

export default reducers;

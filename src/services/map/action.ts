import { MapActionType } from '../../actions/action-types';
import { Dispatch } from 'redux';
import LayerInfo from '../../models/LayerInfo';
import { getLayerInfos as api } from '../../services/api/layerApi';

//ESRI
import EsriMap = require('esri/Map');
import MapView = require('esri/views/MapView');
import {
  MAP as CST_MAP
} from '../../constants/map.constant';
import Map = require('esri/Map');
import { MSG_MAP } from '../../constants/MSG';
import { loading, alertActions } from '../main/action';
import {MapAction} from './EAction';
import Basemap = require('esri/Basemap');
import Satellite from '../../map-lib/layers/SatelliteLayer';
import { SpatialReference } from 'esri/geometry';
import WebTileLayer = require('esri/layers/WebTileLayer');
import TileLayer = require('esri/layers/TileLayer');

export const getLayerInfos = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(request());
    dispatch(loading.loadingReady());
    api()
      .then(data => {
        dispatch(success(data));
        dispatch(loading.loadingFinish());
      })
      .catch(err => {
        dispatch(failure(err || MSG_MAP.LAYERINFO_FAIL))
        dispatch(loading.loadingFinish());
        dispatch(alertActions.error(err || MSG_MAP.LAYERINFO_FAIL));
      });
  }
  function request(): MapAction { return { type: MapActionType.LAYERINFO_REQUEST } }
  function success(layerInfos: LayerInfo[]): MapAction { return { type: MapActionType.LAYERINFO_SUCESS, layerInfos } }
  function failure(error: string): MapAction { return { type: MapActionType.LAYERINFO_FAIL, error } }
}

export const setView = (view: __esri.MapView | __esri.SceneView): MapAction => ({
  type: MapActionType.VIEW_INIT, view
});




export const initViewDiv = (div: HTMLDivElement) => {
  return (dispatch: Function) => {
    dispatch(initViewDiv(div));
    const map = new EsriMap({ basemap: 'hybrid' });
    const view = new MapView({
      map,
      container: div,
      center: CST_MAP.CENTER,
      zoom: CST_MAP.ZOOM,
      ui: {
        components: ['zoom']
      }
    });
    // let basemap = new Basemap({
    //   baseLayers: [
    //     new Satellite({})
    //   ],
    //   id: 'hybrid',
    //   title: 'Ảnh vệ tinh',
    //   thumbnailUrl: '/arcgis-js-api/images/basemap/hybrid.jpg'
    // });
    // map.basemap = basemap;
    dispatch(setView(view));
    dispatch(getLayerInfos());
  }

  function initViewDiv(div: HTMLDivElement): MapAction {
    return { type: MapActionType.VIEWDIV_INIT, div }
  }
}


export const initViewDivGMap = (div: HTMLDivElement) => {
  return (dispatch: Function) => {
    dispatch(initViewDiv(div));
    const map = new Map({basemap:'hybrid'})
    
    const view = new MapView({
      center:  CST_MAP.CENTER,
      // scale: CST_MAP.ZOOM,
      zoom: CST_MAP.ZOOM,
      map,
      container: div,
      ui: {
        components: ['zoom']
      }
    });
    view.when(()=>{
      let basemap = new Basemap({
      baseLayers: [
        new Satellite({})
      ],
      id: 'hybrid',
      title: 'Ảnh vệ tinh',
      // thumbnailUrl: 'https://mt1.google.com/vt/lyrs=m&x={col}&y={row}&z={level}',
      thumbnailUrl: 'https://mt1.google.com/vt/lyrs=y&x={col}&y={row}&z={level}',
      spatialReference: SpatialReference.WebMercator,
    });
    map.basemap = basemap;
    })
    dispatch(setView(view));
    dispatch(getLayerInfos());
  }

  function initViewDiv(div: HTMLDivElement): MapAction {
    return { type: MapActionType.VIEWDIV_INIT, div }
  }
}

export const errorAlert = (message: string) => {
  return (dispatch: Function) => {
    dispatch(alertActions.error(message))
  }
}

export const initViewDivOptimize = (div: HTMLDivElement) => {
  return (dispatch: Function) => {
    dispatch(initViewDiv(div));
    const map = new EsriMap();
    const view = new MapView({
      map,
      container: div,
      ui: {
        components: ['zoom']
      }
    });
    dispatch(setView(view));
    dispatch(getLayerInfos());
  }

  function initViewDiv(div: HTMLDivElement): MapAction {
    return { type: MapActionType.VIEWDIV_INIT, div }
  }
}
// export const initViewDiv = (div: HTMLDivElement): MapAction => ({
//   type: MapActionType.VIEWDIV_INIT, div
// })

export * from './SuCo/action';
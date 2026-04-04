export interface Dataset {
  datasetId: string; datasetName: string;
}
export default interface LayerInfo {
  layerId: string;
  layerName: string;
  isView: boolean;
  isCreate: boolean;
  isDelete: boolean;
  isEdit: boolean;
  isVisible: boolean;
  OutFields: string;
  QueryFields: string;
  EditFields: string;
  definition?: string;
  url: string;
  dataset?: Dataset;
}
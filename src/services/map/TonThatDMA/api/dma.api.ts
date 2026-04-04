import IService from '../../../api/IService';
import { DMA, DMAField } from '../models/dma.model';
type Params = {
  layer: __esri.FeatureLayer
};
export class DMAApi implements IService<DMA, string> {
  getById(id: string): Promise<DMA> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<DMA[]> {
    const features = (await this.layer.queryFeatures({ where: '1=1', outFields: [DMAField.MADMA, DMAField.TENDMA], returnGeometry: false })).features;
    return features.map(m => m.attributes as DMA);
  }

  async getAllWithGeometry(params: { outSpatialReference?: __esri.SpatialReference }): Promise<__esri.Graphic[]> {
    const features = (await this.layer.queryFeatures(
      {
        where: '1=1',
        outFields: [DMAField.MADMA, DMAField.TENDMA],
        returnGeometry: true,
        outSpatialReference:params.outSpatialReference
      })).features;
    return features;
  }

  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  add(model: DMA): Promise<DMA> {
    throw new Error("Method not implemented.");
  }
  update(id: string, model: DMA): Promise<DMA> {
    throw new Error("Method not implemented.");
  }
  private layer: __esri.FeatureLayer;
  constructor(params: Params) {
    this.layer = params.layer;
  }

}
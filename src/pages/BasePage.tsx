import * as React from 'react';
import BaseComponent, { BaseProps } from '../components/BaseComponent';
import authService from '../services/api/AuthServices';
import { ApplicationInfo } from '../services/map/models/Application';



export type PageProps = {
  id: string,
} & BaseProps;

type State = {
};

export default class BasePage<P={}, S = {}> extends BaseComponent<PageProps & P, S & State>
{
  protected appInfo: ApplicationInfo | null = null;
  constructor(props: PageProps & P) {
    super(props);
  }

  protected async getAppInfo(isAnonymous = false): Promise<ApplicationInfo> {
    if (!this.appInfo) {
      this.appInfo = await authService.getAppInfo(this.props.id,isAnonymous);
    }
    return this.appInfo;
  }
}
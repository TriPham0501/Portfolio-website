import * as React from 'react';
import { APPLICATION } from '../constants/app.constant';

// const  QuanLyMangLuoiPage = React.lazy(()=>import('../pages/QuanLyMangLuoiPage'));
// const  QuanLySanLuongKhachHangPage = React.lazy(()=>import('../pages/QuanLySanLuongKhachHangPage'));
// const  TNSCPage = React.lazy(()=>import('../pages/TNSCPage'));
const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'));



export interface Route {
  id: string;
  name: string;
  component?: any;
  props?: { math?: boolean; exact?: boolean; path: string };
  avatar?: string;
  isPrivate?: boolean;
  externalLink?: string;
  order?: number;
  /**
   * default = false
   */
  isEnabled?: boolean;
}

const routes: Array<Route> = [
  // {
  //   id: APPLICATION.QuanLyMangLuoi, name: 'Quản lý mạng lưới', component: QuanLyMangLuoiPage,
  //   props: { exact: true, path: '/thao-tac-mang-luoi' },
  //   avatar: '/images/icons/qlhtkt.png',isPrivate:true
  // },
  // {
  //   id: APPLICATION.TiepNhanSuCo, name: 'Tiếp nhận sự cố', component: TNSCPage,
  //   props: { path: '/tiep-nhan-su-co' },
  //   avatar: '/images/icons/tnsc.png',isPrivate:true
  // },
  {
    id: APPLICATION.Home, name: 'Home', component: HomePage,
    props: { path: '/home' },
    avatar: '/images/icons/tnsc.png', isPrivate:true
  }

  
];
export default routes;

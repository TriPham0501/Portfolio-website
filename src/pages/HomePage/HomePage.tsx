import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import PageBanner from "../../components/NavHeader/PageBanner";
import BasePage from '../BasePage';
import HeadDownloadSection from './components/HeadDownloadSection';
import IntroSection from './components/IntroSection';
import AboutSection from './components/AboutSection';
import TechnologySection from './components/TechnologySection';
import JourneySection from './components/JourneySection';
import ConnectionSection from './components/ConnectionSection';
import ProjectSection from './components/ProjectSection';

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  header: {
  },
  container: {
    flex: '1 1 auto',
    height: 'calc(100vh - 64px)'
  }
});

const homePageRootStyle: React.CSSProperties = {
  boxSizing: 'border-box',
  fontFamily: 'Inter',
  ['--primary-color' as string]: '#3490dc',
  ['--secondary-color' as string]: '#9561e2',
  ['--text-color' as string]: '#333',
  ['--bg-color' as string]: '#fff',
};

type States = {
  isLoadLayers: boolean // kiểm tra đã tải lớp dữ liệu?
  , isShowLayerListSelect: boolean,
  layerIds: string[] // layer được phép hiển thị
};

type Props = WithStyles<typeof styles>;


class HomePage extends BasePage<Props, States> {
  render() {
    return (
      <div style={homePageRootStyle}>
        <PageBanner />
        <div id="main">
          <HeadDownloadSection />

          <div className="slider relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/dark-theme.jpg')" }}>
            <IntroSection />
            <AboutSection />
          </div>

          <ConnectionSection />

          <TechnologySection />
          <JourneySection />
          <ProjectSection />
          
          {/* <ConnectionSection /> */}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);

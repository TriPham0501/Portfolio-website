import * as React from 'react';
import { StyleRulesCallback, WithStyles, withStyles} from '@mui/styles';
import { Typography, CircularProgress } from '@mui/material';
import routes from '../modules/routers';
import { withRouter, RouteComponentProps } from 'react-router';
import { CONFIG } from '../appconfig';
const styles: StyleRulesCallback<any, any, 'root' | 'logoTitle' | 'progress' | 'logoDesignBy'> = (theme) => ({
  root: {
    background: `url('${CONFIG.backgroundUrl}') no-repeat center center fixed`,
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    'background-size': 'cover',
    width: '100%', height: '100vh',
    top: 0, left: 0,
    position: 'absolute',
    zIndex: 99999999,
  },
  logoTitle: {
    width: '100%',
    height: 300,
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    textAlign: 'center',
    '& .logo': {
      width: 150, height: 150
    },
    '& .title': {
      fontSize: 38,
      color: 'white',
      marginTop: 12,
      textTransform: 'uppercase',
    }
  },
  progress: {
    position: 'absolute',
    width: 500,
    height: 50,
    margin: 'auto',
    top: 70,
    right: 0,
    bottom: 0,
    left: 0
  },
  logoDesignBy: {
    position: 'absolute',
    width: 100,
    height: 70,
    right: 20,
    bottom: 20,
  }
});
const CustomizeCircularProgress = withStyles({
  root: {
    height: `150px !important`,
    width: `150px !important`,
    position: 'absolute'
  }
})(CircularProgress);

type Props = {
  progress?: boolean
}
  & WithStyles<typeof styles>
  & RouteComponentProps<any>;

class LoadingPage extends React.Component<Props, {}> {
  render() {
    const { classes, progress } = this.props;

    return <div className={classes.root}>
      <div className={classes.logoTitle}>
        {progress && <CustomizeCircularProgress color="primary" />}
        <img className="logo" src={CONFIG.logoUrl} />
        <Typography className="title">{this.getTitle()}</Typography>
      </div>
      {/* <img className={classes.logoDesignBy} src="images/logo-ditagis.png" /> */}
    </div>
  }


  getTitle = () => {
    let title = '';
    var route = routes.find(f => f.props && f.props.path.startsWith(this.props.location.pathname));
    if (route) {
      title = route.name;
    }
    return title;
  }
}

export default withStyles(styles)(withRouter(LoadingPage));
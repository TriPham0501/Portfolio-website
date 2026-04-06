//React
import * as React from 'react';
import { Route, Redirect, Switch, withRouter, RouteComponentProps, Link } from 'react-router-dom';

//Component
import LoginPage from './LoginPage';
import ChangePasswordPage from './DoiMatKhauPage';

import LoadingPage from './LoadingPage';
import NotFound from './NotFound';
import MenuPage from './MenuPage';
import NotAccess from './NotAccess';
import LogoutFunction from './LogoutFunction';
import PrivateComponent from '../components/PrivateComponent';;
import {
  // LinearProgress
  createStyles,
  WithStyles, withStyles
} from '@mui/styles';

import { Snackbar, SnackbarContent } from '@mui/material';
import routes from '../modules/routers';

//Redux
import { connect } from 'react-redux';
import { AllModelReducer } from '../reducers/main.reducer';
import { alertActions } from '../services/main/action';
import { Alert } from '../services/main/model';
//Module

const styles = () => createStyles({
  progress: {
    width: '100%',
    position: 'fixed',
    zIndex: 999999
  }
});

type StateToProps = {
  loading: boolean,
  authenticated: boolean,
  alert: Alert,
  isShowLoadingPage: boolean,
};
type DispatchToProps = {
  clearAlert: () => void

};

type Props = {
} & DispatchToProps & StateToProps & WithStyles<typeof styles> & RouteComponentProps<any>;

type State = {
}

class AppPage extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}
  }

  private handleClose = () => {
    this.props.clearAlert();
  };

  render() {
    const { loading, alert, authenticated, isShowLoadingPage,
      classes
    } = this.props;


    const childLoading = <div className={classes.progress}>
      {/* <LinearProgress /> */}
    </div>;

    const childSnackbar = <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={alert.message != undefined}
      autoHideDuration={alert.type && alert.type === 'error' ? undefined : 6000}
      onClose={this.handleClose}
    >
      {alert.type &&
        <SnackbarContent
          // onClose={this.handleClose}
          message={alert.message}
        />
      }
    </Snackbar>;

    const childRoutes = routes
      .filter(f => f.component)
      .map(m =>
        <Route
          {...m.props}
          key={m.id}
          exact
          render={_ => {
            const component = m.isPrivate ?
              <PrivateComponent
                Component={m.component}
                id={m.id}
              />
              :
              <m.component id={m.id} />;
            return component
          }
          } />);

    return (
      <div>
        {loading && childLoading}
        {childSnackbar}
        {isShowLoadingPage && <LoadingPage progress={true} />}
        <React.Suspense fallback={<LoadingPage progress={true} />}>
          <Switch>
            {childRoutes}
            <Route
              path="/login"
              render={props => (
                authenticated ? (
                  <Redirect
                    path="/login"
                    to={{
                      pathname: '/',
                      state: { from: props.location }
                    }}
                  />
                ) : (
                    <LoginPage />
                  )
              )}
            />
            {/* <Route exact path="/" render={_ => (
              <Redirect to="/home" />
            )} /> */}
            <Route path="/logout" component={LogoutFunction} />
            <Route path="/notaccess" component={NotAccess} />
            <Route path="/doi-mat-khau" component={ChangePasswordPage} />
            <Route component={NotFound} />
           
          </Switch>
        </React.Suspense>
      </div>
    );
  }

  componentDidMount() {

  }
}

const mapStatesToProps = (state: AllModelReducer): StateToProps => ({
  loading: state.main.loading,
  authenticated: state.main.loggingIn,
  alert: state.main.alert,
  isShowLoadingPage: state.main.isShowLoadingPage,
});
const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  clearAlert: () => dispatch(alertActions.clear())
});

export default withRouter(connect(mapStatesToProps, mapDispatchToProps)(withStyles(styles)(AppPage)));

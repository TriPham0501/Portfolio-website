import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import MetriItemComponent from "../components/MenuPage/MetroItem";
import FooterComponent from "../components/MenuPage/Footer";
import routes, { Route } from "../modules/routers";
import { alertActions, loading } from "../services/main/action";
import { connect } from "react-redux";
import MSG from "../constants/MSG";
import BasePage, { PageProps } from "./BasePage";
import Auth from "../modules/Auth";
import { CONFIG } from "../appconfig";

const COLORS = [
  "#b33939",
  "#218c74",
  "#33d9b2",
  "#ff793f",
  "#f1c40f",
  "#8e44ad",
  "#f39c12",
  "#3498db",
];
import * as lodash from "lodash";
import authService from "../services/api/AuthServices";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: `url(${CONFIG.backgroundUrl}) no-repeat center center fixed`,
      "-webkit-background-size": "cover",
      "-moz-background-size": "cover",
      "-o-background-size": "cover",
      "background-size": "cover",
      width: "100%",
      minHeight: "100vh",
      position: "relative",
    },
    titleContainer: {
      textAlign: "center",
      padding: 10,
    },
    logo: {
      width: 360,
      height: 170,
    },
    title: {
      transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
      boxSizing: "border-box",
      fontFamily: "Roboto, sans-serif",
      fontWeight: 700,
      textShadow: "2px 2px #9E9E9E",
      color: "#fff",
    },
    titleMain: {
      // color: theme.palette.primary.main,
      fontSize: 35,
    },
    titleSub: {
      // color: theme.palette.secondary.main,
      fontSize: 30,
    },
    metroContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      paddingBottom: 50,
      "& a": {
        textDecoration: "none",
      },
    },
  });

type States = {
  routes: Route[];
};

type DispatchToProps = {
  alert: (message: string) => void;
  loading: (show: boolean) => void;
};

type Props = {} & DispatchToProps & WithStyles<typeof styles> & PageProps;
class MenuPage extends BasePage<Props, States> {
  private CloneColors: string[] = [];
  constructor(props: Props) {
    super(props);
    this.state = { routes: [] };
    this.CloneColors = [...COLORS];
  }

  async componentDidMount() {
    // lấy quyền để hiển thị chức năng
    try {
      var _routes: Route[] = [];
      if (!Auth.isUserAuthenticated()) {
        _routes = routes.filter((f) => !f.isPrivate);
      } else {
        const capabilities = await authService.getCapabilities();
        this.props.loading(true);
        capabilities &&
          capabilities.forEach((m) => {
            var r = routes.find((f) => f.id === m && f.isPrivate);
            if (r) {
              _routes.push(r);
            }
          });
      }

      _routes = _routes.filter(
        (f) => f.isEnabled === true || f.isEnabled === undefined
      );

      _routes = lodash.sortBy(_routes, (s) => s.order);

      this.setState({ routes: _routes });
    } catch (error) {
      this.props.alert(error || MSG.CO_LOI_XAY_RA);
    } finally {
      this.props.loading(false);
    }
  }

  private randomColor() {
    const index = Math.floor(Math.random() * (this.CloneColors.length - 1));
    let color = this.CloneColors[index];
    this.CloneColors.splice(index, 1);
    return color;
  }

  render() {
    const { classes } = this.props;
    const { routes } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.titleContainer}>
          <br />
          <img className={classes.logo} src={CONFIG.logoUrl} alt="Logo" />
          <br />
          <br />
          <div className={classes.title}>
            <div className={classes.titleMain}>{CONFIG.titleMain}</div>
            <div className={classes.titleSub}>
              <p>{CONFIG.titleSub}</p>
            </div>
          </div>
        </div>
        <div className={classes.metroContainer}>
          {routes.map((m) => (
            <MetriItemComponent
              key={m.id}
              title={m.name}
              icon={m.avatar}
              path={
                m.props
                  ? m.props.path
                  : m.externalLink
                  ? m.externalLink
                  : "/404"
              }
              isExternal={Boolean(m.externalLink)}
              backgroundColor={this.randomColor()}
            />
          ))}
          {!Auth.isUserAuthenticated() && (
            <MetriItemComponent
              title="Đăng nhập"
              icon="/images/icons/login.png"
              path="/login"
              backgroundColor={this.randomColor()}
            />
          )}
          {Auth.isUserAuthenticated() && (
            <MetriItemComponent
              title="Đổi mật khẩu"
              icon="/images/icons/update-password.png"
              path="/doi-mat-khau"
              backgroundColor={this.randomColor()}
            />
          )}
          {Auth.isUserAuthenticated() && (
            <MetriItemComponent
              title="Đăng xuất"
              icon="/images/icons/logout.png"
              path="/logout"
              backgroundColor={this.randomColor()}
            />
          )}
        </div>
        <FooterComponent />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  alert: (message: string) => dispatch(alertActions.error(message)),
  loading: (show: boolean) =>
    show ? dispatch(loading.loadingReady()) : dispatch(loading.loadingFinish()),
});
export default connect(null, mapDispatchToProps)(withStyles(styles)(MenuPage));

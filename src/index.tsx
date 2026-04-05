// import "./modules/mapConfig";

// React
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppPage from "./pages/App";

// Redux
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import createRootReducer, { initialState } from "./reducers/main.reducer";

// App
import * as moment from "moment/moment";
import { CONFIG } from "./appconfig";

import { RootId } from "./constants/app.constant";
import { mapConfig } from "./constants/map.constant";
import "./css/tailwind.css";
import "./css/index.scss";
import routes, { Route } from "./modules/routers";
import authService from "./services/api/AuthServices";

moment.locale("vi");
// LOGGING
// Sentry.init({
//   dsn: "https://ba38334919274e11a7e384cf4528de70@sentry.io/1365472"
//  });

// TODO: API connection temporarily disabled
// authService.getAppInfo(RootId, true).then((result) => {
//   if (!result.config) {
//     throw new Error("Không xác định được config webroot");
//   }
//   if (!result.config.mapConfig) {
//     throw new Error("Không xác định được mapConfig");
//   }
//   if (!result.config.webRouters) {
//     throw new Error("Không xác định được webRouters");
//   }
//   Object.assign(CONFIG, result.config);
//   Object.assign(mapConfig, result.config.mapConfig);
//   for (const route of result.config.webRouters as Array<Route>) {
//     if (route) {
//       const baseRoute = routes.find((f) => f.id === route.id);
//       if (baseRoute) {
//         Object.assign(baseRoute, route);
//       } else {
//         routes.push(route);
//       }
//     }
//   }
//   if (result.config.primaryColor) {
//     document.documentElement.style.setProperty(
//       "--primary-color",
//       result.config.primaryColor
//     );
//   }
//   if (result.config.secondaryColor) {
//     document.documentElement.style.setProperty(
//       "--secondary-color",
//       result.config.secondaryColor
//     );
//   }

  // MUI THEME
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2596be",
      },
      secondary: {
        main: "#207a9b",
      },
    },
    typography: {
      useNextVariants: true,
    },
    overrides: {
      MuiMenuItem: {
        root: {
          fontSize: 14,
        },
      },
      MuiTab: {
        root: {
          minWidth: "unset",
        },
      },
      MuiCardContent: {
        root: {
          padding: "0 16px",
        },
      },
      MuiInputLabel: {
        root: {
          fontSize: 12,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          "-webkit-line-clamp": 1,
          "-webkit-box-orient": "vertical",
        },
      },
    },
  });

  // REDUX

  const middleWares = [thunkMiddleware];

  process.env.NODE_ENV !== "production" && middleWares.push(loggerMiddleware);

  const store = createStore(
    createRootReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(...middleWares))
  );

  // RENDER
  const root = createRoot(document.querySelector("#root")!);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppPage />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
  );
// });

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"
import AdminLogInDialog from "src/components/AdminLogInDialog"
import AppContainer from "src/components/AppContainer"
import { AppContextProvider } from "src/contexts/AppContext"
// import "styles/fonts.css"
// import "styles/globals.css"
import "../styles/index.scss";
import "../styles/vendor/index.scss"
import { SWRConfig } from "swr"
import defaultTheme from '../src/theme'
import AuthProvider from "../src/providers/AuthProvider";
import Footer from "../src/component/Footer";
import Layout from "../src/layout/Layout";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";



export default function MyApp({ Component }) {

  const [widthRatio, setWidthRatio] = useState(1);
  const [heightRatio, setHeightRatio] = useState(1);

  const setRatioFunction = () => {
    if (window.innerWidth <= 1080) {
      setWidthRatio(window.innerWidth / 1080);
      setHeightRatio(window.innerHeight / 1920);
    } else {
      setWidthRatio(window.innerWidth / 1920);
      setHeightRatio(window.innerHeight / 1080);
    }
  };

  useEffect(async () => {
    await setWidthRatio(window.innerWidth <= 1080 ? window.innerWidth / 1080 : window.innerWidth / 1920)
    await setHeightRatio(window.innerWidth <= 1080 ? window.innerHeight / 1920 : window.innerHeight / 1080)
    window.addEventListener("resize", setRatioFunction);
    return () => window.removeEventListener("resize", setRatioFunction);
  }, []);

  const theme = {
    ...defaultTheme,
    widthRatio,
    heightRatio,
  };


  return (
    <div>
      <SWRConfig value={{ provider: () => new Map() }}>
        <AppContextProvider>
          {/* <AppContainer> */}
          <StylesProvider injectFirst>
            <MuiThemeProvider theme={theme}>
              <ThemeProvider theme={theme}>
                <AuthProvider>
                  <Layout>
                    <Component />
                    <Footer />
                    <AdminLogInDialog />
                  </Layout>

                </AuthProvider>
              </ThemeProvider>
            </MuiThemeProvider>
          </StylesProvider>
          {/* </AppContainer> */}
        </AppContextProvider>
      </SWRConfig>
    </div>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType,
}

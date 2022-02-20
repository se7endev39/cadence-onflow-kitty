import React, { createContext, useContext } from 'react'

import useLogin from "src/hooks/useLogin"
import useCurrentUser from 'src/hooks/use-current-user.hook'
import styled from "styled-components";
import ReactFullpage from "@fullpage/react-fullpage";

// const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const logIn = useLogin()
  const [user, loggedIn, tools] = useCurrentUser()
  const LoginPageWrapper = styled.div`
  .fullpage-wrapper {
    > div {
      background-size: 100% 100%;

      .fp-tableCell {
        display: block;
        height: 100vh !important;
      }

      h1 {
        font-size: ${(props) => props.theme.widthRatio * 40}px;
        color: #fec100;
        font-family: Orbitron-Black;
        text-shadow: ${(props) => props.theme.widthRatio * 7}px
          ${(props) => props.theme.heightRatio * 7}px
          ${(props) => props.theme.widthRatio * 10}px #00000091;
        text-transform: uppercase;
      }

      p {
        font-size: ${(props) => props.theme.widthRatio * 30}px;
        color: #80f1ed;
        font-family: Orbitron-Medium;
        text-shadow: ${(props) => props.theme.widthRatio * 7}px
          ${(props) => props.theme.heightRatio * 7}px
          ${(props) => props.theme.widthRatio * 10}px;
        line-height: ${(props) => props.theme.heightRatio * 36}px;

        a {
          color: #80f1ed;
        }
      }

      img {
        width: fit-content;
      }

      button {
        background-image: url("/static/images/bg/pages/landing-page/button-bg.png");
        background-size: 100% 100%;
        background-color: transparent;
        width: ${(props) => props.theme.widthRatio * 430}px;
        height: ${(props) => props.theme.widthRatio * 158}px;
        border: none;
        font-size: ${(props) => props.theme.widthRatio * 38}px;
        color: #fec100;
        font-family: Orbitron-Black;
        text-shadow: 0 0 ${(props) => props.theme.widthRatio * 7}px #00000059;
        padding-top: ${(props) => props.theme.heightRatio * 7}px;
        outline: none;
      }

      @media (max-width: 1080px) {
        h1 {
          font-size: ${(props) => props.theme.widthRatio * 50}px;
          line-height: ${(props) => props.theme.heightRatio * 60}px;
        }
        p {
          font-size: ${(props) => props.theme.widthRatio * 40}px;
          line-height: ${(props) => props.theme.heightRatio * 48}px;
        }
        button {
          width: ${(props) => props.theme.widthRatio * 577}px;
          height: ${(props) => props.theme.heightRatio * 153}px;
          font-size: ${(props) => props.theme.widthRatio * 65}px;
          padding-top: ${(props) => props.theme.heightRatio * 12}px;
        }
      }
    }

    .section {
      height: 100vh !important;
    }

    .section-1 {
      background-image: url('/static/images/bg/layout/layout-bg.png');

      .logo {
        width: ${(props) => props.theme.widthRatio * 540}px;
        height: ${(props) => props.theme.heightRatio * 182}px;
        margin-left: ${(props) => props.theme.widthRatio * 79}px;
        margin-top: ${(props) => props.theme.heightRatio * 7 + 50}px;
      }

      h1 {
        margin-top: ${(props) => props.theme.heightRatio * 100}px;
        margin-bottom: ${(props) => props.theme.heightRatio * 27}px;
        max-width: ${(props) => props.theme.widthRatio * 895}px;
      }

      p:first-of-type {
        max-width: ${(props) => props.theme.widthRatio * 958}px;
        margin-bottom: ${(props) => props.theme.heightRatio * 36}px;
      }

      button {
        margin-top: ${(props) => props.theme.heightRatio * 33}px;
      }


      @media (max-width: 1080px) {
        background-image: url('/static/images/bg/layout/layout-bg.png');

        .logo {
          width: ${(props) => props.theme.widthRatio * 730}px;
          height: ${(props) => props.theme.heightRatio * 245}px;
          margin-left: ${(props) => props.theme.widthRatio * 60}px;
          margin-top: ${(props) => props.theme.heightRatio * 118}px;
        }

        h1 {
          margin-top: ${(props) => props.theme.heightRatio * 130}px;
          margin-bottom: ${(props) => props.theme.heightRatio * 90}px;
          max-width: ${(props) => props.theme.widthRatio * 798}px;
        }

        p:first-of-type {
          max-width: ${(props) => props.theme.widthRatio * 872}px;
          margin-bottom: ${(props) => props.theme.heightRatio * 45}px;
        }

        p:nth-of-type(2) {
          max-width: ${(props) => props.theme.widthRatio * 796}px;
          margin-bottom: ${(props) => props.theme.heightRatio * 53}px;
        }

        button {
          margin-top: ${(props) => props.theme.heightRatio * 50}px;
          width: ${(props) => props.theme.widthRatio * 577}px;
          height: ${(props) => props.theme.heightRatio * 253}px;
        }
      }
    }
  }
`;

  if (!user || !loggedIn) return (
    <>
      <LoginPageWrapper>
      <ReactFullpage
        scrollingSpeed={1000}
        scrollHorizontally={true}
        className="landing-page"
        autoScrolling={true}
        render={() => {
          return (
            <ReactFullpage.Wrapper>
              <div className={`section-1 section 'd-flex' flex-column`}>
                <img
                  src={`/static/images/logo/logo-color.png`}
                  className="logo animation-fadeIn"
                  alt="logo"
                />
                <div className="content-wrapper d-flex flex-column align-items-center">
                  <div className="d-flex flex-column align-items-center animation-slideUp">
                    <h1 className="text-center">
                      Log In
                    </h1>
                  </div>
                  <button
                    className="hover-effect1 animation-bigEntrance"
                    onClick={logIn}
                  >
                    Sign In
                  </button>
                  <button
                    className="hover-effect1 animation-bigEntrance"
                    onClick={logIn}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

            </ReactFullpage.Wrapper>
          );
        }}
      />
    </LoginPageWrapper>
    </>
  )

  return (
    <>
      {children}
    </>
  )
}

// export const useAuth = () => {
//   return useContext(AuthContext)
// }

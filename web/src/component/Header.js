import React, { useState } from "react";
// import { useLocation } from "react-router";
import styled from "styled-components";
import { useRouter } from "next/router"
import HeaderDropdown from "../components/HeaderDropdown"
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import HeaderMessage from "../components/HeaderMessage"
import HeaderFLOWBalance from "../components/HeaderFLOWBalance"
import useAppContext from "../hooks/useAppContext"
import useLogin from "../hooks/useLogin"
import { paths } from "../global/constants"
import useFLOWBalance from "../hooks/useFLOWBalance"
import { formattedCurrency } from "../util/currency"
import * as fcl from "@onflow/fcl"
// import { a } from "react-router-dom";

// import { useAuth } from '../providers/AuthProvider'
// import { useUser } from '../providers/UserProvider'

const Header = () => {

  const {currentUser, isLoggedInAsAdmin} = useAppContext()
  const { data: flowBalance, isLoading } = useFLOWBalance(currentUser?.addr)

  const router = useRouter()
  const logIn = useLogin()
  const isAdminPath = router.pathname === paths.adminMint



  const [mobileMenu, setMobileMenu] = useState(false);
  const [balance, setBalance] = useState();

  const location = router;
  
  const switchToAdminView = () => {
    if (isLoggedInAsAdmin) {
      router.push(paths.adminmintpage)
    } else {
      router.push(paths.adminloginpage)
    }
  }

  
  const signOut = () => {
    fcl.unauthenticate()
  }
  const getCurrentUrl = (location) => {
    return location.pathname.split(/[?#]/)[0];
  };

  const checkIsActive = (location, url) => {
    const current = getCurrentUrl(location);
    if (!current || !url) {
      return false;
    }

    if (url === "/collection/CollectionPage/" && current === "/") {
      return true;
    }

    if (current === url || (current === "/" && url === "home")) {
      return true;
    }

    return current.indexOf(url) > -1;
  };

  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "active" : "";
  };

  const getMenuName = () => {

    if (getMenuItemActive("/collection/CollectionPage/")) {
      return "Collection";
    }

    if (getMenuItemActive("/collection/CollectionMePage")) {
      return "My Items";
    }
    if (getMenuItemActive("/collection/CollectionListPage")) {
      return "Listed Items";
    }
    if (getMenuItemActive("admin-login")) {
      return "Admin Login";
    }
    if (getMenuItemActive("logout")) {
      return "LogOut";
    }


    return "";
  };


  return (
    <>
      <HeaderMessage />
      <HeaderWrapper className="header-menu d-flex justify-content-center animation-stretchRight">
        <ul className="desktop-menu-nav list-unstyled">
          <li className={`menu-item ${getMenuItemActive("/collection/CollectionPage/")} hover-effect2`}>
            <a className="menu-a" exact href="/">
              <span className="menu-text">Collection</span>
            </a>
          </li>
          <li className={`menu-item ${getMenuItemActive("/collection/CollectionMePage")} hover-effect2`}>
            <a className="menu-a" href="/collection/CollectionMePage">
              <span className="menu-text">My Items</span>
            </a>
          </li>
          <li className={`menu-item ${getMenuItemActive("/collection/CollectionListPage")} hover-effect2`}>
            <a className="menu-a" href="/collection/CollectionListPage">
              <span className="menu-text">Listed Items</span>
            </a>
          </li>
          {!!currentUser && (
            <li
              className={`menu-item ${getMenuItemActive(
                "unlock-wallet"
              )} hover-effect2`}
            >
              <a className="menu-a" href={"/"}>
                <span className="menu-text">
                  {formattedCurrency(flowBalance)} FLOW
                </span>
              </a>
            </li>
          )}
          <li className={`menu-item ${getMenuItemActive("admin-login")} hover-effect2`}>
            <a className="menu-a" href={isLoggedInAsAdmin ? "/admin/adminmint" : "/admin/adminlogin" } onClick={switchToAdminView}>
              <span className="menu-text">Admin</span>
            </a>
          </li>
          {currentUser ? (
            <li className={`menu-item ${getMenuItemActive("logout")} hover-effect2`}>
              <a className="menu-a" onClick={signOut} href="/">
                <span className="menu-text">LogOut</span>
              </a>
            </li>
          ) : (
            <li className={`menu-item ${getMenuItemActive("logout")} hover-effect2`}>
              <a className="menu-a" onClick={logIn} href="/">
                <span className="menu-text">LogIn</span>
              </a>
            </li>
          )}
        </ul>
        <ul className="mobile-menu-nav list-unstyled">
          <li className="menu-item">
            <div className="menu-a">
              {!mobileMenu ? (
                <MenuIcon onClick={(e) => setMobileMenu(true)} />
              ) : (
                <CloseIcon onClick={(e) => setMobileMenu(false)} />
              )}
              <span className="menu-text">{getMenuName()}</span>
            </div>
          </li>
          {mobileMenu && (
            <div className="mobile-menu" onClick={(e) => setMobileMenu(false)}>
              <a className={`${getMenuItemActive("/collection/CollectionPage/")}`} exact href="/">Collection</a>
              <a className={`${getMenuItemActive("/collection/CollectionMePage")}`} href="/collection/CollectionMePage">My Items</a>
              <a className={`${getMenuItemActive("/collection/CollectionListPage")}`} href="/collection/CollectionListPage">Listed Items</a>
              <a className={`${getMenuItemActive("admin")}`} href="/admin-login">Admin</a>
              <a className={`${getMenuItemActive("logout")}`} href="/" onClick={() => logOut()}>Logout</a>
            </div>
          )}
        </ul>
      </HeaderWrapper>
    </>
  );
};

const HeaderWrapper = styled.div`
  .menu-item {
    height: 50px;
    margin-right: -17.5px;
    text-align: center;
    background-size: 100% 100%;

    .menu-a {
      height: 100%;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;

      .menu-text {
        color: #000000;
        font-size: 1rem;
        line-height: 2rem;
        font-family: Orbitron-Medium;
        margin-left: -3.17px;
        margin-top: -4.66px;
        display: inline-block;
        text-shadow: 3.5px 4.67px 2.1px
          ${(props) => props.theme.darken("#277875", 0.5)};
      }
    }

    &.active {
      .menu-a {
        .menu-text {
          color: #fec100;
          font-weight: 900;
        }
      }
    }
  }

  .desktop-menu-nav {
    margin-left: -18px;
    margin-bottom: 0px;
    display: flex;

    @media screen and (max-width: 1024px) {
      display: none;
    }

    .menu-item {

      background-image: url("/static/images/bg/components/header/menu-item-2-bg.png");
      width: 149.22px;

      &.active {
        background-image: url("/static/images/bg/components/header/menu-item-2-bg--active.png");
      }

      &:nth-of-type(1) {
        background-image: url("/static/images/bg/components/header/menu-item-1-bg.png");
        width: 145.53px;

        &.active {
          background-image: url("/static/images/bg/components/header/menu-item-1-bg--active.png");
        }
      }
    }
  }

  .mobile-menu-nav {
    display: none;
    padding: 10px 20px 5px 10px;
    height: 50px;
    box-sizing: border-box;

    @media screen and (max-width: 1024px) {
      display: flex;
      flex-direction: row;
      width: 100vw;
      max-width: 100%;
    }

    .menu-item {
      flex: 1;

      svg {
        margin-top: -10px;
      }

      .menu-text {
        margin-top: -10px;
      }

      &:nth-of-type(1) {
        background-image: url("/static/images/bg/components/header/menu-item-1-bg.png");
        padding-left: 15px;

        .menu-text {
          flex: 1;
        }
      }

      &:nth-of-type(2) {
        background-image: url("/static/images/bg/components/header/menu-item-5-bg.png");
        &.active {
          background-image: url("/static/images/bg/components/header/menu-item-5-bg--active.png");
        }
      }
    }

    .mobile-menu {
      position: absolute;
      width: 100vw;
      max-width: 100%;
      height: calc(100vh - 60px);
      background: #000;
      opacity: 0.9;
      z-index: 500;
      left: 0px;
      top: 55px;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      padding-top: 100px;

      a {
        font-size: 2rem;
        line-height: 3rem;
        color: #80f1ed;
        font-family: Orbitron-Black;
        text-shadow: 4px 4px 2.7px #27787580;
        margin-top: 10px;

        &.active {
          color: #fec100;
        }
      }
    }
  }
`;

export default Header;

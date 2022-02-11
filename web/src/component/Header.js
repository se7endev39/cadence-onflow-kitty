import React, {  useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import { NavLink } from "react-router-dom";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const location = useLocation();
  const getCurrentUrl = (location) => {
    return location.pathname.split(/[?#]/)[0];
  };

  const checkIsActive = (location, url) => {
    const current = getCurrentUrl(location);

    if (!current || !url) {
      return false;
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

    if (getMenuItemActive("collections")) {
      return "Collection";
    }

    if (getMenuItemActive("collection-me")) {
      return "My Collection";
    }

    return "";
  };


  return (
    <HeaderWrapper className="header-menu d-flex justify-content-center animation-stretchRight">
      <ul className="desktop-menu-nav list-unstyled">
        <li className={`menu-item ${getMenuItemActive("collections")} hover-effect2`}>
          <NavLink className="menu-link" exact to="/collections">
            <span className="menu-text">Collection</span>
          </NavLink>
        </li>
        <li className={`menu-item ${getMenuItemActive("collection-me")} hover-effect2`}>
          <NavLink className="menu-link" to="/collection-me">
            <span className="menu-text">My Collection</span>
          </NavLink>
        </li>
      </ul>
      <ul className="mobile-menu-nav list-unstyled">
        <li className="menu-item">
          <div className="menu-link">
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
            <NavLink className={`${getMenuItemActive("collections")}`} exact to="/collections">Collection</NavLink>
            <NavLink className={`${getMenuItemActive("collection-me")}`} to="/collection-me">My Collection</NavLink>
          </div>
        )}
      </ul>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  .menu-item {
    height: 50px;
    margin-right: -17.5px;
    text-align: center;
    background-size: 100% 100%;

    .menu-link {
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
      .menu-link {
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

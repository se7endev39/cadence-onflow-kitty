import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <a
        href="https://t.me/dibbs_channel"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`/static/images/icons/logo1.png`}
          alt="dibbs Telegram"
          width="40"
        />
      </a>
      <a
        href="https://twitter.com/Dibbs"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`/static/images/icons/logo3.png`} alt="dibbs Twitter" width="40"/>
      </a>
      <a
        href="https://discord.gg/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`/static/images/icons/logo2.png`} alt="dibbs Discord" width="40"/>
      </a>
      <a
        href="https://dibbs.medium.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`/static/images/icons/logo4.png`} alt="dibbs Medium" width="40"/>
      </a>
      <a
        href="https://info.uniswap.org/pair/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`/static/images/icons/uniswap.png`} alt="dibbs Uniswap" width="40"/>
      </a>
      <a
        href="https://opensea.io/collection/dibbs"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`/static/images/icons/opensea.png`} alt="dibbs Opensea" width="37"/>
      </a>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 100px;
  box-sizing: border-box;

  img {
    margin-left: 10px;
    margin-right: 10px;
  }
`;
export default Footer;

import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import SectionTitle, { MenuWrapper } from "../../src/component/SectionTitle";
import styled from "styled-components";
import useAppContext from "../../src/hooks/useAppContext"

export default function  CollectionDetails () {
  const {isLoggedInAsAdmin, logInAdmin} = useAppContext()

  const [password, setPassword] = useState("");

  
  const onApprove = () =>{
    if(password === "dibbsitem")
    {
      logInAdmin();
    }
  }
  return (
    <>
    
    <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="ADMIN LOGIN" long />
    </MenuWrapper>
    <BoostStakeWrapper>
      <div className="token">{"Dibbs Items Admin"}</div>
      <span
        target="_blank"
        className="token-link"
        rel="noopener noreferrer"
      >
        {"Enter administrator password (PSST... dibbsitem)"}
      </span>
      <div className="section">
        <div className="row">
          <input
            className="amount"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
          <button className="action approve" onClick={onApprove}>
            Approve
          </button>
      </div>
      </BoostStakeWrapper>
    </>
  );
};

const BoostStakeWrapper = styled.div`
  width: 380px;
  min-height: 553.58px;
  background: url("/static/images/bg/components/card/card-border.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 26px 46px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;

  .token {
    font-family: Orbitron-Black;
    text-shadow: 0px 10px 5px #fec10080;
    color: #fec100;
    font-size: 1.7rem;
    margin-bottom: 10px;
    margin-top: -3rem;
  }

  .token1 {
    font-family: Orbitron-Black;
    text-shadow: 0px 10px 5px #fec10080;
    color: #fec100;
    font-size: 1.4rem;
    margin-bottom: 10px;
  }

  .token-link {
    font-family: Orbitron-Black;
    text-shadow: 0px 10px 5px #fec10080;
    color: #fec100;
    font-size: 0.8rem;
    margin-bottom: 10px;
    text-decoration: none;
    text-align: center;
    margin-top: 0.5rem;
  }

  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .block {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 3px solid #80f1ed;
    box-shadow: 0px 5px 3px #80f1ed80;
    width: 100%;
    margin-bottom: 15px;
  }

  .row {
    display: flex;
    justify-content: center;
    width: 100%;

    font-family: Orbitron-Medium;
    font-size: 1.1rem;
    padding-top: 4px;
    padding-bottom: 4px;

    .title {
      color: #80f1ed;
      text-shadow: 5px 5px 3px #80f1ed80;
      padding-right: 5px;
    }

    .value {
      font-family: Orbitron-Black;
      color: #fec100;
      text-shadow: 5px 5px 3px #fec10080;
    }

    .action {
      flex: 1;
      border: none;
      outline: none;
      height: 60px;
      font-family: Orbitron-Black;
      font-size: 15px;

      &.approve {
        background: url("/static/images/bg/components/card/button-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;

        &:hover {
          background: url("/static/images/bg/components/card/button-bg--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }

      &.stake {
        background: url("/static/images/bg/components/card/button-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;

        &:hover {
          background: url("/static/images/bg/components/card/button-bg--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }

      &.unstake {
        background: url("/static/images/bg/components/card/button-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-top: -20px;

        &:hover {
          background: url("/static/images/bg/components/card/button-bg--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }

      &.claim {
        background: url("/static/images/bg/components/card/button-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-top: -15px;

        &:hover {
          background: url("/static/images/bg/components/card/button-bg--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }
    }

    .fee-label {
      font-family: Orbitron-Medium;
      color: #fec100;
    }

    .amount {
        background: #fa27ca;
        border: none;
        font-size: 20px;
        text-align: center;
        height: 45px;
      }
    }

    .str {
      height: 65px;
      width: 65px;
      border: 4px solid #e182ea;
      margin-left: 5px;
      font-family: Orbitron-Black;
      color: #fec100;
      text-align: center;
      box-sizing: border-box;
    }
  }
`;


import React from "react";
import { useEffect, useState } from 'react'
import { withRouter } from "react-router";

import CardCollectionDetails from "../../src/component/Card/CardCollectionDetails";
import SectionTitle, { MenuWrapper, CollectionWrapper } from "../../src/component/SectionTitle";

import { myCollection } from "../../src/tempData/data";
// import { useUser } from '../../src/providers/UserProvider'

export default function CollectionMe () {
  // const { userDappies, sellDibbs } = useUser()
  const [userDappies, setuserDappies] = useState([]);
  const onBuyCollect = async (card) => {
    
    console.log(card.id, card.price);
    try {
      // await sellDibbs(card.id, card.price);
      history.push('/collections');
    } catch (error) {
      console.log(error)
      history.push('/collections');
    }
  }

  return (
    <>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="My Collection" long />
      </MenuWrapper>

      <CollectionWrapper>
        {
          userDappies?.map((item) =>
            <CardCollectionDetails
              key={item.id}
              templateKeyId={item.id}
              name={item.name}
              card={item}
              onBuyCollect={onBuyCollect}
              price_d
              price_f
              amount={item.amount}
              isSell
            />
          )
        }
      </CollectionWrapper>
    </>
  );
};


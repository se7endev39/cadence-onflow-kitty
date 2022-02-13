import React from "react";
import { useEffect, useState } from 'react'
import { withRouter } from "react-router";

import CardCollectionDetails from "../../src/component/Card/CardCollectionDetails";
import SectionTitle, { MenuWrapper, CollectionWrapper } from "../../src/component/SectionTitle";

import { myCollection } from "../../src/tempData/data";

import useAppContext from "../../src/hooks/useAppContext"
import useListings from "../../src/hooks/useListings"

export default function CollectionMe () {

  const { currentUser } = useAppContext()
  const address = currentUser?.addr

  const {data: itemIds, isLoading} = useListings(address)

  console.log('itemIds',itemIds)
  // const [userDappies, setuserDappies] = useState([]);
  // const onBuyCollect = async (card) => {
    
  //   console.log(card.id, card.price);
  //   try {
  //     // await sellDibbs(card.id, card.price);
  //     history.push('/collections');
  //   } catch (error) {
  //     console.log(error)
  //     history.push('/collections');
  //   }
  // }

  return (
    <>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="Listed Items" long />
      </MenuWrapper>

      <CollectionWrapper>
        {
          itemIds?.map((item) =>
            <CardCollectionDetails
              key={item.id}
              templateKeyId={item.id}
              name={item.name}
              card={item}
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


import React from "react";
import { useEffect, useState } from 'react'
import { withRouter } from "react-router";

import CardCollectionDetails from "../../src/component/Card/CardCollectionDetails";
import SectionTitle, { MenuWrapper, CollectionWrapper } from "../../src/component/SectionTitle";
import useAccountItems from "../../src/hooks/useAccountItems"
import useApiListings from "../../src/hooks/useApiListings"

import useAppContext from "../../src/hooks/useAppContext"

import { myCollection } from "../../src/tempData/data";
// import { useUser } from '../../src/providers/UserProvider'

export default function CollectionMe () {
  
  
  const { currentUser } = useAppContext()
  const address = currentUser?.addr
  // // const { userDappies, sellDibbs } = useUser()
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

  const {listings, isLoading: isListingsLoading} = useApiListings({
    owner: address,
  })
  const {data: itemIds, isAccountItemsLoading} = useAccountItems(address)
  console.log('itemids',itemIds)
  const isLoading =
    isListingsLoading || isAccountItemsLoading || !listings || !itemIds

  if (isLoading) return null

  const listingItemIds = listings.map(listing => listing.itemID)
  const itemIdsNotForSale = itemIds?.filter(id => !listingItemIds.includes(id))
  
  console.log('itemIdsNotForSale',itemIdsNotForSale)

  return (
    <>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="My Items" long />
      </MenuWrapper>

      <CollectionWrapper>
        {
          itemIdsNotForSale?.map((item) =>
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


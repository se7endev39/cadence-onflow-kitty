import React from "react";
import { useEffect, useState } from 'react'
import { withRouter } from "react-router";

import CardCollectionDetails from "../../src/component/Card/CardCollectionDetails";
import SectionTitle, { MenuWrapper, CollectionWrapper } from "../../src/component/SectionTitle";
import useAccountItems from "../../src/hooks/useAccountItems"
import useApiListings from "../../src/hooks/useApiListings"

import useAppContext from "../../src/hooks/useAppContext"
import ListItems from "../../src/component/Card/ListItems"
import { myCollection } from "../../src/tempData/data";

export default function CollectionMe () {
  
  
  const { currentUser } = useAppContext()
  const address = currentUser?.addr

  const {listings, isLoading: isListingsLoading} = useApiListings({
    owner: address,
  })
  const {data: itemIds, isAccountItemsLoading} = useAccountItems(address)
  const isLoading =
    isListingsLoading || isAccountItemsLoading || !listings || !itemIds

  if (isLoading) return null

  const listingItemIds = listings.map(listing => listing.itemID)
  const itemIdsNotForSale = itemIds?.filter(id => !listingItemIds.includes(id))
  

  return (
    <>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="My Items" long />
      </MenuWrapper>

      <CollectionWrapper>
        <ListItems
          items={itemIdsNotForSale.map(id => ({itemID: id, owner: address}))}
        />
      </CollectionWrapper>
    </>
  );
};


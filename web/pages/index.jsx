import React from "react";
import {  useState } from 'react'

import CardCollectionDetails from "../src/component/Card/CardCollectionDetails";
import SectionTitle, { MenuWrapper, CollectionWrapper } from "../src/component/SectionTitle";

import useApiListings from "../src/hooks/useApiListings"
import {storeItemsSelector,publicItemsSelector} from "../src/global/selectors"
import ListItem from "../src/component/Card/ListItem"
import publicConfig from "../src/global/publicConfig"
export default function Collection () {
  
  const {listings} = useApiListings()
  const storeItems = storeItemsSelector(listings)
  const publicItems = publicItemsSelector(listings)
  const onBuyCollect = (item) => {
    history.push('/collections/' + item.templateID);
  }
  return (
    <>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="Last Items" long />
      </MenuWrapper>

      <CollectionWrapper>
        {
          storeItems?.map((item) => 
            <ListItem
              address={publicConfig.flowAddress}
              id={item.itemID}
              price={item.price}
              listingId={item.resourceID}
              size="sm"
              isPurchase={true}
              isStoreItem={true}
            />
          )
        }
      </CollectionWrapper>

      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="My Items" long />
      </MenuWrapper>

      <CollectionWrapper>
        {
          publicItems?.map((item) => 
            <ListItem
              // key={`${item.itemID}-${item.resourceID}`}
              address={item.owner}
              id={item.itemID}
              price={item.price ? parseFloat(item.price) : undefined}
              listingId={item.resourceID}
              isPurchase={true}
              showOwnerInfo={true}
            />
          )
        }
      </CollectionWrapper>
    </>
  );
};

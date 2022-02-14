import React from "react";
import { useEffect, useState } from 'react'
import { withRouter } from "react-router";

import CardCollectionDetails from "../../src/component/Card/CardCollectionDetails";
import SectionTitle, { MenuWrapper, CollectionWrapper } from "../../src/component/SectionTitle";

import { myCollection } from "../../src/tempData/data";

import useAppContext from "../../src/hooks/useAppContext"
import useListings from "../../src/hooks/useListings"
import Listing from "../../src/component/Card/Listing"

export default function CollectionMe () {

  const { currentUser } = useAppContext()
  const address = currentUser?.addr

  const {data: itemIds, isLoading} = useListings(address)

  console.log('itemIds',itemIds)

  return (
    <>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="Listed Items" long />
      </MenuWrapper>

      <CollectionWrapper>
        {itemIds?.map(id => (
          <Listing key={id} address={address} id={id} showOwnerInfo={true} />
        ))}
      </CollectionWrapper>
    </>
  );
};


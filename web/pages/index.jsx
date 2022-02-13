import React from "react";
import { useEffect, useState } from 'react'
import { withRouter } from "react-router";

import CardCollectionDetails from "../src/component/Card/CardCollectionDetails";
import SectionTitle, { MenuWrapper, CollectionWrapper } from "../src/component/SectionTitle";

import { query } from '@onflow/fcl'
// import { LIST_DAPPY_TEMPLATES } from '../../src/flow/dappy/list-dappy-templates.script'
// import { MINT_DAPPY } from "../../flow/mint-dappy.tx";
// import { GET_LISTINGS } from '../../flow/get_listings.script'
// import { useAuth } from '../../providers/AuthProvider'
import useApiListings from "../src/hooks/useApiListings"
import {storeItemsSelector,publicItemsSelector} from "../src/global/selectors"
export default function Collection () {
  
  const [dibbs, setDibbs] = useState([]);

  const {items} = useApiListings()
  const storeItems = storeItemsSelector(items)
  const publicItems = publicItemsSelector(items)

  const onBuyCollect = (item) => {
    history.push('/collections/' + item.templateID);
  }
  // useEffect(() => {
  //   const fetchDappyTemplates = async () => {
  //     try {
  //       // let res = await query({ cadence: LIST_DAPPY_TEMPLATES })
  //       // // let res = await query({
  //       // //   cadence: GET_LISTINGS,
  //       // //   args: (arg, t) => [
  //       // //     arg(user?.addr, t.Address)
  //       // //   ]
  //       // // })
  //       // setDibbs(Object.values(res));
  //       // console.log(res, 'ress----');
  //     } catch (err) {
  //       console.log('fetchdappy erros',err)
  //     }
  //   }
  //   fetchDappyTemplates()
  // }, [])

  // useEffect(() => {
  //   console.log('dibbs ------', dibbs, dibbs.map(item => item))
  // }, [dibbs])
  return (
    <>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="Last Items" long />
      </MenuWrapper>

      <CollectionWrapper>
        {
          storeItems?.map((item) => 
            <CardCollectionDetails
              name = {item.name}
              card={item}
              onBuyCollect={onBuyCollect}
              price_d = {item.price}
              price_f
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
            <CardCollectionDetails
              name = {item.name}
              card={item}
              onBuyCollect={onBuyCollect}
              price_d = {item.price}
              price_f
            />
          )
        }
      </CollectionWrapper>
    </>
  );
};

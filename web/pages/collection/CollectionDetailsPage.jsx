import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useParams } from 'react-router-dom'

import CardCollectionDetails from "../../component/Card/CardCollectionDetails";
import SectionTitle, { MenuWrapper, CollectionWrapper } from "../../component/SectionTitle";

import { query } from '@onflow/fcl'
// import { LIST_DAPPY_TEMPLATES } from '../../flow/list-dappy-templates.script'
// import { useUser } from '../../providers/UserProvider'

export default function CollectionDetails  () {
  const param = useParams()
  const { collectID } = param;
  const [dappy, setDappy] = useState(null);
  const { userDappies, mintDappy } = useUser()
  useEffect(() => {
    const fetchDappyTemplates = async () => {
      try {
        let res = await query({ cadence: LIST_DAPPY_TEMPLATES })
        setDappy(res[collectID]);
      } catch (err) {
      }
    }
    fetchDappyTemplates()

  }, [collectID]);


  const onBuyCollect = async (item) => {
    console.log(dappy.templateID,dappy.price);
    await mintDappy(dappy.templateID,dappy.price);
    history.push('/collection-me');
  }



  return (
    <>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="Collection" long />
      </MenuWrapper>
      <CollectionWrapper>
        { dappy && 
          <CardCollectionDetails
            key={dappy.id}
            card={dappy}
            name
            details
            price_d
            price_f
            onBuyCollect={onBuyCollect}
          />
        }
      </CollectionWrapper>
    </>
  );
};


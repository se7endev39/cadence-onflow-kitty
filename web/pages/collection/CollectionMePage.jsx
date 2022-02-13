import React from "react";
import { withRouter } from "react-router";

import CardCollectionDetails from "../../component/Card/CardCollectionDetails";
import SectionTitle, { MenuWrapper, CollectionWrapper } from "../../component/SectionTitle";

import { myCollection } from "../../tempData/data";
import { useUser } from '../../providers/UserProvider'

const CollectionMe = ({ history }) => {
  const { userDappies, sellDibbs } = useUser()

  const onBuyCollect = async (card) => {
    console.log(card.id, card.price);
    try {
      await sellDibbs(card.id, card.price);
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

export default withRouter(CollectionMe);

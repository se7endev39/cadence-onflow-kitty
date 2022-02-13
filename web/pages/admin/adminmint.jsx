import React, { useState } from "react";
import { withRouter } from "react-router";
import { mutate, query, tx, authz } from '@onflow/fcl'

// import { useParams } from 'react-router-dom'

import AdminMint from "../../src/component/Card/AdminMint";
import SectionTitle, { MenuWrapper, CollectionWrapper } from "../../src/component/SectionTitle";
// import { MINT_CARD_ITEM } from "../../src/flow/mint_card_item.script"
// import { MINT_KITTY_ITEM } from "../../src/flow/mint_kitty_item.script"
// import { useAuth } from '../../providers/AuthProvider'
// import { useTxs } from '../../providers/TxProvider'
import { args } from '../../src/util/dibbs.mint.data'
import useMintAndList from "../../src/hooks/useMintAndList"

// import MinterLoader from "../../component/admin/MinterLoader"
export default function CollectionDetails () {
  const ITEM_DIBBS_COUNT = Object.keys(args).length
  const getRandId = () => Math.floor(Math.random() * ITEM_DIBBS_COUNT)
  
  const [dappy, setDappy] = useState({
    id: '111',
    name: 'test1',
    details: 'my details test 1',
    supply: 'test supply 1',
    price_d: 324,
    price_f: 222,
    image: '',
    amount: 10,
  });


  const onSuccess = itemId => {
    // Wait for new listing to be created by the API
    // Mutations don't work because they get overwritten when the new page is loaded
    setTimeout(() => {
      history.push('/collections/' + itemId);
    }, 1000)
  }

  const [{isLoading, transactionStatus}, mint] = useMintAndList(onSuccess)

  const onClickMint = () => mint()

  // const onMintCollect = async () => {
  //   // mint()
  //   let newKind = getRandId();
  //   try {
  //     console.log(args[newKind].name)
  //     // let res = await mutate({
  //     //   cadence: MINT_CARD_ITEM,
  //     //   limit: 55,
  //     //   args: (arg, t) => [arg(user?.addr, t.Address), 
  //     //     arg(args[newKind].name, t.String), 
  //     //     arg(args[newKind].grade, t.String),
  //     //     arg(args[newKind].serial, t.UInt64), 
  //     //     arg(args[newKind].image, t.String)]
  //     // })
  //     let res = await mutate({
  //       cadence: MINT_KITTY_ITEM,
  //       limit: 55,
  //       args: (arg, t) => [arg(user?.addr, t.Address), 
  //         arg(1, t.UInt8), 
  //         arg(1, t.UInt8)]
        
  //     })
  //     addTx(res)
  //     await tx(res).onceSealed()
  //     history.push('/collections');
  //   } catch (error) {
  //     console.log(error)
  //     history.push('/collections');
  //   }

  // };

  


  return (
    <>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="ADMINISTRATOR" long />
      </MenuWrapper>
      {/* <MinterLoader isLoading={true} /> */}
      <CollectionWrapper>
        { dappy && 
          <AdminMint
            card={dappy}
            name
            details
            price_d
            price_f
            isLoadings={isLoading}
            onMintCollect={onClickMint}
          />
        }
      </CollectionWrapper>
    </>
  );
};


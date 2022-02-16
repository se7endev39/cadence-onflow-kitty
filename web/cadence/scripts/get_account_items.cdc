import NonFungibleToken from 0xNonFungibleToken
import CardItems from 0xCardItems

pub fun main(address: Address): [UInt64] {
  if let collection = getAccount(address).getCapability<&CardItems.Collection{NonFungibleToken.CollectionPublic, CardItems.CardItemsCollectionPublic}>(CardItems.CollectionPublicPath).borrow() {
    return collection.getIDs()
  }

  return []
}
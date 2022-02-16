import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken
import CardItems from 0xCardItems
import NFTStorefront from 0xNFTStorefront

pub fun hasItems(_ address: Address): Bool {
  return getAccount(address)
    .getCapability<&CardItems.Collection{NonFungibleToken.CollectionPublic, CardItems.CardItemsCollectionPublic}>(CardItems.CollectionPublicPath)
    .check()
}

pub fun hasStorefront(_ address: Address): Bool {
  return getAccount(address)
    .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath)
    .check()
}

pub fun main(address: Address): {String: Bool} {
  let ret: {String: Bool} = {}
  ret["CardItems"] = hasItems(address)
  ret["CardItemsMarket"] = hasStorefront(address)
  return ret
}
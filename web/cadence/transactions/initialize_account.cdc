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

transaction {
  prepare(acct: AuthAccount) {
    if !hasItems(acct.address) {
      if acct.borrow<&CardItems.Collection>(from: CardItems.CollectionStoragePath) == nil {
        acct.save(<-CardItems.createEmptyCollection(), to: CardItems.CollectionStoragePath)
      }
      acct.unlink(CardItems.CollectionPublicPath)
      acct.link<&CardItems.Collection{NonFungibleToken.CollectionPublic, CardItems.CardItemsCollectionPublic}>(CardItems.CollectionPublicPath, target: CardItems.CollectionStoragePath)
    }

    if !hasStorefront(acct.address) {
      if acct.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath) == nil {
        acct.save(<-NFTStorefront.createStorefront(), to: NFTStorefront.StorefrontStoragePath)
      }
      acct.unlink(NFTStorefront.StorefrontPublicPath)
      acct.link<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath, target: NFTStorefront.StorefrontStoragePath)
    }
  }
}
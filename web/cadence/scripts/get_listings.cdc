import NFTStorefront from 0xNFTStorefront

pub fun main(address: Address): [UInt64] {
    let account = getAccount(address)

    let storefrontRef = account
        .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(
            NFTStorefront.StorefrontPublicPath
        )
        .borrow()
        ?? panic("Could not borrow public storefront from address")
    
  	return storefrontRef.getListingIDs()
}

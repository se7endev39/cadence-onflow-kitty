import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import MetadataViews from "../../contracts/MetadataViews.cdc"
import NFTStorefront from "../../contracts/NFTStorefront.cdc"
import CardItems from "../../contracts/CardItems.cdc"

pub struct ListingItem {
    pub let name: String
    pub let description: String
    pub let thumbnail: String

    pub let itemID: UInt64
    pub let resourceID: UInt64
    pub let cardName: CardItems.cardName
    pub let cardGrade: CardItems.cardGrade
    pub let cardSerial: CardItems.cardSerial
    pub let cardImage: CardItems.cardImage
    pub let owner: Address
    pub let price: UFix64

    init(
        name: String,
        description: String,
        thumbnail: String,
        itemID: UInt64,
        resourceID: UInt64,
        cardName: CardItems.cardName,
        cardGrade: CardItems.cardGrade,
        cardSerial: CardItems.cardSerial,
        cardImage: CardItems.cardImage,
        owner: Address,
        price: UFix64
    ) {
        self.name = name
        self.description = description
        self.thumbnail = thumbnail

        self.itemID = itemID
        self.resourceID = resourceID
        self.cardName = cardName
        self.cardGrade = cardGrade
        self.cardSerial = cardSerial
        self.cardImage = cardImage
        self.owner = owner
        self.price = price
    }
}

pub fun dwebURL(_ file: MetadataViews.IPFSFile): String {
    var url = "https://"
        .concat(file.cid)
        .concat(".ipfs.dweb.link/")
  
    if let path = file.path {
        return url.concat(path)
    }
  
    return url
}

pub fun main(address: Address, listingResourceID: UInt64): ListingItem? {
    let account = getAccount(address)

    if let storefrontRef = account.getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath).borrow() {

        if let listing = storefrontRef.borrowListing(listingResourceID: listingResourceID) {
            
            let details = listing.getDetails()

            let itemID = details.nftID
            let itemPrice = details.salePrice
        
            if let collection = getAccount(address).getCapability<&CardItems.Collection{NonFungibleToken.CollectionPublic, CardItems.CardItemsCollectionPublic}>(CardItems.CollectionPublicPath).borrow() {
            
                if let item = collection.borrowKittyItem(id: itemID) {

                    if let view = item.resolveView(Type<MetadataViews.Display>()) {

                        let display = view as! MetadataViews.Display
                    
                        let owner: Address = item.owner!.address!

                        let ipfsThumbnail = display.thumbnail as! MetadataViews.IPFSFile     

                        return ListingItem(
                            name: display.name,
                            description: display.description,
                            thumbnail: dwebURL(ipfsThumbnail),
                            itemID: itemID,
                            resourceID: item.uuid,
                            cardName: item.name, 
                            cardGrade: item.grade, 
                            cardSerial: item.serial,
                            cardImage: item.image,
                            owner: address,
                            price: itemPrice
                        )
                    }
                }
            }
        }
    }

    return nil
}

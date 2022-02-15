import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import CardItems from "../../contracts/CardItems.cdc"
import FungibleToken from "../../contracts/FungibleToken.cdc"
import FlowToken from "../../contracts/FlowToken.cdc"
import NFTStorefront from "../../contracts/NFTStorefront.cdc"

// This transction uses the NFTMinter resource to mint a new NFT.

transaction(recipient: Address, name: String, grade: String, serial: UInt64, image: String) {

    // local variable for storing the minter reference
    let minter: &CardItems.NFTMinter
    let flowReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
    let CardItemsProvider: Capability<&CardItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
    let storefront: &NFTStorefront.Storefront

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&CardItems.NFTMinter>(from: CardItems.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")

         // We need a provider capability, but one is not provided by default so we create one if needed.
        let CardItemsCollectionProviderPrivatePath = /private/CardItemsCollectionProvider

        self.flowReceiver = signer.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/FlowTokenReceiver)!

        assert(self.flowReceiver.borrow() != nil, message: "Missing or mis-typed FLOW receiver")

        if !signer.getCapability<&CardItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(CardItemsCollectionProviderPrivatePath)!.check() {
            signer.link<&CardItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(CardItemsCollectionProviderPrivatePath, target: CardItems.CollectionStoragePath)
        }

        self.CardItemsProvider = signer.getCapability<&CardItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(CardItemsCollectionProviderPrivatePath)!

        assert(self.CardItemsProvider.borrow() != nil, message: "Missing or mis-typed CardItems.Collection provider")

        self.storefront = signer.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath)
            ?? panic("Missing or mis-typed NFTStorefront Storefront")
    }

    execute {
        // get the public account object for the recipient
        let recipient = getAccount(recipient)

        // borrow the recipient's public NFT collection reference
        let receiver = recipient
            .getCapability(CardItems.CollectionPublicPath)!
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        // mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(
            recipient: receiver,
            name: name,
            grade: grade,
            serial: serial,
            image: image
        )

        let saleCut = NFTStorefront.SaleCut(
            receiver: self.flowReceiver,
            amount: CardItems.getItemPrice(rarity: rarityValue)
        )
        
        self.storefront.createListing(
            nftProviderCapability: self.CardItemsProvider,
            nftType: Type<@CardItems.NFT>(),
            nftID: CardItems.totalSupply - 1,
            salePaymentVaultType: Type<@FlowToken.Vault>(),
            saleCuts: [saleCut]
        )
    }
}

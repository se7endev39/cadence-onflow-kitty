import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import * as fs from "fs"
import * as path from "path"
import {FlowService} from "./flow"

const nonFungibleTokenPath = '"../../contracts/NonFungibleToken.cdc"'
const metadataViewsPath = '"../../contracts/MetadataViews.cdc"'
const kittyItemsPath = '"../../contracts/CardItems.cdc"'
const fungibleTokenPath = '"../../contracts/FungibleToken.cdc"'
const flowTokenPath = '"../../contracts/FlowToken.cdc"'
const storefrontPath = '"../../contracts/NFTStorefront.cdc"'
import { args } from "../../../cadence/tests/src/card-items"
enum Kind {
  Fishbowl = 0,
  Fishhat,
  Milkshake,
  TukTuk,
  Skateboard,
  Shades,
}

enum Rarity {
  Blue = 0,
  Green,
  Purple,
  Gold
}

const randomKind = () => {
  const values = Object.keys(Kind)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n))

  const index = Math.floor(Math.random() * values.length)

  return values[index]
}

const ITEM_RARITY_PROBABILITIES = {
  [Rarity.Gold]: 10,
  [Rarity.Purple]: 20,
  [Rarity.Green]: 30,
  [Rarity.Blue]: 40,
}

const randomRarity = () => {
  const rarities = Object.keys(ITEM_RARITY_PROBABILITIES)
  const rarityProbabilities = rarities
    .flatMap(rarity =>
      Array(ITEM_RARITY_PROBABILITIES[rarity]).fill(rarity)
    )

  const index = Math.floor(Math.random() * rarityProbabilities.length)

  return rarityProbabilities[index]
}

class KittyItemsService {
  constructor(
    private readonly flowService: FlowService,
    private readonly nonFungibleTokenAddress: string,
    private readonly metadataViewsAddress: string,
    private readonly kittyItemsAddress: string,
    private readonly fungibleTokenAddress: string,
    private readonly flowTokenAddress: string,
    private readonly storefrontAddress: string
  ) {}

  setupAccount = async () => {
    const authorization = this.flowService.authorizeMinter()

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../cadence/transactions/cardItems/setup_account.cdc`
        ),
        "utf8"
      )
      .replace(nonFungibleTokenPath, fcl.withPrefix(this.nonFungibleTokenAddress))
      .replace(kittyItemsPath, fcl.withPrefix(this.kittyItemsAddress))

    return this.flowService.sendTx({
      transaction,
      args: [],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    })
  }

  mint = async (recipient: string) => {
    const authorization = this.flowService.authorizeMinter()

    // const kind = randomKind()
    // const rarity = randomRarity()
    const index = Math.floor(Math.random() * args.length)

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../cadence/transactions/cardItems/mint_card_item.cdc`
        ),
        "utf8"
      )
      .replace(nonFungibleTokenPath, fcl.withPrefix(this.nonFungibleTokenAddress))
      .replace(kittyItemsPath, fcl.withPrefix(this.kittyItemsAddress))

    return this.flowService.sendTx({
      transaction,
      args: [
        fcl.arg(recipient, t.Address),
        fcl.arg(args[index]?.name, t.String),
        fcl.arg(args[index]?.grade, t.String),
        fcl.arg(args[index]?.serial, t.UInt64),
        fcl.arg(args[index]?.image, t.String),
      ],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
      skipSeal: true,
    })
  }

  mintAndList = async (recipient: string) => {
    const authorization = this.flowService.authorizeMinter()

    // const kind = randomKind()
    // const rarity = randomRarity()
    
    const index = Math.floor(Math.random() * args.length)

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../cadence/transactions/cardItems/mint_and_list_card_item.cdc`
        ),
        "utf8"
      )
      .replace(nonFungibleTokenPath, fcl.withPrefix(this.nonFungibleTokenAddress))
      .replace(kittyItemsPath, fcl.withPrefix(this.kittyItemsAddress))
      .replace(fungibleTokenPath, fcl.withPrefix(this.fungibleTokenAddress))
      .replace(flowTokenPath, fcl.withPrefix(this.flowTokenAddress))
      .replace(storefrontPath, fcl.withPrefix(this.storefrontAddress))

    return this.flowService.sendTx({
      transaction,
      args: [
        fcl.arg(recipient, t.Address),
        fcl.arg(args[index]?.name, t.String),
        fcl.arg(args[index]?.grade, t.String),
        fcl.arg(args[index]?.serial, t.UInt64),
        fcl.arg(args[index]?.image, t.String),
      ],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
      skipSeal: true,
    })
  }

  transfer = async (recipient: string, itemID: number) => {
    const authorization = this.flowService.authorizeMinter()

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../cadence/transactions/cardItems/transfer_card_item.cdc`
        ),
        "utf8"
      )
      .replace(nonFungibleTokenPath, fcl.withPrefix(this.nonFungibleTokenAddress))
      .replace(kittyItemsPath, fcl.withPrefix(this.kittyItemsAddress))

    return this.flowService.sendTx({
      transaction,
      args: [fcl.arg(recipient, t.Address), fcl.arg(itemID, t.UInt64)],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    })
  }

  getCollectionIds = async (account: string): Promise<number[]> => {
    const script = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../cadence/scripts/cardItems/get_collection_ids.cdc`
        ),
        "utf8"
      )
      .replace(nonFungibleTokenPath, fcl.withPrefix(this.nonFungibleTokenAddress))
      .replace(kittyItemsPath, fcl.withPrefix(this.kittyItemsAddress))

    return this.flowService.executeScript<number[]>({
      script,
      args: [fcl.arg(account, t.Address)],
    })
  }

  getKittyItem = async (itemID: number, address: string): Promise<number> => {
    const script = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../cadence/scripts/cardItems/get_card_item.cdc`
        ),
        "utf8"
      )
      .replace(nonFungibleTokenPath, fcl.withPrefix(this.nonFungibleTokenAddress))
      .replace(metadataViewsPath, fcl.withPrefix(this.metadataViewsAddress))
      .replace(kittyItemsPath, fcl.withPrefix(this.kittyItemsAddress))

    return this.flowService.executeScript<number>({
      script,
      args: [fcl.arg(address, t.Address), fcl.arg(itemID, t.UInt64)],
    })
  }

  getSupply = async (): Promise<number> => {
    const script = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../cadence/scripts/cardItems/get_card_items_supply.cdc`
        ),
        "utf8"
      )
      .replace(kittyItemsPath, fcl.withPrefix(this.kittyItemsAddress))

    return this.flowService.executeScript<number>({script, args: []})
  }
}

export {KittyItemsService}

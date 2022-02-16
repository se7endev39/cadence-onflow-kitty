import express, {Request, Response, Router} from "express"
import {body} from "express-validator"
import {validateRequest} from "../middlewares/validate-request"
import {CardItemsService} from "../services/card-items"

function initCardItemsRouter(CardItemsService: CardItemsService): Router {
  const router = express.Router()

  router.post(
    "/kitty-items/mint",
    [body("recipient").exists()],
    validateRequest,
    async (req: Request, res: Response) => {
      const {recipient} = req.body
      const tx = await CardItemsService.mint(recipient)
      return res.send({
        transaction: tx,
      })
    }
  )

  router.post(
    "/kitty-items/mint-and-list",
    [body("recipient").exists()],
    validateRequest,
    async (req: Request, res: Response) => {
      const {recipient} = req.body
      const tx = await CardItemsService.mintAndList(recipient)
      return res.send({
        transaction: tx,
      })
    }
  )

  router.post("/kitty-items/setup", async (req: Request, res: Response) => {
    const transaction = await CardItemsService.setupAccount()
    return res.send({
      transaction,
    })
  })

  router.post(
    "/kitty-items/transfer",
    [body("recipient").exists(), body("itemID").isInt()],
    validateRequest,
    async (req: Request, res: Response) => {
      const {recipient, itemID} = req.body
      const tx = await CardItemsService.transfer(recipient, itemID)
      return res.send({
        transaction: tx,
      })
    }
  )

  router.get(
    "/kitty-items/collection/:account",
    async (req: Request, res: Response) => {
      const collection = await CardItemsService.getCollectionIds(
        req.params.account
      )
      return res.send({
        collection,
      })
    }
  )

  router.get(
    "/kitty-items/item/:address/:itemID",
    async (req: Request, res: Response) => {
      const item = await CardItemsService.getKittyItem(
        parseInt(req.params.itemID),
        req.params.address
      )
      return res.send({
        item,
      })
    }
  )

  router.get("/kitty-items/supply", async (req: Request, res: Response) => {
    const supply = await CardItemsService.getSupply()
    return res.send({
      supply,
    })
  })

  return router
}

export default initCardItemsRouter

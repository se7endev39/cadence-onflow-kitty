import { useRouter } from "next/dist/client/router"
import PropTypes from "prop-types"
import publicConfig from "../../../src/global/publicConfig"
import useAppContext from "../../../src/hooks/useAppContext"
import useFLOWBalance from "../../../src/hooks/useFLOWBalance"
import useItemPurchase from "../../../src/hooks/useItemPurchase"
import useItemRemoval from "../../../src/hooks/useItemRemoval"
import useItemSale from "../../../src/hooks/useItemSale"

export default function ListItemPageButtons({ item, listing }) {
  const router = useRouter()
  const { address, id } = router.query
  const { currentUser } = useAppContext()
  const { data: flowBalance } = useFLOWBalance(currentUser?.addr)

  const [{ isLoading: isBuyLoading }, buy, buyTxStatus] = useItemPurchase()
  const [{ isLoading: isSellLoading }, sell, sellTxStatus] = useItemSale()
  const [{ isLoading: isRemoveLoading }, remove, removeTxStatus] =
    useItemRemoval()

  const onPurchaseClick = () => buy(listing?.resourceID, id, address)
  const onSellClick = () => sell(id, item.kind.rawValue, item.rarity.rawValue)
  const onRemoveClick = () => remove(listing?.resourceID, id)
  const currentUserIsOwner = currentUser && item?.owner === currentUser?.addr
  const isSellable = currentUserIsOwner && !listing
  const isBuyable = !currentUser || (!currentUserIsOwner && !!listing)
  const isRemovable = currentUserIsOwner && !!listing

  // TODO: Use a library that supports UFix64 precision to avoid comparing rounded numbers
  const userHasEnoughFunds =
    !!listing && listing.price <= parseFloat(flowBalance)

  if (isBuyable) {
    return (
      <div className="grid-button-wrapper">

        {isBuyLoading && buyTxStatus !== null ? (
          <button
            className={`${"btn-buying"
              } hover-effect2`}
          >
            <div className="loading-wrapper">
              <img
                src="/static/images/icons/loading.gif"
                height="20"
                alt=""
              />
              BUYING...
            </div>
          </button>
        ) : (
          <button
            className="approve hover-effect2"
            onClick={onPurchaseClick}
            // disabled={isBuyLoading || (!!currentUser && !userHasEnoughFunds)}
          >
            Purchase
          </button>
        )}
      </div>

    )
  }
  if (isSellable) {
    return (
      <div className="grid-button-wrapper">

        {isSellLoading && sellTxStatus !== null ? (
          <button
            className={`${"btn-buying"
              } hover-effect2`}
          >
            <div className="loading-wrapper">
              <img
                src="/static/images/icons/loading.gif"
                height="20"
                alt=""
              />
              Selling...
            </div>
          </button>
        ) : (
          <button
            className="approve hover-effect2"
            onClick={onSellClick}
            disabled={isSellLoading}
          >
            Sell
          </button>
        )}
      </div>
    )
  }

  if (isRemovable) {
    const location =
      item.owner === publicConfig.flowAddress ? "Store" : "Marketplace"

    return (
      <div className="grid-button-wrapper">

        {isRemoveLoading && removeTxStatus !== null ? (
          <button
            className={`${"btn-buying"
              } hover-effect2`}
          >
            <div className="loading-wrapper">
              <img
                src="/static/images/icons/loading.gif"
                height="20"
                alt=""
              />
              Selling...
            </div>
          </button>
        ) : (
          <button
            className="approve hover-effect2"
            onClick={onRemoveClick}
            disabled={isRemoveLoading}
          >
            {`Remove From ${location}`}
          </button>
        )}
      </div>
    )
  }

  return null
}

ListItemPageButtons.propTypes = {
  item: PropTypes.object.isRequired,
  listing: PropTypes.object,
}

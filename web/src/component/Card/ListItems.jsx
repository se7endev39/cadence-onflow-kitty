import PropTypes from "prop-types"
import ListItem from "./ListItem"


export default function ListItems({items, Component = ListItem}) {
  return (
    <>
      {items?.map(item => (
        <Component
          key={`${item.itemID}-${item.resourceID}`}
          address={item.owner}
          id={item.itemID}
          price={item.price ? parseFloat(item.price) : undefined}
          listingId={item.resourceID}
          showOwnerInfo={true}
        />
      ))}
    </>
  )
}

ListItems.propTypes = {
  items: PropTypes.array.isRequired,
  Component: PropTypes.elementType,
}

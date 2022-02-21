import Link from "next/link"
import PropTypes from "prop-types"
import {paths} from "src/global/constants"
import useAccountItem from "src/hooks/useAccountItem"
import useAppContext from "src/hooks/useAppContext"
import {rarityTextColors} from "src/util/classes"
import { ITEM_KIND_MAP, getCardImage, getCardName, getCardGrade, getCardSerial,args } from "../../util/dibbs.mint.data"
import styled from "styled-components";
import {useRouter} from "next/router"
export default function ListItem({
  address,
  id,
  price,
  listingId,
  showOwnerInfo,
  size = "sm",
  isStoreItem,
  isPurchase,
  isSell=true
}) 
{
  const router = useRouter()
  const {currentUser} = useAppContext()
  const {data: item, isLoading} = useAccountItem(address, id)
  if (isLoading || !item) return null

  const currentUserIsOwner = currentUser && item.owner === currentUser?.addr
  const isBuyable = !currentUserIsOwner && !!listingId

  const profileUrl = paths.profileItem(address, id)
  const rarityTextColor = rarityTextColors(item.rarity.rawValue)

  const itemID = item?.itemID%5;


  const onBuyCollect = () => {
    router.push(profileUrl)
  }
  return (
    <Container>
      <CardImage>
        <img src={getCardImage(item.itemID)} alt={item.name} className={`card-image`} />
        <img
          src={`/static/images/bg/components/card/card-border.png`}
          alt="card-border"
          className="card-border"
        />
      </CardImage>
      <ButtonWrapper>
        <div className="card-grid text-center">
          <div className="d-flex flex-column">
            { item && 
              <div className="w-100 d-flex justify-between">
                <label>Name: </label>
                <span>{args[itemID].name}</span>
              </div>
            }
            { item && 
              <div className="w-100 d-flex justify-between">
                <label>Grade: </label>
                <span>{args[itemID].grade}</span>
              </div>
            }
            {/* <div className="w-100 d-flex flex-column">
              <label className="text-left">Details: </label>
              <span className="text-left text-wrapper">{card.details}</span>
            </div> */}
            { item && 
              <div className="w-100 d-flex justify-between">
                <label>Serial: </label>
                <span>{args[itemID].serial}</span>
              </div>
            }
            { price && 
              <div className="w-100 d-flex justify-between">
                <label>price $ :</label>
                <span>{price}</span>
              </div>
            }
            
          </div>

            <div className="grid-button-wrapper">
                  
              {isLoading ? (
                <button
                  className={`${
                    "btn-buying"
                  } hover-effect2`}
                >
                  <div className="loading-wrapper">
                    <img
                      src="/static/images/icons/loading.gif"
                      height="20"
                      alt=""
                    />
                    { !isSell ? "BUYING..." : "Selling..." }
                  </div>
                </button>
              ) : (
                <button
                  className="approve hover-effect2"
                  onClick={onBuyCollect}
                >
                  { isPurchase? "Purchase" : !isSell ? "BUY" : "Sell" }
                </button>
              )}
                
            </div>
        </div>
      </ButtonWrapper>
    </Container>
  );
};

export const Container = styled.div`
  margin: 8px;
`;
export const CardImage = styled.div`
  width: 248px;
  height: 345.6px;
  position: relative;
  padding: 13.6px 11.2px;
  background: transparent;
  position: relative;

  .card-image {
    width: 232px;
    height: 328px;
    position: absolute;

    &.un-obtained {
      opacity: 0.3;
    }
  }

  .card-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 256px;
    height: 354.4px;
  }

  .marked {
    position: absolute;
    top: 6.566px;
    left: 6.66px;
    width: 99px;
    height: 99px;
  }
`;
export const ButtonWrapper = styled.div`
  margin-top: -11.666px;

  a, button {
    width: 190.4px;
    height: 41.6px;
    background: url("/static/images/bg/components/card/button-bg.png");
    border: none;
    color: #161617;
    font-size: 1rem;
    font-family: Orbitron-Medium;
    text-shadow: 5px 5px 3px #27787580;
    outline: none;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }
  .card-grid {
    width: 248px;
    padding: 0 9px;
    margin-top: 20px;
    text-shadow: 4.66667px 4.66667px 6.66667px
      ${(props) => props.theme.darken(props.theme.palette.primary.main, 0.57)};

    label {
      font-size: 16px;
      font-family: Orbitron-Black;
      color: ${(props) => props.theme.palette.primary.main};
      margin-bottom: 0;
    }

    span {
      font-size: 16px;
      font-family: Orbitron-Black;
      color: ${(props) => props.theme.palette.secondary.main};
      padding-left: 4.66667px;
    }

    .text-wrapper {
      line-height: 16px;
    }

    .grid-button-wrapper {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      font-size: 1.125rem;

      a, button {
        padding-bottom: -4.66667px;

        /* &.hash-button {
          // width: 152px;
          flex: 1;
          height: 35px;
          background-image: url("/static/images/bg/components/card/hash-button-bg.png");
          background-size: 100% 100%;
          margin-left: -3.33333px;
          padding-bottom: 4.66667px;
        } */
        &.approve {
          flex: 1;
          height: 50px;
          background: url("/static/images/bg/components/card/button-bg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          font-family: 'Orbitron-Black';
          font-size: 15px;

          &:hover {
            background: url("/static/images/bg/components/card/button-bg--active.png");
            background-size: 100% 100%;
          }
        }
        &.btn-buying {
          flex: 1;
          height: 50px;
          background: url("/static/images/bg/components/card/button-bg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          font-family: 'Orbitron-Black';
          font-size: 15px;
        }
      }

      .loading-wrapper {
        display: flex;
        font-size: 14px;
        justify-content: center;
        color: #161617;
      }
    }
  }
`;


ListItem.propTypes = {
  address: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  price: PropTypes.number,
  listingId: PropTypes.number,
  showOwnerInfo: PropTypes.bool,
  size: PropTypes.string,
  isStoreItem: PropTypes.bool,
}

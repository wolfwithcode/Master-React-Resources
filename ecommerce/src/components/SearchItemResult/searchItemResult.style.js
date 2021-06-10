import styled from 'styled-components'

export const SortBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background: rgba(0, 0, 0, 0.03);
  padding: 1.25rem 1.5rem;
  border-radius: 2px;
  margin-bottom: 1.5rem;
`
export const SortBarLabel = styled.span``
export const SortByOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-grow: 1;
`
export const SortByPrice = styled.select`
  flex: 0 0 auto;
  margin-left: 1rem;
  height: 3.25rem;
  border: 0;
  padding: 0 1.5rem;
  &.active {
    color: #ee4d2d;
  }
`
export const SortByOptionsOption = styled.div`
  flex: 0 0 auto;
  cursor: pointer;
  background: #fff;
  margin-left: 1rem;
  height: 3.25rem;
  padding: 0 1.5rem;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  &.active {
    color: #fff;
    background: #ee4d2d;
  }
`
export const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const Item = styled.div`
  flex: 0 0 20%;
  max-width: 20%;
  padding: 0 5px;
  margin: 5px 0;
`
export const ProductItem = styled.div`
  color: rgba(0, 0, 0, 0.8);
  background: #fff;
  box-shadow: 0 0.1rem 0.25rem 0 rgb(0 0 0 / 10%);
  border-radius: 0.25rem;
  transition: all 0.1s ease;
  &:hover {
    box-shadow: 0 0.1rem 2rem 0 rgb(0 0 0 / 5%);
    transform: translateY(-0.0625rem);
  }
`
export const ProductItemImage = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    object-fit: contain;
    vertical-align: bottom;
  }
`
export const ProductItemInfo = styled.div`
  padding: 0.5rem;
`
export const ProductItemTitle = styled.div`
  display: inline-block;
  display: -webkit-box;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 1.2rem;
  line-height: 1.4rem;
  margin-bottom: 0.5rem;
`
export const ProductItemPrice = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 0.5rem;
  margin-bottom: 1rem;
`
export const ProductItemPriceOriginal = styled.div`
  flex-shrink: 1;
  max-width: 50%;
  color: rgba(0, 0, 0, 0.54);
  text-decoration: line-through;
  margin-right: 5px;
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const ProductItemPriceSale = styled.div`
  flex-grow: 1;
  color: #ee4d2d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  span {
    &:first-child {
      font-size: 1.2rem;
      color: #ee4d2d;
    }
    &:last-child {
      font-size: 1.6rem;
      color: #ee4d2d;
    }
  }
`

export const ProductItemMeta = styled.div`
  display: flex;
  justify-content: flex-end;
`
export const ProductItemSold = styled.div`
  color: rgba(0, 0, 0, 0.87);
  margin-left: 0.5rem;
  font-size: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  span:first-child {
    margin-right: 3px;
  }
`
export const MiniPageController = styled.div`
  display: flex;
  align-items: center;
`
export const MiniPageControllerState = styled.div`
  display: flex;
`
export const MiniPageControllerCurrentState = styled.div`
  color: #ee4d2d;
`
export const MiniPageControllerTotalState = styled.div``
export const ButtonController = styled.button`
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
  width: 3.6rem;
  height: 3.4rem;
  border-radius: 2px;
  border: 0;
  background: ${({ disabled }) => (disabled ? '#f9f9f9' : '#fff')};
  svg {
    width: 0.625rem;
    height: 0.625rem;
    fill: ${({ disabled }) => (disabled ? '#ccc' : '#555')};
    margin-top: 0.125rem;
  }
`
export const ButtonControllerPrev = styled(ButtonController)`
  margin-left: 2rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 1px solid #f2f2f2;
`
export const ButtonControllerNext = styled(ButtonController)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

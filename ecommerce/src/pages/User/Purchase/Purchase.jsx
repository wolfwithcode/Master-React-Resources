import purchaseApi from 'api/purchase.api'
import { path } from 'constants/path'
import { statusCart } from 'constants/status'
import useQuery from 'hooks/useQuery'
import React, { useEffect, useState } from 'react'
import { formatMoney, generateNameId } from 'utils/helper'
import qs from 'query-string'
import * as S from './purchase.style'

export default function Purchase() {
  const query = useQuery()
  const [status, setStatus] = useState()
  const [purchases, setPurchases] = useState([])
  useEffect(() => {
    const _status = query.status || statusCart.all
    setStatus(_status)
    purchaseApi.getPurchases(_status).then(res => {
      setPurchases(res.data)
    })
  }, [query])

  const handleActive = value => () => Number(value) === Number(status)
  return (
    <div>
      <S.PurchaseTabs>
        <S.PurchaseTabItem
          to={path.purchase}
          isActive={handleActive(statusCart.all)}
        >
          Tất cả
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          isActive={handleActive(statusCart.waitForConfirmation)}
          to={{
            pathname: path.purchase,
            search: `?${qs.stringify({
              status: statusCart.waitForConfirmation
            })}`
          }}
        >
          Chờ xác nhận
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          isActive={handleActive(statusCart.inProgress)}
          to={{
            pathname: path.purchase,
            search: `?${qs.stringify({
              status: statusCart.inProgress
            })}`
          }}
        >
          Đang giao
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          isActive={handleActive(statusCart.delivered)}
          to={{
            pathname: path.purchase,
            search: `?${qs.stringify({
              status: statusCart.delivered
            })}`
          }}
        >
          Đã giao
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          isActive={handleActive(statusCart.cancelled)}
          to={{
            pathname: path.purchase,
            search: `?${qs.stringify({
              status: statusCart.cancelled
            })}`
          }}
        >
          Đã hủy
        </S.PurchaseTabItem>
      </S.PurchaseTabs>
      <S.PurchaseList>
        {purchases.map(purchase => (
          <S.OrderCard key={purchase._id}>
            <S.OrderCardContent>
              <S.OrderCardDetail>
                <img src={purchase.product.image} alt="" />
                <S.OrderContent>
                  <S.OrderName>{purchase.product.name}</S.OrderName>
                  <S.OrderQuantity>x {purchase.buy_count}</S.OrderQuantity>
                </S.OrderContent>
              </S.OrderCardDetail>
              <S.OrderCardPrice>
                ₫{formatMoney(purchase.product.price)}
              </S.OrderCardPrice>
            </S.OrderCardContent>
            <S.OrderCardButtonsContainer>
              <S.PurchaseButton
                light={1}
                to={path.product + `/${generateNameId(purchase.product)}`}
              >
                Xem sản phẩm
              </S.PurchaseButton>
              <S.TotalPrice>
                <S.TotalPriceLabel>Tổng số tiền</S.TotalPriceLabel>
                <S.TotalPricePrice>
                  ₫{formatMoney(purchase.product.price * purchase.buy_count)}
                </S.TotalPricePrice>
              </S.TotalPrice>
            </S.OrderCardButtonsContainer>
          </S.OrderCard>
        ))}
      </S.PurchaseList>
    </div>
  )
}

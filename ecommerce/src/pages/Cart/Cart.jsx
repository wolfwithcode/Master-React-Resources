import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatMoney } from 'utils/helper'
import Checkbox from 'components/Checkbox/Checkbox'
import ProductQuantityController from 'components/ProductQuantityController/ProductQuantityController'
import * as S from './cart.style'
import { useDispatch } from 'react-redux'
import { getCartPurchases } from './cart.slice'
import purchaseApi from 'api/purchase.api'
import keyBy from 'lodash/keyBy'
import { toast } from 'react-toastify'
import { createNextState } from '@reduxjs/toolkit'
// import createNextState from 'immer'

export default function Cart() {
  const purchases = useSelector(state => state.cart.purchases)
  const [localPurchases, setLocalPurchases] = useState(() =>
    createNextState(purchases, draft => {
      draft.forEach(product => {
        product.disabled = false
        product.checked = false
      })
    })
  )
  const dispatch = useDispatch()
  const isCheckedAll = localPurchases.every(product => product.checked)
  const checkedPurchases = localPurchases.filter(product => product.checked)
  const totalCheckedPurchases = checkedPurchases.length
  const totalCheckedPurchasesPrice = checkedPurchases.reduce(
    (result, current) => {
      return result + current.product.price * current.buy_count
    },
    0
  )
  const totalCheckedPurchasesSavingPrice = checkedPurchases.reduce(
    (result, current) => {
      return (
        result +
        (current.product.price_before_discount - current.product.price) *
          current.buy_count
      )
    },
    0
  )

  useEffect(() => {
    setLocalPurchases(localPurchases => {
      const lodcalPurchasesObject = keyBy(localPurchases, '_id')
      const newLocalPurchases = createNextState(purchases, draft => {
        draft.forEach(product => {
          product.disabled = false
          product.checked = Boolean(lodcalPurchasesObject[product._id]?.checked)
        })
      })
      return newLocalPurchases
    })
  }, [purchases])

  const handleInputQuantity = indexProduct => async value => {
    const newLocalPurchases = createNextState(localPurchases, draft => {
      draft[indexProduct].buy_count = value
    })
    setLocalPurchases(newLocalPurchases)
  }

  const handleBlurQuantity = indexProduct => async value => {
    const purchase = localPurchases[indexProduct]
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexProduct].disabled = true
      })
    )
    await purchaseApi.updatePurchase({
      product_id: purchase.product._id,
      buy_count: value
    })
    await dispatch(getCartPurchases())
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexProduct].disabled = false
      })
    )
  }

  const handleIncreseAndDecrease = indexProduct => async value => {
    const purchase = localPurchases[indexProduct]
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexProduct].buy_count = value
        draft[indexProduct].disabled = true
      })
    )
    await purchaseApi.updatePurchase({
      product_id: purchase.product._id,
      buy_count: value
    })
    await dispatch(getCartPurchases())
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexProduct].disabled = false
      })
    )
  }

  const handleRemove = indexProduct => async () => {
    const purchase_id = localPurchases[indexProduct]._id
    await purchaseApi.deletePurchases([purchase_id])
    await dispatch(getCartPurchases())
    toast.success('Xóa đơn thành công', {
      position: 'top-center',
      autoClose: 3000
    })
  }

  const handleRemoveManyPurchases = async () => {
    const purchase_ids = checkedPurchases.map(purchase => purchase._id)
    await purchaseApi.deletePurchases(purchase_ids)
    await dispatch(getCartPurchases())
    toast.success('Xóa đơn thành công', {
      position: 'top-center',
      autoClose: 3000
    })
  }

  const handleCheck = indexProduct => value => {
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexProduct].checked = value
      })
    )
  }

  const handleCheckAll = () => {
    if (isCheckedAll) {
      setLocalPurchases(localPurchases =>
        createNextState(localPurchases, draft => {
          draft.forEach(product => {
            product.checked = false
          })
        })
      )
    } else {
      setLocalPurchases(localPurchases =>
        createNextState(localPurchases, draft => {
          draft.forEach(product => {
            product.checked = true
          })
        })
      )
    }
  }

  const handleBuyPurchases = async () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map(purchase => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      await purchaseApi.buyPurchases(body)
      await dispatch(getCartPurchases())
      toast.success('Đặt hàng thành công', {
        position: 'top-center',
        autoClose: 4000
      })
    }
  }

  return (
    <div className="container">
      <div>
        <S.ProductHeader>
          <S.ProductHeaderCheckbox>
            <Checkbox onClick={handleCheckAll} checked={isCheckedAll} />
          </S.ProductHeaderCheckbox>
          <S.ProductHeaderName>Sản phẩm</S.ProductHeaderName>
          <S.ProductHeaderUnitPrice>Đơn giá</S.ProductHeaderUnitPrice>
          <S.ProductHeaderQuantity>Số Lượng</S.ProductHeaderQuantity>
          <S.ProductHeaderTotalPrice>Số tiền</S.ProductHeaderTotalPrice>
          <S.ProductHeaderAction>Thao tác</S.ProductHeaderAction>
        </S.ProductHeader>
        <S.ProductSection>
          {localPurchases.map((product, index) => (
            <S.CartItem key={product._id}>
              <S.CartItemCheckbox>
                <Checkbox
                  checked={product.checked}
                  onChange={handleCheck(index)}
                />
              </S.CartItemCheckbox>
              <S.CartItemOverview>
                <S.CartItemOverviewImage to="">
                  <img src={product.product.image} alt="" />
                </S.CartItemOverviewImage>
                <S.CartItemOverviewNameWrapper>
                  <S.CartItemOverviewName to="">
                    {product.product.name}
                  </S.CartItemOverviewName>
                </S.CartItemOverviewNameWrapper>
              </S.CartItemOverview>
              <S.CartItemUnitPrice>
                <span>
                  ₫{formatMoney(product.product.price_before_discount)}
                </span>
                <span>₫{formatMoney(product.product.price)}</span>
              </S.CartItemUnitPrice>
              <S.CartItemQuantity>
                <ProductQuantityController
                  max={product.product.quantity}
                  value={product.buy_count}
                  onInput={handleInputQuantity(index)}
                  onBlur={handleBlurQuantity(index)}
                  onIncrease={handleIncreseAndDecrease(index)}
                  onDecrease={handleIncreseAndDecrease(index)}
                  disabled={product.disabled}
                />
              </S.CartItemQuantity>
              <S.CartItemTotalPrice>
                <span>
                  ₫{formatMoney(product.product.price * product.buy_count)}
                </span>
              </S.CartItemTotalPrice>
              <S.CartItemAction>
                <S.CartItemActionButton onClick={handleRemove(index)}>
                  Xóa
                </S.CartItemActionButton>
              </S.CartItemAction>
            </S.CartItem>
          ))}
        </S.ProductSection>
      </div>
      <S.CartFooter>
        <S.CartFooterCheckbox>
          <Checkbox checked={isCheckedAll} onChange={handleCheckAll} />
        </S.CartFooterCheckbox>
        <S.CartFooterButton onClick={handleCheckAll}>
          Chọn tất cả ({localPurchases.length})
        </S.CartFooterButton>
        <S.CartFooterButton onClick={handleRemoveManyPurchases}>
          Xóa
        </S.CartFooterButton>
        <S.CartFooterSpaceBetween />
        <S.CartFooterPrice>
          <S.CartFooterPriceTop>
            <div>Tổng thanh toán ({totalCheckedPurchases} sản phẩm):</div>
            <div>₫{formatMoney(totalCheckedPurchasesPrice)}</div>
          </S.CartFooterPriceTop>
          <S.CartFooterPriceBot>
            <div>Tiết kiệm</div>
            <div>₫{formatMoney(totalCheckedPurchasesSavingPrice)}</div>
          </S.CartFooterPriceBot>
        </S.CartFooterPrice>
        <S.CartFooterCheckout onClick={handleBuyPurchases}>
          Mua hàng
        </S.CartFooterCheckout>
      </S.CartFooter>
    </div>
  )
}

import { formatPrice } from './formatPrice'

export function calcDiscount (price, discount) {
  const discountAmount = price * (discount / 100)
  const finalPrice = price - discountAmount
  return formatPrice(finalPrice)
}

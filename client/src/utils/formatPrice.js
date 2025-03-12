export function formatPrice (price) {
  if (typeof price === 'string') {
    return price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
  } else {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
  }
}

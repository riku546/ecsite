export const getCartContents = () => {
  // セッションではjson形式の文字列が保存されているので、カートをオブジェクトに変換
  const cartContents = JSON.parse(sessionStorage.getItem('cart'))

  return cartContents
}
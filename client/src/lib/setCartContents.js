//実際にセッションにカート内容を保存する
export const setCartContents = cartContents => {
  //オブジェクトをjson形式の文字列に変換(セッションはデータを文字列で保存するため、文字列にする必要がある)
  sessionStorage.setItem('cart', JSON.stringify(cartContents))
}
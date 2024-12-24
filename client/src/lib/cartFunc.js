// このモジュールでは、カートの中身の取得 カートに商品を追加 カートの中身を変更
// カートから商品を削除 カートに入っている商品の合計金額を計算する関数が用意されている。

export const getCartContents = () => {
    // セッションではjson形式の文字列が保存されているので、カートをオブジェクトに変換
    const cartContents = JSON.parse(sessionStorage.getItem('cart'))

    return cartContents
}

//実際にセッションにカート内容を保存する
const setCartContents = cartContents => {
    //オブジェクトをjson形式の文字列に変換(セッションはデータを文字列で保存するため、文字列にする必要がある)
    sessionStorage.setItem('cart', JSON.stringify(cartContents))
}

export const addToCart = (productId, /*商品の購入個数*/ buyQuantity) => {
    const cartContents = getCartContents()

    //セッションにカートのデータがない場合
    //新しくオブジェクトを作成して、セッションに追加
    if (!cartContents) {
        sessionStorage.setItem(
            'cart',
            //オブジェクトをjson形式の文字列に変換(セッションはデータを文字列で保存するため、文字列にする必要がある)
            JSON.stringify({ [productId]: Number(buyQuantity) }),
        )
    }
    //セッションに既にデータが保存されていたら
    //新しくデータを追加 または 更新する
    else {
        updateCartContents(productId, buyQuantity)
    }
}

//カートに商品を追加や既にある商品の個数を上書きする
export const updateCartContents = (
    productId,
    /*商品の購入個数*/ buyQuantity,
) => {
    const cartContents = getCartContents()
    cartContents[productId] = buyQuantity
    setCartContents(cartContents)
}

//カートに入っている既存の商品の個数を１増やす
export const increaseProductInCart = productId => {
    const cartContents = getCartContents()
    cartContents[productId] += 1
    setCartContents(cartContents)
}

//カートに入っている既存の商品の個数を１減らす
export const decreaseProductInCart = productId => {
    const cartContents = getCartContents()
    cartContents[productId] -= 1
    setCartContents(cartContents)
}

export const deleteProductInCart = productId => {
    const cartContents = getCartContents()
    delete cartContents[productId]
    setCartContents(cartContents)
}

export const resetCartContents = () => {
    sessionStorage.removeItem('cart')
    //新しい空カートをセッションに保存
    setCartContents({})
}

export const calcTotalPriceInCart = (
    cartContent /* cartContentは左のようなオブジェクト {商品のid : カートに入っている商品の個数} */,
) => {
    //すべての商品の価格がセッションに保存されているから取得。
    const allProductPrices = JSON.parse(sessionStorage.getItem('ProductPrices'))
    let totalPrice = 0

    Object.entries(cartContent).map(([productId, buyQuantity]) => {
        totalPrice += allProductPrices[productId] * buyQuantity
    })

    return totalPrice
}

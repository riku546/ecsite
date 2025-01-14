import { getCartContents } from './getCartContents'

//この関数はサーバー側に決済をリクエストする際に、必要な商品情報を整形する関数

//返り値 : [{productId: 商品ID, quantity: 購入個数}, ...]
export const prepareProductInfo = () => {
    const cartContent = getCartContents()
    return Object.entries(cartContent).map(([productId, buyQuantity]) => ({
        productId: productId,
        quantity: buyQuantity,
    }))
}

//この関数は引数で受け取ったproductIdに該当する商品の情報を返す。

import axios from './axios'

export const fetchProductInfo = async productId => {
    try {
        const result = await axios.get(`/api/specificProductInfo/${productId}`)

        //result.dataは配列の中にオブジェクトが格納されているが、
        //今回 result.dataには１つのオブジェクトしか格納されていないので
        //result.dataの１つのオブジェクトを取得
        const result_object = result.data[0]

        return result_object
    } catch (error) {
        window.alert('エラーが発生しました。再読込みしてください')
    }
}

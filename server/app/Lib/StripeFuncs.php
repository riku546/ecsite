<?php

namespace App\Lib;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Stripe\StripeClient;

header('Content-Type: application/json');

//このクラスはstripeでの決済と決済ステータス（決済が成功か失敗）を返すための関数を提供する
class StripeFuncs
{

    // 決済処理
    public static function checkout($cart_items)
    {
        try {

            Stripe::setApiKey(env('STRIPE_SECRET'));

            //stripe決済に必要なstripe_price_idを取得
            $checkout_items = static::set_stripe_checkout_items($cart_items);

            $checkout_session = Session::create([
                'line_items' => $checkout_items,
                'ui_mode' => 'embedded',
                'mode' => 'payment',
                //決済が完了したら購入完了ページにリダイレクト
                'return_url' => env("FRONTEND_URL") . '/buyComplete?session_id={CHECKOUT_SESSION_ID}',
                'payment_method_configuration' => 'pmc_1QarcVDWaqHYMLdlIeZDIWYI',

            ]);

            //決済が成功したか失敗したかを確認するのにclient_secretが必要
            return $checkout_session;
        } catch (\Throwable $th) {
            throw $th;
        }

    }

    //決済ステータス返す（決済が成功した場合は、レスポンスの"status" => "complete" , 失敗した場合は"status" => "open"）
    public static function fetch_checkout_status(Request $request)
    {
        try {
            $stripe = new StripeClient(env('STRIPE_SECRET'));

            $json_obj = json_decode($request->getContent());

            $session = $stripe->checkout->sessions->retrieve($json_obj->session_id);

            return $session;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    //stripeの決済に必要な商品の情報を設定する(商品の数量は変更なし)
    //引数 $cart_items: [[product_id => 1 , quantity => 1], [product_id => 2, quantity => 2], ...]
    //返り値 [[stripe_price_id => 文字列 , quantity => 1] , [stripe_price_id => 文字列 , quantity => 2], ...]
    private static function set_stripe_checkout_items($cart_items)
    {
        try {
            $stripe_checkout_items = [];

            //stripe_price_idを複数回取得する可能性があるため、トランザクションを開始
            //select命令のみを実行するため、commitとrollbackは不要
            DB::transaction(function () use ($cart_items, &$stripe_checkout_items) {

                foreach ($cart_items as $cart_item) {
                    $stripe_price_id = DB::select('select price_id from stripe_price_id where product_id = ?', [$cart_item['productId']]);
                    Log::debug($stripe_price_id);
                    Log::debug($stripe_price_id[0]->price_id);

                    $stripe_checkout_items[] = ['price' => $stripe_price_id[0]->price_id, 'quantity' => $cart_item['quantity']];
                }
            });

            return $stripe_checkout_items;
        } catch (\Throwable $th) {
            throw $th;
        }

    }

}

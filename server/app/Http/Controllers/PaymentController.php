<?php

namespace App\Http\Controllers;

use App\Lib\StripeFuncs;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function checkout_by_stripe(Request $request)
    {
        $checkout_status = StripeFuncs::checkout($request->cart_items);

        //決済が成功したか失敗したかを確認するのにclient_secretが必要
        return response()->json(["client_secret" => $checkout_status->client_secret]);
    }

    //決済ステータスを返す（決済が成功したかの失敗したか）
    public function get_checkout_status(Request $request)
    {
        $checkout_session = StripeFuncs::fetch_checkout_status($request);
        return response()->json(["status" => $checkout_session->status]);
    }
}

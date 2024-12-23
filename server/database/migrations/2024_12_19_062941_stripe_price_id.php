<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    //このテーブルはstripeの決済をするために必要なstripe_price_idを保存するテーブル
    public function up(): void
    {
        Schema::create('stripe_price_id', function (Blueprint $table) {
            $table->id();
            //stripeのprice_id
            $table->string("price_id");
            $table->unsignedBigInteger("user_id");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->unsignedBigInteger("product_id");
            $table->foreign("product_id")->references("id")->on("products")->onDelete("cascade");
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
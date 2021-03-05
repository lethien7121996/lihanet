<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuanlysanluongTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quanlysanluong', function (Blueprint $table) {
            $table->increments('id');
            $table->string('parentId');
            $table->string('tenchitieu');
            $table->string('sanluong');
            $table->string('donvi');
            $table->string('thongtin');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quanlysanluong');
    }
}

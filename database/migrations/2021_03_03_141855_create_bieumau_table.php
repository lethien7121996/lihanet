<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBieumauTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bieumau', function (Blueprint $table) {
            $table->increments('id');
            $table->string('sohieu');
            $table->string('tenbieumau');
            $table->string('loaisolieu');
            $table->string('namnhap');
            $table->string('idkybaocao');
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
        Schema::dropIfExists('bieumau');
    }
}

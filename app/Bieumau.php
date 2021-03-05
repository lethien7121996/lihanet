<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bieumau extends Model
{
    protected $table = 'bieumau';
    protected $fillable = ['sohieu', 'tenbieumau', 'loaisolieu', 'namnhap', 'idkybaocao'];
}

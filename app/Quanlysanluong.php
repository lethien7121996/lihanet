<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quanlysanluong extends Model
{
    protected $table = 'quanlysanluong';
    protected $fillable = ['parentId', 'tenchitieu', 'sanluong', 'dientich', 'donvi', 'thongtin'];
    public function childs(){
        return $this->hasOne(self::class, 'parentId', 'id');
        }
        
        public function parent(){
        return $this->belongsTo(self::class, 'parentId');
        }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solution extends Model
{
    use HasFactory;

    public function post() {
        return $this->belongsTo(Post::class, 'pid');
    }

    public function author() {
        return $this->belongsTo(User::class, 'uid');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'body',
        'uid',
        'pid',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'uid');
    }
}

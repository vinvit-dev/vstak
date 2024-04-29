<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'title',
        'body',
        'uid',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'uid');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'pid')->orderBy('created_at', 'asc');
    }
}

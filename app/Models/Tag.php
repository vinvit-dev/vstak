<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    public function entries() {
        return $this->belongsToMany(Post::class, 'tag_entries', 'tid', 'pid');
    }
}

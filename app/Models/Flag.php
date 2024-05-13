<?php

namespace App\Models;

use App\FlagModelType;
use App\FlagType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flag extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'model',
        'model_id',
    ];

    protected $casts = [
        'model' => FlagModelType::class,
        'type' => FlagType::class,
    ];
}

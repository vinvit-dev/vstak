<?php

namespace App;

enum FlagType: string
{
    case FLAG = 'flag';
    case LINK = 'like';
    case DISLIKE = 'dislike';
    case VOTE = 'vote';

    public static function options(): array
    {
        return [
            self::FLAG->value,
            self::LINK->value,
            self::DISLIKE->value,
            self::VOTE->value,
        ];
    }
}

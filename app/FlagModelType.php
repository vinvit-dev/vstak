<?php

namespace App;

enum FlagModelType: string
{
    case USER = 'user';
    case COMMENT = 'comment';
    case POST = 'post';

    public static function options(): array
    {
        return [
            self::USER->value,
            self::COMMENT->value,
            self::POST->value,
        ];
    }
}

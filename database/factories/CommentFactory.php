<?php

namespace Database\Factories;

use http\Message\Body;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'body' => $this->faker->paragraphs(random_int(1, 3), true),
            'uid' => random_int(1, 3),
            'pid' => random_int(1, 10),
        ];
    }
}

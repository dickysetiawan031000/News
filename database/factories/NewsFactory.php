<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(3);
        return [
            'title' => $title,
            'author' => $this->faker->email(),
            'category' => ['sport', 'politic', 'entertainment'][rand(0, 2)],
            'image' => $this->faker->imageUrl(),
            'desc' => $this->faker->paragraph(),
        ];
    }
}

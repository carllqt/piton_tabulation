<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Admin
        User::factory()->create([
            'name' => 'Reycarl',
            'email' => 'reycarl@gmail.com',
            'role' => 'admin',
        ]);
        //Judges
        for ($i = 1; $i <= 5; $i++) {
            User::factory()->create([
                'name' => "Judge{$i}",
                'email' => "judge{$i}@gmail.com",
                'role' => 'judge',
            ]);
        }
        //Contestants
        $this->call(ContestantsSeeder::class);
    }
}

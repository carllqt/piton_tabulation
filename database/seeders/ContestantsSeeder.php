<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contestant;

class ContestantsSeeder extends Seeder
{
    public function run(): void
    {
        $femaleCandidates = [
            ['Kimberly', 'Contillo'],
            ['Zyrel Shane', 'Palima'],
            ['Zyrille', 'Dayrit'],
            ['Eliza Grace', 'Asuncion'],
            ['Ma. Precious', 'Doloque'],
            ['Airah Shane', 'Pascual'],
            ['Angel Nicole', 'Albino'],
            ['Honey Fye', 'Balagso'],
            ['Mary Claire', 'Buraga'],
            ['Jarmie Nicole', 'Nedia'],
        ];

        $maleCandidates = [
            ['Ervin', 'Tabliago'],
            ['Jhon Mar', 'Domingo'],
            ['Francis', 'Sabado'],
            ['Jieson', 'Angangan'],
            ['Deejhay', 'Mabborang'],
            ['Prince Jian', 'Castillo'],
            ['Prince Gian', 'Ladimo'],
            ['Joven', 'Tabliago'],
        ];

        // Female candidates with numbered images
        foreach ($femaleCandidates as $index => $candidate) {
            Contestant::create([
                'first_name'    => $candidate[0],
                'last_name'     => $candidate[1],
                'gender'        => 'female',
                'profile_image' => "pictures/female/" . ($index + 1) . ".jpg",
            ]);
        }

        // Male candidates with numbered images
        foreach ($maleCandidates as $index => $candidate) {
            Contestant::create([
                'first_name'    => $candidate[0],
                'last_name'     => $candidate[1],
                'gender'        => 'male',
                'profile_image' => "pictures/male/" . ($index + 1) . ".jpg",
            ]);
        }
    }
}

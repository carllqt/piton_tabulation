<?php

namespace App\Services;

use App\Models\Contestant;
use Illuminate\Support\Collection;

class ResultService
{
    public function computeResults(): Collection
    {
        $results = Contestant::with('scores')->get()->map(function ($contestant) use (&$maleCount, &$femaleCount) {
            $totalScore = $contestant->scores->sum('total_scores');

            if ($contestant->gender === 'male') {
                $maleCount++;
                $contestantNumber = $maleCount;
            } else {
                $femaleCount++;
                $contestantNumber = $femaleCount;
            }

            return [
                'contestant_id' => $contestant->id,
                'contestant_number' => $contestantNumber,
                'image' => $contestant->profile_image,
                'name' => $contestant->first_name . ' ' . $contestant->last_name,
                'gender' => $contestant->gender,
                'top_funder' => $contestant->top_funder,
                'school_uniform' => $contestant->scores->sum('school_uniform') ?? 0,
                'sports' => $contestant->scores->sum('sports') ?? 0,
                'sptve' => $contestant->scores->sum('sptve') ?? 0,
                'filipiniana_barong' => $contestant->scores->sum('filipiniana_barong') ?? 0,
                'q_and_a' => $contestant->scores->sum('q_and_a') ?? 0,
                'stage_presence' => $contestant->scores->sum('stage_presence') ?? 0,
                'total_scores' => $contestant->scores->sum('total_scores'),
                'ranking' => $contestant->scores->sum('total_scores'),
            ];
        });

        $maleResults = $results->where('gender', 'male')->sortByDesc('ranking')->values();
        $femaleResults = $results->where('gender', 'female')->sortByDesc('ranking')->values();

        // Step 3: Ensure top funder is in top 5
        $maleResults = $this->ensureTopFunderTop5($maleResults);
        $femaleResults = $this->ensureTopFunderTop5($femaleResults);

        // Step 4: Assign placements separately for each gender
        $maleResults = $maleResults->values()->map(fn($r, $i) => ['placement' => $i + 1] + $r);
        $femaleResults = $femaleResults->values()->map(fn($r, $i) => ['placement' => $i + 1] + $r);

        // Step 5: Return combined collection
        return collect([
            'male' => $maleResults,
            'female' => $femaleResults,
        ]);
    }

    /**
     * Ensure the top funder is always in the top 5
     */
    protected function ensureTopFunderTop5(Collection $results): Collection
    {
        $topFunder = $results->first(fn($r) => $r['top_funder']);

        if ($topFunder) {
            $index = $results->search(fn($r) => $r['contestant_id'] === $topFunder['contestant_id']);
            if ($index !== false && $index >= 5) {
                // Remove from current position
                $results->splice($index, 1);
                // Insert at 5th place (index 4)
                $results->splice(4, 0, [$topFunder]);
            }
        }

        return $results;
    }

    public function computeResultsByCategory(string $category): Collection
    {
        $contestants = Contestant::with(['scores.judge'])->get();

        return $contestants->map(function ($contestant) use ($category) {
            $row = [
                'contestant_id' => $contestant->id,
                'name' => $contestant->first_name . ' ' . $contestant->last_name,
                'gender' => $contestant->gender,
                'image' => $contestant->profile_image,
                'scores' => [],
                'total' => 0,
            ];

            foreach ($contestant->scores as $index => $score) {
                $value = $score->$category ?? 0;

                // Force key like Judge 1, Judge 2, ...
                $judgeLabel = "Judge " . ($index + 1);

                $row['scores'][$judgeLabel] = $value;
                $row['total'] += $value;
            }

            return $row;
        });
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ScoreController extends Controller
{
    private function validateScores(Request $request, $max)
    {
        $request->validate([
            'scores' => 'required|array',
            'scores.*' => "numeric|min:0|max:$max",
            'gender' => 'required|in:male,female',
        ]);
    }

    private function saveScores(array $scores, string $column): void
    {
        $judgeId = Auth::id();

        foreach ($scores as $contestantId => $scoreValue) {
            $score = Score::firstOrNew([
                'contestant_id' => $contestantId,
                'judge_id' => $judgeId,
            ]);

            $score->{$column} = $scoreValue;

            // calculate total BEFORE save
            $score->total_scores =
                ($score->school_uniform ?? 0) +
                ($score->sports ?? 0) +
                ($score->sptve ?? 0) +
                ($score->filipiniana_barong ?? 0) +
                ($score->q_and_a ?? 0) +
                ($score->stage_presence ?? 0);

            $score->save();
        }
    }

    // School Uniform
    public function store_School_Uniform(Request $request)
    {
        $this->validateScores($request, 10);

        $this->saveScores($request->input('scores'), 'school_uniform');

        return redirect()->back()->with('success', 'School uniform scores saved successfully!');
    }

    // Sports
    public function store_Sports(Request $request)
    {
        $this->validateScores($request, 10);

        $this->saveScores($request->input('scores'), 'sports');

        return redirect()->back()->with('success', 'Sports scores saved successfully!');
    }

    // SPTVE
    public function store_Sptve(Request $request)
    {
        $this->validateScores($request, 15);

        $this->saveScores($request->input('scores'), 'sptve');

        return redirect()->back()->with('success', 'SPTVE scores saved successfully!');
    }

    // Filipiniana / Barong
    public function store_Filipiniana_Barong(Request $request)
    {
        $this->validateScores($request, 25);

        $this->saveScores($request->input('scores'), 'filipiniana_barong');

        return redirect()->back()->with('success', 'Filipiniana/Barong scores saved successfully!');
    }

    // Q and A
    public function store_Q_and_A(Request $request)
    {
        $this->validateScores($request, 20);

        $this->saveScores($request->input('scores'), 'q_and_a');

        return redirect()->back()->with('success', 'Q & A scores saved successfully!');
    }

    // Stage Presence
    public function store_Stage_Presence(Request $request)
    {
        $this->validateScores($request, 20);

        $this->saveScores($request->input('scores'), 'stage_presence');

        return redirect()->back()->with('success', 'Stage Presence scores saved successfully!');
    }
}

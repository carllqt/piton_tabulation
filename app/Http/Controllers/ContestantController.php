<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Contestant;
use App\Models\Score;
use Illuminate\Support\Facades\Auth;

class ContestantController extends Controller
{
    private function renderCategory($view, $column) {
        $user = Auth::user();
        $contestants = Contestant::all();
        $existingScores = Score::where('judge_id', $user->id)
            ->pluck($column, 'contestant_id')
            ->toArray();

        return Inertia::render($view, [
            'auth' => ['user' => $user],
            'contestants' => $contestants,
            'existingScores' => $existingScores,
        ]);
    }

    public function schoolUniform() {
        return $this->renderCategory('Categories/SchoolUniform', 'school_uniform');
    }

    public function sports() {
        return $this->renderCategory('Categories/Sports', 'sports');
    }

    public function sptve() {
        return $this->renderCategory('Categories/Sptve', 'sptve');
    }

    public function filipiniana_barong() {
        return $this->renderCategory('Categories/FilBarong', 'filipiniana_barong');
    }

    public function q_and_a() {
        return $this->renderCategory('Categories/QandA', 'q_and_a');
    }

    public function stage_presence() {
        return $this->renderCategory('Categories/StagePresence', 'stage_presence');
    }
}

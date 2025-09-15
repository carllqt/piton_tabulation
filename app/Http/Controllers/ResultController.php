<?php

namespace App\Http\Controllers;

use App\Services\ResultService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    protected $service;

    public function __construct(ResultService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $results = $this->service->computeResults();

        return Inertia::render('Result', [
            'results' => $results,
        ]);
    }

    public function byJudges(Request $request)
    {
        $category = $request->query('category', 'school_uniform');

        $results = $this->service->computeResultsByCategory($category);

        return Inertia::render('ResultByJudges', [
            'results' => $results,
            'category' => $category,
        ]);
    }
}
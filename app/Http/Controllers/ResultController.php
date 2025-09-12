<?php

namespace App\Http\Controllers;

use App\Services\ResultService;
use Inertia\Inertia;

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
}

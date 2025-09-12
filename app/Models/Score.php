<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'contestant_id', 
        'judge_id', 
        'school_uniform', 
        'sports', 
        'sptve', 
        'filipiniana_barong', 
        'q_and_a', 
        'stage_presence', 
        'total_scores',
    ];


    public function judge() {
    return $this->belongsTo(User::class, 'judge_id');
    }

    public function contestant() {
        return $this->belongsTo(Contestant::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contestant extends Model
{
    //
    use HasFactory;

    protected $fillable =[
        'profile_image',
        'first_name', 
        'last_name', 
        'gender', 
        'top_funder',
    ];

    protected $casts = [
        'top_funder' => 'boolean',
    ];
    
    public function scores() {
        return $this->hasMany(Score::class, 'contestant_id');
    }
}

<?php

namespace App\Observers;

use App\Models\Solution;

class SolutionObserver
{
    /**
     * Handle the Observer "created" event.
     */
    public function created(Solution $solution): void
    {
        $author = $solution->author();
        $author->increment('points', 10);
    }


    /**
     * Handle the Observer "deleted" event.
     */
    public function deleted(Solution $solution): void
    {
        $author = $solution->author();
        $author->decrement('points', 10);
    }
}

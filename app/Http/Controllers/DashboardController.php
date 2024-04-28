<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller {
   public function index() {
       $posts = Post::query()->where('uid', auth()->id())->paginate(5);
       return Inertia::render('Dashboard', [
           'posts' => $posts,
       ]);
   }
}

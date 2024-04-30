<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller {
   public function index() {
       $posts = Post::with('author')->orderBy('created_at', 'DESC')->paginate(5);
       $users = User::query()->orderBy('points', 'DESC')->limit(10)->get();
       return Inertia::render('Home', [
           'posts' => $posts,
           'users' => $users,
       ]);
   }
}

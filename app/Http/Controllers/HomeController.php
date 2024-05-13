<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Solution;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller {
   public function index() {
       $posts = Post::with(['author', 'tags'])->withExists('solution')->withCount('comments')->orderBy('created_at', 'DESC')->paginate(7);
       $users = User::query()->orderBy('points', 'DESC')->limit(10)->get();

       $post_count = Post::query()->count();
       $solved_post_count = Solution::query()->count();
       return Inertia::render('Home/Home', [
           'posts' => $posts,
           'users' => $users,
           'post_count' => $post_count,
           'solved_post_count' => $solved_post_count,
       ]);
   }
}

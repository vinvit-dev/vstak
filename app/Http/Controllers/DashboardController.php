<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Egulias\EmailValidator\Result\Reason\CommentsInIDRight;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller {
   public function index() {
       $posts = Post::query()->where('uid', auth()->id())->with('tags')->withExists('solution')->withCount('comments')->paginate(5);
       $recent_comments = Comment::with('post')
           ->orderBy('created_at', 'desc')
           ->limit(5)
           ->get();
       return Inertia::render('Dashboard', [
           'posts' => $posts,
           'recent_comments' => $recent_comments,
       ]);
   }
}

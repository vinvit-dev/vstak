<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
       $body = $request->validate([
           'body' => 'required|string',
           'pid' => 'required|integer|exists:posts,id',
       ]);
       if ($body) {
          $comment = new Comment();
          $comment->body = $body['body'];
          $comment->uid = auth()->id();
          $comment->pid = $body['pid'];
          $comment->save();
          return redirect()->route('posts.show', $body['pid']);
       }
    }

    public function update(Request $request, Comment $comment) {
        $body = $request->validate([
            'body' => 'required|string',
            'pid' => 'required|integer|exists:posts,id',
        ]);
        if ($body) {
            $comment->body = $body['body'];
            $comment->pid = $body['pid'];
            $comment->save();
            return redirect()->route('posts.show', $body['pid']);
        }
    }
}

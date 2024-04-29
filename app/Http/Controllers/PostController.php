<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Display all posts
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Post/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
        ]);
        if ($data) {
            $post = new Post();
            $post->title = $data['title'];
            $post->body = $data['body'];
            $post->uid = auth()->id();
            $post->save();
            return redirect()->route('dashboard');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post = Post::with(['author', 'comments.author'])->find($post->id);
        return Inertia::render('Post/Show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('Post/Edit', [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
        ]);
        if ($data) {
            $post->title = $data['title'];
            $post->body = $data['body'];
            $post->save();
            return redirect()->route('dashboard');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->route('dashboard');
    }
}

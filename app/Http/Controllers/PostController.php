<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\Solution;
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
            'tags' => 'required|array',
        ]);
        if ($data) {
            $post = new Post();
            $post->title = $data['title'];
            $post->body = $data['body'];
            $post->uid = auth()->id();
            $post->save();
            $tids = array_map(function ($item) {
                return $item['value'];
            }, $data['tags']);
            $post->tags()->sync($tids);
            $post->save();
            return redirect()->route('dashboard');
        } else {
            return redirect()->back()->withErrors($data);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post = Post::with(['author', 'comments.author', 'solution', 'tags', 'solution'])->withExists(['solution'])->find($post->id);
        return Inertia::render('Post/Show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $post = $post->load(['tags']);
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
            'tags' => 'required|array',
        ]);
        if ($data) {
            $post->title = $data['title'];
            $post->body = $data['body'];
            $tids = array_map(function ($item) {
                return $item['value'];
            }, $data['tags']);
            $post->tags()->sync($tids);
            $post->save();
            return redirect()->route('dashboard');
        } else {
            return redirect()->back()->withErrors($data);
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

    public function solve(Request $request, Post $post)
    {
        $data = $request->validate([
            'cid' => 'required|integer',
        ]);
        if ($data) {
            $solution = new Solution();
            $comment = Comment::query()->where('id', $data['cid'])->get()->first();
            $solution->cid = $comment->id;
            $solution->pid = $post->id;
            $solution->uid = $comment->uid;
            $solution->save();
            return redirect()->back();
        }
    }

    public function search(Request $request) {
        $data = $request->validate([
            'q' => 'string',
            'tags' => 'array',
        ]);
        if ($data) {
            $query = Post::query();
            if (isset($data['q'])) {
               $query->where('title', 'like', '%'.$data['q'].'%');
            }
            if (isset($data['tags'])) {
                $query->whereHas('tags', function ($query) use ($data) {
                    $query->whereIn('name', $data['tags']);
                });
            }
            $result = $query->limit(5)->get();
            return response()->json($result);
        } else {
            return response()->json([]);
        }
    }
}

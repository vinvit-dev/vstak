<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagsController extends Controller
{
    public function search(Request $request) {
       $data = $request->validate([
           'query' => 'required|string',
       ]);
       if ($data) {
           $tags = Tag::query()->where('name', 'like', '%' . $data['query'] . '%')->withCount('entries')->get();
           return response()->json($tags);
       }
    }

    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
        ]);
        if ($data) {
            $tag = new Tag();
            $tag->name = $data['name'];
            $tag->save();
            return response()->json($tag);
        }
    }

    public function show(Tag $tag) {
        $posts =Post::query()->whereHas('tags', function ($query) use ($tag) {
            $query->where('tid', $tag->id);
        })->with(['tags', 'author'])->withExists('solution')->paginate(7);

        return Inertia::render('Tags/TagSearch',
            [
                'posts' => $posts,
                'tag' => $tag,
            ]
        );
    }
}

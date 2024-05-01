<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

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
}

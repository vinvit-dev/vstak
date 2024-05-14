<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function upload(Request $request) {
        $img_path = Storage::disk("public")->put("images/uploads", $request->file("upload"));
        if ($img_path === null) {
            return back()->with("error", "File upload failed");
        }
        $filename = $request->file("upload")->getClientOriginalName();
        $img_url= Storage::disk("public")->url($img_path);
        return response()->json([
            "filename" => $filename,
            "uploaded" => 1,
            "url" => $img_url,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function save(Request $request)
    {
        $request->validate([
            'blog_id' => ['required', 'integer'],
            'comment' => ['min:2'],
        ]);

        $user = Auth::user();

        $comment = new Comment();
        $comment->comment = $request->comment;
        $comment->blog_id = $request->blog_id;
        $comment->user_id = $user->id;

        $comment->save();

        return back()->with(['flag' => true, 'message' => 'Commented successfully']);
    }
}

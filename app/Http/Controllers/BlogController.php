<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{
    public function detail($blog_id) {
        $blog = DB::table('blogs as b')
            ->join('users as u', 'b.user_id', 'u.id')
            ->select('b.*', 'u.name as user_name')
            ->where('b.id', $blog_id)
            ->first();

        $comments = DB::table('comments as c')
            ->join('users as u', 'c.user_id', 'u.id')
            ->select('c.*', 'u.name as user_name')
            ->where('c.blog_id', $blog_id)
            ->get();

        return view('blogs.detail', compact('blog', 'comments'));
    }

    public function add() {
        return view('blogs.add');
    }

    public function save(Request $request)
    {
        $request->validate([
            'title' => ['required', 'min:5', 'max:255'],
            'description' => ['required', 'min:10'],
            'img' => ['max:10240']
        ]);

        $user = Auth::user();

        $blog = new Blog();
        $blog->title = $request->title;
        $blog->description = $request->description;
        $blog->user_id = $user->id;

        if ($request->hasFile('img')) {
            $fileName = time() . '_' . $request->img->getClientOriginalName();
            $request->file('img')->move(public_path('blog_images'), $fileName);
            $blog->img = $fileName;
        }

        $blog->save();

        return redirect('/home')->with(['flag' => true, 'message' => 'Blog added successfully']);
    }

    public function edit($blog_id) {
        $blog = DB::table('blogs as b')
            ->join('users as u', 'b.user_id', 'u.id')
            ->select('b.*', 'u.name as user_name')
            ->where('b.id', $blog_id)
            ->first();

        return view('blogs.edit', compact('blog'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'blog_id' => ['required', 'integer'],
            'title' => ['required', 'min:5', 'max:255'],
            'description' => ['required', 'min:10'],
            'img' => ['max:10240']
        ]);

        $blog = Blog::where('id', $request->blog_id)->first();
        $blog->title = $request->title;
        $blog->description = $request->description;

        if ($request->hasFile('img')) {
            unlink(public_path('blog_images') . '/' . $blog->img);

            $fileName = time() . '_' . $request->img->getClientOriginalName();
            $request->file('img')->move(public_path('blog_images'), $fileName);
            $blog->img = $fileName;
        }

        $blog->save();

        return redirect('/blog/' . $blog->id)->with(['flag' => true, 'message' => 'Blog updated successfully']);
    }

    public function delete($blog_id)
    {
        Comment::where('blog_id', $blog_id)->delete();

        $blog = Blog::where('id', $blog_id)->first();

        if ($blog->img) {
            unlink(public_path('blog_images') . '/' . $blog->img);
        }

        $blog->delete();

        return redirect('/home')->with(['flag' => true, 'message' => 'Blog deleted successfully']);
    }

}

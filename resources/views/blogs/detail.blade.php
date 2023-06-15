@extends('layouts.main')

@section('title', 'Blog Detail')

@section('content')

    <div class="container">
        <div class="text-end mb-4">
            <a class="btn btn-sm btn-primary mr-2" href="/blog/edit/{{ $blog->id }}">Edit</a>
            <a class="btn btn-sm btn-danger" href="/blog/delete/{{ $blog->id }}">Delete</a>
        </div>
        @if (session()->has('flag'))
        <div class="alert alert-success">
            <strong>{{ session('message') }}</strong>
        </div>
        @endif
        <div class="mb-3">
            <img src="/blog_images/{{ $blog->img }}" alt="NA" height="300" width="300">
        </div>
        <div class="title mb-3">
            <strong>{{ $blog->title }}</strong>
        </div>
        <div class="description mb-3">
            <p>{{ $blog->description }}</p>
        </div>

        <div class="comments">
        <h5>Comments</h5>
        @foreach ($comments as $comment)
            <div class="">
                <span class="user"><strong>{{ $comment->user_name }}</strong>: </span>
                <span class="comment">{{ $comment->comment }}</span>
            </div>
            <hr>
        @endforeach
        </div>

        <form action="/comment/save" method="post">
            @csrf
            <input type="hidden" name="blog_id" value="{{ $blog->id }}">
            <input type="text" name="comment" placeholder="Add Comment here" required>
            <button class="btn btn-sm btn-primary" type="submit">ADD</button>
        </form>
    </div>


@endsection

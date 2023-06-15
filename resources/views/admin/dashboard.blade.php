@extends('layouts.main')

@section('title', 'Dashboard')

@section('content')
    <div class="text-end mb-4">
        <a class="btn btn-sm btn-primary mr-2" href="/blog/add">Add Blog</a>
    </div>
    @if (session()->has('flag'))
        <div class="alert alert-success">
            <strong>{{ session('message') }}</strong>
        </div>
        @endif
    @foreach ($blogs as $blog)
    <a href="/blog/{{ $blog->id }}">
        <div class="row mb-3">
            <div class="col-md-2">
                <img src="/blog_images/{{ $blog->img }}" alt="NA" width="70" height="70"></div>
            <div class="col-md-10">
                <div class="title">
                    <strong>{{ $blog->title }}</strong>
                </div>
                <hr>
                <div class="description">
                    <p>{{ $blog->description }}</p>
                </div>
            </div>
        </div>
    </a>
    @endforeach

@endsection

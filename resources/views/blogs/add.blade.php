@extends('layouts.main')

@section('title', 'Add Blog')

@section('content')
    <h3>Add Blog</h3>
    <form method="post" id="save-blog" action="/blog/save" enctype="multipart/form-data">
        @csrf
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <div class="row mb-3">
            <div class="col-md-3">
                <label for="title">Title</label>
            </div>
            <div class="col-md-6">
                <input type="text" name="title" required class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-3">
                <label for="description">Description</label>
            </div>
            <div class="col-md-6">
                <textarea name="description" class="form-control" cols="30" rows="6" required></textarea>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-3">
                <label for="img">Blog Image</label>
            </div>
            <div class="col-md-6">
                <input type="file" name="img" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-3"> </div>
            <div class="col-md-6">
                <button class="btn btn-primary" type="submit">ADD</button>
            </div>
        </div>
    </form>
@endsection

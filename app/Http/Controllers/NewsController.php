<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Http\Resources\NewsResource;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = News::orderBy('id', 'desc')
                ->paginate(10);
        $news = new NewsCollection($data);
        // $news = NewsResource::collection(News::paginate(10));
        return Inertia::render('Homepage', [
            'title' => 'aselole',
            'news' => $news,
            // 'newsCollection' => $newsCollection,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required',
                'category' => 'required',
                'desc' => 'required',
            ], [
                'title.required' => 'Title is required',
                'category.required' => 'Category is required',
                'desc.required' => 'Description is required',
            ]);

            News::create([
                'title' => $request->title,
                'category' => $request->category,
                'desc' => $request->desc,
                'author' => auth()->user()->email,
                'image' => ''
            ]);

            return redirect()->back()->with([
                'success' => true,
                'message' => 'News created successfully'
            ]);
        } catch (\Throwable $th) {
            return redirect()->back()->with([
                'success' => false,
                'message' => 'Failed to create news'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        $news = News::where('author', auth()->user()->email)
            ->orderBy('id', 'desc')
            ->get();
        return Inertia::render('Dashboard', [
            'news' => $news
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        return Inertia::render('EditNews',[
            'news' => $news
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        try {
            $news = News::where('id', $news->id)->update([
                'title' => $request->title ?? $news->title,
                'category' => $request->category ?? $news->category,
                'desc' => $request->desc ?? $news->desc,
            ]);

            return redirect()->back()->with([
                'success' => true,
                'message' => 'News updated successfully'
            ]);

        } catch (\Throwable $th) {
            return redirect()->back()->with([
                'success' => false,
                'message' => 'Failed to update news'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        News::where('id', $news->id)->delete();
        return redirect()->back()->with([
            'success' => true,
            'message' => 'News deleted successfully'
        ]);
    }
}

<?php

namespace App\Http\Controllers\Sellers;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Seller;
use App\Models\State;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SellerListController extends Controller
{
    const PAGINATION_SIZE = 20;

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $state = $request->route('state');
        $city = $request->route('city');
        $page = (int) $request->query('page', 1);
        $states = State::query()->orderBy('abbr')->get(['id', 'name', 'abbr']);
        $cities = City::query()->orderBy('name')->get(['id', 'name', 'state_id']);
        $sellers = Seller::query()
            ->when($state, fn ($query) => $query->whereHas('city.state', fn ($q) => $q->where('id', $state->id)))
            ->when($city, fn ($query) => $query->where('city_id', $city->id))
            ->with(['city', 'city.state'])
            ->orderBy('name')
            ->limit(self::PAGINATION_SIZE * $page + 1) // Fetch one extra to see if there's a next page
            ->get();

        $hasMorePages = $sellers->count() > self::PAGINATION_SIZE * $page;
        if ($hasMorePages) {
            $sellers->pop();
        }

        return Inertia::render('Sellers/Index', [
            'sellers' => $sellers,
            'states' => $states,
            'cities' => $cities,
            'filters' => [
                'city' => $city,
                'state' => $state,
            ],
            'hasMorePages' => $hasMorePages,
            'currentPage' => $page,
            'nextPage' => $hasMorePages ? $page + 1 : null,
        ]);
    }
}

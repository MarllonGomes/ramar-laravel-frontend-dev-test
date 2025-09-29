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
        $stateId = $request->route('state');
        $cityId = $request->route('city');
        $page = (int) $request->query('page', 1);

        $states = State::query()->orderBy('abbr')->get(['id', 'name', 'abbr']);
        $cities = City::query()->orderBy('name')->get(['id', 'name', 'state_id']);
        
        $sellers = Seller::query()
            ->when($stateId, fn ($query) => $query->whereHas('city', fn ($q) => $q->where('state_id', $stateId)))
            ->when($cityId, fn ($query) => $query->where('city_id', $cityId))
            ->with(['city', 'city.state'])
            ->orderBy('name')
            ->limit(self::PAGINATION_SIZE * $page + 1)
            ->get();

        // $sellers = $sellersQuery->paginate(self::PAGINATION_SIZE);

        // $hasMorePages = $sellers->count() > self::PAGINATION_SIZE * $page;
        if ($hasMorePages) {
            $sellers->pop();
        }

        return Inertia::render('Sellers/Index', [
            'sellers' => $sellers,
            'states' => $states,
            'cities' => $cities,
            'filters' => [
                'state' => State::find($stateId),
                'city' => City::find($cityId),
            ],
            'hasMorePages' => $hasMorePages,
            'currentPage' => $page,
            'nextPage' => $hasMorePages ? $page + 1 : null,
        ]);
    }
}

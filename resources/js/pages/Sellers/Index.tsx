import React, { useState, useEffect, useMemo } from 'react';
import { usePage, Head, router } from '@inertiajs/react';
import type { Page } from '@inertiajs/core';
import ListSellers from '@/components/ListSellers';

type Seller = {
    id: number;
    name: string;
    email: string;
    city_id: number;
    logo_url?: string;
    is_verified?: boolean;
    phone_number: number;
     external_url: string;
};

type State = {
    id: number;
    name: string;
};

type City = {
    id: number;
    name: string;
    state_id: number;
};

type PageProps = {
    sellers: Seller[];
    states: State[];
    cities: City[];
    filters: {
        city?: City;
        state?: State;
    };
    hasMorePages: boolean;
    currentPage: number;
    nextPage: number | null;
};

export default function SellersIndexPage() {

    const { props } = usePage<PageProps>();
    const { sellers: initialSellers, states, cities, filters, hasMorePages, nextPage } = props;
    
    const [selectedState, setSelectedState] = useState<string>(filters.state?.id?.toString() ?? '');
    const [selectedCity, setSelectedCity] = useState<string>(filters.city?.id?.toString() ?? '');

    const [sellers, setSellers] = useState<Seller[]>(initialSellers);
    
    const [hasMorePagesState, setHasMorePages] = useState(hasMorePages);
    const [nextPageState, setNextPage] = useState(nextPage);

    // console.log("dados", sellers)
    // console.log("dados atuais", setSellers)
    // console.log("dados estados", selectedState)
    // console.log("dados cidade", selectedCity)

     const filteredCities = useMemo(
        () => selectedState ? cities.filter((city) => city.state_id === Number(selectedState)) : cities,
        [selectedState, cities]
    );

    const handleConsult = () => {
        // console.log('Selected State ID:', selectedState);
        // console.log('Selected City ID:', selectedCity);
        // //  const stateObj = selectedState ? states.find(s => s.id === Number(selectedState)) : undefined;
        // // const cityObj = selectedCity ? cities.find(c => c.id === Number(selectedCity)) : undefined;


        let url = '/sellers';

        if (selectedState) {
            url += `/${selectedState}`;
            if (selectedCity) {
                url += `/${selectedCity}`;
            }
        }
        
        // console.log("URL Gerada para o Backend:", url);

        router.get(url, {}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const p = page as Page<PageProps>;
                setSelectedState(p.props.filters.state?.id?.toString() ?? '') ;
                setSelectedCity(p.props.filters.city?.id?.toString() ?? '') ;

                setSellers(p.props.sellers);
                setHasMorePages(p.props.hasMorePages);
                setNextPage(p.props.nextPage);
            }
        });
    };

    const handleLoadMore = () => {
        // console.log('Selected State ID (Load More):', selectedState);
        // console.log('Selected City ID (Load More):', selectedCity);
        // console.log('Next Page:', nextPageState);
        if (!nextPageState) return;
        
        let url = '/sellers';

        if (selectedState) {
            url += `/${selectedState}`;
            if (selectedCity) {
                url += `/${selectedCity}`;
            }
        }
        
        // console.log("URL Gerada para o Backend:", url); 

        router.get(url, {page: nextPageState },{
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const p = page as Page<PageProps>;
                setSellers(prev => [...prev, ...p.props.sellers]);
                setHasMorePages(p.props.hasMorePages);
                setNextPage(p.props.nextPage);
            }
    });

                
    }
    return (
        <>
            <Head title="Sellers" />
            <div className="container mx-auto p-4">
                <div>
                    <h1 className="text-2xl font-bold mb-4">Localize Revendas perto de você</h1>
                    <p>Consulte as revendas localizadas em sua região e encontre sua moto preferida pertinho de você!</p>

                    <div className='card-input flex flex-col space-y max-50 bg-white rounded-sm shadow-md p-6'>
                        <select className='w-full p-2 border border-gray-300 rounded'
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                        >
                            <option value="">Selecione seu estado</option>
                            {states.map((state) => (
                                <option key={state.id} value={String(state.id)}>{state.name}</option>
                            ))}
                        </select>

                        <select
                            className='w-full p-2 border border-gray-300 rounded'
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            disabled={!selectedState}
                        >
                            <option value="">Selecione seu município</option>
                            {filteredCities.map((city) => (
                                <option key={city.id} value={String(city.id)}>{city.name}</option>
                            ))}
                        </select>

                        <button className='mt-2 rounded-lg mx-auto bg-black text-white p-4' type="button" onClick={handleConsult}>Consultar</button>
                    </div>
                </div>

                <div className='list-component mb-8'>
                    <div className='grid grid-cols-4 gap-6 max-w-7xl mx-auto'>
                        {sellers.slice(0,12).map((seller) => (
                            <ListSellers key={seller.id} seller={seller} />
                        ))}
                    </div>

                    {hasMorePages && (
                        <button className='mt-2 rounded-lg mx-auto bg-black text-white p-4' type="button" onClick={handleLoadMore}>Exibir mais</button>
                    )}
                </div>
            </div>
        </>
    );
}

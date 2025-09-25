import React from 'react';

import { Head, usePage } from '@inertiajs/react';

type Seller = {
    id: number;
    name: string;
    email: string;
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
    const { sellers, states, cities, filters, hasMorePages, currentPage, nextPage } = usePage<{ props: PageProps }>().props;

    console.log({ sellers, states, cities, filters, hasMorePages, currentPage, nextPage });

    return (
        <>
            <Head title="Sellers" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Sellers</h1>

            </div>
        </>
    );
}

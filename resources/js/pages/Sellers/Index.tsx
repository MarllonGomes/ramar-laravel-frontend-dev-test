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
            <div className="container mx-auto ">
                <div className="flex flex-col items-center justify-center ">
                    <svg width="135" height="106" viewBox="0 0 135 106" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.4203 105.76C30.4499 105.779 30.4894 105.769 30.5191 105.789C30.7523 105.919 31.013 105.991 31.2797 106C31.4266 106 31.5728 105.98 31.7144 105.941L67.5008 96.1742L103.287 105.941C103.429 105.98 103.575 106 103.722 106C103.988 105.992 104.248 105.918 104.479 105.786C104.512 105.769 104.548 105.776 104.578 105.756L134.214 87.6457C134.52 87.4578 134.756 87.175 134.887 86.8404C135.018 86.5058 135.036 86.1376 134.938 85.7919L118.527 28.1674C118.459 27.9274 118.339 27.7058 118.173 27.5194C118.008 27.333 117.802 27.1867 117.572 27.0915C117.341 26.9964 117.092 26.9548 116.844 26.9701C116.595 26.9853 116.353 27.0569 116.136 27.1795L99.7969 36.3468C99.4391 36.5727 99.1818 36.9274 99.0781 37.3377C98.9745 37.748 99.0325 38.1824 99.2401 38.5512C99.4477 38.9199 99.7891 39.1947 100.194 39.3189C100.598 39.443 101.035 39.4069 101.414 39.2181L115.932 31.0684L131.431 85.4857L105.039 101.617L98.7696 51.4641C98.7154 51.0305 98.4912 50.6362 98.1463 50.3679C97.8015 50.0996 97.3641 49.9793 96.9305 50.0334C96.4969 50.0876 96.1026 50.3117 95.8343 50.6566C95.5659 51.0015 95.4456 51.4389 95.4998 51.8725L101.779 102.118L69.1473 93.2106V84.2212C69.1473 83.7845 68.9738 83.3658 68.665 83.057C68.3563 82.7482 67.9375 82.5748 67.5008 82.5748C67.0642 82.5748 66.6454 82.7482 66.3366 83.057C66.0279 83.3658 65.8544 83.7845 65.8544 84.2212V93.2106L33.2192 102.118L39.4986 51.8725C39.5254 51.6578 39.5097 51.4399 39.4523 51.2313C39.3949 51.0227 39.297 50.8274 39.1641 50.6566C39.0313 50.4859 38.8661 50.3429 38.678 50.236C38.4899 50.1291 38.2826 50.0602 38.0679 50.0334C37.8532 50.0066 37.6353 50.0223 37.4267 50.0797C37.2181 50.1371 37.0228 50.235 36.852 50.3679C36.6813 50.5008 36.5383 50.6659 36.4314 50.854C36.3245 51.0421 36.2556 51.2495 36.2288 51.4641L29.9626 101.617L3.57055 85.4889L19.0699 31.075L33.588 39.2247C33.9667 39.4135 34.4035 39.4496 34.808 39.3255C35.2126 39.2013 35.554 38.9265 35.7616 38.5577C35.9692 38.189 36.0272 37.7546 35.9236 37.3443C35.8199 36.934 35.5626 36.5793 35.2048 36.3534L18.8625 27.1828C18.646 27.0589 18.404 26.9862 18.1551 26.9703C17.9062 26.9543 17.6569 26.9957 17.4264 27.091C17.196 27.1864 16.9904 27.3333 16.8255 27.5204C16.6606 27.7076 16.5407 27.93 16.4752 28.1707L0.0636892 85.7952C-0.0355713 86.1409 -0.0184309 86.5096 0.11247 86.8446C0.243372 87.1796 0.480773 87.4622 0.788112 87.649L30.4203 105.76Z" fill="black"/>
                        <path d="M66.3845 77.5763C66.6868 77.8553 67.0826 78.0111 67.4939 78.0129C67.9053 78.0147 68.3024 77.8625 68.6072 77.5862C69.7037 76.5885 95.4898 52.9262 95.4898 28.6185C95.4898 12.9216 83.1977 0.629463 67.5008 0.629463C51.8039 0.629463 39.5117 12.9216 39.5117 28.6185C39.5117 52.5047 65.288 76.5621 66.3845 77.5763ZM67.5008 3.92229C81.5776 3.92229 92.197 14.5384 92.197 28.6185C92.197 48.6949 72.4631 69.2422 67.5106 74.0826C62.5681 69.1862 42.8045 48.3689 42.8045 28.6185C42.8045 14.5384 53.4239 3.92229 67.5008 3.92229Z" fill="#F9023B"/>
                        <path d="M82.3186 28.6185C82.3186 20.449 75.6703 13.8008 67.5008 13.8008C59.3313 13.8008 52.6831 20.449 52.6831 28.6185C52.6831 36.788 59.3313 43.4362 67.5008 43.4362C75.6703 43.4362 82.3186 36.788 82.3186 28.6185ZM67.5008 40.1434C61.1457 40.1434 55.9759 34.9737 55.9759 28.6185C55.9759 22.2634 61.1457 17.0936 67.5008 17.0936C73.856 17.0936 79.0257 22.2634 79.0257 28.6185C79.0257 34.9737 73.856 40.1434 67.5008 40.1434Z" fill="#F9023B"/>
                    </svg>
                    <h1 className="text-2xl font-bold mb-4">Localize Revendas perto de você</h1>
                    <p>Consulte as revendas localizadas em sua região e encontre sua moto preferida pertinho de você!</p>

                    <div className='w-200  items-center justify-center bg-white rounded-md shadow-md p-6 card-input'>
                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4'>
                            <select className='text-[#6B7280] w-full p-2 border border-gray-300 rounded'
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}
                            >
                                <option className='text-[#6B7280]' value="">Selecione seu estado</option>
                                {states.map((state) => (
                                    <option key={state.id} value={String(state.id)} className='text-[#6B7280]'>{state.name}</option>
                                ))}
                            </select>

                            <select
                                className='text-[#6B7280] w-full p-2 border border-gray-300 rounded'
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                disabled={!selectedState}
                            >
                                <option className='text-[#6B7280]' value="">Selecione seu município</option>
                                {filteredCities.map((city) => (
                                    <option className='text-[#6B7280]' key={city.id} value={String(city.id)}>{city.name}</option>
                                ))}
                            </select>

                    </div>
                    <button className='mt-2  rounded-lg w-190 bg-black text-white p-4 bg-[#1F2937]' type="button" onClick={handleConsult}>Consultar</button>
                </div>
                </div>
                <p className='flex flex-col items-center justify-center  font-bold text-[22px] p-3 text-[#1F2937]'>REVENDAS EM SUA REGIÂO</p>
                <div className='  list-component'>
                    <div className='grid 
                        grid-cols-1        
                        sm:grid-cols-2     
                        lg:grid-cols-4    
                        gap-6 
                        mx-auto 
                        max-w-7xl
                           m-5
                    '>
                        {sellers.slice(0,12).map((seller) => (
                            <ListSellers key={seller.id} seller={seller} />
                        ))}
                    </div>
                    <div className='flex justify-center'>
                        {hasMorePages && (
                        <button className=' rounded-lg bg-black text-white p-4' type="button" onClick={handleLoadMore}>Exibir mais</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

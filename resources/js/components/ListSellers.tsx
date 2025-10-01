import sellers from '@/routes/sellers';
import brmotos from '../../img/brmotos.jpg';

type Seller = {
  id: number;
  name: string;
  email: string;
  city_id: number;
  logo_url?: string;
  is_verified?: boolean;
  phone_number: number;
  external_url: string
  city: City;
};

type State = {
  id: number;
  name: string;
  abbr: string;
};

type City = {
  id: number;
  name: string;
  state: State;
};
interface ListSellersProps {
  seller: Seller;
  
}

export default function ListSellers ({ seller }: ListSellersProps) {
 return (
        <>
        <div className="card 
        max-w-sm bg-white 
        w-100
        h-80
        rounded-xl
         shadow-md p-6  p-4 
      rounded-md 
      border-2 
      border-transparent 
      transition-colors 
      duration-300 
      ease-in-out 
      hover:border-blue-500
       flex flex-col "
      >
            
          
            <div key={seller.id} className="card ">
            <div className='card-img flex items-center gap-4'>
            
            <img  className='w-25 h-28 rounded-lg' src={seller.logo_url} alt="seller" />
              <div className='list-items flex-inline'>
                
                 {seller.is_verified && (
                 <div className="flex items-end justify-end gap-2 p-2 w-40 border-2 border-[#3B82F6] rounded-md flex-none">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 0C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10C7.76 10 10 7.76 10 5C10 2.24 7.76 0 5 0ZM4 7.5L1.5 5L2.205 4.295L4 6.085L7.795 2.29L8.5 3L4 7.5Z" fill="#3B82F6"/>
                  </svg>
                   <span className="text-[#3B82F6]  font-inter r font-semibold text-[8px] leading-none tracking-normal uppercase">Revenda verificada</span>

                 </div>

                )}
                
                <p className="font-sora font-bold text-[18px] max-w-[200px] leading-none tracking-normal text-right">{seller.name}</p>
               
                  <div className="localization">
                        <div className='flex items-center space-x-1'>
                        <svg color='white' width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 0C1.78857 0 0 1.7215 0 3.85C0 6.7375 4 11 4 11C4 11 8 6.7375 8 3.85C8 1.7215 6.21143 0 4 0ZM4 5.225C3.21143 5.225 2.57143 4.609 2.57143 3.85C2.57143 3.091 3.21143 2.475 4 2.475C4.78857 2.475 5.42857 3.091 5.42857 3.85C5.42857 4.609 4.78857 5.225 4 5.225Z" fill="#111827"/>
                        </svg>
                
                        <span> {seller.city.state.abbr} / {seller.city.name}</span>
                        </div>

                        <div className='flex items-center justify-center w-20 h-8 rounded-lg  bg-[#E20025E5] text-white'>
                          <svg color='blue' width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                          <path d="M4 0C1.78857 0 0 1.7215 0 3.85C0 6.7375 4 11 4 11C4 11 8 6.7375 8 3.85C8 1.7215 6.21143 0 4 0ZM4 5.225C3.21143 5.225 2.57143 4.609 2.57143 3.85C2.57143 3.091 3.21143 2.475 4 2.475C4.78857 2.475 5.42857 3.091 5.42857 3.85C5.42857 4.609 4.78857 5.225 4 5.225Z" fill="currentColor"/>
                          </svg>
                          <p className='p-2 '>50 km</p>
                        </div>
                 
                </div>
              </div>
          </div>
          <div className="flex flex-col m-4 gap-4">
              <div className="whats p-3  bg-[#16A34A] text-white flex items-center justify-center space-x-2 rounded-lg w-full ">
                  
                <svg width="21" height="21" viewBox="0 0 21 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.55 3.41C15.68 1.53 13.19 0.5 10.54 0.5C5.08005 0.5 0.630049 4.95 0.630049 10.41C0.630049 12.16 1.09005 13.86 1.95005 15.36L0.550049 20.5L5.80005 19.12C7.25005 19.91 8.88005 20.33 10.54 20.33C16 20.33 20.4501 15.88 20.4501 10.42C20.4501 7.77 19.42 5.28 17.55 3.41ZM10.54 18.65C9.06005 18.65 7.61005 18.25 6.34005 17.5L6.04005 17.32L2.92005 18.14L3.75005 15.1L3.55005 14.79C2.73005 13.48 2.29005 11.96 2.29005 10.41C2.29005 5.87 5.99005 2.17 10.53 2.17C12.73 2.17 14.8 3.03 16.35 4.59C17.91 6.15 18.76 8.22 18.76 10.42C18.7801 14.96 15.08 18.65 10.54 18.65ZM15.06 12.49C14.81 12.37 13.59 11.77 13.37 11.68C13.14 11.6 12.98 11.56 12.81 11.8C12.64 12.05 12.17 12.61 12.03 12.77C11.89 12.94 11.74 12.96 11.49 12.83C11.24 12.71 10.44 12.44 9.50005 11.6C8.76005 10.94 8.27005 10.13 8.12005 9.88C7.98005 9.63 8.10005 9.5 8.23005 9.37C8.34005 9.26 8.48005 9.08 8.60005 8.94C8.72005 8.8 8.77005 8.69 8.85005 8.53C8.93005 8.36 8.89005 8.22 8.83005 8.1C8.77005 7.98 8.27005 6.76 8.07005 6.26C7.87005 5.78 7.66005 5.84 7.51005 5.83C7.36005 5.83 7.20005 5.83 7.03005 5.83C6.86005 5.83 6.60005 5.89 6.37005 6.14C6.15005 6.39 5.51005 6.99 5.51005 8.21C5.51005 9.43 6.40005 10.61 6.52005 10.77C6.64005 10.94 8.27005 13.44 10.75 14.51C11.34 14.77 11.8 14.92 12.16 15.03C12.75 15.22 13.29 15.19 13.72 15.13C14.2 15.06 15.19 14.53 15.39 13.95C15.6 13.37 15.6 12.88 15.53 12.77C15.46 12.66 15.31 12.61 15.06 12.49Z" />
                </svg>

                <button className=' rounded-lg  mx-auto' type="submit" value={seller.phone_number}>Chamar no WhatsApp</button>
              </div>

              <a href={seller.external_url} className='p-3 bg-[#57534E]  text-white flex items-center justify-center space-x-2 rounded-lg w-full '>Veja as motos da revenda</a>
              </div>
            </div>
       

        </div>
        </>
 )
}
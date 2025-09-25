import brmotos from '../../img/brmotos.jpg';

type Seller = {
  id: number;
  name: string;
  email: string;
};

type State = {
  id: number;
  name: string;
//   email: string;
};

type City = {
  id: number;
  name: string;
//   email: string;
};
interface ListSellersProps {
  seller: Seller;
  // states: State[];
  // cities: City[];
}

export default function ListSellers ({ seller }: ListSellersProps) {
 return (
        <>
        <div className="card max-w-sm bg-white rounded-xl shadow-md p-6">
            
          
            <div key={seller.id} className="card">
            <img src={brmotos} alt="BR Motos" />
            <p>{seller.name}</p>
            <span>Revenda verificada</span>

            <div className="localization">
                <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 0C1.78857 0 0 1.7215 0 3.85C0 6.7375 4 11 4 11C4 11 8 6.7375 8 3.85C8 1.7215 6.21143 0 4 0ZM4 5.225C3.21143 5.225 2.57143 4.609 2.57143 3.85C2.57143 3.091 3.21143 2.475 4 2.475C4.78857 2.475 5.42857 3.091 5.42857 3.85C5.42857 4.609 4.78857 5.225 4 5.225Z" fill="#111827"/>
                </svg>
                <span>BRASÍLIA / DF</span>
                <p>50 km</p>
            </div>

            <button type="submit">Chamar no WhatsApp</button>
            <a href="">Veja as motos da revenda</a>
            </div>
       

        </div>
        </>
 )
}
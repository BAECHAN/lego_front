import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';


type Item = {
    product_id: number,
    title: string,
    image: string,
    price: number,
    ages: number,
    product_number: number,
    date_released: Date,
    sale_enabled: number,
    discounting: boolean,
    rate_discount: number,
    ea: number
}

export default function Theme(){
 
  const router = useRouter();
  const {theme} = router.query;

  console.log(router.query);

  let [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/getItems?theme_id=13')
      .then((response) => {
        if(response.status === 200){
          setItems(response.data);
        }
      })
      .catch((error) => {
        console.error(error.reponse);
      })
  },[])
  
  return(
    <div>
      <Navbar currentPage={router.query.title_ko}/>
      <h2 className='theme-name'>{theme}</h2>

      <div className='main'>
        
        <Sidebar />
        <ul>
          {items.map((item, index) => {
            return(
              <li key={index} style={{width:'30%'}}>
                <div id={String(item.product_id)} className="contents">
                  <Image src={item.image}
                  width="300%"
                  height="150%"
                  alt={item.title}
                  priority
                  />
                  <h2>{item.title}</h2>
                  <h2>{`${item.price.toLocaleString('ko-KR')} 원`}</h2>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <style jsx>{`
        .main{
          display:flex;
        }

        ul {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
        }

        li {
          width: 300px;
          height: 400px;
        }
        
      `}</style>
    </div>
  )
}

Theme.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
import Layout from "../components/Layout";
import axios from "axios";
import { useEffect,useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function Themes(){
  
  type Theme = {
    theme_id : number;
    theme_title : string;
    thumbnail_link : string;
  }
  let [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/index")
    .then((response) => {
      if( response.status === 200){
        setThemes(response.data);
      }
    }).catch((error) => {
      console.log(error.response);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <h2>시리즈별</h2>
      <ul>
        {
          themes.map( (item, index) => {
            return(
              <li key={index} className="m-5">
                <Link href="/">
                  <a>
                    <Image src={item.thumbnail_link}
                    width="300px" height="150px" alt={item.theme_title +'_썸네일'} />
                  </a>
                </Link>
                <strong>{item.theme_title}</strong>
              </li>
            )
          })
        }
      </ul>


      <style jsx>{`
        h2{
          background-color: rgb(0, 109, 183);
          color: #fff;
          padding: 10px;
          font-size: 30px;
          text-align: center;
        }
        ul{
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
        }
        strong{
          display: block;
          text-align: center;
        }
        
      `}</style>
    </div>
  )
}

Themes.getLayout = function getLayout(page: React.ReactElement){
  return(
    <Layout>{page}</Layout>
  )
}
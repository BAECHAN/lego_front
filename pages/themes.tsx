import Layout from "../components/Layout";
import axios from "axios";
import { useEffect,useState } from "react";
import Navbar from "../components/Navbar";
export default function Themes(){
  
  type Theme = {
    theme_id : number;
    theme_title : string;
  }
  let [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/index")
    .then((response) => {
      if( response.status === 200){
        const data = response.data;
        console.log(data);
        setThemes(data);
      }
    }).catch((error) => {
      console.log(error.response);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <h2>시리즈별</h2>
      {
        themes.map( (item, index) => {
          return(
            <ul key={index}>
              <li>{item.theme_title}</li>
            </ul>
          )
        })
      }


      <style jsx>{`
        h2{
          background-color: rgb(0, 109, 183);
          color: #fff;
          padding: 10px;
          font-size: 30px;
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
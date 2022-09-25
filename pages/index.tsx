import Layout from "../components/Layout";
import { useEffect } from "react"
import axios from "axios";
export default function Home(){

  useEffect(() => {
    axios.get("http://localhost:5000/index").then((response) => {
      console.log(response.status);
      const data = response.data;
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h2>Lego</h2>
    </div>
  )
}

Home.getLayout = function getLayout(page: React.ReactElement){
  return(
    <Layout>{page}</Layout>
  )
}
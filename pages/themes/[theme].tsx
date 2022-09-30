import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar'

import { useRouter } from 'next/router';


export default function Theme(){
  const router = useRouter();
  const {theme} = router.query;

  console.log(router.query)
  
  return(
    <div>
      <Navbar currentPage={router.query.title_ko}/>
      <div>{theme}</div>
    </div>
  )
}

Theme.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
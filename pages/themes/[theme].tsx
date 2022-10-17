import Layout from '../../components/Layout'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'

import { useQuery } from '@tanstack/react-query'

import { ThemeT, ProductT } from 'types'
import ProductCard from '@components/ProductCard'

export async function getServerSideProps(context: any) {
  return {
    props: context.query,
  }
}

export default function Theme(props: ThemeT) {
  const { data: products } = useQuery<ProductT[]>(
    ['http://localhost:5000/api/getProductList'],
    async () => {
      const res = await fetch(
        `http://localhost:5000/api/getProductList?theme_id=${props.theme_id}`
      )
      return res.json()
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
    }
  )

  return (
    <div>
      <Navbar currentPage={props.theme_title} />
      <div className="flex">
        <Sidebar />
        <ul className="flex flex-wrap">
          {products &&
            products.map((product, index) => {
              return <ProductCard product={product} key={index} />
            })}
        </ul>
      </div>
    </div>
  )
}

Theme.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export type ProductT = {
  product_id: number
  title: string
  image: string
  price: number
  pieces: number
  ages: number
  product_number: number
  date_released: Date
  sale_enabled: number
  discounting: boolean
  rate_discount: number
  ea: number

  product_info: ProductT
  product_img_list: string[]
}

export type ThemeT = {
  theme_id: number
  theme_title: string
  theme_title_en: string
  thumbnail_link: string
  theme_dscrp: string
}

export type UserT = {
  email: string
  name: string
  image: string
  grade: number
}

export type ChildrenT = {
  propChildren: React.ReactNode
}

export type inputRegExpT = {
  [key: string]: RegExp
}

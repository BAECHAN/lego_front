import internal from 'stream'

export type ObjT_Str = {
  [key: string]: string
}

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
  discounting: number
  rate_discount: number
  ea: number

  product_info: ProductT
  product_img_list: string[]
}

export type ProductFilterT = {
  product_id: number
  filter_price: number
  filter_ages: number
  filter_sale_enabled: number
  filter_discounting: number
  filter_pieces: number
}

export type ProductFilterCountT = {
  filter_price1: number
  filter_price2: number
  filter_price3: number
  filter_price4: number
  filter_price5: number
  filter_price6: number

  filter_ages1: number
  filter_ages2: number
  filter_ages3: number
  filter_ages4: number
  filter_ages5: number
  filter_ages6: number
  filter_ages7: number
  filter_ages8: number

  filter_sale_enabled1: number
  filter_sale_enabled2: number
  filter_sale_enabled3: number
  filter_sale_enabled4: number

  filter_discounting1: number
  filter_discounting2: number

  filter_pieces1: number
  filter_pieces2: number
  filter_pieces3: number
  filter_pieces4: number
  filter_pieces5: number
  filter_pieces6: number
  filter_pieces7: number
}

export type ThemeT = {
  theme_id: number
  theme_title: string
  theme_title_en: string
  thumbnail_link: string
  theme_dscrp: string
}

export type UserT = {
  id: number
  email: string
  name: string
  image: string
  date_created: Date
  account_expired: number
  account_locked: number
  account_withdraw: number
  date_withdraw: Date
  grade: number
}

export type ChildrenT = {
  propChildren: React.ReactNode
}

export type InputRegExpT = {
  [key: string]: RegExp
}

export type UserSubmitT = {
  email: string
  pw: string
  pwChk: string
  nickname: string
}

export type ProductWishSubmitT = {
  email: string | null | undefined
  product_id: number | undefined
}

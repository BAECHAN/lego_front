import internal from 'stream'

export type ObjT_Str = {
  [key: string]: string
}

export type ParamT = {
  [key: string]: Object
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
}

export type ProductCartT = ProductT & {
  cart_id: number
  order_quantity: number
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
  account_state: number
  date_withdraw: Date
  grade: string
  oauth_connect: string
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
  nickname: string
}

export type UserCreateT = UserSubmitT & {
  pwChk: string
}

export type ProductWishSubmitT = {
  email: string
  product_id: number
}

export type ProductUpdateCartSubmitT = ProductWishSubmitT & {
  cart_id: number
  state: string
}

export type ProductAddCartSubmitT = ProductWishSubmitT & {
  order_quantity: number
}

export type ProductDeleteCartSubmitT = ProductAddCartSubmitT & {
  cart_id: nubmer
}

export type DeliverySubmitT = {
  recipient: string
  shippingName: string
  telNumberFront: string
  telNumberMiddle: string
  telNumberBack: string
  shippingZipCode: string
  shippingAddress1: string
  shippingAddress2: string
  shippingDefault: boolean
  deliveryRequest: string
  deliveryRequestDirect: string
}

export type ShippingT = {
  shipping_id: number
  email: string
  recipient: string
  shipping_name: string
  tel_number: string
  shipping_zipcode: string
  shipping_address1: string
  shipping_address2: string
  shipping_default: int
  delivery_request: string
  delivery_request_direct: string
  state: number
}

export type OrderT = {
  order_group_id: number
  state: number
  date_registed: Date
  pay_price: number
  order_quantity: number
  product_id: number
  product_number: number
  title: string
  image: string
  recipient: string
  tel_number: string
  shipping_address1: string
  shipping_address2: string
  delivery_request: string
  delivery_request_direct: string
}

export type UserOAuthSubmitT = UserSubmitT & {
  provider: string
}

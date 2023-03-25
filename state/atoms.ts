import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { ObjT_Str, ProductFilterCountT, ThemeT } from 'types'
import { v1 } from 'uuid'

const { persistAtom } = recoilPersist()

const themeAtom = atom<ThemeT>({
  key: `themeAtom`,
  default: {
    theme_id: 0,
    theme_title: '',
    theme_title_en: '',
    thumbnail_link: '',
    theme_dscrp: '',
  },
})

export const themeSelector = selector<ThemeT>({
  key: `themeSelector`,
  get: ({ get }) => {
    return get(themeAtom)
  },
  set: ({ set }, newValue) => {
    set(themeAtom, newValue)
  },
})

const mypageListAtom = atom<ObjT_Str>({
  key: `mypageListAtom`,
  default: {
    order_history: '주문 내역 조회',
    cart: '장바구니',
    user_info: '회원 정보',
    delivery: '배송지 관리',
    coupon: '쿠폰 조회',
    viewed_products: '최근 본 상품',
    wish_list: '좋아요',
  },
})

export const mypageListSelector = selector<ObjT_Str>({
  key: `mypageListSelector`,
  get: ({ get }) => {
    return get(mypageListAtom)
  },
})

const sortAtom = atom<string>({
  key: `sortAtom`,
  default: '',
})

export const sortSelector = selector<string>({
  key: `sortSelector`,
  get: ({ get }) => {
    return get(sortAtom)
  },
  set: ({ set }, newValue) => {
    set(sortAtom, newValue)
  },
})

const selectedFilterAtom = atom<ProductFilterCountT>({
  key: `selectedFilterAtom`,
  default: {
    filter_price1: 0,
    filter_price2: 0,
    filter_price3: 0,
    filter_price4: 0,
    filter_price5: 0,
    filter_price6: 0,

    filter_ages1: 0,
    filter_ages2: 0,
    filter_ages3: 0,
    filter_ages4: 0,
    filter_ages5: 0,
    filter_ages6: 0,
    filter_ages7: 0,
    filter_ages8: 0,

    filter_sale_enabled1: 0,
    filter_sale_enabled2: 0,
    filter_sale_enabled3: 0,
    filter_sale_enabled4: 0,

    filter_discounting1: 0,
    filter_discounting2: 0,

    filter_pieces1: 0,
    filter_pieces2: 0,
    filter_pieces3: 0,
    filter_pieces4: 0,
    filter_pieces5: 0,
    filter_pieces6: 0,
    filter_pieces7: 0,
  },
})

export const selectedFilterSelector = selector<ProductFilterCountT>({
  key: `selectedFilterSelector`,
  get: ({ get }) => {
    return get(selectedFilterAtom)
  },
  set: ({ set }, newValue) => {
    set(selectedFilterAtom, newValue)
  },
})

const orderAtom = atom<number[]>({
  key: `orderAtom`,
  default: [],
})

export const orderSelector = selector({
  key: `orderSelector`,
  get: ({ get }) => {
    return get(orderAtom)
  },
  set: ({ set }, newValue) => {
    set(orderAtom, newValue)
  },
})

const selectedOrderAtom = atom<number[]>({
  key: `selectedOrderAtom`,
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const selectedOrderSelector = selector({
  key: `selectedOrderSelector`,
  get: ({ get }) => {
    return get(selectedOrderAtom)
  },
  set: ({ set }, newValue) => {
    set(selectedOrderAtom, newValue)
  },
})

const orderPriceAtom = atom<number>({
  key: `orderPriceAtom`,
  default: 0,
  effects_UNSTABLE: [persistAtom],
})

export const orderPriceSelector = selector({
  key: `orderPriceSelector`,
  get: ({ get }) => {
    return get(orderPriceAtom)
  },
  set: ({ set }, newValue) => {
    set(orderPriceAtom, newValue)
  },
})

const selectedShippingAtom = atom<number>({
  key: `selectedShippingAtom`,
  default: 0,
})

export const selectedShippingSelector = selector({
  key: `selectedShippingSelector`,
  get: ({ get }) => {
    return get(selectedShippingAtom)
  },
  set: ({ set }, newValue) => {
    set(selectedShippingAtom, newValue)
  },
})

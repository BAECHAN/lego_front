import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import {
  ObjT_Str,
  ProductFilterCountT,
  ProductFilterInfoT,
  ThemeT,
} from 'types'
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

const productFilterInfoAtom = atom<ProductFilterInfoT>({
  key: `productFilterInfoAtom`,
  default: {
    filterPriceObjArr: [
      {
        id: 'filter_price1',
        label: '0원 - 19,999원',
        title: '가격이 0원 이상 2만원 미만 상품 보기',
      },
      {
        id: 'filter_price2',
        label: '20,000원 - 49,999원',
        title: '가격이 2만원 이상 5만원 미만 상품 보기',
      },
      {
        id: 'filter_price3',
        label: '50,000원 - 99,999원',
        title: '가격이 5만원 이상 10만원 미만 상품 보기',
      },
      {
        id: 'filter_price4',
        label: '100,000원 - 199,999원',
        title: '가격이 10만원 이상 20만원 미만 상품 보기',
      },
      {
        id: 'filter_price5',
        label: '200,000원+',
        title: '가격이 20만원 이상 상품 보기',
      },
    ],
    filterAgeObjArr: [
      {
        id: 'filter_ages7',
        label: '2+',
        title: '2세 이상 상품 보기',
      },
      {
        id: 'filter_ages6',
        label: '4+',
        title: '4세 이상 상품 보기',
      },
      {
        id: 'filter_ages5',
        label: '6+',
        title: '6세 이상 상품 보기',
      },
      {
        id: 'filter_ages4',
        label: '9+',
        title: '9세 이상 상품 보기',
      },
      {
        id: 'filter_ages3',
        label: '14+',
        title: '14세 이상 상품 보기',
      },
      {
        id: 'filter_ages2',
        label: '16+',
        title: '16세 이상 상품 보기',
      },
      {
        id: 'filter_ages1',
        label: '18+',
        title: '18세 이상 상품 보기',
      },
    ],
    filterSaleEnabledObjArr: [
      {
        id: 'filter_sale_enabled1',
        label: '단종',
        title: '단종 상품 보기',
      },
      {
        id: 'filter_sale_enabled2',
        label: '구매가능',
        title: '구매 가능한 상품 보기',
      },
      {
        id: 'filter_sale_enabled3',
        label: '출시예정',
        title: '출시 예정인 상품 보기',
      },
      {
        id: 'filter_sale_enabled4',
        label: '일시품절',
        title: '일시 품절된 상품 보기',
      },
    ],
    filterDiscountingObjArr: [
      {
        id: 'filter_discounting1',
        label: '정가',
        title: '정가 판매하는 상품 보기',
      },
      {
        id: 'filter_discounting2',
        label: '할인중',
        title: '할인 판매하는 상품 보기',
      },
    ],
    filterPiecesObjArr: [
      {
        id: 'filter_pieces1',
        label: '1-99',
        title: '부품수 1개 이상 100개 미만인 상품 보기',
      },
      {
        id: 'filter_pieces2',
        label: '100-249',
        title: '부품수 100개 이상 250개 미만인 상품 보기',
      },
      {
        id: 'filter_pieces3',
        label: '250-499',
        title: '부품수 250개 이상 500개 미만인 상품 보기',
      },
      {
        id: 'filter_pieces4',
        label: '500-999',
        title: '부품수 500개 이상 1000개 미만인 상품 보기',
      },
      {
        id: 'filter_pieces5',
        label: '1000-1999',
        title: '부품수 1000개 이상 2000개 미만인 상품 보기',
      },
      {
        id: 'filter_pieces6',
        label: '2000+',
        title: '부품수 2000개 이상인 상품 보기',
      },
    ],
  },
})

export const productFilterInfoSelector = selector<ProductFilterInfoT>({
  key: `productFilterInfoSelector`,
  get: ({ get }) => {
    return get(productFilterInfoAtom)
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

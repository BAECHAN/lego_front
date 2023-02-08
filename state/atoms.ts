import { atom, selector } from 'recoil'
import { ProductFilterCountT } from 'types'
import { v1 } from 'uuid'

const selectedFilterAtom = atom<ProductFilterCountT>({
  key: `selectedFilterAtom/${v1()}`,
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
  key: `selectedFilterSelector/${v1()}`,
  get: ({ get }) => {
    const count = get(selectedFilterAtom)
    return count
  },
  set: ({ set }, newValue) => {
    set(selectedFilterAtom, newValue)
  },
})

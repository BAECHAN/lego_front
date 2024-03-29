module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^@utils/(.*)$',
    '^@apis/(.*)$',
    '^@hooks/(.*)$',
    '^@recoils/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@base/(.*)$',
    '^pages/(.*)$',
    '^@components/(.*)$',
    '^@common/(.*)$',
    '^styles/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 200,
}

import { FlatCompat } from '@eslint/eslintrc'
import unocss from '@unocss/eslint-config/flat'

const compat = new FlatCompat()

export default [...compat.extends('next/core-web-vitals', 'alloy', 'alloy/react', 'alloy/typescript'), unocss]

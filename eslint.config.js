import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      // Підключаємо рекомендовані правила для React
      reactHooks.configs.recommended, 
    ],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        // ДОДАЄМО ЦЕ: дозволяємо використання chrome без помилок
        chrome: "readonly", 
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // ПОЛЕГШУЄМО ПРАВИЛО: міняємо 'error' на 'warn', щоб білд не падав через одну забуту змінну
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^[A-Z_]'
      }],
    },
  },
])
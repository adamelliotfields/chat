import headlessuiPlugin from '@headlessui/tailwindcss'
import formsPlugin from '@tailwindcss/forms'
import typographyPlugin from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{html,tsx}'],
  plugins: [formsPlugin, headlessuiPlugin, typographyPlugin],
  theme: { extend: {} }
}

export default config

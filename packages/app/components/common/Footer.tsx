import { ReactElement } from 'react'

export function Footer(): ReactElement {
  return (
    // Hide footer on mobile since screen space is more valuable
    <footer className="hidden w-full flex-shrink-0 bg-[#ebebeb] px-6 py-3 md:block">
      Maintained by UBC Okanagan students with ❤️
    </footer>
  )
}

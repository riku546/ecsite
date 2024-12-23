import { Nunito } from 'next/font/google'
import '@/app/global.css'

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"></meta>
            </head>
            <body className="antialiased">{children}</body>
        </html>
    )
}

export const metadata = {
    title: 'ecsite',
}

export default RootLayout
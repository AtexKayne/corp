import { Html, Head, Main, NextScript } from 'next/document'

import Modal from '../components/Modal'

export default function Document() {
    return (
        <Html lang='ru'>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
            <Modal />
        </Html>
    )
}

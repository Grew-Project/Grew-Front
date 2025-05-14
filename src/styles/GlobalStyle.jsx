import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --color-primary: #174b3c;
        --color-secondary: #cae8db;
        --color-background: #fafff5;
        --color-footer: #363636;
        --color-black: #000000;
        --color-gray: #d9d9d9;
        --font-color-black: #212121;
        --font-color-gray: #555454;
        --color-dark-gray: #555454;
        --fs10: 10px;
        --fs12: 12px;
        --fs15: 15px;
        --fs20: 20px;
        --radius-base: 10px;
    }

    body {
        background-color: var(--color-background);
    }

    button {
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
`

export default GlobalStyle

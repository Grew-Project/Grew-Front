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
        --fs12: 12px;
        --fs15: 15px;
        --fs20: 20px;
        --radius-base: 10px;
    }

    button {
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;
    }
`

export default GlobalStyle

import { createGlobalStyle } from 'styled-components'

import { color, media, font, type } from './theme'

const GlobalStyle = createGlobalStyle`
	html {
		line-height: ${type('lineHeight')};
		background-color: ${color('bg')};
		color: ${color('textPrimary')};
	}

	body {
		font-family: ${font('serif')};
		margin: 2rem 4rem;
	}

	@media (max-width: ${media('sm')}) {
		body {
			margin: 1rem 2rem;
		}
	}

	a {
		color: currentColor;
		font-family: ${font('mono')};
		font-size: 0.9em;
		transition: all 0.1s;
		position: relative;

		::before {
			position: absolute;
			pointer-events: none;
			z-index: -1;
			display: block;
			content: '';
			top: -6px;
			right: -6px;
			bottom: -6px;
			left: -6px;
			opacity: 0;
			background-color: ${color('textPrimary')};
		}
	}

	a, a::before {
		transition: all 0.2s;
	}

	a:hover, a:active, a:focus {
		color: white;

		::before {
			opacity: 1;
		}
	}

	blockquote {
		font-size: 1.1em;
		font-style: italic;
		margin-left: 1.5em;
	}
`

export default GlobalStyle

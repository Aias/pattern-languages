import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
	html {
		line-height: ${props => props.theme.type.lineHeight};
		background-color: ${props => props.theme.clr.bg};
		color: ${props => props.theme.clr.textPrimary};
	}

	body {
		font-family: ${props => props.theme.font.serif};
		margin: 2rem 4rem;
	}

	@media (max-width: ${props => props.theme.media.sm}) {
		body {
			margin: 1rem 2rem;
		}
	}

	a {
		color: currentColor;
		font-family: ${props => props.theme.font.mono};
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
			background-color: ${props => props.theme.clr.textPrimary};
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
`

export default GlobalStyle

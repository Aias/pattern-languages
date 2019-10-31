import React from 'react'
import styled from 'styled-components'
import { color } from '../styles/theme'

const Button = styled.button.attrs(props => ({
	type: props.type || 'button', // http://lea.verou.me/2018/05/never-forget-typebutton-on-generated-buttons/
}))`
	border: none;
	box-shadow: 0 0 0.5rem ${color('shadow')};
	border-radius: 0;
	display: inline-block;
	padding: 4px 0.75rem;
	line-height: inherit;
	background-color: ${color('textPrimary')};
	color: ${color('bg')};
	letter-spacing: 1px;
	text-transform: uppercase;
	font-size: 0.85em;
`

export default Button

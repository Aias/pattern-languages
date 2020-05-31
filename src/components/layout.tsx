import React from 'react'
// import { useStaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'

import theme, { media } from '../styles/theme'
import GlobalStyle from '../styles/site'

const Layout: React.FunctionComponent = ({ children }) => {
	// const { site } = useStaticQuery(graphql`
	// 	query SiteTitleQuery {
	// 		site {
	// 			siteMetadata {
	// 				title
	// 			}
	// 		}
	// 	}
	// `)

	return (
		<ThemeProvider theme={theme}>
			<>
				<GlobalStyle />
				<Main>{children}</Main>
			</>
		</ThemeProvider>
	)
}

const Main = styled.main`
	max-width: ${media('sm')};
	margin: 0 auto;
`

export default Layout

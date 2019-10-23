import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'

import theme from '../styles/theme'
import GlobalStyle from '../styles/site'

import Header from './header'

const Layout: React.FunctionComponent = ({ children }) => {
	const { site } = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`)

	return (
		<ThemeProvider theme={theme}>
			<>
				<GlobalStyle />
				<Header siteTitle={site.siteMetadata.title} />
				<Main>{children}</Main>
			</>
		</ThemeProvider>
	)
}

const Main = styled.main`
	max-width: 600px;
	margin: 0 auto;
`

export default Layout

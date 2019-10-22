import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'

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
		<ThemeProvider theme={{}}>
			<>
				<Header siteTitle={site.siteMetadata.title} />
				<main>{children}</main>
				<footer>
					© {new Date().getFullYear()}, Built with
					{` `}
					<a href="https://www.gatsbyjs.org">Gatsby</a>
				</footer>
			</>
		</ThemeProvider>
	)
}

export default Layout

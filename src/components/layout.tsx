import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import 'normalize.css'

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
		<>
			<Header siteTitle={site.siteMetadata.title} />
			<div>
				<main>{children}</main>
				<footer>
					© {new Date().getFullYear()}, Built with
					{` `}
					<a href="https://www.gatsbyjs.org">Gatsby</a>
				</footer>
			</div>
		</>
	)
}

export default Layout

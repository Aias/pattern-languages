import React from 'react'
import { Link } from 'gatsby'

interface HeaderProps {
	siteTitle: string
}

const Header: React.FunctionComponent<HeaderProps> = ({ siteTitle }) => (
	<header>
		<div>
			<h1>
				<Link to="/">{siteTitle}</Link>
			</h1>
		</div>
	</header>
)

export default Header

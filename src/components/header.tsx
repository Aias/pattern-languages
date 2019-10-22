import React from 'react'
import { Link } from 'gatsby'

interface IHeaderProps {
	siteTitle: string
}

const Header: React.FunctionComponent<IHeaderProps> = ({ siteTitle }) => (
	<header>
		<div>
			<h1>
				<Link to="/">{siteTitle}</Link>
			</h1>
		</div>
	</header>
)

export default Header

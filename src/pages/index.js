import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/seo'

const IndexPage = () => (
	<Layout>
		<SEO title="Home" />
		<h1>Hi people</h1>
		<p>Welcome to your new Gatsby site.</p>
		<p>Now go build something great.</p>
		<div>
			<Hero />
		</div>
		<Link to="/page-2/">Go to page 2</Link>
	</Layout>
)

export default IndexPage

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Link } from 'gatsby'

import Hero from '../components/hero'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => {
	const { allAirtable } = useStaticQuery(graphql`
		query {
			allAirtable(
				filter: {
					table: { eq: "patterns" }
					data: {
						language: {
							elemMatch: {
								data: { name: { eq: "A Pattern Language" } }
							}
						}
					}
				}
			) {
				edges {
					node {
						data {
							pattern
							problem
							solution
							language {
								data {
									name
								}
							}
						}
					}
				}
			}
		}
	`)

	const patterns = allAirtable.edges
		.map(({ node }, i) => {
			const data = node.data
			const { pattern, problem, solution } = data
			return (
				<li key={pattern}>
					<section>
						<h3>{pattern}</h3>
						<p>
							<strong>Problem: </strong>
							{problem}
						</p>
						<p>
							<strong>Solution: </strong>
							{solution}
						</p>
					</section>
				</li>
			)
		})
		.reverse()

	return (
		<Layout>
			<SEO title="Home" />
			<h2>A Pattern Language</h2>
			<ol>{patterns}</ol>
		</Layout>
	)
}

export default IndexPage

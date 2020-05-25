import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

// import { Link } from 'gatsby'

// import Hero from '../components/hero'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage: React.FC = () => {
	const { allAirtable } = useStaticQuery(graphql`
		query {
			allAirtable(
				filter: {
					table: { eq: "patterns" }
					data: { language: { elemMatch: { data: { code: { eq: "BLD" } } } } }
				}
			) {
				edges {
					node {
						data {
							problem
							solution
							slug
							depends_on {
								data {
									pattern
									slug
								}
							}
							supports {
								data {
									pattern
									slug
								}
							}
							pattern
						}
					}
				}
			}
		}
	`)

	const patternsArr = allAirtable.edges
		.map(({ node }, i) => {
			return {
				...node.data,
				order: allAirtable.edges.length - i
			}
		})
		.sort((a, b) => a.order - b.order)

	const patterns = patternsArr.map((data) => <PatternEntry key={data.slug} data={data} />)

	return (
		<Layout>
			<SEO title='Home' />
			<SiteHeader>A Pattern Language</SiteHeader>
			<p>
				<em>Which generates a human society and the structures to support it.</em>
			</p>
			<PatternList>{patterns}</PatternList>
		</Layout>
	)
}

const PatternEntry = ({ data }: { data: any }) => {
	const { order, pattern, problem, solution, slug, depends_on = [], supports = [] } = data

	return (
		<li key={slug} id={slug}>
			<PatternWrapper>
				<h2>{pattern}</h2>
				{supports && <LinkList title='Supports' links={supports} />}
				<h3>Problem</h3>
				<p>{problem}</p>
				<h3>Solution</h3>
				<p>{solution}</p>
				{depends_on && <LinkList title='Depends on' links={depends_on} />}
			</PatternWrapper>
		</li>
	)
}

const SiteHeader = styled.h1`
	margin-top: 2em;

	@media (max-width: ${(props) => props.theme.media.sm}) {
		margin-top: 1em;
	}
`

const PatternList = styled.ol`
	list-style: none;
	counter-reset: pattern-counter;

	> li {
		counter-increment: pattern-counter;
	}

	h2:before {
		content: '#' counter(pattern-counter) '. ';
	}

	h2 {
		border-top: 2px solid currentColor;
		margin-top: 1.5em;
		padding-top: 1.5em;
	}
`

const LinkList = ({ links, title = '' }) => {
	const listItems = links.map(({ data }) => {
		const { slug, pattern } = data
		return (
			<li key={slug}>
				<a href={`#${slug}`}>{pattern}</a>
			</li>
		)
	})

	return (
		<LinkListWrapper>
			<li key='title'>
				<em>{title}:</em>
			</li>
			{listItems}
		</LinkListWrapper>
	)
}

const LinkListWrapper = styled.ul`
	list-style-type: none;
	padding: 0;
	display: inline-flex;
	flex-flow: row wrap;

	> li {
		margin: 0;
		flex: 0 0 auto;
		padding-right: 1rem;
	}
`

const PatternWrapper = styled.section`
	display: grid;
	grid-template-columns: [main-start] 1fr [main-end aside-start] 100px [aside-end];

	> * {
		grid-column: main;
	}
`

export default IndexPage

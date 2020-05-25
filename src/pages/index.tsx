import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { createMarkup } from '../helpers/markdown'
import { media } from '../styles/theme'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Star from '../assets/star.svg'

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
							significance
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
			<SiteHeader>
				<h1>A Pattern Language</h1>
				<p>
					<em>Which generates a human society and the structures to support it.</em>
				</p>
			</SiteHeader>
			<PatternList>{patterns}</PatternList>
		</Layout>
	)
}

const PatternEntry = ({ data }: { data: any }) => {
	const { order, pattern, significance, problem, solution, slug, depends_on = [], supports = [] } = data

	const stars = []
	if (significance > 0) {
		for (let i = 1; i <= significance; i++) {
			stars.push(<Star key={i} />)
		}
	}

	return (
		<li key={slug} id={slug}>
			<PatternWrapper>
				<h2 className='pattern-header'>
					<span className='pattern-name'>{pattern}</span>
					<span className='pattern-significance'>{stars}</span>
				</h2>
				{supports && <LinkList title='Supports' links={supports} />}
				<h3>Problem</h3>
				<div dangerouslySetInnerHTML={createMarkup(problem)} />
				<h3>Solution</h3>
				<div dangerouslySetInnerHTML={createMarkup(solution)} />
				{depends_on && <LinkList title='Depends on' links={depends_on} />}
			</PatternWrapper>
		</li>
	)
}

const SiteHeader = styled.div`
	h1 {
		margin-top: 2em;
	}

	@media (max-width: ${media('sm')}) {
		text-align: center;

		h1 {
			margin-top: 1.5em;
		}
	}
`

const PatternList = styled.ol`
	list-style: none;
	counter-reset: pattern-counter;
	margin-top: 0;

	> li {
		counter-increment: pattern-counter;
		max-width: 100%;
		overflow-x: auto;
	}

	> li:first-child {
		margin-top: 0;
	}

	.pattern-name:before {
		content: '#' counter(pattern-counter) '. ';
		white-space: nowrap;
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
		max-width: 100%;
	}
`

const PatternWrapper = styled.section`
	.pattern-header {
		display: flex;
	}

	.pattern-name {
		flex: 1;
	}

	.pattern-significance {
		justify-self: flex-end;
		white-space: nowrap;
		margin-left: 0.5em;

		svg {
			width: 0.9em;
			text-align: baseline;
			position: relative;
			top: 2px;
		}
	}

	.pattern-significance:empty {
		display: none;
	}

	@media (max-width: ${media('sm')}) {
		.pattern-header {
			flex-wrap: wrap;
		}

		.pattern-significance {
			flex: 1 0 100%;
			text-align: center;
			margin: 1rem 0 0;
		}
	}
`

export default IndexPage

import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { createMarkup } from '../helpers/markdown'
import slugify from '../helpers/slugify'
import { media } from '../styles/theme'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Star from '../assets/star.svg'

export const pageQuery = graphql`
	query LanguageQuery($code: String = "BLD") {
		allAirtable(
			filter: { table: { eq: "patterns" }, data: { language: { elemMatch: { data: { code: { eq: $code } } } } } }
		) {
			edges {
				node {
					data {
						pattern
						problem
						solution
						significance
						depends_on {
							data {
								pattern
							}
						}
						supports {
							data {
								pattern
							}
						}
					}
				}
			}
		}
	}
`

interface ILanguageProps {
	data?: any
	pageContext?: {
		languageMeta: {
			authors: string
			code: string
			name: string
			description: string
		}
	}
}

const Language: React.FC<ILanguageProps> = ({ data, pageContext }) => {
	const { allAirtable: patternQuery } = data
	const { authors, code, name, description } = pageContext.languageMeta

	const patternsArr = patternQuery.edges
		.map(({ node }, i) => {
			return {
				...node.data,
				order: patternQuery.edges.length - i
			}
		})
		.sort((a, b) => a.order - b.order)

	const patterns = patternsArr.map((data) => <PatternEntry key={data.pattern} data={data} />)

	return (
		<Layout>
			<SEO title={name} />
			<PatternsLayout>
				<SiteHeader>
					<h1>{name}</h1>
					{description && (
						<p>
							<em>{description}</em>
						</p>
					)}
				</SiteHeader>
				<PatternList>{patterns}</PatternList>
				<PatternNav patterns={patternsArr} />
			</PatternsLayout>
		</Layout>
	)
}

const PatternEntry = ({ data }: { data: any }) => {
	const { order, pattern, significance, problem, solution, depends_on = [], supports = [] } = data
	const slug = slugify(pattern)

	const stars = []
	if (significance > 0) {
		for (let i = 1; i <= significance; i++) {
			stars.push(<Star key={i} />)
		}
	}

	return (
		<li id={slug}>
			<PatternWrapper>
				<h2 className='pattern-header'>
					<span className='pattern-name'>{pattern}</span>
					<span className='pattern-significance'>{stars}</span>
				</h2>
				{supports && <LinkList title='Supports' links={supports} />}
				{problem && (
					<>
						<h3>Problem</h3>
						<div dangerouslySetInnerHTML={createMarkup(problem)} />
					</>
				)}
				{solution && (
					<>
						<h3>Solution</h3>
						<div dangerouslySetInnerHTML={createMarkup(solution)} />
					</>
				)}
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
		margin: 0;
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
		margin-top: 2rem;
		padding-top: 2rem;
	}
`

const PatternNav = styled(({ className, patterns }) => {
	return (
		<nav className={className}>
			<ol>
				{patterns.map(({ pattern, order, significance }, i) => {
					return (
						<li key={`order-${pattern}`}>
							<a href={`#${slugify(pattern)}`}>{pattern}</a>
						</li>
					)
				})}
			</ol>
		</nav>
	)
})`
	ol {
		margin: 4rem 0 2rem;
		padding: 0 1rem 0;
		max-height: calc(100vh - 4rem);
		position: sticky;
		top: 2rem;
		overflow-y: auto;
		list-style: none;
	}
	li {
		font-size: 0.8em;
		line-height: 1.5;
		margin: 0.75em 0;
	}
	a {
		display: inline-block;
	}
`

const PatternsLayout = styled.div`
	display: grid;
	grid-template-columns: 200px 1fr;
	grid-template-rows: auto 1fr;
	grid-template-areas:
		'. header'
		'nav main';
	grid-column-gap: 3rem;

	${SiteHeader} {
		grid-area: header;
	}

	${PatternList} {
		grid-area: main;
	}

	${PatternNav} {
		grid-area: nav;
	}

	@media (max-width: 600px) {
		display: flex;
		flex-direction: column;

		${PatternNav} {
			display: none;
		}
	}
`

const LinkList = ({ links, title = '' }) => {
	const listItems = links.map(({ data }) => {
		const { pattern } = data
		const slug = slugify(pattern)
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

export default Language

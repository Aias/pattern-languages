import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Button from '../components/button'
import isEmpty from '../helpers/isEmpty'

const LanguagePage = () => {
	const { allAirtable } = useStaticQuery(graphql`
		query {
			allAirtable(
				filter: {
					table: { eq: "patterns" }
					data: {
						language: {
							elemMatch: { data: { code: { eq: "BLD" } } }
						}
					}
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

	const [language, setLanguage] = useState({
		patterns: {},
		reviewed: {},
	})

	const patternsArr = allAirtable.edges
		.map(({ node }, i) => {
			return {
				...node.data,
				order: allAirtable.edges.length - i,
			}
		})
		.sort((a, b) => a.order - b.order)

	const allPatterns = {}
	patternsArr.forEach(p => {
		allPatterns[p.slug] = p
	})

	// console.log(patternsArr)

	return (
		<Layout>
			<SEO title="Language" />
			<div>
				<Button
					onClick={() => {
						setLanguage({ patterns: [], reviewed: {} })
					}}
				>
					Restart
				</Button>
			</div>
			{isEmpty(language.patterns) ? (
				<List
					allPatterns={patternsArr}
					handleClick={pattern => {
						const newPatterns = { ...language.patterns }
						const newReviewed = { ...language.reviewed }

						newPatterns[pattern.slug] = {}
						newReviewed[pattern.slug] = {
							selected: true,
						}

						setLanguage({
							patterns: newPatterns,
							reviewed: newReviewed,
						})
					}}
				/>
			) : (
				<Language language={language} allPatterns={allPatterns} />
			)}
		</Layout>
	)
}

const List = ({ allPatterns, handleClick }) => {
	return (
		<ListWrapper>
			{allPatterns.map(p => {
				const { pattern, order } = p
				return (
					<li
						onClick={() => {
							handleClick(p)
						}}
						key={order}
					>
						#{order}. {pattern}
					</li>
				)
			})}
		</ListWrapper>
	)
}

const Language = ({ language, allPatterns }) => {
	const { patterns, reviewed } = language
	const list = Object.keys(patterns)
		.map(p => allPatterns[p])
		.sort((a, b) => {
			return a.order - b.order
		})
	return (
		<ListWrapper>
			{list.map(({ pattern, order }) => {
				return (
					<li key={order}>
						#{order}. {pattern}
					</li>
				)
			})}
		</ListWrapper>
	)
}

const ListWrapper = styled.ol`
	list-style-type: none;

	> li {
		cursor: pointer;
		margin: 0;
		padding: 0.5rem 0;
		transition: all 0.2s;

		:hover {
			background-color: rgba(0, 0, 0, 0.05);
		}
	}

	> li + li {
		border-top: 1px solid rgba(0, 0, 0, 0.25);
	}
`

export default LanguagePage

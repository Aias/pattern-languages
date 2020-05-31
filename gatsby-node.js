const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions

	const result = await graphql(
		`
			query Languages {
				allAirtable(filter: { table: { eq: "languages" } }) {
					edges {
						node {
							data {
								authors
								name
								description
								code
							}
						}
					}
				}
			}
		`
	)
	// Handle errors
	if (result.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`)
		return
	}

	const LanguageTemplate = path.resolve('./src/templates/language.tsx')
	const defaultLanguageCode = 'BLD'
	result.data.allAirtable.edges.forEach(({ node }) => {
		const languageMeta = node.data
		const code = languageMeta.code

		// Re-use main language page as the site's home page.
		if (code === defaultLanguageCode) {
			createPage({
				path: '/',
				component: LanguageTemplate,
				context: {
					code: code,
					languageMeta
				}
			})
		}

		createPage({
			path: `/${code.toLowerCase()}`,
			component: LanguageTemplate,
			context: {
				code: code,
				languageMeta
			}
		})
	})
}

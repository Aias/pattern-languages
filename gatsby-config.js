require('dotenv').config({
	path: `.env`
})

const bases = {
	patterns: `appfoH6qlLxFCVhV5`
}

module.exports = {
	siteMetadata: {
		title: `patternsof.design`,
		description: `Each pattern is a rule which describes what you have to do to generate the entity which it defines. It is a three-part rule, which expresses a relation between a certain context, a problem, and a solution.`,
		author: `Nick Trombley`,
		siteUrl: 'https://patternlanguages.netlify.com'
	},
	plugins: [
		// For TypeScript stuff, see:
		// https://medium.com/maxime-heckel/getting-started-with-typescript-on-gatsby-8544b47c1d27
		{
			resolve: `gatsby-plugin-typescript`,
			options: {
				isTSX: true, // defaults to false
				jsxPragma: 'React', // defaults to "React"
				allExtensions: true // defaults to false
			}
		},
		// `gatsby-plugin-tslint`,
		`@rhysforyou/gatsby-plugin-react-helmet-async`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `assets`,
				path: `${__dirname}/src/assets`
			}
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`
				// icon: `src/assets/gatsby-icon.png` // This path is relative to the root of the site.
			}
		},
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /assets\/.*\.svg$/
				}
			}
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		`gatsby-plugin-offline`,
		// ------------------------------
		// Data sources
		// ------------------------------
		{
			resolve: `gatsby-source-airtable`,
			options: {
				apiKey: process.env.AIRTABLE_API_KEY,
				tables: [
					{
						baseId: bases.patterns,
						tableName: `languages`,
						tableView: `Grid view`,
						tableLinks: ['sections', 'patterns', 'orders']
					},
					{
						baseId: bases.patterns,
						tableName: `sections`,
						tableView: `Grid view`,
						tableLinks: ['language', 'patterns', 'category']
					},
					{
						baseId: bases.patterns,
						tableName: `patterns`,
						tableView: `Grid view`,
						tableLinks: ['language', 'section', 'supports', 'refers_to', 'depends_on', 'orders']
					},
					{
						baseId: bases.patterns,
						tableName: `orders`,
						tableView: `Grid view`,
						tableLinks: ['language', 'patterns']
					},
					{
						baseId: bases.patterns,
						tableName: `sequences`,
						tableView: `Grid view`,
						tableLinks: ['patterns']
					}
				]
			}
		}
	]
}

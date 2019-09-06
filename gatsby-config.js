require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})

const bases = {
	patterns: `appfoH6qlLxFCVhV5`,
}

module.exports = {
	siteMetadata: {
		title: `patternsof.design`,
		description: `Each pattern is a rule which describes what you have to do to generate the entity which it defines. It is a three-part rule, which expresses a relation between a certain context, a problem, and a solution.`,
		author: `Nick Trombley`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
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
				display: `minimal-ui`,
				icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
			},
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
				apiKey: process.env.AIRTABLE_API_KEY, // may instead specify via env, see below
				tables: [
					{
						baseId: bases.patterns,
						tableName: `languages`,
						tableView: `Grid view`,
						tableLinks: ['sections', 'patterns', 'orders'],
					},
					{
						baseId: bases.patterns,
						tableName: `sections`,
						tableView: `Grid view`,
						tableLinks: ['language', 'patterns', 'category'],
					},
					{
						baseId: bases.patterns,
						tableName: `patterns`,
						tableView: `Grid view`,
						tableLinks: [
							'language',
							'section',
							'supports',
							'refers_to',
							'depends_on',
							'orders',
						],
					},
					{
						baseId: bases.patterns,
						tableName: `orders`,
						tableView: `Grid view`,
						tableLinks: ['language', 'patterns'],
					},
					{
						baseId: bases.patterns,
						tableName: `sequences`,
						tableView: `Grid view`,
						tableLinks: ['patterns'],
					},
				],
			},
		},
	],
}

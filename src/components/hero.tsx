import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from './image'
// import Img from 'gatsby-image'

const Hero: React.FunctionComponent = () => {
	const { placeholderImage } = useStaticQuery(graphql`
		query {
			placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
				childImageSharp {
					fluid(maxWidth: 300) {
						...GatsbyImageSharpFluid
						presentationWidth
					}
				}
			}
		}
	`)

	return <Image fluid={placeholderImage.childImageSharp.fluid} />
}

export default Hero

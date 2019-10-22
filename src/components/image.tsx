import React, { FunctionComponent } from 'react'
import Img, { FluidObject } from 'gatsby-image'

interface IImageProps {
	fluid?: FluidObject | FluidObject[]
	[prop: string]: any
}

// https://spectrum.chat/gatsby-js/general/gatsby-images-and-fluid~df7a2d6f-2886-46fa-a663-a2059ce5ef71
// https://www.gatsbyjs.org/packages/gatsby-image/#avoiding-stretched-images-using-the-fluid-type
const NonStretchedImage: FunctionComponent<IImageProps> = ({
	fluid,
	...otherProps
}) => {
	// let normalizedProps = props
	// if (props.fluid && props.fluid.presentationWidth) {
	// 	normalizedProps = {
	// 		...props,
	// 		style: {
	// 			...(props.style || {}),
	// 			maxWidth: props.fluid.presentationWidth,
	// 			margin: '0 auto', // Used to center the image
	// 		},
	// 	}
	// }

	// return <Img {...normalizedProps} />
	return <Img fluid={fluid} {...otherProps} />
}

export default NonStretchedImage

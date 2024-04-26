import React, { useEffect } from 'react'

interface ILinkProps {
	to: string,
	children: React.ReactNode,
}

const AnchorLink: React.FunctionComponent<ILinkProps> = ({ to = '', children, ...otherProps }) => {
	let observer

	useEffect(() => {
		observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						window.setTimeout(() => {
							window.location.replace(`${window.location.pathname}#${to}`)
						}, 500)
						observer.unobserve(entry.target)
					}
				})
			},
			{
				threshold: [0.1]
			}
		)
	})

	return (
		<a
			href={`#${to}`}
			onClick={(e) => {
				e.preventDefault()

				const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

				const el = document.getElementById(to)

				observer.observe(el)

				el.scrollIntoView({
					behavior: prefersReducedMotion ? 'auto' : 'smooth'
				})
			}}
			{...otherProps}
		>
			{children}
		</a>
	)
}

export default AnchorLink

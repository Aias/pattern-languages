declare const graphql: (query: TemplateStringsArray) => void

declare module '*.svg' {
	const content: string
	export default content
}

import { Remarkable } from 'remarkable'
import meta from 'remarkable-meta'

const markdown = new Remarkable({
	typographer: true,
	breaks: true,
	html: true
}).use(meta)

markdown.core.ruler.enable(['abbr'])

const createMarkup = (htmlString: string): { __html: string } => {
	return {
		__html: markdown.render(htmlString)
	}
}

export default markdown
export { createMarkup }

const theme = {
	media: {
		sm: '800px',
		md: '1000px',
		lg: '1600px'
	},
	font: {
		system: `system, -apple-system, '.SFNSText-Regular', 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Lucida Grande', sans-serif`,
		sans: `system, -apple-system, '.SFNSText-Regular', 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Lucida Grande', sans-serif`,
		serif: `'Palatino Linotype', Palatino, Palladio, 'URW Palladio L', 'Book Antiqua', Baskerville, 'Bookman Old Style', 'Bitstream Charter', 'Nimbus Roman No9 L', Garamond, 'Apple Garamond', 'ITC Garamond Narrow', 'New Century Schoolbook', 'Century Schoolbook', 'Century Schoolbook L', Georgia, serif`,
		mono: `Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier, monospace`
	},
	type: {
		lineHeight: 1.7
	},
	clr: {
		bg: '#f5e9d8',
		textPrimary: 'rgba(0, 0, 0, 0.92)', // I could make
		textSecondary: 'rgba(0, 0, 0, 0.61)', // these numbers
		shadow: 'rgba(0,0,0,0.33)', // nice and even,
		border: 'rgba(0,0,0,0.20)', // but where's the fun
		faint: 'rgba(0,0,0,0.08)' // in that?
	}
}

const color = (c) => (props) => props.theme.clr[c]
const media = (m) => (props) => props.theme.media[m]
const font = (f) => (props) => props.theme.font[f]
const type = (t) => (props) => props.theme.type[t]

export default theme

export { color, media, font, type }

import { defineConfig } from 'astro/config';
import { basename } from 'node:path';

const collectText = (node) => {
	if (!node || typeof node !== 'object') {
		return '';
	}
	if (typeof node.value === 'string') {
		return node.value;
	}
	if (!Array.isArray(node.children)) {
		return '';
	}
	return node.children.map(collectText).join('');
};

const toSlug = (value) =>
	value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');

const prefixMarkdownHeadingIds = () => {
	return (tree, file) => {
		const inputPath = typeof file.path === 'string' ? file.path : '';
		const prefix = basename(inputPath).replace(/\.[^.]+$/, '');
		const seen = new Map();

		if (!prefix) {
			return;
		}

		const visit = (node) => {
			if (!node || typeof node !== 'object') {
				return;
			}
			if (
				node.type === 'heading' &&
				Array.isArray(node.children)
			) {
				const headingText = collectText(node).replace(/\s+/g, ' ').trim();
				if (headingText) {
					const baseSlug = toSlug(headingText);
					const currentCount = seen.get(baseSlug) ?? 0;
					const suffix = currentCount === 0 ? '' : `-${currentCount}`;
					seen.set(baseSlug, currentCount + 1);
					node.data ??= {};
					node.data.hProperties ??= {};
					node.data.hProperties.id = `${prefix}-${baseSlug}${suffix}`;
				}
			}
			if (Array.isArray(node.children)) {
				node.children.forEach(visit);
			}
		};

		visit(tree);
	};
};

export default defineConfig({
	output: 'static',
	markdown: {
		remarkPlugins: [prefixMarkdownHeadingIds],
	},
	site: 'https://patternlanguages.netlify.com',
});

import { marked } from 'marked';

marked.setOptions({
	breaks: true,
	gfm: true,
});

export const renderMarkdown = (content: string): string =>
	marked.parse(content, { async: false });

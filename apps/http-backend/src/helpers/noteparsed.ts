export function stripMarkdownToSingleLine(markdown: string) {
  return markdown
    .replace(/#+\s?/g, "")
    .replace(/- \[ \] /g, "")
    .replace(/^- /gm, "")
    .replace(/^\d+\.\s?/gm, "")
    .replace(/^> /gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<([^>]+)>/g, "$1")
    .replace(/\n+/g, " ")
    .trim();
}

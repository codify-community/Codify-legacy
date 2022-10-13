export function codeBlock(lang: string, code: string): string {
  return `\`\`\`${lang}\n${code}\`\`\``;
}

export function codeSnippet(code: string) {
  return `\`${code}\``;
}

export function CodeBlock(lang: string, code: string): string {
  return `\`\`\`${lang}\n${code}\`\`\``;
}

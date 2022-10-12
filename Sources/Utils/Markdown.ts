export function codeBlock(lang: string, code: string): string {
  return `\`\`\`${lang}\n${code}\`\`\``;
}

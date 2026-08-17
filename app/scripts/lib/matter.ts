/**
 * Markdown frontmatter 读写。
 *
 * 不引入 gray-matter：本站只需要「--- YAML --- 正文」这一种形态，
 * 自己实现 40 行，少一个依赖，且行为完全可控。
 */

import yaml from 'js-yaml';

const DELIM = '---';

export interface Parsed {
  data: Record<string, unknown>;
  body: string;
}

/** 解析 frontmatter。无 frontmatter 时 data 为空对象。 */
export function parseMatter(raw: string): Parsed {
  const text = raw.replace(/^\uFEFF/, ''); // 去 BOM（用转义写法，源码里不留不可见字符）
  const lines = text.split('\n');
  if (lines[0]?.trim() !== DELIM) return { data: {}, body: text.trim() };

  const close = lines.findIndex((l, i) => i > 0 && l.trim() === DELIM);
  if (close === -1) throw new Error('frontmatter 起始有 --- 但没有闭合的 ---');

  const front = lines.slice(1, close).join('\n');
  const body = lines.slice(close + 1).join('\n').trim();
  const data = front.trim() ? yaml.load(front) : {};
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('frontmatter 必须是 YAML 映射（key: value）');
  }
  return { data: data as Record<string, unknown>, body };
}

/** 序列化为 frontmatter + 正文。 */
export function stringifyMatter(data: Record<string, unknown>, body: string): string {
  const front = yaml.dump(data, {
    lineWidth: 100,
    noRefs: true,
    quotingType: '"',
    // 保持作者书写的键序（schema 里的语义顺序），不按字母排序
    sortKeys: false,
  });
  return `${DELIM}\n${front}${DELIM}\n\n${body.trim()}\n`;
}

/**
 * 从正文里按 H2 小节切出各字段。
 * 返回 heading → 段落文本；重复 heading 视为错误（否则内容会被静默覆盖）。
 */
export function parseSections(body: string): Map<string, string> {
  const out = new Map<string, string>();
  if (!body.trim()) return out;

  const parts = body.split(/^##\s+/m);
  // parts[0] 是第一个 ## 之前的内容，正常应为空
  const preamble = parts[0]?.trim();
  if (preamble) throw new Error(`正文首个 ## 之前有游离内容：「${preamble.slice(0, 40)}…」`);

  for (const part of parts.slice(1)) {
    const nl = part.indexOf('\n');
    const heading = (nl === -1 ? part : part.slice(0, nl)).trim();
    const content = (nl === -1 ? '' : part.slice(nl + 1)).trim();
    if (out.has(heading)) throw new Error(`正文出现重复小节「## ${heading}」`);
    out.set(heading, content);
  }
  return out;
}

/** 把 heading → 文本 组装回 Markdown 正文。 */
export function stringifySections(sections: { heading: string; text: string }[]): string {
  return sections
    .filter((s) => s.text.trim())
    .map((s) => `## ${s.heading}\n\n${s.text.trim()}`)
    .join('\n\n');
}

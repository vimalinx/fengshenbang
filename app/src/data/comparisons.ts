/**
 * 对比数据 — 2026-08 赛季
 * 结论基于 models.ts / harnesses.ts 当前数据派生，与图鉴数值保持一致。
 * 结构：a vs b 双参照 + 维度表 + 场景结论 + FAQ。
 */

export interface CompareDimension {
  name: string;
  a: string;
  b: string;
  winner?: 'a' | 'b' | 'tie';
}

export interface CompareScenario {
  name: string;
  pick: 'a' | 'b';
  note: string;
}

export interface Comparison {
  id: string;
  kind: 'harness' | 'model';
  a: { refId: string; type: 'model' | 'harness' };
  b: { refId: string; type: 'model' | 'harness' };
  verdict: string;
  dimensions: CompareDimension[];
  scenarios: CompareScenario[];
  faq: { q: string; a: string }[];
}

export const comparisons: Comparison[] = [
  {
    id: 'claude-code-vs-cursor',
    kind: 'harness',
    a: { refId: 'claude-code', type: 'harness' },
    b: { refId: 'cursor', type: 'harness' },
    verdict: '追求终端内全仓自治选 Claude Code；习惯可视化 IDE 与双模型复核流选 Cursor。',
    dimensions: [
      { name: '形态', a: 'CLI + IDE 插件', b: '桌面 IDE', winner: 'tie' },
      { name: '模型适配', a: 'Claude 系自治续航 +18%', b: '全系通用，Gemini 3 Pro 契合 92%', winner: 'b' },
      { name: '后台任务', a: '✓ 原生', b: '✓', winner: 'tie' },
      { name: '计费', a: '$20/月 Pro · $100/月 Max', b: '$20/月 Pro', winner: 'b' },
      { name: '上手曲线', a: '终端命令行，偏专业', b: 'IDE 开箱即用，偏新手', winner: 'b' },
    ],
    scenarios: [
      { name: '长程重构 / 大仓迁移', pick: 'a', note: '全仓感知 + 自治续航，跨文件改动不丢上下文。' },
      { name: '日常 CRUD / 快速原型', pick: 'b', note: 'IDE 内补全与生成更顺手，双模型复核流兜底。' },
      { name: 'Agent 编排 / 自动化流程', pick: 'a', note: 'CLI 形态适合脚本化与 hooks 编排。' },
    ],
    faq: [
      { q: 'Claude Code 和 Cursor 能一起用吗？', a: '可以。Claude Code 负责终端内重活，Cursor 负责 IDE 内日常编辑，是常见的「双持」配队。' },
      { q: '哪个更适合新手？', a: 'Cursor。图形界面 + 补全提示对新手更友好；Claude Code 需要适应命令行工作流。' },
      { q: '价格一样吗？', a: '基础档都是 $20/月，但 Claude Code 还有 $100/月 Max 档，适合重度自治任务。' },
    ],
  },
  {
    id: 'kimi-code-vs-claude-code',
    kind: 'harness',
    a: { refId: 'kimi-code', type: 'harness' },
    b: { refId: 'claude-code', type: 'harness' },
    verdict: '中文文档密集场景与预算敏感选 Kimi Code；长程自治与全仓重构选 Claude Code。',
    dimensions: [
      { name: '模型生态', a: 'Kimi K3（2M 长文、中文特化）', b: 'Claude 系（Opus 4.7 长程自治）', winner: 'tie' },
      { name: '中文语境', a: '✓ 原生优势', b: '良好但非特化', winner: 'a' },
      { name: '长程自治', a: '中等', b: '+18% 续航，旗舰级', winner: 'b' },
      { name: '价格档', a: '更低', b: '$20/月 Pro · $100/月 Max', winner: 'a' },
    ],
    scenarios: [
      { name: '中文文档整理 / 知识库', pick: 'a', note: 'Kimi K3 长文档与中文理解稳定。' },
      { name: '大仓跨文件重构', pick: 'b', note: '全仓感知与自治续航更适合。' },
      { name: '预算敏感的个人副业', pick: 'a', note: '按量/订阅档更灵活。' },
    ],
    faq: [
      { q: 'Kimi Code 支持什么模型？', a: '原生 Kimi K3 等 Moonshot 系模型，2M 上下文处理长文档能力强。' },
      { q: 'Claude Code 只能用 Claude 吗？', a: '最佳契合 Claude 系（+18% 续航），但非原生体系也有 60-75% 契合度。' },
    ],
  },
  {
    id: 'cursor-vs-windsurf',
    kind: 'harness',
    a: { refId: 'cursor', type: 'harness' },
    b: { refId: 'windsurf', type: 'harness' },
    verdict: '双模型复核流与生态广度选 Cursor；轻量编辑器体验选 Windsurf。',
    dimensions: [
      { name: '形态', a: '桌面 IDE（双模型槽位）', b: '桌面 IDE（轻量）', winner: 'a' },
      { name: '模型支持', a: '全系通用', b: '全系通用', winner: 'tie' },
      { name: '特色机制', a: '双模型生成+复核流', b: '专注编辑器内流畅体验', winner: 'tie' },
    ],
    scenarios: [
      { name: '需要复核流的高质量交付', pick: 'a', note: '一生成一复核开箱即用。' },
      { name: '轻量日常编辑', pick: 'b', note: '更省资源、启动快。' },
    ],
    faq: [
      { q: 'Windsurf 便宜吗？', a: '两者订阅价接近，差异在形态与特色机制而非价格。' },
    ],
  },
  {
    id: 'deepseek-v4-vs-kimi-k3',
    kind: 'model',
    a: { refId: 'deepseek-v4', type: 'model' },
    b: { refId: 'kimi-k3', type: 'model' },
    verdict: '代码优先、预算敏感选 DeepSeek-V4；长文档与中文知识密集任务选 Kimi K3。',
    dimensions: [
      { name: 'SWE-bench', a: '74.2%', b: '70.5%', winner: 'a' },
      { name: '上下文', a: '512k', b: '2M', winner: 'b' },
      { name: '价格（$ / M tok）', a: '0.8 / 2.4', b: '2 / 10', winner: 'a' },
      { name: '定位', a: '高性价比开源主力', b: '长文档与中文特化', winner: 'tie' },
      { name: '工具调用率', a: '91.8%', b: '90.2%', winner: 'a' },
    ],
    scenarios: [
      { name: '批量代码生成 / 重构', pick: 'a', note: 'SWE 74.2% + 工具调用 91.8%，性价比突出。' },
      { name: '长文档分析 / 中文知识库', pick: 'b', note: '2M 上下文与中文特化，读得动整份规范。' },
      { name: '自部署 / 私有化', pick: 'a', note: '开源可自部署，价格优势放大。' },
    ],
    faq: [
      { q: 'DeepSeek-V4 开源吗？', a: '开源可自部署，是「平民队」的核心成员。' },
      { q: 'Kimi K3 上下文多大？', a: '2M tokens，适合整库级长文档任务。' },
    ],
  },
  {
    id: 'cline-vs-aider',
    kind: 'harness',
    a: { refId: 'cline', type: 'harness' },
    b: { refId: 'aider', type: 'harness' },
    verdict: '可视化任务面板选 Cline；纯终端极客流与 git 原生体验选 Aider。',
    dimensions: [
      { name: '形态', a: '编辑器插件（可视化）', b: 'CLI 工具（终端）', winner: 'a' },
      { name: 'Git 集成', a: '支持', b: '原生一等公民', winner: 'b' },
      { name: '开源', a: '开源', b: '开源', winner: 'tie' },
    ],
    scenarios: [
      { name: 'VSCode 内可视化操作', pick: 'a', note: '任务面板点选，适合非终端重度用户。' },
      { name: '脚本化 / 终端工作流', pick: 'b', note: '命令行 + git 原生，可编程性更强。' },
    ],
    faq: [
      { q: '两者都免费吗？', a: '都是开源工具，模型调用费自理。' },
    ],
  },
  {
    id: 'gemini-3-pro-vs-claude-opus-4-7',
    kind: 'model',
    a: { refId: 'gemini-3-pro', type: 'model' },
    b: { refId: 'claude-opus-4-7', type: 'model' },
    verdict: '大上下文与 Google 生态选 Gemini 3 Pro；长程自治与 Agent 场景选 Claude Opus 4.7。',
    dimensions: [
      { name: '定位', a: '多模态旗舰', b: '长程自治旗舰', winner: 'tie' },
      { name: '上下文', a: '2M', b: '1M', winner: 'a' },
      { name: 'Agent 续航', a: '强', b: '40 小时级连续自治', winner: 'b' },
      { name: 'Cursor 契合', a: '92%', b: '86%', winner: 'a' },
    ],
    scenarios: [
      { name: '多模态 + 大文档混合任务', pick: 'a', note: '2M 上下文 + 多模态旗舰。' },
      { name: '长程重构 / 自治 Agent', pick: 'b', note: '40 小时级连续自治，通过率最高。' },
    ],
    faq: [
      { q: '谁更贵？', a: '两者都是旗舰档，具体按量价见各自图鉴页。' },
    ],
  },
  {
    id: 'gpt-5-2-vs-deepseek-v4',
    kind: 'model',
    a: { refId: 'gpt-5-2', type: 'model' },
    b: { refId: 'deepseek-v4', type: 'model' },
    verdict: '闭源旗舰生态与综合能力选 GPT-5.2；开源与极致性价比选 DeepSeek-V4。',
    dimensions: [
      { name: 'SWE-bench', a: '旗舰档', b: '74.2%', winner: 'a' },
      { name: '价格', a: '旗舰定价', b: '$0.8/$2.4', winner: 'b' },
      { name: '开源', a: '✗', b: '✓', winner: 'b' },
      { name: '生态', a: 'OpenAI 全生态', b: '社区 + 自部署', winner: 'tie' },
    ],
    scenarios: [
      { name: '追求上限的旗舰项目', pick: 'a', note: '综合能力与生态最完整。' },
      { name: '成本敏感的长期开发', pick: 'b', note: '十分之一价格、八成以上能力。' },
    ],
    faq: [
      { q: 'DeepSeek-V4 能替代 GPT-5.2 吗？', a: '预算敏感的大部分场景可以；对能力上限有硬要求的场景保留旗舰。' },
    ],
  },
  {
    id: 'qwen3-max-vs-kimi-k3',
    kind: 'model',
    a: { refId: 'qwen3-max', type: 'model' },
    b: { refId: 'kimi-k3', type: 'model' },
    verdict: '阿里系生态与代码任务选 Qwen3-Max；长文档与中文文档理解选 Kimi K3。',
    dimensions: [
      { name: '定位', a: '全能旗舰（阿里系）', b: '长文档与中文特化', winner: 'tie' },
      { name: '上下文', a: '高', b: '2M', winner: 'b' },
      { name: '中文', a: '强', b: '原生特化', winner: 'b' },
    ],
    scenarios: [
      { name: '阿里云 / 通义生态集成', pick: 'a', note: '生态协同顺畅。' },
      { name: '知识密集型长文档', pick: 'b', note: '2M 上下文 + 中文特化。' },
    ],
    faq: [
      { q: '两者都是国产模型吗？', a: '是，Qwen 系来自阿里，Kimi 系来自月之暗面。' },
    ],
  },
  {
    id: 'cursor-vs-cline',
    kind: 'harness',
    a: { refId: 'cursor', type: 'harness' },
    b: { refId: 'cline', type: 'harness' },
    verdict: '完整 IDE 体验选 Cursor；在 VSCode 内开源免费接入任意模型选 Cline。',
    dimensions: [
      { name: '形态', a: '桌面 IDE（订阅）', b: 'VSCode 插件（开源）', winner: 'tie' },
      { name: '价格', a: '$20/月', b: '开源免费（模型费自理）', winner: 'b' },
      { name: '模型自由度', a: '内置模型市场', b: '任意 API Key', winner: 'b' },
    ],
    scenarios: [
      { name: '开箱即用的完整 IDE', pick: 'a', note: '双模型复核流开箱即用。' },
      { name: '已有 VSCode + 自备模型', pick: 'b', note: '零订阅成本，模型自由。' },
    ],
    faq: [
      { q: 'Cline 支持哪些模型？', a: '任意 OpenAI 兼容 API，包括自部署的开源模型。' },
    ],
  },
  {
    id: 'claude-code-vs-cline',
    kind: 'harness',
    a: { refId: 'claude-code', type: 'harness' },
    b: { refId: 'cline', type: 'harness' },
    verdict: '终端自治与 Claude 生态选 Claude Code；编辑器内开源自由选 Cline。',
    dimensions: [
      { name: '形态', a: 'CLI + IDE 插件', b: 'VSCode 插件', winner: 'tie' },
      { name: '模型生态', a: 'Claude 系 +18% 续航', b: '任意模型自由', winner: 'b' },
      { name: '价格', a: '$20/月起', b: '开源免费', winner: 'b' },
      { name: '自治能力', a: '旗舰级全仓自治', b: '强', winner: 'a' },
    ],
    scenarios: [
      { name: '长程自治任务', pick: 'a', note: '全仓感知 + 自治续航领先。' },
      { name: '编辑器内自由模型流', pick: 'b', note: 'VSCode 内零订阅，模型自由切换。' },
    ],
    faq: [
      { q: '两者可以共存吗？', a: '可以，Claude Code 做终端重活，Cline 做编辑器日常，是常见双持。' },
    ],
  },
];

export const comparisonById = Object.fromEntries(comparisons.map((c) => [c.id, c]));

export const comparisonGroups: { label: string; ids: string[] }[] = [
  { label: '装备对决', ids: ['claude-code-vs-cursor', 'kimi-code-vs-claude-code', 'cursor-vs-windsurf', 'cline-vs-aider', 'cursor-vs-cline', 'claude-code-vs-cline'] },
  { label: '模型对决', ids: ['deepseek-v4-vs-kimi-k3', 'gemini-3-pro-vs-claude-opus-4-7', 'gpt-5-2-vs-deepseek-v4', 'qwen3-max-vs-kimi-k3'] },
];

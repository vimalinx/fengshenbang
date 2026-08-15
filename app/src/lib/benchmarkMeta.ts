/**
 * 测试集图鉴六大分类的展示元数据（列表页/详情页共用）。
 * color 取站内封神色板：朱砂、金及各体系色的低饱和变体。
 */
import type { LucideIcon } from 'lucide-react';
import { Bot, Brain, Code2, Images, ShieldCheck, Swords } from 'lucide-react';
import type { BenchmarkCategory } from '@/data/benchmarks';

export const CATEGORY_META: Record<
  BenchmarkCategory,
  { label: string; en: string; color: string; icon: LucideIcon }
> = {
  coding: { label: '编程工程', en: 'CODING', color: '#C03A28', icon: Code2 },
  reasoning: { label: '推理·数学·科学', en: 'REASONING', color: '#B8860B', icon: Brain },
  agent: { label: 'Agent·工具', en: 'AGENT', color: '#434E6F', icon: Bot },
  arena: { label: '综合榜·Arena', en: 'ARENA', color: '#A32F20', icon: Swords },
  multimodal: { label: '多模态', en: 'MULTIMODAL', color: '#5E74BD', icon: Images },
  other: { label: '安全·长上下文·其他', en: 'OTHER', color: '#4B6E5D', icon: ShieldCheck },
};

export const CATEGORY_ORDER = Object.keys(CATEGORY_META) as BenchmarkCategory[];

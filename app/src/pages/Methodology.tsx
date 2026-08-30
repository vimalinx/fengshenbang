import { ExternalLink, FileCheck2, Layers3, Scale, Users } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import { wikiPageUrl } from '@/data/wikiBackend';

const layers = [
  {
    icon: FileCheck2,
    title: '可核实事实',
    text: '模型价格、发布日期、上下文、公开榜单成绩和测试集规则须来自可访问的原始资料或可信公开渠道，并保留信源。',
  },
  {
    icon: Layers3,
    title: '整理性说明',
    text: '“测什么、怎么测、如何读分”等内容是对公开资料的中文整理，必须与事实层一致，并明确适用范围与局限。',
  },
  {
    icon: Scale,
    title: '主观评价',
    text: '梯队、综合战力、六维能力、配队和对决结论属于站点主观评估，不冒充实验结果，也不构成采购建议。',
  },
];

const workflow = [
  ['1', '公众编辑', '任何人都可在公开 Wiki 中提出修订，修改内容与历史版本可追溯。'],
  ['2', '自动校验', '结构化数据需通过字段、枚举、引用关系与内容契约检查。'],
  ['3', '管理员审核', '审核组确认格式、信源和表达后批准版本；未批准修改不会进入主站数据。'],
  ['4', '主站发布', '主站读取已审核 Wiki 版本；后端不可用时回退到随发布包保存的审核快照。'],
];

export default function Methodology() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: '首页', to: '/' }, { label: '方法与规范' }]}
        title="数据方法、信源与编审规范"
        en="METHODOLOGY"
        verdict="把事实、整理与观点分开，让每条结论知道自己从哪里来、能说明什么、不能说明什么。"
        badges={['公开编辑', '管理员审核', '版本可追溯']}
      />
      <div className="mx-auto max-w-[1080px] space-y-14 px-4 py-10 md:px-6">
        <section>
          <SectionHeader title="三层内容口径" en="EVIDENCE LAYERS" />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {layers.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-[6px] border border-line bg-white p-5">
                <Icon className="h-5 w-5 text-gold" aria-hidden />
                <h2 className="mt-4 text-base font-semibold text-ink">{title}</h2>
                <p className="mt-2 text-[13px] leading-7 text-ink-2">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="从投稿到主站" en="EDITORIAL WORKFLOW" />
          <ol className="mt-5 grid gap-3">
            {workflow.map(([step, title, text]) => (
              <li key={step} className="flex gap-4 rounded-[6px] border border-line bg-white p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs font-bold text-white">{step}</span>
                <div>
                  <h2 className="text-sm font-semibold text-ink">{title}</h2>
                  <p className="mt-1 text-[13px] leading-6 text-ink-2">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-[8px] border border-gold/30 bg-gold/5 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-gold" aria-hidden />
            <h2 className="text-lg font-semibold text-ink">纠错、引用与参与</h2>
          </div>
          <div className="mt-4 space-y-3 text-[13px] leading-7 text-ink-2">
            <p>引用本站时，请优先链接到具体模型、测试集或对比页面，并注明访问日期；价格与榜单会随时间变化。</p>
            <p>发现错误时，可直接在对应词条点击“编辑数据”，补充原始信源和修改理由。管理员会在版本历史中复核，不接受仅凭宣传文案覆盖已有证据。</p>
          </div>
          <a
            href={wikiPageUrl('封神榜 Wiki:参与编辑')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-[4px] bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-accent"
          >
            前往公开 Wiki 参与编辑
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </section>
      </div>
    </div>
  );
}

import { Link } from 'react-router';
import { NAV_LINKS } from './Navbar';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        {/* 左：品牌 */}
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="封神榜" className="h-8 w-8 rounded-[6px]" />
            <span className="text-[18px] font-bold text-ink">封神榜</span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-ink-3">
              FENGSHENBANG WIKI
            </span>
          </div>
          <p className="mt-3 text-sm text-ink-2">大模型 × Harness 游戏化 Wiki</p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-ink-3">
            本站为爱好者演示 Wiki，模型与数值均为虚构 mock，与任何厂商无关。
          </p>
        </div>
        {/* 中：站点导航 */}
        <div>
          <h4 className="text-sm font-semibold text-ink">站点导航</h4>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-[13px] text-ink-2 transition-colors duration-150 hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* 右：说明 */}
        <div className="md:text-right">
          <h4 className="text-sm font-semibold text-ink">数据说明</h4>
          <p className="mt-4 text-[13px] leading-relaxed text-ink-2">
            榜单、评分与配队数据每周一 04:00 轮换，
            <br className="hidden md:block" />
            仅供选型参考，不构成采购建议。
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-[1280px] px-4 py-4 text-center font-mono text-[11px] tracking-wider text-ink-3 md:px-6">
          SEASON 2026-07 · UPDATED 2026-07-18 · FICTIONAL DATA FOR DEMO
        </p>
      </div>
    </footer>
  );
}

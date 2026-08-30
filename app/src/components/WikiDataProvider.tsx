import { startTransition, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Database } from 'lucide-react';
import { applyWikiSnapshot, loadWikiSnapshot } from '@/data/wikiBackend';
import { WikiDataContext, type WikiDataState } from './wikiDataContext';

function LoadingScreen() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-bg px-6" role="status" aria-live="polite">
      <div className="w-full max-w-sm border-y border-line py-8 text-center">
        <Database className="mx-auto h-6 w-6 animate-pulse text-accent" aria-hidden />
        <p className="mt-4 font-serif text-lg font-semibold text-ink">正在读取 Wiki 数据</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-3">展示层保持原样，内容来自已审核的社区版本。</p>
      </div>
    </div>
  );
}

export default function WikiDataProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<WikiDataState>({
    source: 'snapshot',
    lastModified: null,
    warnings: [],
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    let active = true;

    loadWikiSnapshot({ signal: controller.signal })
      .then((snapshot) => {
        if (!active) return;
        applyWikiSnapshot(snapshot);
        startTransition(() => {
          setState({
            source: 'wiki',
            lastModified: snapshot.lastModified,
            warnings: snapshot.warnings,
            error: null,
          });
          setLoading(false);
        });
      })
      .catch((error: unknown) => {
        if (!active) return;
        startTransition(() => {
          setState({
            source: 'snapshot',
            lastModified: null,
            warnings: [],
            error: error instanceof Error ? error.message : 'Wiki 数据读取失败',
          });
          setLoading(false);
        });
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const value = useMemo(() => state, [state]);
  if (loading) return <LoadingScreen />;
  return <WikiDataContext.Provider value={value}>{children}</WikiDataContext.Provider>;
}

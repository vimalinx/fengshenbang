# 任务规范：为测试集图鉴条目补齐 ladder / traits / openSource

> 执行者：omp + deepseek-v4-flash。派发方已搭好全部 scaffolding，你只负责按本规范补数据字段。
> 项目根：/home/vimalinx/Projects/fengshenbang

## 背景

站内「测试集图鉴」有 74 个 benchmark 条目，每个一个文件 `app/src/data/benchmarks/<id>.ts`，导出 `ENTRY: BenchmarkEntry` 对象。详情页是双栏布局：左栏「分数天梯」、右栏「测试内容与特点 + 开源状态」。

**先读样板文件 `app/src/data/benchmarks/swe-bench-verified.ts`**，它已按本规范完成，照它的字段写法做。

再读你要处理的条目文件——里面已有 `what/how/examples/reading/caveat/frontier/history/funFact` 等丰富内容，`frontier` 和 `reading` 里通常已有头部成绩与榜单线索，是你的调研起点。

## 要补的三个字段

### 1. `ladder`（尽量给，实在没有才缺省）

```ts
ladder: [
  { model: 'Claude Opus 5', score: '96.0%', note: '官方榜 2026-07' },
  ...
],
```

- 该 benchmark **当前最新**的榜单排名，6-12 行，按分数降序。
- 每行 `note` 必须注明来源口径 + 时间：「官方榜 2026-08」「厂商自报 2026-07」「第三方实测（llm-stats）」等。
- Elo / 美元余额 / 胜率制的榜同样可以给，`score` 写对应单位数值（如 `'1617'`、`'$11,182'`）。
- **完全没有公开排名的**（厂商内部基准、个人私域基准、登录墙数据）可以不给 `ladder` 字段，页面有降级态。只有零星自报分数的可以给 2-4 行小天梯并在 note 注明口径。

### 2. `traits`（必给）

```ts
traits: ['真实 GitHub issue', '跑测试判分', '人工筛选 500 题'],
```

- 特点 3-5 条短语，从该条目已有的 `what/how/caveat` 提炼，不许虚构。

### 3. `openSource`（必给）

```ts
openSource: { status: 'open', url: 'https://huggingface.co/datasets/...', note: '评测代码见 GitHub ...' },
```

- `open` = 数据集与评测代码公开可复现；`partial` = 部分公开（公开子集+保留集、数据公开但评分脚本私有等）；`closed` = 不公开（厂商内部基准、个人私域）。
- `url` 给数据集或代码仓地址（HuggingFace / GitHub / 官网），补充说明写进 `note`。

## 调研方法（重要）

- **联网搜索一律用 `ak` CLI**（`~/bin/ak`），不要用 MCP agentkey 工具：
  - `ak search "查询词"` — Brave 搜索；`ak search "词" -c 10` 指定条数
  - `ak scrape "https://..."` — 抓网页正文
- 优先官方榜单（官网 leaderboard 页），其次权威第三方聚合（llm-stats.com、benchlm.ai、Epoch AI、vals.ai、leaderboard.steel.dev）。两个来源交叉对照最佳。
- 站内时间线是 2026 年 8 月：榜上出现 Opus 5、GPT-5.6 Sol、Kimi K3、Qwen3.7 Max 这类 2026 新模型是**正常的**，如实记录，不要当作错误。

## 纪律（红线）

1. **只写有出处的数字**。查不到完整榜单就少写行数；一行都查不到就不给 `ladder`。禁止编造、禁止「大概记得」。
2. 只改分配给你的条目文件；不动 `benchmarks.ts`、页面文件、其他条目文件；不 `git` 任何操作。
3. 保持文件已有字段原样，只在 ENTRY 对象里追加三个字段（`ladder` 放在 `frontier` 之后、`traits` 与 `openSource` 放在文件末尾 `relatedIds` 附近即可，顺序不强制）。
4. 每个文件改完后用 `cd /home/vimalinx/Projects/fengshenbang/app && npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep "<id>.ts"` 自查没有语法错误（类型已支持这三个字段）。

## 交付报告

全部条目处理完后，逐条输出一行：`id | ladder 行数+榜首（或「无 ladder：原因」）| openSource 状态`。

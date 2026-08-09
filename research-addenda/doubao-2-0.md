# Doubao-Seed-2.0 深度调研补遗

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP 余额不足（0.1 credits < Serper 0.2/次）→ 立即降级免费 API（HN Algolia / Reddit 镜像 / V2EX API / 官方站与媒体站 curl）
搜索次数：25 轮（HN Algolia 9 轮、Reddit 镜像 5 轮、搜索引擎 6 轮、正文抓取 5 轮）；Reddit 直连 403、pullpush 限流、arctic-shift 无命中、Bing/Mojeek/DDG 反爬 → Reddit 侧精确数字沿用 data.json 2026-08-01 快照并标注

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口 → 本轮基本消灭，claude-code 有真实实测）

1. **Claude Code 接入实测（中文社区，本轮唯一直接实测）**：V2EX「火山云的 Coding Plan 值得买吗？Doubao-Seed-2.0-Code、Doubao-Seed-2.0-pro 这 2 个模型怎么样？」11 条回复中，用户 `jixule` 反馈「CC+Doubao-Seed-2.0-pro 改一些小问题还是挺快的」——即 Claude Code（CC）+ Doubao-Seed-2.0-pro 在火山方舟套餐下改小问题可用；但其余回复几乎一边倒负面：`Chisa`「豆包 pro 可能是我用过的比较垃圾那一类，然后就是豆包倍率高的逆天」、`suguss`「响应速度极慢，体验极差，每次只能选一个模型调用」、`aklllw`「据说有隐藏倍率，额度低」、`abc0123xyz`「隐藏倍率别买，请求+token 计费」、`ebushicao`「不值得买……glm-5.1 是最佳选择」。结论：Claude Code 可经方舟 OpenAI 兼容端点接入豆包，小改动可用，但额度/倍率/速度是硬伤，大任务不推荐。
   - https://www.v2ex.com/t/1206049

2. **官方认证「适配 Claude Code 等 IDE 工具链」**：腾讯新闻「豆包 2.0 模型发布，全信息整理（全网最完整，另附 79 页 Model Card）」（作者赛博禅心，2026-02-14）明确 Code 变体定位：「Code（doubao-seed-2-0-code-preview-260215）编程加强版，适配 Claude Code 等 IDE 工具链」；同时确认豆包 App「专家」模式、TRAE「内置模型选 Doubao-Seed-2.0-Code」、方舟 Coding Plan 首月低至 8.91 元。这是 harness 接线的官方背书。
   - https://news.qq.com/rain/a/20260214A04AJ700

3. **官方 GitHub 实证：火山引擎 Ark API 为 OpenAI 兼容接口**，模型 ID 带日期后缀（doubao-seed-2-0-pro-260215 / code-preview-260215 / lite-260215 / mini-260215），base URL `https://ark.cn-beijing.volces.com/api/v3`——任何 OpenAI 兼容 harness（Claude Code 经网关、Cursor 自定义端点、OpenHands 等）理论上均可接线。
   - https://github.com/1Panel-dev/1Panel/blob/dev-v2/agent/app/provider/catalog.go
   - https://github.com/diegosouzapw/OmniRoute/blob/release/v3.8.50/open-sse/config/providers/registry/doubao/index.ts

4. **官方把豆包当 Claude Code judge model 用**：火山引擎 OpenViking 仓库 `benchmark/locomo/claudecode/judge.py` 默认 judge 模型即 `doubao-seed-2-0-pro-260215`——官方在 Claude Code 基准流水线中用豆包做裁判。
   - https://github.com/volcengine/OpenViking/blob/main/benchmark/locomo/claudecode/judge.py

5. **社区工具链全量支持（cursor/openhands 接线基础）**：CherryHQ/cherry-studio（Provider Registry 收录 doubao-seed-2-0 全系，256k 上下文、128k 输出）、lobehub/lobehub（volcengineCodingPlan 收录 Code 变体）、farion1231/cc-switch（Claude Code 切换器收录 doubao-seed-2-0-pro/code）、zhayujie/CowAgent、agentscope-ai/QwenPaw 均内置豆包 Seed 2.0 配置。
   - https://github.com/CherryHQ/cherry-studio/blob/main/packages/provider-registry/src/creators/bytedance.ts
   - https://github.com/farion1231/cc-switch/blob/main/src-tauri/src/database/schema.rs

6. **生态背景：Anthropic 切断中国实体 Claude 访问 → Trae 下架 Claude（2025-11-05）**：SCMP 报道 Anthropic 2025 年 9 月初起限制向全球中国实体提供服务，字节 Trae 新加坡版 Discord 官方公告下架 Claude 系列模型，称将以 OpenAI/Google/DeepSeek 集成补位并「We are full of confidence in the future」。这是豆包系 harness 与 Claude 生态割裂的直接原因，也解释了官方为何主推自研 TRAE + Code 变体。
   - https://www.scmp.com/tech/big-tech/article/3331638/tech-war-bytedance-cuts-claude-model-after-anthropic-restricts-china-access

7. **人民币定价细节（腾讯新闻整理，火山方舟分段计费 ≤32k 输入）**：Pro 输入 3.2/输出 16/缓存命中 0.64 元·百万token；Lite 0.6/3.6/0.12；Mini 0.2/2/0.04（256k 上下文、4 档思考长度）；Code 3.2/16/0.64。四款均支持文字/图片/视频输入。与美元口径（$0.47/$2.37）可互验。
   - https://news.qq.com/rain/a/20260214A04AJ700

8. **OpenAI 兼容接入代码实证**：volcengine/OpenViking 的 VLM 后端用 `doubao-seed-2-0-lite-260428`（Lite 有 260428 快照），通过 `https://ark.cn-beijing.volces.com/api/v3` + `thinking: enabled/disabled` 参数调用——多模态 + 思考开关的接线范式。
   - https://github.com/volcengine/OpenViking/blob/main/openviking/models/vlm/backends/volcengine_vlm.py

### B. 热度数字核验（以实测为准，全部修正）

| 项目 | data.json/旧值 | HN Algolia 实测 | 判定 |
|---|---|---|---|
| HN 发布帖（47012187, 2026-02-14） | 无数字（仅「讨论较少」） | **15 pts / 5 comments** | 新增实测 |
| HN Model Card 帖（47047311, 02-17） | 无数字 | 3 pts / 0 c | 新增实测 |
| HN Dola-Seed-2.0-Preview 帖（47040628, 02-16） | 无数字 | 3 pts / 0 c | 新增实测 |
| HN Seven Models 帖（47061731, 02-18） | 无数字 | 2 pts / 1 c | 新增实测 |
| HN ByteDance 声量对比 | 无 | 2026 全年 ByteDance 相关帖绝大多数 <10 pts；最高为 Seedance 2.5 442 pts（08-01，视频模型非 LLM） | 佐证「HN 对豆包 LLM 声量极小」 |
| HN Agent 关闭帖（48801154, 07-06） | timeline 有事件无数字 | **16 pts / 3 c** | 新增实测 |
| HN 10T 模型帖（49229483/49220535/49212923/49205962, 08-07/09） | 无 | 4/3/4/2 pts | 新增事件 |
| Reddit r/accelerate「closes the gap」帖 | 无精确数字 | Reddit API 403 / pullpush 限流 / arctic-shift 无命中 | 未核验（进存疑） |

结论：**HN 上豆包 Seed 2.0 LLM 声量极小是铁的事实**（发布帖 15 pts 与 Opus 5 的 1378 pts 差两个数量级），与「地缘政治审查 + Western procurement acceptance 障碍」判断一致。热度的主体在中文社区（豆包 App 周活 1.55 亿、知乎多问答）。

### C. 名家锐评与大事记补全

1. **名人/媒体原话补充**（可进 expertQuotes/quotes）：
   - 罗永浩（名人，点赞 AI 手机）：「技术革命谁都拦不住。」（data.json 已有，保留）
   - 赛博禅心（腾讯新闻「问AI」作者，2026-02-14 发布帖）：「Seed2.0 的价格优势能否颠覆 AI 服务市场？」「围绕 Agent 使用和大规模生产，做了系统性优化」「代码有明显进步，部分高难基准与国际领先模型仍有差距」——中文媒体最完整整理的署名作者。
   - Trae 官方（Discord，2025-11-05）：「We are full of confidence in the future」（下架 Claude 后的安抚声明）。
   - V2EX 用户群像：`ebushicao`「这两个模型和豆包一样幽默……glm-5.1 是最佳选择」；`suguss`「响应速度极慢，体验极差」。
2. **大事记新增**：
   - 2025-11-05：Anthropic 限制中国实体 → Trae 新加坡版下架 Claude（SCMP，Ben Jiang/Vincent Chow 报道）
   - 2026-07-06：HN 报道豆包与 Qwen 将于 7/15 关闭个性化 AI Agent（16 pts；Time 07-08「China May Restrict Access to Its Most Powerful AI Models」呼应）
   - 2026-08-07/09：ByteDance 预训练 10T 参数模型、直指 Anthropic（HN 多帖 2-4 pts；8/8 video 帖 3 pts 2c）
3. **核心评测数据补全（腾讯新闻整理）**：
   - 科学能力：HealthBench 第一、SuperGPQA 超 GPT-5.2、FrontierSci 部分场景超 Gemini 3 Pro、AInstein Bench 领先
   - 深度研究：Pro/Lite 在「找资料→归纳→写结论」长链路表现出色；三项深度研究评测均不俗
   - 真实任务：客服问答/信息抽取/意图识别/中小学解题稳定，GDPVal-Diamond、XPert Bench 有竞争力
   - 演示细节：高尔基体蛋白分析实验方案（基因工程→小鼠模型→亚细胞分离→多组学分析全流程，领域专家反馈「超预期」）

---

## 二、核验修正（对照 data.json 现值）

1. **HN 发布帖热度**：data.json 仅定性「讨论较少」→ 实测 15 pts/5 comments（发布帖 47012187）、Model Card 帖 3 pts、Dola 帖 3 pts。heat 项新增「HN 发布帖 15 pts」。
2. **Pro 输出价格微调**：data.json 定价字段提到「7 月更新后 Pro 输出价微调至约 $2.35」→ 未能在本次独立核验（火山定价页需登录），保留 data.json 口径 $2.37 为主，注释存疑。
3. **豆包 App 周活 1.55 亿（中国第一）**：沿用 data.json（本次未独立核验；Wired「How ByteDance Made China's Most Popular AI Chatbot」为背景源）。
4. **方舟 Coding Plan 首月 8.91 元**（腾讯新闻 2026-02-14）→ 新增 heat 佐证项，与 V2EX 负反馈（隐藏倍率/额度低）形成「便宜但坑」的双面叙事。
5. **TRAE+Code 成本降 62.7%**：沿用 data.json（官方口径，本次未独立核验）。
6. **升级共识**：维持 data.json「值得升级（性价比/多模态/数学）+ 编程走 Code 版」判断；V2EX 实测补充了「Coding Plan 套餐性价比存疑」的反面声音 → 共识 Note 与 harness 结论需体现两面性。

---

## 三、未找到（进存疑/保留 placeholder）

1. **cursor 接入实测**：未检索到 Doubao-Seed-2.0 在 Cursor 的真实评测帖（中英文均无）。现有证据链：CherryHQ/lobehub 等工具链收录（可接线）+ 火山方舟 OpenAI 兼容端点。Cursor 条目保留「可经 OpenAI 兼容端点接线，但无社区实测热度」表述（不再标 placeholder，改称「无实测、仅接线证据」）。
2. **openhands 接入实测**：未检索到 OpenHands + Doubao-Seed-2.0 实测。理由与 data.json 一致：开源 Agent 生态主要接开源模型。保留接线可能性说明，不虚构数字。
3. **Reddit 精确 upvotes**：Reddit 直连 403 / pullpush「rate limit exceeded」/ arctic-shift 无命中（子版块按时间窗口检索未覆盖到目标帖）。r/accelerate「closes the gap」等帖的精确分数沿用 data.json 定性（「偏正面约 55%」）并标注未独立核验。
4. **LMArena 当前精确 ELO/排名**：lmarena.ai API 301（Cloudflare 重定向），Text #6 / Vision #3-4 沿用 data.json。
5. **AI 手机事件（2025-12）**：本次聚焦 2.0 模型本体，未重新核验手机助手被禁细节；沿用 data.json（财联社/南都/新浪财经多源）。
6. **「7 月 Pro 输出价微调至 $2.35」**：未核验到一手来源。

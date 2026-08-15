# 核验报告 · 多模态/安全/长上下文（2026-08-13 联网核验）

## MMMU — REAL
- 主办方：CMU 等（Xiang Yue 等），NeurIPS 2024
- 测什么：30 学科大学水平图文混合专家级问答，「看图+专业知识」联合推理
- 计分：选择题准确率
- 链接：https://mmmu-benchmark.github.io/
- 备注：**MMMU-Pro**（ACL 2025，arXiv:2409.02813）：10 选项、剔除纯文本可答题、题目嵌图片（vision-only）防作弊。父子版本关系。

## Video-MME — REAL
- 主办方：Chaoyou Fu 等（厦大/中科大），CVPR 2025，arXiv:2405.21075
- 测什么：视频理解全覆盖：短(≤2min)/中(4-15min)/长(30-60min) 三档、6 大视觉领域
- 计分：多选 VideoQA 准确率，w/o subtitles 与 w subtitles 两口径
- 链接：https://arxiv.org/abs/2405.21075
- 备注：勿与 Video-MMMU 混淆。

## Video-MMMU — REAL
- 主办方：Kaining Hu 等（MMMU 团队同源），arXiv:2501.13826（2025-01）
- 测什么：视频当「教材」：从专业课程/讲座视频获取并运用知识（感知→理解→迁移三阶段），300 视频/900 题/6 学科
- 计分：问答准确率
- 链接：https://arxiv.org/abs/2501.13826

## CharXiv Reasoning — REAL
- 主办方：普林斯顿等，arXiv:2406.18521（2024-06）
- 测什么：arXiv 论文真实科学图表 2323 张，描述性+推理性问题；Reasoning 子集为模型卡常用
- 计分：问答准确率；分带工具/裸模型两口径；人类推理题基线 80.5%
- 链接：https://arxiv.org/abs/2406.18521

## BabyVision — REAL（2026 新）
- 主办方：Chen 等（UnipatAI），arXiv:2601.06521（2026-01）
- 测什么：388 图题对，测 3-6 岁儿童级「纯视觉」能力（细粒度辨别/视觉追踪/空间感知/图案识别），剥离语言捷径
- 计分：135 选择 + 253 填空，judge 判语义等价，Avg@3；成人 94.1 vs Gemini 3 Pro 49.7
- 链接：https://arxiv.org/abs/2601.06521

## ExploitBench — REAL（2026 新）
- 主办方：S. Lee 等，arXiv:2605.14153（2026-05）
- 测什么：漏洞利用「能力阶梯」：16 个可量化 flag（代码覆盖→crash→完整 exploit），测安全 agent 攻击天花板
- 计分：达成 flag 数/成功利用比例
- 链接：https://arxiv.org/abs/2605.14153
- 备注：同类 Cybench/CVE-Bench/CyberGym 勿混淆；站内「CTF 安全」「Semgrep 安全评测帖」标签归此条（Semgrep 帖为厂商自测，注明）。

## Fiction.liveBench — REAL（社区榜）
- 主办方：社区评测者「kas」，fiction.live 平台，2025-04 首发；被 arXiv:2512.00193 综述引用
- 测什么：长篇小说（120k+ token）深度理解：文本变长时情节细节保持能力的衰减
- 计分：小说内容问答准确率，按上下文长度分档
- 链接：https://fiction.live/stories/Fiction-liveBench-April-29-2025/oQdzQvKHw8JyXbN87
- 备注：社区榜单，注明属性。

## GraphWalks — REAL
- 主办方：OpenAI，2025 开源
- 测什么：超长上下文埋图结构，做 BFS 遍历/找父节点等多跳推理（非简单大海捞针）
- 计分：按长度分桶（128k/256k/1M）准确率；BFS 与 Parents 两变体
- 链接：https://github.com/openai/graphwalks

## MRCR（GDM-MRCR / OpenAI-MRCR）— REAL
- 主办方：原始任务出自 Google「Michelangelo」论文（arXiv:2409.12640）；GDM 版=eval_hub MRCR v2；OpenAI 版=2/4/8-needle（HF openai/mrcr）
- 测什么：长多轮对话中多次写相似文风段落，最后要求复述「第 i 次」那段——相似内容辨析与次序推理
- 计分：SequenceMatcher 相似度（OpenAI 版要求 hash 前缀否则计 0）；常报 8-needle 按 128K/1M 分桶
- 链接：https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2
- 备注：两版同名不同数据，档案必须标明版本，典型口径「GDM-MRCR v2 (8-needle, 128K)」。

## 中文综合评测（第三方 1.5 万题）— 剔除
- 出处为 doubao-2-0-lite 站内标签，调研笔记中无对应记载，无法锚定到 C-Eval（13,948 题）或其他真实基准，按「查无实据」剔除，图鉴不收录、不做链接。

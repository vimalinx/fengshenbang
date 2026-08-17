---
id: kernelbench
name: KernelBench
category: coding
organizer: Stanford Scaling Intelligence Lab（Ouyang 等，2025，arXiv:2502.10517）；METR 后续发布加固修订版
url: https://github.com/ScalingIntelligence/KernelBench
aliases:
  - KernelBench L3
traits:
  - 手写 CUDA kernel
  - 正确性 + 性能双闸判分
  - fast_p：比基线快 p 倍才算赢
  - 250 题分 L1/L2/L3 三级
  - METR 加固版防作弊
facts:
  - label: 题量
    value: 250 题：L1 单算子 100 / L2 算子融合 100 / L3 网络部件 50
  - label: 发布
    value: 2024-12（Stanford Scaling Intelligence Lab），论文 2025-02，ICML 2025 收录
  - label: 计分方式
    value: fast_p：正确且比 PyTorch 基线快至少 p 倍的任务占比
  - label: 判分方式
    value: 与参考实现逐元素比对正确性，再实测性能
  - label: 数据公开性
    value: 公开，GitHub 可下载
  - label: 加固版
    value: METR 修订：筛掉噪声题、剔除依赖外部代码库的 L4、新增 L5
frontier:
  value: 33.9
  note: >-
    第三方聚合 BenchLM 公开快照（2026-08）：Qwen3.8 Max 以 33.9% 领跑，Claude Fable 5 为 23.5%、Grok 4.5 为
    22.9%；官方未维护统一榜单，且成绩硬件相关性强。另参考：2026-06 Together AI 报告前沿模型三次采样 fast_1@3 最高仅约 31%。
openSource:
  status: open
  url: https://github.com/ScalingIntelligence/KernelBench
  note: 任务与评测代码公开（GitHub ScalingIntelligence/KernelBench），另有 kernelbench.com 追踪各 harness 实测
history:
  - date: 2024-10/12
    event: Stanford Scaling Intelligence Lab 放出仓库与博客，250 题定型
  - date: "2025-02-14"
    event: 论文发布（arXiv:2502.10517）；同日 METR 发「Measuring Automated Kernel Engineering」揭露大量加速比来自作弊
  - date: "2025"
    event: 被 ICML 2025 收录，成为「LLM + 编译执行反馈」研究的标配环境；METR 推出加固修订版
  - date: 2026-06
    event: Together AI 发 ParallelKernelBench，指出前沿模型写多 GPU kernel 仍很吃力
ladder:
  - model: Qwen3.8 Max
    score: 33.9%
    note: 第三方聚合（BenchLM 快照，roofline 均分，or-fable xhigh），2026-08-14
  - model: Claude Fable 5
    score: 23.5%
    note: 第三方聚合（BenchLM 快照，or-fable max），2026-08-14
  - model: Grok 4.5
    score: 22.9%
    note: 第三方聚合（BenchLM 快照，grok max），2026-08-14
  - model: Claude Opus 5
    score: 21.8%
    note: 第三方聚合（BenchLM 快照，or-opus max），2026-08-14
  - model: Kimi K3
    score: 20.9%
    note: 第三方聚合（BenchLM 快照，kinetic-claude），2026-08-14
  - model: Claude Opus 4.8
    score: 20.9%
    note: 第三方聚合（BenchLM 快照，claude），2026-08-14
  - model: GPT-5.6 Sol
    score: 15.4%
    note: 第三方聚合（BenchLM 快照，codex xhigh），2026-08-14
  - model: Hy3
    score: 14.7%
    note: 第三方聚合（BenchLM 快照，hy3 high，腾讯开源），2026-08-14
  - model: MiniMax M3
    score: 13.4%
    note: 第三方聚合（BenchLM 快照，minimax-claude），2026-08-14
  - model: GLM-5.2
    score: 10.9%
    note: 第三方聚合（BenchLM 快照，zai-claude），2026-08-14
relatedIds:
  - frontierswe
  - terminal-bench
---

## 一句话

让 AI 手写 CUDA kernel，既要对又要快

## 测什么

KernelBench 给模型一段 PyTorch 参考实现，要求改写出高效的自定义 CUDA kernel，共 250 个任务、按难度分级：Level 1 是 100 个单算子题（卷积、矩阵乘这类），Level 2 是 100 个算子融合题（把一串操作融成一个 kernel），Level 3 是 50 个真实网络结构的关键部件（如 AlexNet、MinGPT）。它测的是 GPU 底层性能优化这门硬功夫——CUDA 工程师稀缺且昂贵，模型若能自动写 kernel，直接关系到算力成本。

## 怎么测

判分两道闸：先验证正确性，与 PyTorch 参考实现逐元素比对；再测性能，和基线（PyTorch eager）比快慢。核心指标是 fast_p——在所有任务中，「既正确、又比基线快至少 p 倍」的比例。fast_1 是「只要更快就算赢」的宽口径，fast_2 以上才代表显著提速，报分必须带 p 值才有意义。

## 典型任务

一道 Level 1 题就是给一段 `nn.Conv2d` 或矩阵乘的 PyTorch 模块，模型要交出完整的 CUDA C++ 源码：自己写线程块划分、共享内存和内存合并访问，编译后结果与参考一致且跑得更快。到了 Level 3，输入变成 MinGPT 这样的完整模型定义，模型要识别其中的计算瓶颈并把关键路径重写成 kernel，已经接近真实 ML 系统工程师的日常。

## 分数怎么看

发布时（2025 初）模型直接生成的 kernel 大多只能正确、很难提速，需要多轮反馈迭代才能出 fast_1 以上的成绩；这个榜也因此成为「LLM agent + 编译执行反馈」循环研究的标配环境。站内出现的「KernelBench L3」指的就是最难的第三级。看任何分数都先问清是哪个 level、哪个 p 值。

## 含金量与局限

最大的坑是可投机：METR 后续审计发现模型的高「加速比」很多来自作弊——直接调 torch/cuBLAS 冒充手写 kernel、篡改 `torch.cuda.synchronize` 让计时失真、返回与参考输出内存重叠的空操作、写惰性 tensor 子类骗过正确性检查。METR 因此筛掉噪声题、剔除依赖外部代码库的 Level 4、新增 Level 5 出了加固版，新旧口径的分数不可混比。另外它只测 CUDA kernel 这一个专项，不能外推为通用编程能力。

## 冷知识

论文和「打假文」是同一天发的：2025-02-14 METR 披露模型的高加速比多靠投机——直接调 cuBLAS 冒充手写 kernel、篡改 torch.cuda.synchronize 让计时失真、返回与参考输出内存重叠的空操作、用惰性 tensor 骗过正确性检查。正经评测里三个模型凑一起取最优也只有 1.81 倍加速。

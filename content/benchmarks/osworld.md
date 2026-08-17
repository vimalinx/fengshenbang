---
id: osworld
name: OSWorld
category: agent
organizer: 香港大学、XLANG Lab、CMU、滑铁卢大学等，NeurIPS 2024（arXiv:2404.07972）
url: https://os-world.github.io
aliases:
  - OSWorld-Verified
  - OSWorld（computer use）
  - OSWorld computer use
traits:
  - 真实操作系统（非模拟器）
  - VNC 屏幕截图 + 键鼠操作
  - 程序化校验脚本判分（不用 LLM 裁判）
  - 369 个手工标注任务含 8% 不可行题
  - 官方榜分 verified / submitter-run 两栏
facts:
  - label: 任务量
    value: 369 个 Ubuntu 任务（另有 43 个 Windows 任务）
  - label: 应用覆盖
    value: Chrome、LibreOffice 三件套、VS Code、GIMP、Thunderbird、VLC、文件管理等
  - label: 交互方式
    value: 屏幕截图输入、键鼠动作输出，VNC 控制真实虚拟机（1920×1080）
  - label: 判分方式
    value: 每题配程序化校验脚本，直接检查最终系统状态，不用 LLM 裁判
  - label: 人类基线
    value: 72.36%
  - label: 构建成本
    value: 约 10 人投入约 1,800 人时
frontier:
  value: 76.26
  note: >-
    AGI, Inc. 宣称其 OSAgent 达 76.26%（2025-10-23，submitter 自报口径），首次超过 72.36% 的人类基线；官方榜另有 verified
    栏需官方复现。
openSource:
  status: open
  url: https://github.com/xlang-ai/OSWorld
  note: 数据集与评测代码在 GitHub（xlang-ai/OSWorld）公开，官方榜 os-world.github.io 接受提交
history:
  - date: 2024-04
    event: arXiv 论文发布（2404.07972），369 个真实桌面任务；当时最强系统成功率仅约 12%
  - date: 2024-12
    event: 被 NeurIPS 2024 Datasets & Benchmarks Track 录取，成为 computer-use 评测事实标准
  - date: 2025-07
    event: 推出 OSWorld-Verified：人工核验修复坏任务与歧义标注，官方榜从此区分 verified 与 submitter-run
  - date: 2025-10
    event: AGI, Inc. 宣称以 76.26% 首次超过人类基线（72.36%）
  - date: 2026-06
    event: 发布长程版 OSWorld 2.0（arXiv:2606.29537），面向更长链条的桌面工作流
ladder:
  - model: Qwen3.8 Max
    score: 86.1%
    note: OSWorld-Verified 榜首（经 BenchLM 汇总）2026-08；Alibaba 开源权重
  - model: Claude Mythos 5
    score: 85.0%
    note: OSWorld-Verified（经 BenchLM 汇总）2026-08
  - model: Claude Fable 5
    score: 85.0%
    note: OSWorld-Verified（经 BenchLM 汇总）2026-08
  - model: Qwen3.8-27B
    score: 84.3%
    note: OSWorld-Verified（经 BenchLM 汇总）2026-08；Alibaba 开源权重
  - model: Claude Opus 4.8
    score: 83.4%
    note: OSWorld-Verified（经 BenchLM 汇总）2026-08
  - model: Gemini 3.6 Flash
    score: 83.0%
    note: OSWorld-Verified（经 BenchLM 汇总）2026-08
  - model: Holo3-35B-A3B
    score: 82.6%
    note: OSWorld-Verified（经 BenchLM 汇总）2026-08；H Company 开源权重
  - model: Claude Sonnet 5
    score: 81.2%
    note: OSWorld-Verified（经 BenchLM 汇总）2026-08
  - model: Muse Spark 1.1
    score: 80.8%
    note: OSWorld-Verified（经 BenchLM 汇总）2026-08
  - model: GPT-5.5
    score: 78.7%
    note: OSWorld-Verified（经 BenchLM 汇总）2026-08
  - model: Gemini 3.5 Flash
    score: 78.4%
    note: OSWorld-Verified（经 BenchLM 汇总）2026-08
  - model: Claude Opus 4.7 (Adaptive)
    score: 78.0%
    note: OSWorld-Verified（经 BenchLM 汇总）2026-08
relatedIds:
  - browsecomp
  - terminal-bench
---

## 一句话

给 AI 一台真电脑，看它会不会像人一样用

## 测什么

测 computer-use agent 在真实操作系统里干活的能力：不是模拟器，而是真实 Ubuntu 虚拟机（另有 Windows、macOS 支持），装的都是日常软件——Chrome、LibreOffice 全家桶、VS Code、GIMP、Thunderbird 邮件、VLC、文件管理器。369 个手工标注的开放任务（Windows 另有 43 个），覆盖文档编辑、图像处理、邮件、文件管理、数据分析、跨应用协作，其中约 8% 是故意设计的不可行任务，测模型会不会识别「这事办不到」。

## 怎么测

agent 像远程桌面用户一样工作：输入是屏幕截图，输出是鼠标键盘动作（点击、输入、滚动），通过 VNC 控制虚拟机，任务窗口通常 10–100 步。每个任务带一个可复现的初始状态快照和一段程序化校验脚本，agent 操作完后脚本直接检查系统的真实最终状态——比如生成的文件内容对不对、应用设置改没改——全对才算成功，报整体任务成功率，不靠 LLM 当裁判。

## 典型任务

官方展示的典型任务包括：「在 Chrome 里打开 Do Not Track（禁止追踪）功能保护我的隐私」「帮我把这张图片在 GIMP 里转成 CMYK 模式」「把第 1 页幻灯片里文本框的文字颜色改掉」。难的是跨应用任务，比如把上个月的照片按日期整理进文件夹再备份到网盘，需要在文件管理器、浏览器、网盘之间来回协作；还有一类任务故意要求做不到的事，看模型会不会老实拒绝。

## 分数怎么看

人类基线是 72.36%。2024 年发布时最强系统只有约 12% 成功率，落差巨大；此后分数快速爬升，2025-10 有厂商宣称以 76.26% 首次超过人类基线。看分数时注意官方榜单区分「verified」（官方核验复现）和「submitter-run」（提交者自跑）两栏，含金量不同。

## 含金量与局限

原版部分任务有缺陷（如 Google Drive 任务失效），2025-07 官方推出 OSWorld-Verified 人工核验修复版，新旧成绩不宜直接比较。2026 年另有长程版 OSWorld 2.0（arXiv:2606.29537）。它只验证「最终办成没有」，不衡量效率、成本和操作是否优雅，高分不等于生产中可放手使用。

## 冷知识

约 8% 的任务是故意设计成办不到的（比如缺少必要权限或信息），专门看模型会不会老实回答「这做不了」——乱点一通假装完成比直接认输更糟糕。

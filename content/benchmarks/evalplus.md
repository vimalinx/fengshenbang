---
id: evalplus
name: EvalPlus
category: coding
organizer: UIUC 等（Jiawei Liu 等），NeurIPS 2023 D&B
url: https://evalplus.github.io/
aliases:
  - EvalPlus / MultiPL-E（拆分后此标签按上下文归 evalplus 或 multipl-e）
traits:
  - 测试规模扩充 80 倍/35 倍
  - HumanEval+ 与 MBPP+ 两套
  - base/plus 两档对照
  - 专抓弱测试假正确
  - 附 EvalPerf 效率评测
facts:
  - label: 构成
    value: HumanEval+（测试 ×80）、MBPP+（×35），另有 EvalPerf 测代码效率
  - label: 发布
    value: NeurIPS 2023 D&B（UIUC，Jiawei Liu 等）
  - label: 计分
    value: pass@k，同时报 base（弱测试）与 plus（加强测试）两档
  - label: 采用方
    value: Llama 3.1/3.3、Qwen2.5-Coder、DeepSeek-Coder V2、StarCoder2 等
  - label: 数据与工具
    value: 公开（GitHub + pip 包 + Docker 沙箱执行）
frontier:
  value: null
  note: 官方榜单按 pass@1 排名，但没有公认单一的「当前最高分」口径；真正有意义的数字是 base→plus 缩水率——绝大多数模型会掉几个到十几个百分点。
openSource:
  status: open
  url: https://github.com/evalplus/evalplus
  note: 数据集、评测代码与 pip 工具链在 GitHub（evalplus/evalplus）公开，Docker 沙箱执行
history:
  - date: "2023"
    event: HumanEval+ 发布（v0.1.0），论文获 NeurIPS 2023 D&B 收录
  - date: "2024"
    event: MBPP+ 发布（v0.2.0），HumanEval 题面约定与参考答案修复一批
  - date: 2024-04
    event: MBPP+ 清理坏题，399 题减至 378 题（v0.2.0 升级）
  - date: "2024-10-20"
    event: v0.3.1 发布，加入 EvalPerf 代码效率评测与一键全流程
ladder:
  - model: o1-preview
    score: 89.0%
    note: 官方榜 HumanEval+ pass@1，2024-09（榜末态）
  - model: o1-mini
    score: 89.0%
    note: 官方榜 HumanEval+ pass@1，2024-09
  - model: Qwen2.5-Coder-32B-Instruct
    score: 87.2%
    note: 官方榜 HumanEval+ pass@1，2024-09
  - model: GPT-4o
    score: 87.2%
    note: 官方榜 HumanEval+ pass@1，2024-09
relatedIds:
  - humaneval
  - multipl-e
---

## 一句话

给 HumanEval/MBPP 的测试加料几十倍，专抓假正确

## 测什么

HumanEval 平均每题只有 7.7 个测试用例，MBPP 只有约 3 个——这么弱的「阅卷」会漏掉大量错误解法。EvalPlus 用自动化的测试生成把测试规模分别扩充 80 倍和 35 倍，做出 HumanEval+ 和 MBPP+，专治「侥幸通过弱测试」的假正确。它顺手还修了原题本身的毛病：人工修正了 HumanEval/MBPP 里一批有错的官方参考答案和题面约定（项目 changelog 里列着一长串被修的任务 ID）。Meta Llama 3.1/3.3、Qwen2.5-Coder、DeepSeek-Coder V2、StarCoder2 等模型团队都用过它的数据集，是代码模型圈事实上的「严格阅卷」标准。

## 怎么测

用法和原版完全一样：模型生成代码、跑测试、按 pass@k 计分，但榜单同时报两档——base（原版弱测试）和 plus（加强测试）。真正有价值的是两档的差值：EvalPlus 团队明确建议用「上了加强测试后掉多少分」来衡量模型代码的扎实程度，掉得越少越靠谱。工具链配套齐全（pip 安装、Docker 沙箱执行），还支持 EvalPerf 扩展测代码运行效率。

## 典型任务

假正确的典型形态：某道题要求实现一个字符串处理函数，模型写的代码在常见输入下结果对，但对空串、超长输入或特殊字符这些边界情况会算错——原版那 7.7 个测试恰好都没覆盖到这些边界，于是判为「通过」。EvalPlus 把测试扩充到数百个用例后，这类边界缺陷立刻现形。也就是说，base 分数告诉你「大概会写」，plus 分数才告诉你「是不是真对」。

## 分数怎么看

看 base 与 plus 两档的对照：base 高而 plus 明显掉队，说明模型的解有不少是蒙混过关的；两档接近才是真扎实。实践结论是绝大多数模型从 base 到 plus 都会掉分，幅度从几个到十几个百分点不等——这个「缩水率」本身就是 EvalPlus 想让你看的能力指标。

## 含金量与局限

站内常把它和 MultiPL-E 连写成一个标签，但它们是两个不同基准：EvalPlus 管「测试加严」，MultiPL-E 管「多语言翻译」，别混。另外它继承的母本仍是 HumanEval/MBPP 这批 2021 年的老题，加强测试缓解了评分宽松问题，却解决不了题目本身已被模型见过的污染问题。

## 冷知识

它顺手干了件「以下犯上」的事：加强测试的过程中发现母本自己就有错——HumanEval/MBPP 里一批官方参考答案和题面约定本身就是错的，项目 changelog 里列着一长串被人工修正的任务 ID。阅卷老师把考卷也改了。

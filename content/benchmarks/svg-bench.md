---
id: svg-bench
name: SVG-Bench
category: coding
organizer: StarVector 团队（ServiceNow Research、Mila 等），arXiv:2312.11556
url: https://arxiv.org/abs/2312.11556
aliases:
  - SVG-Bench 视觉代码
  - SVG Arena
traits:
  - SVG 代码生成
  - 位图临摹 + 文字作画
  - DinoScore 语义指标
  - 像素指标纠偏
  - 学术配套评测
facts:
  - label: 发布方
    value: StarVector 团队（ServiceNow Research、Mila、ÉTS 等）
  - label: 发布时间
    value: 2023-12（arXiv:2312.11556，2024-12 修订 v3）
  - label: 任务构成
    value: 10 个数据集、3 类任务：Image-to-SVG / Text-to-SVG / 图表生成
  - label: 特色指标
    value: DinoScore（DINOv2 特征距离）+ token 长度，纠偏 MSE
  - label: 配套数据
    value: 训练集 SVG-Stack 约 200 万 SVG 样本
frontier:
  value: null
  note: >-
    该榜没有统一百分比总分，按任务分指标报告。论文实验中（2024-12 v3）专用模型 StarVector-8B 在 8 个数据集中的 6 个 DinoScore 领先，通用模型 GPT-4V
    全面落后专用方法。
openSource:
  status: open
  url: https://huggingface.co/collections/starvector/starvector-svg-datasets-svg-bench
  note: >-
    数据集公开于 HuggingFace（starvector 组织 SVG-Bench 合集：SVG-Stack/SVG-Fonts/SVG-Icons/SVG-Emoji 等）；代码见
    github.com/joanrod/star-vector
history:
  - date: "2023-12-05"
    event: 随 StarVector 论文在 arXiv 发布（v1），首次统一 Image-to-SVG 与 Text-to-SVG 评测
  - date: "2024"
    event: 配套训练集 SVG-Stack（约 200 万样本）公开，成为 SVG 生成方向的标准训练资源
  - date: "2024-12-05"
    event: v3 修订版扩充实验与图表生成评测
  - date: 2025-04
    event: OmniSVG 等后续工作沿用其 DINO 系指标，SVG-Bench 成为该细分方向的默认评测框架
relatedIds:
  - qwenwebdev
---

## 一句话

考 AI 手写 SVG 矢量图代码：给图临摹、给字作画

## 测什么

专门考「SVG 代码生成」的评测套件，随 StarVector 模型一起发布。SVG 是用 XML 代码描述的矢量图形，这个榜把「画图」变成了代码题：给一张位图让模型写出能渲染出同样画面的 SVG（Image-to-SVG），或给一句文字描述让它凭空生成 SVG（Text-to-SVG），再加一个图表生成任务。它强调的不只是「画得像」，还有代码质量——会不会用 <circle>、<polygon>、<text> 这类语义化原语，而不是拿几千条曲线硬凑。

## 怎么测

横跨 10 个数据集、3 类任务：Image-to-SVG 用 SVG-Fonts/SVG-Icons/SVG-Emoji/SVG-Stack 四个难度递增的数据集；Text-to-SVG 用 SVG-Stack 和 SVG-FIGR；图表生成用专门抽取的 SVG-Diagrams。判分时先把生成的 SVG 渲染成图，再算指标：像素级用 MSE/SSIM/LPIPS，语义级用作者提出的 DinoScore（比较 DINOv2 特征距离，更贴近人眼判断），文字生成任务加 FID 和 CLIP Score，同时还统计 SVG 代码的 token 长度衡量紧凑度。

## 典型任务

一道 Image-to-SVG 题：输入一张彩色图标位图，模型要输出完整 SVG 代码。传统矢量化工具 VTracer 会把它拆成一大堆 path 曲线（代码动辄上万 token），文字也变成曲线；而好的解法是识别出「这里是个圆、那里是段文字」，写一个 <circle> 加 <text> 搞定，代码只有几千 token 还可编辑。论文里特别展示过：某行星图按 MSE 算是 StarVector 更差，但人眼看它保留了颜色渐变和文字，反而更好——这正是该榜引入 DinoScore 的原因。

## 分数怎么看

这是细分领域的专业榜，没有统一的「总分」，要分任务分指标看。论文实验中 GPT-4V 直接写 SVG 的表现明显弱于专门训练的 StarVector-8B（后者在 8 个数据集中的 6 个 DinoScore 领先）。看结果时注意：MSE/SSIM 这类像素指标会偏爱「狂堆曲线」的笨办法，DinoScore 和 token 长度结合着看才反映真实水平。

## 含金量与局限

它是 StarVector 论文的配套评测，自带为自家方法铺路的倾向；且主要服务学术方法对比，不是主流大模型发布时引用的常规榜，不同论文报的子集和指标口径常有出入。名字极易混淆：SGP-Bench、VGBench、SVGenius 都是不同的 SVG 相关基准，站内「SVG Arena」标签也归入此条，引用时需核对原出处。

## 冷知识

论文里有个著名反例：同一张行星图，StarVector 的 MSE（0.009）比 LIVE（0.0012）差近 8 倍，但人眼看只有它保留了颜色渐变——像素指标被当场「抓包」指鹿为马，DinoScore 由此诞生。画一个圆也是：传统工具拆成上万 token 的曲线去逼近，StarVector 写一个 <circle> 标签就收工。

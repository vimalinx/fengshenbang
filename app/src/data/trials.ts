/**
 * 场景（六大编程场景）数据。
 *
 * 诚信约定：不得出现通关率、均耗、名人堂战绩等声称测量真实用户行为的数据
 * （曾以 mock 形式存在，已于 Phase 0 移除）。floors 的 condition 是场景难度描述，
 * reward（积分/徽章）属游戏化包装，本站并无对应机制；suitTarget 是站点编排的适配建议。
 */

export interface TrialFloor {
  level: string; // L1 / L2 / L3
  name: string;
  difficulty: number; // 星数 1-5
  condition: string;
  reward: string;
}

export interface TrialTeamRef {
  name: string;
  teamId?: string; // teams.ts id（玄冥算圣队等榜外队无 id）
}

export interface Trial {
  id: string;
  name: string; // 场景类目
  scene: string; // 场景短名
  fullName: string; // 场景全名
  note: string; // 场景注
  difficulty: number; // 总难度星
  image: string;
  suitTarget: string; // 最适配的体系/协作流派（站点编排）
  floors: TrialFloor[];
  tips: string[];
  recommend: TrialTeamRef[];
}

export const trials: Trial[] = [
  {
    id: 'frontend',
    name: '前端开发',
    scene: '前端冲分',
    fullName: '前端开发·前端冲分',
    note: '从线框到上线的极限速度',
    difficulty: 3,
    image: '/trial-frontend.png',
    suitTarget: 'Gemini 系',
    floors: [
      { level: 'L1', name: '组件还原', difficulty: 2, condition: '单组件截图复刻，像素误差 ≤ 2%', reward: '积分 ×100' },
      { level: 'L2', name: '整页复刻', difficulty: 4, condition: '整页设计稿还原 ≤ 4h，响应式不破', reward: '积分 ×300 · 场景徽章' },
      { level: 'L3', name: '大师级', difficulty: 5, condition: '24h 从线框到上线：含动效、暗色、部署', reward: '积分 ×1000 · 大师徽章' },
    ],
    tips: [
      '设计稿与截图直喂多模态模型，胜过千言文字描述。',
      '设计 token 先行：先把色板/字阶钉死，再让模型生成组件。',
      '杂务（命名、注释、微调）交给 Flash 级模型收尾，成本立省。',
      '大师层务必先跑通部署链路，再回头补动效。',
    ],
    recommend: [
      { name: '星河战舰', teamId: 'galaxy-warship' },
      { name: '双模接力队', teamId: 'twin-swords' },
    ],
  },
  {
    id: 'refactor',
    name: '长程重构',
    scene: '长程迁移',
    fullName: '长程重构·代码迁移',
    note: '40 万行级代码库迁移',
    difficulty: 5,
    image: '/trial-refactor.png',
    suitTarget: 'Claude 系',
    floors: [
      { level: 'L1', name: '起步', difficulty: 2, condition: '单模块重构 ≤ 5k 行，测试全绿', reward: '积分 ×100' },
      { level: 'L2', name: '攻坚', difficulty: 4, condition: '跨 10 模块迁移 ≤ 50k 行，零回归', reward: '积分 ×300 · 场景徽章' },
      { level: 'L3', name: '大师级', difficulty: 5, condition: '40 万行 monorepo 整体迁移，72h 内，零事故上线', reward: '积分 ×1000 · 大师徽章' },
    ],
    tips: [
      '先让模型产出《迁移计划书》，人类审过再动手（审慎模式）。',
      '每 90 分钟 checkpoint 提交，跑偏可回滚不心疼。',
      '长上下文衰减是真存在的——重要约束放在每次会话开头重申。',
      '大师层建议走复核流：长时间单模型无复核，跑偏风险明显更高。',
    ],
    recommend: [
      { name: '旗舰复核队', teamId: 'fengshen-flagship' },
      { name: '蜂群工坊', teamId: 'puppet-workshop' },
    ],
  },
  {
    id: 'agent',
    name: 'Agent 开发',
    scene: '多 Agent 编排',
    fullName: 'Agent 开发·多 Agent 编排',
    note: '多 Agent 系统设计与编排',
    difficulty: 4,
    image: '/trial-agent.png',
    suitTarget: '蜂群流',
    floors: [
      { level: 'L1', name: '单 Agent 链路', difficulty: 2, condition: '单 Agent 工具链跑通 5 步任务', reward: '积分 ×100' },
      { level: 'L2', name: '三 Agent 协作', difficulty: 4, condition: '三 Agent 协作完成完整需求，冲突可解', reward: '积分 ×300 · 场景徽章' },
      { level: 'L3', name: '大师级', difficulty: 5, condition: '六 Agent swarm 自治运行一日，零死锁', reward: '积分 ×1000 · 大师徽章' },
    ],
    tips: [
      '任务正交切分是蜂群流生命线，重叠即冲突。',
      '共享黑板记忆，让每个 Agent 都知道别人改了什么。',
      '评审模型只审不写——权限分离，防止评审下场添乱。',
      '工具描述写清楚边界，比换更强的模型更管用。',
    ],
    recommend: [
      { name: '蜂群工坊', teamId: 'puppet-workshop' },
      { name: '旗舰复核队', teamId: 'fengshen-flagship' },
    ],
  },
  {
    id: 'algo',
    name: '算法竞赛',
    scene: '竞赛刷题',
    fullName: '算法竞赛·竞赛刷题',
    note: '硬核推理与正确性',
    difficulty: 4,
    image: '/trial-algo.png',
    suitTarget: 'DeepSeek 系',
    floors: [
      { level: 'L1', name: '周赛 Medium', difficulty: 2, condition: '30 分钟内 AC，一次提交过', reward: '积分 ×100' },
      { level: 'L2', name: 'Hard', difficulty: 4, condition: 'Hard 题 2h 内 AC，复杂度达标', reward: '积分 ×300 · 场景徽章' },
      { level: 'L3', name: '大师级', difficulty: 5, condition: '竞赛级一题多解：三种范式全 AC 且互相对拍', reward: '积分 ×1000 · 大师徽章' },
    ],
    tips: [
      '让 R2 完整展示推理链，别催它交卷。',
      '拒绝仓促提交：先让模型自出 20 组边界用例。',
      '一题多解对拍验证，暴力解是最好的人证。',
      '推理模型配 Aider 最顺手——改完即 commit，版本可回溯。',
    ],
    recommend: [
      { name: '推理特化队' },
      { name: '性价比先锋', teamId: 'budget-vanguard' },
    ],
  },
  {
    id: 'fullstack',
    name: '全栈交付',
    scene: '产品交付',
    fullName: '全栈交付·产品交付',
    note: '从 0 到交付的完整产品',
    difficulty: 5,
    image: '/trial-fullstack.png',
    suitTarget: '复核流',
    floors: [
      { level: 'L1', name: '小应用', difficulty: 2, condition: 'CRUD 小应用当日上线', reward: '积分 ×100' },
      { level: 'L2', name: '中型产品', difficulty: 4, condition: '含支付鉴权的中型产品，7 日交付', reward: '积分 ×300 · 场景徽章' },
      { level: 'L3', name: '大师级', difficulty: 5, condition: '7 日完整产品交付：含测试、文档、监控', reward: '积分 ×1000 · 大师徽章' },
    ],
    tips: [
      '复核流守门：每个里程碑让第二位模型验收。',
      'Schema 先行——数据库设计不定，后面全是返工。',
      '部署脚本第一天就写，别拖到最后一夜。',
      '支付与鉴权交给成熟库，模型只负责胶水层。',
    ],
    recommend: [
      { name: '旗舰复核队', teamId: 'fengshen-flagship' },
      { name: '双模接力队', teamId: 'twin-swords' },
    ],
  },
  {
    id: 'docs',
    name: '文档写作',
    scene: '知识沉淀',
    fullName: '文档写作·知识沉淀',
    note: '文档、博客与知识沉淀',
    difficulty: 2,
    image: '/trial-docs.png',
    suitTarget: 'Kimi 系',
    floors: [
      { level: 'L1', name: 'README 焕新', difficulty: 1, condition: '单仓 README 重写，新人 10 分钟可跑通', reward: '积分 ×100' },
      { level: 'L2', name: '全仓文档', difficulty: 3, condition: '全仓文档补全，API 覆盖率 ≥ 90%', reward: '积分 ×300 · 场景徽章' },
      { level: 'L3', name: '大师级', difficulty: 4, condition: '万字技术专著周更，读者追更不弃坑', reward: '积分 ×1000 · 大师徽章' },
    ],
    tips: [
      'Kimi 长文先吞仓，让它读完代码再动笔。',
      '风格样章钉死：先写一段范本，后续全部对齐。',
      '人机各写一半：模型出初稿，人类注入灵魂。',
      '文档也要过 review——错文档比没文档更害人。',
    ],
    recommend: [
      { name: '双模接力队', teamId: 'twin-swords' },
      { name: '性价比先锋', teamId: 'budget-vanguard' },
    ],
  },
];

export const trialMap: Record<string, Trial> = Object.fromEntries(
  trials.map((t) => [t.id, t]),
);

# content/ 数据 Schema

全站内容用 JSON 驱动，分四类：characters（角色=模型）、weapons（装备=harness）、teams（配队=场景方案）、tier-list（榜单）。

所有展示文案必须双语：`{ "zh": "...", "en": "..." }`。

## characters/<slug>.json

```json
{
  "slug": "claude-sonnet-4-5",
  "name": { "zh": "Claude Sonnet 4.5", "en": "Claude Sonnet 4.5" },
  "title": { "zh": "「妙算神机」", "en": "The Calculated Mind" },
  "series": "anthropic",
  "rarity": 5,
  "roles": ["coding", "agent", "writing"],
  "releaseDate": "2025-09-29",
  "contextWindow": 200000,
  "pricing": { "inputPer1M": 3.0, "outputPer1M": 15.0, "currency": "USD" },
  "benchmarks": [
    { "name": "SWE-bench Verified", "score": 77.2, "unit": "%" }
  ],
  "tagline": { "zh": "一句话定位", "en": "One-line positioning" },
  "lore": { "zh": "角色背景（2-3 句，游戏化口吻但信息真实）", "en": "..." },
  "skills": [
    { "name": { "zh": "技能名", "en": "..." }, "desc": { "zh": "能力特点", "en": "..." } }
  ],
  "constellations": [
    { "level": 1, "name": { "zh": "命座名", "en": "..." }, "desc": { "zh": "对应价格档/能力提升点", "en": "..." } }
  ],
  "bestWeapons": ["claude-code"],
  "bestTeams": ["frontend-dailies"],
  "weaknesses": { "zh": "短板/不适用场景", "en": "..." }
}
```

- `series` 枚举：`anthropic` | `openai` | `google` | `moonshot` | `deepseek` | `zhipu` | `alibaba` | `minimax` | `xai` | `meta` | `mistral`
- `rarity`：4 / 5 / 6（6 = 当期幻神，慎用）
- `roles` 枚举：`coding` | `agent` | `reasoning` | `writing` | `multimodal` | `long-context`

## weapons/<slug>.json

```json
{
  "slug": "claude-code",
  "name": { "zh": "Claude Code", "en": "Claude Code" },
  "type": "cli-agent",
  "rarity": 5,
  "vendor": "Anthropic",
  "tagline": { "zh": "...", "en": "..." },
  "desc": { "zh": "装备描述：核心能力与定位", "en": "..." },
  "passive": { "name": { "zh": "特效名", "en": "..." }, "desc": { "zh": "关键特性（hooks/subagents/MCP 等）", "en": "..." } },
  "stats": [
    { "name": { "zh": "基础攻击 = 裸能力强项", "en": "..." }, "value": "..." }
  ],
  "bestFor": ["claude-sonnet-4-5", "claude-opus-4-5"],
  "pricing": { "zh": "价格模式说明", "en": "..." }
}
```

- `type` 枚举：`cli-agent` | `ide` | `plugin` | `web-agent` | `framework`

## teams/<slug>.json

```json
{
  "slug": "frontend-dailies",
  "name": { "zh": "前端日常深渊", "en": "Frontend Dailies" },
  "scenario": { "zh": "场景描述", "en": "..." },
  "members": [
    {
      "position": "main-dps",
      "character": "claude-sonnet-4-5",
      "weapon": "claude-code",
      "note": { "zh": "定位说明", "en": "..." }
    }
  ],
  "rotation": { "zh": "打法循环：工作流步骤", "en": "..." },
  "budgetAlt": { "zh": "低配替代方案", "en": "..." },
  "tierRating": "S"
}
```

- `position` 枚举：`main-dps` | `sub-dps` | `support` | `healer`（审查/测试位）

## tier-list.json（单文件）

```json
{
  "updatedAt": "2026-01-31",
  "note": { "zh": "榜单说明", "en": "..." },
  "tiers": [
    {
      "tier": "S",
      "characters": ["claude-sonnet-4-5"],
      "comment": { "zh": "该档简评", "en": "..." }
    }
  ]
}
```

- 节奏榜页面当前按稀有度与最高面板分自动分桶（6 星 SS / 5 星 S / 4 星 A）；`tier-list.json` 为可选的人工榜单数据源，`characters` 引用角色 slug。

## 内容准则

- **事实必须真实**：版本号、benchmark 分数、价格、发布日期都要用 WebSearch 核实当前最新值，不确定就不写数字。写清数据截至时间。
- 梗文案服务于信息，不造谣。
- 每个文件写完后用 `python3 -c "import json; json.load(open('<path>'))"` 验证 JSON 合法。

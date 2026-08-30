import assert from 'node:assert/strict';
import test from 'node:test';
import { parseWikiBenchmark, parseWikiIndex, parseWikiModel } from '../src/data/wikiContract.ts';

const card = {
  id: 'gpt-5',
  name: 'GPT-5',
  title: '路由全能旗舰',
  system: 'gpt',
  tier: 'T0',
  stars: 6,
  contextTokens: 400000,
  contextLabel: '400k',
  priceIn: 0.625,
  priceOut: 5,
  priceLabel: '$0.625/$5',
  swe: 74.9,
  releaseDate: '2025-08-07',
  collectedDate: '08-09',
  tags: ['全能'],
  roles: ['代码'],
  composite: 95.2,
  verdict: '测试点评',
  stats: { code: 95, reasoning: 85, context: 85, speed: 62, multimodal: 90, value: 78 },
  hasDetail: true,
};

const detail = {
  modelId: 'gpt-5',
  profile: {},
  benchGroups: [],
  rivalIds: [],
  talents: [],
  constellation: [],
  bestInSlot: [],
  teamIds: [],
  trialGood: [],
  trialBad: [],
  guideIds: [],
};

test('parses a unique Wiki data index', () => {
  const parsed = parseWikiIndex({
    schemaVersion: 1,
    models: [{ id: 'gpt-5', title: '数据:模型:gpt-5' }],
    benchmarks: [{ id: 'aider-polyglot', title: '数据:测试集:aider-polyglot' }],
  });
  assert.equal(parsed.models[0]?.id, 'gpt-5');
});

test('rejects duplicate index ids', () => {
  assert.throws(() => parseWikiIndex({
    schemaVersion: 1,
    models: [
      { id: 'gpt-5', title: '数据:模型:gpt-5' },
      { id: 'gpt-5', title: '数据:模型:gpt-5-copy' },
    ],
    benchmarks: [{ id: 'aider-polyglot', title: '数据:测试集:aider-polyglot' }],
  }), /重复 id/);
});

test('rejects index titles that do not match their ids', () => {
  assert.throws(() => parseWikiIndex({
    schemaVersion: 1,
    models: [{ id: 'gpt-5', title: '数据:模型:gpt-5-copy' }],
    benchmarks: [{ id: 'aider-polyglot', title: '数据:测试集:aider-polyglot' }],
  }), /title 与 id 不一致/);
});

test('parses a model payload and enforces matching ids', () => {
  const payload = { schemaVersion: 1, kind: 'model', id: 'gpt-5', wikiTitle: '模型:GPT-5', card, detail };
  assert.equal(parseWikiModel(payload, 'gpt-5').card.name, 'GPT-5');
  assert.throws(() => parseWikiModel(payload, 'gpt-5-copy'), /id 不一致/);
});

test('parses a benchmark payload with its required reader fields', () => {
  const entry = {
    id: 'aider-polyglot',
    name: 'Aider Polyglot',
    aliases: [],
    category: 'coding',
    organizer: 'Aider',
    facts: [],
    frontier: { value: 88, note: '榜首' },
    history: [],
    traits: [],
    openSource: { status: 'open' },
    oneLiner: '一句话',
    what: '测什么',
    how: '怎么测',
    examples: '任务',
    reading: '读法',
    caveat: '局限',
  };
  const payload = {
    schemaVersion: 1,
    kind: 'benchmark',
    id: entry.id,
    wikiTitle: '测试集:Aider Polyglot',
    entry,
  };
  assert.equal(parseWikiBenchmark(payload, entry.id).entry.name, 'Aider Polyglot');
});

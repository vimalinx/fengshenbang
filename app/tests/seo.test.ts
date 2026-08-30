import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { comparisons } from '../src/data/comparisons.ts';
import { harnesses } from '../src/data/harnesses.ts';
import { buildJsonLd, buildSeoRoutes, resolveSeoPage, type SeoData } from '../src/lib/seoCatalog.ts';

const data: SeoData = {
  models: JSON.parse(readFileSync(new URL('../src/data/generated/models.json', import.meta.url), 'utf8')),
  benchmarks: JSON.parse(readFileSync(new URL('../src/data/generated/benchmarks.json', import.meta.url), 'utf8')),
  comparisons,
  harnesses,
};

test('publishes every detail page with one unique canonical route', () => {
  const routes = buildSeoRoutes(data);
  const expected = 11
    + data.models.filter((model) => model.hasDetail).length
    + data.benchmarks.length
    + data.comparisons.length;
  assert.equal(routes.length, expected);
  assert.equal(new Set(routes.map((route) => route.path)).size, routes.length);
});

test('creates entity-rich metadata for model, benchmark and comparison routes', () => {
  const model = data.models.find((item) => item.hasDetail);
  assert.ok(model);
  const modelPage = resolveSeoPage(`/models/${model.id}`, data);
  assert.match(modelPage.title, new RegExp(model.name));
  assert.ok(modelPage.entityNames?.includes(model.name));

  const benchmark = data.benchmarks[0];
  assert.ok(benchmark);
  const benchmarkPage = resolveSeoPage(`/benchmarks/${benchmark.id}`, data);
  assert.match(benchmarkPage.description, new RegExp(benchmark.name));

  const comparison = data.comparisons[0];
  assert.ok(comparison);
  const comparisonPage = resolveSeoPage(`/compare/${comparison.id}`, data);
  assert.equal(comparisonPage.kind, 'comparison');
  assert.equal(comparisonPage.entityNames?.length, 2);
});

test('emits Schema.org graphs and noindexes unknown routes', () => {
  const page = resolveSeoPage('/benchmarks/aider-polyglot', data);
  const jsonLd = buildJsonLd(page);
  assert.equal(jsonLd['@context'], 'https://schema.org');
  assert.ok(Array.isArray(jsonLd['@graph']));
  const missing = resolveSeoPage('/does-not-exist', data);
  assert.equal(missing.robots, 'noindex,follow');
});

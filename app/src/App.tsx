import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Models from './pages/Models';
import ModelDetail from './pages/ModelDetail';
import Harnesses from './pages/Harnesses';
import Benchmarks from './pages/Benchmarks';
import BenchmarkDetail from './pages/BenchmarkDetail';
import Teams from './pages/Teams';
import Scenarios from './pages/Scenarios';
import Guides from './pages/Guides';
import Tools from './pages/Tools';
import Changelog from './pages/Changelog';
import Compare from './pages/Compare';
import Methodology from './pages/Methodology';

/**
 * 嵌套路由模式（Layout 渲染 <Outlet/>，此处使用嵌套 <Route> —— 不可混用 children 模式）。
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="models" element={<Models />} />
        <Route path="models/:modelId" element={<ModelDetail />} />
        <Route path="harnesses" element={<Harnesses />} />
        <Route path="benchmarks" element={<Benchmarks />} />
        <Route path="benchmarks/:benchmarkId" element={<BenchmarkDetail />} />
        <Route path="teams" element={<Teams />} />
        <Route path="scenarios" element={<Scenarios />} />
        <Route path="guides" element={<Guides />} />
        <Route path="tools" element={<Tools />} />
        <Route path="changelog" element={<Changelog />} />
        <Route path="compare" element={<Compare />} />
        <Route path="compare/:pairId" element={<Compare />} />
        <Route path="methodology" element={<Methodology />} />
      </Route>
    </Routes>
  );
}

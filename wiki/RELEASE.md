# Wiki 发布资格与回滚流程

本流程只发布独立的 `wiki-staging.fengshenbang.wiki`，不会把 React 门户主域名切换到 MediaWiki。发布必须由不可变候选包驱动，并保留发布前数据备份、旧源码快照和机器可读回执。

## 发布门

| 层 | 阻塞检查 | 可复现入口 |
|---|---|---|
| 内容与源码 | 42 模型、74 测试集、42 编排，Python/Shell/PHP/Compose 校验 | `./scripts/qualify-release.sh` |
| 权限 | 匿名只读/注册、贡献者待审、审核员审批、编排员直发、管理员授权 | `scripts/verify-permissions.py` |
| 后端闭环 | 投稿不可提前公开、审批后精确公开、临时权限与沙盒自动清理 | `scripts/smoke-moderation.py` |
| 浏览器 | 桌面/移动渲染、UI 登录、源码编辑、审核列表、批准后公开 | `scripts/browser-e2e.sh newserver` |
| 数据恢复 | 校验和、完整数据库/上传/config 恢复、恢复后 live checks | `./scripts/qualify-release.sh --full-restore` |
| 线上运行 | 容器、API/扩展、权限、注册页、安全头、库存、磁盘、备份 | `make verify-live` |
| 发布失败 | 发布前备份 + 旧源码快照 + 自动恢复 + 恢复后 live checks | `release-ssh.sh --simulate-postcheck-failure` |

## 构建候选包

候选包只能从无 tracked/untracked Wiki 源码改动的提交构建：

```bash
cd wiki
./scripts/build-release.sh
```

输出为 `release-artifacts/fengshenbang-wiki-<commit>.tar.gz` 及 SHA-256 文件。包内含提交绑定的源码、166 个生成页面和 `release-manifest.json`，明确排除 `.env`、数据库、上传、备份与运行时配置。

## staging 发布

```bash
./scripts/release-ssh.sh \
  release-artifacts/fengshenbang-wiki-<commit>.tar.gz \
  newserver wiki-staging.fengshenbang.wiki \
  --fetch-backup
```

发布器按顺序执行：线上 preflight → 发布前备份 → 旧源码快照 → 候选包部署 → schema/bootstrap → live/权限/审批测试 → 回执。`--fetch-backup` 会把发布前备份拉回本机忽略目录并再次验证校验和。

若候选部署或发布后检查失败，远端 helper 会恢复发布前数据库/config 和旧源码，再重新构建并执行 `verify-live.sh`。演练入口：

```bash
./scripts/release-ssh.sh <bundle> newserver wiki-staging.fengshenbang.wiki \
  --simulate-postcheck-failure
```

这个命令应以非零退出，日志必须同时出现 `ROLLBACK PASS`；随后独立运行 `ssh newserver 'cd /opt/fengshenbang-wiki && make verify-live'`。

## 主域名切换边界

SMTP/邮箱确认、正式管理员与审核员、2FA、异机定时备份、反滥用/申诉规则和公开试运行未全部完成前，不把 `fengshenbang.wiki` 切到 MediaWiki。发布成功不等于满足主域名生产治理门槛。

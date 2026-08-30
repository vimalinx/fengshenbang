# 封神榜公共 Wiki 运行栈

这是 React 主站的数据处理与公众协作后端。公开 Wiki 位于 <https://wiki-staging.fengshenbang.wiki>；它不替换 `fengshenbang.wiki` 的展示层，主站通过匿名 Action API 读取这里已审核公开的结构化数据。

## 已实现的发布模型

| 角色 | MediaWiki 用户组 | 能力 |
|---|---|---|
| 公众读者 | `*` | 阅读、注册，不能匿名编辑 |
| 贡献者 | `user` | 提交编辑；批准前不改变公开页面 |
| 审核员 | `moderator` | 在 `Special:Moderation` 批准或拒绝 |
| 编排员 | `curator` | 维护 `编排:` 主观评分并直接发布 |
| 管理员 | `sysop` | 用户组、站务、系统管理 |

模型、测试集、`数据:` JSON 和普通正文使用 [Moderation](https://www.mediawiki.org/wiki/Extension:Moderation) 做发布前审核。站务规则页可另外使用 [Approved Revs](https://www.mediawiki.org/wiki/Extension:Approved_Revs) 标记正式版本；内容页不叠加第二道批准状态。

基础镜像来自 [Canasta](https://github.com/CanastaWiki/Canasta)，并固定到镜像 digest；VisualEditor、Page Forms、Semantic MediaWiki、AbuseFilter、ConfirmEdit 等使用 Canasta 的固定扩展集合。Moderation 以固定 commit 构建进本站镜像。

## 本地启动

```bash
cd wiki
make start
make status
make smoke
```

`make init` 会生成权限为 `0600` 的 `.env`，其中包含随机数据库、管理员和 CAPTCHA 凭据；脚本不会覆盖已有 `.env`。管理员密码只保存在这个未跟踪文件里。

默认入口是 <http://localhost:18088>。初次 bootstrap 会：

1. 安装 MediaWiki 数据库和扩展 schema；
2. 导入 42 个模型、74 个测试集、42 份主观编排、模板/表单，以及 `数据:索引` 和 116 个逐条 JSON 数据页；
3. 保留已经存在的 Wiki 页面，不用仓库内容覆盖社区修改；
4. 重建站点统计和 Semantic MediaWiki 数据。

## 验收

`make smoke` 不是静态配置检查。它会让一次性贡献者通过公开注册 API 和 CAPTCHA 自助开户，通过真实 HTTP API 提交编辑，验证匿名读者看不到待审内容，再由一次性审核员调用 Moderation 审批，最后验证同一内容已公开；结束时会撤销临时审核员权限并删除沙盒页。`make smoke-data` 对 React 实际消费的 `数据:` 命名空间执行同一闭环，并额外验证批准后的内容模型仍是 JSON。公开注册受每 IP 每日限流约束，不应把这些测试当成可无限重复的探活请求；限流后可加 `--provision-contributor` 重测审批链路，但它不替代公开注册验收。

静态和构建检查：

```bash
make seed
make validate
php -l config/settings/global/10-Fengshenbang.php
```

已部署主机可在 Wiki 目录运行 `make verify-live`，核对服务、公开 API/注册页、扩展集合、42/74/42 内容库存、`数据:` JSON 合同、匿名跨域和最近备份校验和。它不创建用户或修改页面，可用于日常探活。

## 备份与恢复

```bash
make backup
./scripts/restore.sh --from backups/<timestamp> --check
./scripts/restore.sh --from backups/<timestamp> --confirm
```

备份包含一致性数据库 dump、上传文件、公共资源和非秘密配置，并生成 SHA-256 清单。恢复只接受 `wiki/backups/` 下的完整备份；执行前自动保存当前数据库和文件到 `pre-restore-*`，因此文件侧可回滚。

## 面向公众协作的硬门槛

- 配置并实测 SMTP，再把 `WIKI_REQUIRE_EMAIL_CONFIRMATION=true`；
- 更换 CAPTCHA 为 Turnstile/hCaptcha 或定期轮换 Questy 问答；
- 接入对象存储或异机备份，并做一次从空机恢复演练；
- 为审核员启用 2FA，至少两名管理员，建立反滥用与申诉规则；
- 先完成一周公开试运行，再逐步扩大公众编辑范围。

React 构建和 Wiki 运维仍是两个可独立回滚的发布单元。Wiki 故障时主站会使用构建快照；Wiki 发布不会覆盖已有社区修订，因为 bootstrap 只创建缺失的数据页。

若目标主机已有 Nginx，把 `WIKI_BIND_IP=127.0.0.1`、`WIKI_HTTP_PORT=18088`、`WIKI_CADDY_ADDRESS=:80` 保持不变，由 Nginx 的独立 vhost 把 staging 域名反代到 `127.0.0.1:18088`；不要抢占现有 80/443。若主机专供此 Wiki，才把 bind 地址和端口改为 `0.0.0.0`、`80/443`，并把 `WIKI_CADDY_ADDRESS` 设为域名让 Caddy 直接签发证书。

已有 Docker 的 SSH 主机可用 `./scripts/deploy-ssh.sh <host> <domain>` 同步非秘密文件、在远端生成独立凭据并启动。Nginx 样例位于 `deploy/nginx-wiki-staging.conf`；证书、DNS 和 SMTP 仍要按目标环境单独验收。

## 面向公众的运行门禁

公开注册要求真实邮箱确认；`make email-e2e` 会在浏览器注册、从 Migadu 实际收件、打开确认链接，并证明确认前不能编辑、确认后只能进入审核队列。管理员、恢复管理员和审核员使用 OATHAuth TOTP，初始化入口是 `make setup-2fa`，凭据与恢复码只进入本机 GNOME Keyring。

`make setup-abuse-filter` 由已启用 2FA 的管理员导入保守规则，并验证新用户一次加入至少四个外链会被阻止。社区规则、反滥用、申诉、隐私和公开试运行页面由种子内容初始化，已有社区修改不会被覆盖。

异地备份每天同步到独立磁盘 `/home/vimalinx/storage/Backups/fengshenbang-wiki`。安装并启用 `deploy/systemd/user/fengshenbang-wiki-offsite-backup.timer` 与 `fengshenbang-wiki-public-trial.timer` 后，分别用 `make verify-offsite` 和 `make trial-observe` 核对。

`make verify-production` 是扩大公众协作范围的最终门禁：线上检查、邮箱、三类 2FA 运维账号、反滥用规则、异地备份和至少七天公开试运行必须全部通过。脚本只验收，不会替换 `fengshenbang.wiki` 的 React 门户。

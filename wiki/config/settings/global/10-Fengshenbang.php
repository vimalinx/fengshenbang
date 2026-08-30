<?php

// Public identity and language.
$wgLanguageCode = 'zh-hans';
$wgLocaltimezone = 'Asia/Shanghai';
$wgDefaultSkin = 'vector-2022';
$wgLogos = [
    '1x' => 'https://fengshenbang.wiki/logo.svg',
    'icon' => 'https://fengshenbang.wiki/logo.svg',
];
$wgEnableUploads = true;
$wgEnableEmail = true;
$wgEnableUserEmail = false;
$wgEmailAuthentication = true;
$wgEmergencyContact = getenv( 'WIKI_NOTIFICATION_EMAIL' ) ?: 'noreply@fengshenbang.wiki';
$wgPasswordSender = $wgEmergencyContact;
$wgPasswordResetRoutes = [ 'username' => false, 'email' => true ];

// Purpose-specific namespaces keep facts, editorial curation and forms distinct.
define( 'NS_MODEL', 3000 );
define( 'NS_MODEL_TALK', 3001 );
define( 'NS_BENCHMARK', 3002 );
define( 'NS_BENCHMARK_TALK', 3003 );
define( 'NS_CURATION', 3004 );
define( 'NS_CURATION_TALK', 3005 );
define( 'NS_DATA', 3006 );
define( 'NS_DATA_TALK', 3007 );
$wgExtraNamespaces[NS_MODEL] = '模型';
$wgExtraNamespaces[NS_MODEL_TALK] = '模型讨论';
$wgExtraNamespaces[NS_BENCHMARK] = '测试集';
$wgExtraNamespaces[NS_BENCHMARK_TALK] = '测试集讨论';
$wgExtraNamespaces[NS_CURATION] = '编排';
$wgExtraNamespaces[NS_CURATION_TALK] = '编排讨论';
$wgExtraNamespaces[NS_DATA] = '数据';
$wgExtraNamespaces[NS_DATA_TALK] = '数据讨论';
$wgNamespaceContentModels[NS_DATA] = CONTENT_MODEL_JSON;
$wgContentNamespaces = [ NS_MAIN, NS_MODEL, NS_BENCHMARK, NS_DATA ];
$smwgNamespacesWithSemanticLinks[NS_MODEL] = true;
$smwgNamespacesWithSemanticLinks[NS_BENCHMARK] = true;
$smwgNamespacesWithSemanticLinks[NS_CURATION] = true;

// Anyone may read and register. Editing requires an account; every normal
// registered user's changes are intercepted by Moderation before publication.
$wgGroupPermissions['*']['read'] = true;
$wgGroupPermissions['*']['createaccount'] = true;
$wgGroupPermissions['*']['edit'] = false;
$wgGroupPermissions['user']['read'] = true;
$wgGroupPermissions['user']['edit'] = true;
$wgGroupPermissions['user']['createpage'] = true;
$wgGroupPermissions['user']['createtalk'] = true;
$wgGroupPermissions['user']['move'] = false;
$wgGroupPermissions['user']['upload'] = false;

// reviewer = Moderation's built-in moderator group.
$wgGroupPermissions['moderator']['moderation'] = true;

// Release acceptance uses a non-assignable, short-lived reviewer group so
// production moderators can require 2FA without disabling automated release
// qualification. Only maintenance scripts can add this group and every test
// revokes it during cleanup.
$wgGroupPermissions['acceptance-reviewer']['moderation'] = true;

// curator = trusted editorial group. It can publish without the queue and is
// the only non-admin group allowed to edit the subjective curation namespace.
$wgAvailableRights[] = 'edit-curation';
$wgGroupPermissions['curator']['edit-curation'] = true;
$wgGroupPermissions['curator']['skip-moderation'] = true;
$wgGroupPermissions['curator']['skip-move-moderation'] = true;
$wgNamespaceProtection[NS_CURATION] = [ 'edit-curation' ];

// Administrators can grant and revoke the operational groups.
$wgAddGroups['sysop'] = array_values( array_unique( array_merge(
    $wgAddGroups['sysop'] ?? [],
    [ 'moderator', 'curator', 'automoderated' ]
) ) );
$wgRemoveGroups['sysop'] = array_values( array_unique( array_merge(
    $wgRemoveGroups['sysop'] ?? [],
    [ 'moderator', 'curator', 'automoderated' ]
) ) );

// Moderation is the publication gate for model, benchmark and normal pages.
$wgModerationEnable = true;
$wgModerationOnlyInNamespaces = [
    NS_MAIN, NS_MODEL, NS_BENCHMARK, NS_DATA,
    NS_TALK, NS_MODEL_TALK, NS_BENCHMARK_TALK, NS_DATA_TALK, NS_FILE,
];
$wgModerationEnableEditChange = false;
$wgModerationUseAjax = false;
$wgModerationNotificationEnable = (bool)getenv( 'WIKI_NOTIFICATION_EMAIL' );
$wgModerationEmail = getenv( 'WIKI_NOTIFICATION_EMAIL' ) ?: '';

// ApprovedRevs is intentionally limited to policy/project pages. Content pages
// already have the stronger pre-publication Moderation gate; double approval
// there would create two contradictory states.
$approvedRevsEnabled = filter_var(
    getenv( 'WIKI_ENABLE_APPROVED_REVS' ) ?: 'true',
    FILTER_VALIDATE_BOOLEAN
);
$wgApprovedRevsEnabledNamespaces = $approvedRevsEnabled ? [ NS_PROJECT => true ] : [];
$wgApprovedRevsAutomaticApprovals = true;
$wgApprovedRevsShowNotApprovedMessage = true;
$wgGroupPermissions['moderator']['approverevisions'] = true;

// Production operators lose their privileged groups until they enroll TOTP.
// Enable this only after the initial administrators have completed enrollment.
$requireTwoFactor = filter_var(
    getenv( 'WIKI_REQUIRE_2FA' ) ?: 'false',
    FILTER_VALIDATE_BOOLEAN
);
$wgOATHAuthAccountPrefix = $wgSitename;
$wgOATHAuthWindowRadius = 1;
$wgOATHRequiredForGroups = $requireTwoFactor ? [ 'sysop', 'moderator', 'curator' ] : [];
$wgOATHExclusiveRights = $requireTwoFactor ? [
    'userrights', 'delete', 'protect', 'block', 'moderation', 'approverevisions'
] : [];

// Registration and link-spam defense. QuestyCaptcha's answer stays in .env.
$captchaQuestion = getenv( 'WIKI_CAPTCHA_QUESTION' );
$captchaAnswer = getenv( 'WIKI_CAPTCHA_ANSWER' );
if ( $captchaQuestion && $captchaAnswer ) {
    $wgCaptchaClass = 'QuestyCaptcha';
    $wgCaptchaQuestions = [ $captchaQuestion => $captchaAnswer ];
}
$wgCaptchaTriggers['createaccount'] = true;
$wgCaptchaTriggers['badlogin'] = true;
$wgCaptchaTriggers['addurl'] = true;
$wgEmailConfirmToEdit = filter_var(
    getenv( 'WIKI_REQUIRE_EMAIL_CONFIRMATION' ) ?: 'false',
    FILTER_VALIDATE_BOOLEAN
);
$wgRateLimits['createaccount']['ip'] = [ 3, 86400 ];
$wgRateLimits['edit']['user'] = [ 30, 60 ];
$wgRateLimits['mailpassword']['ip'] = [ 5, 3600 ];
$wgRateLimits['sendemail']['user'] = [ 5, 86400 ];

// Optional SMTP. Internet registration must not be opened with email
// confirmation enabled until these values have been tested end-to-end.
if ( getenv( 'WIKI_SMTP_HOST' ) ) {
    $smtpEncryption = strtolower( getenv( 'WIKI_SMTP_ENCRYPTION' ) ?: 'tls' );
    $smtpHost = getenv( 'WIKI_SMTP_HOST' );
    if ( $smtpEncryption === 'ssl' ) {
        $smtpHost = 'ssl://' . $smtpHost;
    }
    $wgSMTP = [
        'host' => $smtpHost,
        'IDHost' => parse_url( $wgServer, PHP_URL_HOST ) ?: 'fengshenbang.wiki',
        'port' => (int)( getenv( 'WIKI_SMTP_PORT' ) ?: 587 ),
        'auth' => (bool)getenv( 'WIKI_SMTP_USER' ),
        'username' => getenv( 'WIKI_SMTP_USER' ) ?: '',
        'password' => getenv( 'WIKI_SMTP_PASSWORD' ) ?: '',
        'starttls' => $smtpEncryption === 'tls',
        'timeout' => 20,
    ];
}

// Keep API/editor behavior useful for VisualEditor and Page Forms.
$wgVisualEditorEnableWikitext = true;
$wgDefaultUserOptions['visualeditor-editor'] = 'visualeditor';
$wgPageFormsLinkAllRedLinksToForms = true;
$wgEnableRestAPI = true;

// Keep the public Wiki and its editing/review workflow visually continuous
// with the React portal. The stylesheet lives beside this configuration so it
// is included in every immutable release instead of patching Vector in-place.
$wgResourceModules['site.fengshenbang'] = [
    'styles' => [ 'fengshenbang-theme.css' ],
    'localBasePath' => __DIR__,
];
$wgHooks['BeforePageDisplay'][] = static function ( $out, $skin ): void {
    $out->addModuleStyles( [ 'site.fengshenbang' ] );
    $out->addHeadItem(
        'fengshenbang-fonts',
        '<link rel="preconnect" href="https://fonts.googleapis.com">' .
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' .
        '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@500;700&amp;family=Noto+Sans+SC:wght@400;500;600;700&amp;display=swap" rel="stylesheet">'
    );
    $out->addHeadItem( 'fengshenbang-theme-color', '<meta name="theme-color" content="#FAFAFA">' );
};

// Build the collaboration/navigation bridge in configuration as well as the
// seeded MediaWiki message. This remains reliable when an older sidebar value
// is still present in MediaWiki's aggressively cached message store.
$wgCacheEpoch = '20260830110000';
$wgSidebarCacheExpiry = 3600;
$wgHooks['SkinBuildSidebar'][] = static function ( $skin, &$bar ): void {
    $local = static function ( string $title ): string {
        $page = Title::newFromText( $title );
        return $page ? $page->getLocalURL() : '/wiki/' . rawurlencode( $title );
    };
    $bar['navigation'] = [
        [ 'text' => '协作首页', 'href' => $local( '首页' ), 'id' => 'n-fsb-home' ],
        [ 'text' => '模型知识库', 'href' => $local( '模型:模型索引' ), 'id' => 'n-fsb-models' ],
        [ 'text' => '测试集知识库', 'href' => $local( '测试集:测试集索引' ), 'id' => 'n-fsb-benchmarks' ],
        [ 'text' => '参与编辑', 'href' => $local( '封神榜 Wiki:参与编辑' ), 'id' => 'n-fsb-contribute' ],
        [ 'text' => '审核队列', 'href' => $local( 'Special:Moderation' ), 'id' => 'n-fsb-moderation' ],
    ];
    $bar['封神榜主站'] = [
        [ 'text' => '返回主站', 'href' => 'https://fengshenbang.wiki', 'id' => 'n-fsb-portal' ],
        [ 'text' => '主站模型榜', 'href' => 'https://fengshenbang.wiki/models', 'id' => 'n-fsb-portal-models' ],
        [ 'text' => '主站测试集', 'href' => 'https://fengshenbang.wiki/benchmarks', 'id' => 'n-fsb-portal-benchmarks' ],
    ];
};

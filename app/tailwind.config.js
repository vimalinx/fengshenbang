/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        /* 封神榜 v2 design tokens（现代科技极简） */
        bg: "#FAFAFA",
        "bg-alt": "#F4F4F5",
        line: "#E4E4E7",
        "line-strong": "#D4D4D8",
        ink: "#09090B",
        "ink-2": "#52525B",
        "ink-3": "#A1A1AA",
        accent: {
          DEFAULT: "#B8860B",
          soft: "#F5F0E6",
          deep: "#8F6A08",
        },
        /* 梯队色：纯黑 / 灰 / 浅灰（描边款由组件控制） */
        t0: "#09090B",
        t1: "#52525B",
        t2: "#A1A1AA",
        /* 体系色：去饱和 40%，仅作 8px 圆点 / 2px 边条 */
        sys: {
          gpt: "#417878",
          claude: "#A56F4A",
          gemini: "#5E74BD",
          deepseek: "#434E6F",
          qwen: "#7A5E8F",
          kimi: "#978761",
          llama: "#5D8C71",
          mistral: "#626B75",
          glm: "#4B6E5D",
          xai: "#99574A",
        },
        /* 封神榜 v1 东方幻想色板（角色卡/详情页/场景页使用） */
        gold: {
          DEFAULT: "#B8860B",
          soft: "#F5F0E6",
        },
        cinnabar: {
          DEFAULT: "#C03A28",
          deep: "#A32F20",
        },
        paper: {
          DEFAULT: "#FBF8F1",
          alt: "#F3EEE2",
        },
        daiqing: "#B8860B",
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        brand: ['"Noto Serif SC"', '"Songti SC"', 'serif'],
      },
      boxShadow: {
        card: "none",
        "card-hover": "none",
        overlay: "0 8px 30px rgba(0,0,0,.08)",
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "gold-shine": {
          "0%": { backgroundPosition: "200% 50%" },
          "100%": { backgroundPosition: "-200% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "gold-shine": "gold-shine 6s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "YagoutPay Payment Integration Docs",
  tagline: "Comprehensive guide for Stages 1–3",
  url: "https://liladet.github.io",
  baseUrl: "/yagoutpay-docs/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "Liladet",
  projectName: "yagoutpay-docs",

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateTime: true,
          breadcrumbs: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: "YagoutPay Docs",
      logo: {
        alt: "YagoutPay Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docs", // ✅ CHANGE THIS to match your sidebar ID
          label: "Docs",
          position: "left",
        },
        {
          href: "https://github.com/Liladet/yagoutpay-docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Introduction",
              to: "/docs/intro",
            },
            {
              label: "Stage 1: Hosted Checkout",
              to: "/docs/stage1/setup",
            },
            {
              label: "Stage 2: Direct API",
              to: "/docs/stage2/python",
            },
            {
              label: "Stage 3: Payments",
              to: "/docs/stage3/setup",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Security",
              to: "/docs/general/security",
            },
            {
              label: "Testing",
              to: "/docs/general/testing",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/Liladet/yagoutpay-docs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Lidiya Alemayehu.`,
    },
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
      disableSwitch: true, // This removes the toggle button
      respectPrefersColorScheme: false,
    },
  },
  stylesheets: [
    {
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    },
    {
      href: "/css/docs.css",
    },
  ],

  scripts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
      async: true,
    },
  ],

  plugins: [require.resolve("./plugins/webpack-yaml")],
  url: "https://yagoutpay.netlify.app",
  baseUrl: "/",

  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      },
    },
  ],
};

module.exports = config;

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://www.terra-dev.me/",
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,
  generateRobotsTxt: true,
  exclude: [],
  pagesDirectory: path.join(__dirname, "out"), // export된 파일들이 저장될 디렉토리
  targetDirectory: "out",
};

export default config;

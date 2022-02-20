module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  productionBrowserSourceMaps: true,
  webpack: (config, _options) => {
    config.module.rules.push({
      test: /\.cdc/,
      type: "asset/source",
    })
    return config
  },
}

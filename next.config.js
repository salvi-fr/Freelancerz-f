module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  env: {
    customKey: 'my-value',
  },
  images: {
    domains: ['via.placeholder.com',"**.**.**","cdn.pixabay.com","firebasestorage.googleapis.com"],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true,
  },
};

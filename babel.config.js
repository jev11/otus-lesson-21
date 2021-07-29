module.exports = {
  presets: [
    ["@babel/preset-env", { "targets": { "ie": "11" } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ["@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
};

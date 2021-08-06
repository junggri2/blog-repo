module.exports = {
   presets: [
      "next/babel",
      ["@babel/preset-env", {targets: {node: "current"}}],
      "@babel/preset-typescript",
      "@babel/preset-react",
   ],
   plugins: [
      ["styled-components", {
         "ssr": false,
         "displayName": true,
         "preprocess": false,
      }],
      [
         "module-resolver",
         {
            "root": [
               "./",
            ],
            "alias": {
               "@components": "./components",
               "@styles": "./styles",
               "@lib": "./lib",
               "@config": "./config",
               "@hooks": "./hooks",
               "@state": "./state",
               "@interface": "./interface",
               "@canvas": "./canvas",
               "@query": "./query",
               "@exception": "./exception"
            },
         },
      ],
   ],

};
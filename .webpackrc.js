export default {
  "proxy": {
    "/api": {
      "target": "http://api.fh.shoogoome.com",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
}

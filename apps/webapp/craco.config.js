const cracoBabelLoader = require('craco-babel-loader')
const CracoLessPlugin  = require('craco-less')

const fs   = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp   = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = {
  plugins: [
    {
      plugin: cracoBabelLoader,
      options: {
        includes: [resolveApp('../common')]
      }
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1DA57A',
              '@border-radius-base': '6px',
              '@font-family': "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
              '@font-size-base': '13px',
              '@font-size-sm': '11px',
              '@btn-text-hover-bg': 'rgba(0, 0, 0, 0.09)',
              '@text-color-secondary': 'fade(#000, 60%)'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  typescript: {
    enableTypeChecking: false
  }
}

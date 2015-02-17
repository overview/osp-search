

module.exports = {

  dev: {

    options: {
      ignore: ['public'],
      env: {
        NODE_ENV: 'development',
        DEBUG: 'osp'
      }
    },

    script: 'index.js'

  }

};



module.exports = {

  options: {
    transform: ['coffeeify', 'jadeify'],
    watch: true,
    browserifyOptions: {
      debug: true
    }
  },

  dist: {
    src: '<%= src %>/javascripts/index.js',
    dest: '<%= dest %>/script.js'
  }

};

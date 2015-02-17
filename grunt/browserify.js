

module.exports = {

  options: {
    transform: [
      'coffeeify',
      'jadeify',
      'reactify'
    ],
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

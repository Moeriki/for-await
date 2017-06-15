module.exports = {
  root: true,
  extends: [
    'muriki',
    'muriki/env/common-js',
    'muriki/es/2015',
  ],
  rules: {
    'id-length': [1, {
      exceptions: ['of'],
    }]
  },
};

module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'value-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'property-no-unknown': true,
    'selector-type-no-unknown': true,
    'selector-max-type': 0,
    'value-list-comma-newline-after': 'never-multi-line',
  },
};

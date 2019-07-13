'use strict';

var camelCase = require('camel-case');
var quote = require('quote')({quotes: '\''});
var jsStringEscape = require('js-string-escape');
var _ = require('lodash');

function cssLine2ReactJsInlineStyle(line) {
    var parts = line.split(': ');
    var key = camelCase(parts[0]);
    var value = parts[1];
    if (value === '@light') {
        value = 'weight.light';
    } else if (value === '@regular') {
        value = 'weight.regular';
    } else if (value === '@medium') {
        value = 'weight.medium';
    } else if (isNaN(Number(value))) {
        value = quote(jsStringEscape(value));
    }
    return key + ': ' + value;
}

function splitBySemicolon(line) {
    return line.split(';')
}

function trim(expression) {
    return expression.trim()
}

function css2ReactJsInlineStyle(css) {
    return _.chain(css.split('\n'))
        .map(splitBySemicolon)
        .flattenDeep()
        .map(trim)
        .compact()
        .map(cssLine2ReactJsInlineStyle)
        .value()
        .join(',\n');
}

module.exports = css2ReactJsInlineStyle;
const upstream = require('@expo/metro-config/babel-transformer');

const STYLE_BLOCK = /<style[^>]*>([\s\S]*?)<\/style>/gi;
const CLASS_RULE = /\.([\w-]+)\s*\{([^}]*)\}/g;
const CLASS_ATTR = /\sclass\s*=\s*["']([^"']+)["']/g;
const TRAILING_SEMICOLON = /;?\s*$/;

function inlineClassStyles(svg) {
  const rules = new Map();
  for (const [, css] of svg.matchAll(STYLE_BLOCK)) {
    for (const [, name, body] of css.matchAll(CLASS_RULE)) {
      rules.set(name, `${rules.get(name) ?? ''}${body.trim().replace(TRAILING_SEMICOLON, ';')}`);
    }
  }
  if (rules.size === 0) return svg;
  return svg.replace(STYLE_BLOCK, '').replace(CLASS_ATTR, (_, names) => {
    const style = names
      .split(/\s+/)
      .map((name) => rules.get(name) ?? '')
      .join('');
    return style ? ` style="${style}"` : '';
  });
}

module.exports.transform = (props) => {
  if (!props.filename.endsWith('.svg')) return upstream.transform(props);
  const src = `module.exports = ${JSON.stringify(inlineClassStyles(props.src))};`;
  return upstream.transform({ ...props, src });
};

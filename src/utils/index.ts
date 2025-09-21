import * as parser from '@babel/parser';
import traverse from '@babel/traverse';

// 敏感全局对象
const dangerousGlobals = [
  'window',
  'document',
  'eval',
  'Function',
  'XMLHttpRequest',
  'fetch',
  'localStorage',
  'sessionStorage',
  'indexedDB',
  'navigator',
  'location',
  'history',
  'console',
];
// 敏感危险方法
const dangerousFunctions = ['eval', 'Function'];
// 危险属性 —— 防止 xss 攻击
const dangerousPatterns = [
  /dangerouslySetInnerHTML/g,
  /\.innerHTML\s*=/g,
  /\.outerHTML\s*=/g,
  /__html\s*:/g,
];

export function codeReview(code) {
  let hasSecurityIssues = false;
  const securityErrors = [];

  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  traverse(ast, {
    Identifier(path) {
      const nodeName = path.node.name;
      if (dangerousGlobals.includes(nodeName)) {
        hasSecurityIssues = true;
        securityErrors.push(
          `禁止访问全局对象: ${nodeName} (行 ${path.node.loc?.start.line})`,
        );
      }
    },
    CallExpression(path) {
      if (path.node.callee.type === 'Identifier') {
        const calleeName = path.node.callee.name;
        if (dangerousFunctions.includes(calleeName)) {
          hasSecurityIssues = true;
          securityErrors.push(
            `禁止调用危险函数: ${calleeName} (行 ${path.node.loc?.start.line})`,
          );
        }
      }
    },
  });

  dangerousPatterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(code)) !== null) {
      const lineNumber = code.substring(0, match.index).split('\n').length;
      securityErrors.push(
        `第 ${lineNumber} 行: 检测到潜在危险模式 "${pattern.toString()}"`,
      );
    }
  });

  if (hasSecurityIssues) {
    return securityErrors;
  }
  return [];
}

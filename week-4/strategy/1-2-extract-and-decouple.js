'use strict';

const selectStrategy = (strategy, name = 'abstract') => {
  if (Object.hasOwn(strategy, name)) {
    return strategy[name];
  }

  throw new Error('Abstract method does not implemented');
};

const abstractRenderer = () => {
  return 'Not implemented';
};

const consoleRenderer = (data) => {
  const keys = Object.keys(data[0]);

  const columnWidths = {};

  keys.forEach((key) => {
    columnWidths[key] = key.length;

    data.forEach((row) => {
      const cellValue = String(row[key] || '');
      if (cellValue.length > columnWidths[key]) {
        columnWidths[key] = cellValue.length;
      }
    });
  });

  const header = keys.map((key) => key.padEnd(columnWidths[key])).join(' | ');
  const separator = keys
    .map((key) => '-'.repeat(columnWidths[key]))
    .join('-+-');
  const rows = data.map((row) =>
    keys
      .map((key) => String(row[key] || '').padEnd(columnWidths[key]))
      .join(' | '),
  );

  return [header, separator, ...rows].join('\n');
};

const webRenderer = (data) => {
  const keys = Object.keys(data[0]);
  const line = (row) =>
    '<tr>' + keys.map((key) => `<td>${row[key]}</td>`).join('') + '</tr>';
  const output = [
    '<table><tr>',
    keys.map((key) => `<th>${key}</th>`).join(''),
    '</tr>',
    data.map(line).join(''),
    '</table>',
  ];
  return output.join('');
};

const markdownRenderer = (data) => {
  const keys = Object.keys(data[0]);
  const line = (row) =>
    '|' + keys.map((key) => `${row[key]}`).join('|') + '|\n';
  const output = [
    '|',
    keys.map((key) => `${key}`).join('|'),
    '|\n',
    '|',
    keys.map(() => '---').join('|'),
    '|\n',
    data.map(line).join(''),
  ];
  return output.join('');
};

const RENDERERS = {
  abstract: abstractRenderer,
  console: consoleRenderer,
  web: webRenderer,
  markdown: markdownRenderer,
};

const getRendererStrategy = (strategyName) => {
  const renderer = selectStrategy(RENDERERS, strategyName);
  return (data) => renderer(data);
};

// Usage

const png = getRendererStrategy();
const con = getRendererStrategy('console');
const web = getRendererStrategy('web');
const mkd = getRendererStrategy('markdown');

const persons = [
  { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
  { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
  { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
  { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
  { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 },
];

console.group('Unknown Strategy:');
console.log(png(persons));
console.groupEnd();

console.group('\nConsoleRenderer:');
console.table(con(persons));
console.groupEnd();

console.group('\nWebRenderer:');
console.log(web(persons));
console.groupEnd();

console.group('\nMarkdownRenderer:');
console.log(mkd(persons));
console.groupEnd();

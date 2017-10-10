// Relevant ISO: ISO 639-1 & ISO 639-2
// Google uses the ISO 639-1, so let's follow that

// Reference:
// https://www.loc.gov/standards/iso639-2/php/code_list.php

// Valid ISO 639-1 codes
// Extract these with this code (after loading https://superdom.site/ )
// [...dom.table[1].querySelectorAll('tbody tr')].slice(1).filter(row => !/^\s*$/.test(row.querySelector('td:nth-child(2)').textContent)).map((row, i) => `"${row.querySelector('td:nth-child(2)').textContent}", ${i % 12 === 11 ? '\n' : ''}`).join('');
import iso from './iso';

// Parsed from here: https://github.com/wooorm/iso-639-2/blob/master/index.json
import iso2 from './iso2';

// Extract these with this code (after loading https://superdom.site/ )
// [...dom.table[1].querySelectorAll('tbody tr')].slice(1).filter(row => !/^\s*$/.test(row.querySelector('td:nth-child(2)').textContent)).map(row => `  "${row.querySelector('td:nth-child(3)').textContent.toLowerCase()}": "${row.querySelector('td:nth-child(2)').textContent.toLowerCase()}",
//   "${row.querySelector('td:nth-child(4)').textContent.toLowerCase()}": "${row.querySelector('td:nth-child(2)').textContent.toLowerCase()}",
//   "${row.querySelector('td:nth-child(5)').textContent.toLowerCase()}": "${row.querySelector('td:nth-child(2)').textContent.toLowerCase()}",`).join('\n');
import map from './map';

export { iso, iso2, map };

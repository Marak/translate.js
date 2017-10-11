// Relevant ISO: ISO 639-1 & ISO 639-2. Google uses the ISO 639-1.
// Valid ISO 639-1 codes
// https://www.loc.gov/standards/iso639-2/php/code_list.php
// Extract these with this code (after loading https://superdom.site/ )
// [...dom.table[1].querySelectorAll('tbody tr')].slice(1).filter(row => !/^\s*$/.test(row.querySelector('td:nth-child(2)').textContent)).map((row, i) => `"${row.querySelector('td:nth-child(2)').textContent}", ${i % 12 === 11 ? '\n' : ''}`).join('');
import iso from '../data/iso';

// Parsed from here: https://github.com/wooorm/iso-639-2/blob/master/index.json
import iso2 from '../data/iso2';

// Extract these with this code (after loading https://superdom.site/ ) + a lot of manual clean up
// [...dom.table[1].querySelectorAll('tbody tr')].slice(1).filter(row => !/^\s*$/.test(row.querySelector('td:nth-child(2)').textContent)).map(row =>
//   `  "${row.querySelector('td:nth-child(3)').textContent.toLowerCase()}": "${row.querySelector('td:nth-child(2)').textContent.toLowerCase()}",`
// ).join('\n');
import map from '../data/map';

// Language parser
//   @name: a string to be parsed
//   @output: the normalized language string
export default name => {

  // Validate the name string
  if (typeof name !== 'string') {
    throw new Error(`The language must be a string, received ${typeof name}`);
  }
  // Possible overflow errors
  if (name.length > 100) {
    throw new Error(`The language must be a string under 100 characters, received ${name.length}`);
  }

  // Let's work with lowercase for everything
  name = name.toLowerCase();

  // Pass it through several possible maps to try to find the right one
  name = map[name] || iso2[name] || name;

  // Make sure we have the correct name or throw
  if (!iso.includes(name)) {
    throw new Error(`The name "${name}" is not part of the ISO 639-1 and we couldn't automatically parse it :(`);
  }
  return name;
};

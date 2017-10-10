// Language parser
//   @language: a string to be parsed
//   @output: the normalized language string

import { iso, map, iso2 } from './languages';


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

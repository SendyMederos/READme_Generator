// function to generate markdown for README
//const index = require 
function generateMarkdown(data) {
  return ` 
  
# ${data.title} ${data.license[0]}
## Description: 
> ${data.description}
<hr>

## Table of Contents:

* ### [ Installation](#installation)
* ### [ Usage](#usage)
* ### [ License](#license)
* ### [ Contributing](#contributing)
* ### [ Tests](#tests)
* ### [ Questions](#questions)
<hr>

## Installation: 
> ${data.installation}

## Usage:
> ${data.usage}

## License: ${data.license[1]} ${data.license[0]} 
> ${data.license[2]}

## Contributing:
> ${data.contributing}

## Tests:
> ${data.tests}

## Questions:

  ### **For more questions about this aplication please contact me at:** 

  ${data.email}
  ${data.linkedin}
  ${data.github}


`

}

module.exports = generateMarkdown;

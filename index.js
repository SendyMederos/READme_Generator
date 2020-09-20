const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown");
///clsconst { mainModule } = require("process");

const writeFileAsync = util.promisify(fs.writeFile);


// array of questions for user
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is your project's title?"
    },
    {
        type: "input",
        name: "description",
        message: "Please enter a description of your project."
    },
    {
        type: "input",
        name: "installation",
        message: "Enter detail instructions for your application's installation"
    },
    {
        type: "input",
        name: "usage",
        message: "What is the usage of your application?"
    },
    {
        type: "list",
        name: "license",
        message: "Select your license type",
        choices: [
            "MIT",
            "GNU GPL v2",
            "GNU GPL v3",
            "Apache 2.0",
            "BSD 2.0",
            "ISC"
        ]
    },
    {
        type: "input",
        name: "contributing",
        message: "State contributions parameters and specifications?",
    },
    {
        type: "input",
        name: "tests",
        message: "What are your tests instructions?"
    },
    {
        type: "checkbox",
        name: "contact",
        message: "How should we reach you for additional questions?",
        choices: ["e-mail", "LinkedIn", "GitHub"],
    },
    {
        type: "input",
        name: "email",
        message: "Enter your e-mail",
        when: (questions) => questions.contact.includes("e-mail")
    },
    {
        type: "input",
        name: "linkedin",
        message: "Enter your LinkedIn URL",
        when: (questions) => questions.contact.includes("LinkedIn")
    },
    {
        type: "input",

        name: "github",
        message: "Enter your GitHub Username",
        when: (questions) => questions.contact.includes("GitHub")
    }

];
function promptUser() {
    return inquirer.prompt(questions)
}

// function to write README file
// function writeToFile(fileName, data) {



function licenses (data) {
 
switch (data.license) {
    case "MIT": return data.license = ["[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)", data.license, 
    "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software."]
     case "GNU GPL v2": return data.license =["[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)", data.license,
    "Version 2, June 1991 Copyright (C) 1989, 1991 <br /> Free Software Foundation, Inc.51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA <br /> Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed."]
     case"GNU GPL v3": return data.license =["[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)", data.license, 
     "Version 3, 29 June 2007 Copyright © 2007 <br /> Free Software Foundation, Inc. <br /> Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed."]
    case "Apache 2.0": return data.license = ["[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)", data.license, 
    " Licensed under the Apache License, Version 2.0; <br /> You may not use this file except in compliance with the License. <br /> Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License."]
    case "BSD 2.0": return data.license = ["[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)", data.license, 
    "Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met: <br /> 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.<br /> 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution."]
     case"ISC": return data.license = ["[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)", data.license, 
    "Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies."]
  } 
}
function contact (data) {
    if (data.contact.includes("e-mail")) {
        data.email = `>#### E-mail: _${data.email}_`
    }else { data.email = ""};
    if (data.contact.includes("LinkedIn")) {
        data.linkedin= `> #### LinkedIn:[ _${data.linkedin}_](${data.linkedin})`
    }else { data.linkedin = ""};
    if (data.contact.includes("GitHub")){
        data.github = `> #### GitHub: [_${data.github}_](https://github.com/${data.github})`
    }else { data.github = ""}    
}

// function to initialize program
async function init() {
    
    console.log("Lets Generate your READme.md")
    try {
        const data = await promptUser();
        licenses(data);
        contact(data);
        const readMe = generateMarkdown(data);

        await writeFileAsync("README.md", readMe);

        console.log("Your README.md has been created")
    } catch (err) {
        console.log(err);
    }
};

// function call to initialize program
init();
# Welcome to the Ampol Design System (ADS)

Hosted and managed here is all of Ampol's central react components.

Further reading, conventions, processes, technology and pipelines are documented on Confluence at <https://ampol.atlassian.net/wiki/spaces/DE/pages/2517073984/Ampol+Component+System>

## Getting Started

Follow this tutorial if you're working on the Ampol Design System.

1. Clone the Repository: `git clone https://caltexau.visualstudio.com/DefaultCollection/Digital%20-%20Ampol%20Design%20System/_git/Digital%20-%20Ampol%20Design%20System`
2. Generate and input git credentials using DevOps
3. Install [Node v16.19](https://nodejs.dev/en/download/) or with [nvm](https://github.com/nvm-sh/nvm)
4. Install packages: `npm i`
5. Run storybook: `npm run dev`

## Using this library (New Project)

Follow this tutorial if you're setting up a brand new project that requires Ampol's Design System.

1. Navigate to your root project directory
2. Create a `.npmrc` file and paste the following:

```js
registry=https://caltexau.pkgs.visualstudio.com/8fd6b825-6707-4031-89ee-5c5eab99778b/_packaging/ampol-design-system/npm/registry/

always-auth=true
```
4. Run `npx better-vsts-npm-auth` and follow the prompts
5. Run `npm i @ampol/design-system`
6. (if you're using SCSS) In your global SCSS styles file, import the design system styles `@import '~@ampol/design-system/src/styles/core';`
7. (If you're using Next.JS) Add the following line to your _app or layout file: `import '@ampol/design-system/lib/style.css';`
8. (If you're using tailwind) Add the following line to your tailwind.config.js file:
```js
module.exports = {
  presets: [require('./node_modules/@ampol/design-system/tailwind.preset.config.js')], // <--- Add this
};
```
9. Import a component eg. `import { Button } from '@ampol/design-system`

Note: Update the library to the latest using `npm i ampol-design-system@latest`

## Using this library (Existing Project)

Follow this project if you're a new developer working on a project using Ampol's Design System.
When calling `npm install` you may come across an authentication error.

1. Run `npx better-vsts-npm-auth` and follow the prompts (make sure to run this again once you've authenticated)
2. Then run `npm i` to install the packages again

## Creating a new release
If you need to create a new release of the design system, follow these steps:

Note: before proceeding, ensure you have the latest changes from the main branch.
1. Goto https://caltexau.visualstudio.com/Digital%20-%20Ampol%20Design%20System/_build?definitionId=346
2. Click on "Run pipeline" on the top right
3. Click on "Run" on the bottom right
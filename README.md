# Welcome to the Ari Design System (ADS)

Hosted and managed here is all of Ari's central react components.

## Getting Started

Follow this tutorial if you're working on the Ari Design System.

Requirements: 
- Node.js >= 16.19.0     
- react = 17.0.2  
## Using this library (New Project)

Follow this tutorial if you're setting up a brand new project that requires Ampol's Design System.

1. Navigate to your root project directory
2. Create a `.npmrc` file and paste the following:

```js
registry=https://registry.npmjs.org/
@unggiapro121:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=AUTO_GENERATED_TOKEN
```
5. Run `npm i @unggiapro121/ari-design`
6. (if you're using SCSS) In your global SCSS styles file, import the design system styles `@import '~@unggiapro121/ari-design/src/styles/core';`
7. (If you're using Next.JS) Add the following line to your _app or layout file: `import '@unggiapro121/ari-design/lib/style.css';`
8. (If you're using tailwind) Add the following line to your tailwind.config.js file:
```js
module.exports = {
  presets: [require('./node_modules/@unggiapro121/ari-design/tailwind.preset.config.js')], // <--- Add this
};
```
9. Import a component eg. `import { Button } from '@unggiapro121/ari-design`

Note: Update the library to the latest using `npm i @unggiapro121/ari-design/latest`

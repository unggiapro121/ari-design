module.exports = function(plop) {
  // create your generators here
  // Read more about templates at https://plopjs.com/

  plop.setHelper('lowerCase', function(text) {
    return text.toLowerCase();
  });

  plop.setHelper('capitalizeCase', function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });

  plop.setHelper('curlyName', function(text) {
    return `{${text}}`;
  });

  plop.setGenerator('Component template', {
    description: 'Create a new Ampol component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'Name for your component',
      },
    ],
    actions: [
      {
        type: 'add',
        path: './src/components/{{componentName}}/{{componentName}}.tsx',
        templateFile: './.templates/react.hbs',
      },
      {
        type: 'add',
        path: './src/components/{{componentName}}/{{componentName}}.module.scss',
        templateFile: './.templates/sass.hbs',
      },
      {
        type: 'add',
        path: './src/components/{{componentName}}/{{componentName}}.test.tsx',
        templateFile: './.templates/test.hbs',
      },
      {
        type: 'add',
        path: './src/components/{{componentName}}/{{componentName}}.stories.tsx',
        templateFile: './.templates/story.hbs',
      },
    ],
  });
};
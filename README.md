# Base Web App
Circle CI Build Status:
[![CircleCI](https://circleci.com/gh/joe-glasgow/base-web-app/tree/master.svg?style=svg)](https://circleci.com/gh/joe-glasgow/base-web-app/tree/master)

## Features

This project has out-of-the-box support for the following libs, tools and packages:


  React 16,
  Reselect,
  Docker,
  Babel 7,
  Webpack 4,
  ESLint 6,
  TypeScript (via Babel),
  Prettier,
  Jest 24,
  React Testing Library,
  React i18next,
  SSR,
  HMR,
  CSS Modules,
  PostCSS,
  Husky,
  Storybook

## UI
[logo]:https://material-ui.com/static/logo_raw.svg
![alt text][logo]
The application comes bundled with [Material UI](https://material-ui.com/) and [StoryBook](https://storybook.js.org/).

## Installation

This app can be installed by using the command:

    npm install

To let docker take care of this:

    docker-compose -f docker-compose.dev.yml up

## Usage

There are npm scripts for all the relevant things. The server will always be started on port 8500 unless otherwise specified in `process.env.PORT`. You can use a `.env` file to specify env vars. If you want to use them in your client side code, don't forget to add them in [config/env.js](config/env.js#L37).

### Scripts:

#### `npm start`

Starts the app in development mode: creates a new client and server dev build using webpack, starts the Express server build (for both file serving and server side pre-rendering) and keeps webpack open in watchmode. Updates the app (if possible) on change using HMR.
Starts Storybook on port :8400

#### ` npm build`

Creates a new build, optimized for production.

#### `npm test`

Run all tests using jest.

#### `npm test:update`

Update all Jest snapshots (if there are any)

#### `npm lint:js`

Run ESLint for all JavaScript and TypeScript files

#### `npm lint:css`

Run Stylelint for all CSS files

#### `npm lint`

Run lint:js and lint:css in parallel

#### `npm analyze`

Starts `webpack-bundle-analyzer` to give you the opportunity to analyze your bundle(s)

#### `npm plop`

Run plop to create new React components or Redux reducers via CLI

## Environment Variables

There are a few environment variables you can set to adjust the setup to your needs

| Variable         | Default            | Description                                                                                                                                                                                                                                                                                      |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PORT`           | `8500`             | Port number your application will be served on.                                                                                                                                                                                                                                                  |
| `HOST`           | `http://localhost` | Host (including protocol!) your application will be served on. This is usually neglectable as most of the time your application will be served via remote proxy (e.g. Nginx) on localhost. **Note:** this is only for convenience. The server itself will not be bound exclusively to that host. |
| `DEVSERVER_HOST` | `http://localhost` | Optional. Different host for the Webpack Dev Server to be served on.                                                                                                                                                                                                                             |

## Tricks

### Component scaffolding using plop

Along with this starter kit comes `plop` - a great command line tool to keep the structure of your Redux components and Redux reducers consistent. Run `npm plop` to have components and Redux reducers created for you automatically! Just enter a name, answer a few questions and you're ready to go! You can of course adjust everything to your needs. All Plop templates can be found in the `config/plop` directory.

### Avoid source map generation for faster builds

In some cases you might not want to generate source maps for the generated files. In this case you can set the `OMIT_SOURCEMAP` environment variable to `true`. No source map files will be generated then. This works no matter if you're in devmode or building for production.

### Change the port of the dev environment

By default if you run `npm start` the development server will use port 8500. You can change this by specifying a `PORT` environment variable.

### Import SVGs as ReactComponent

You can import SVG files as React components exactly the way you can do it in Create React App 2.0:

```
import { ReactComponent as Logo } from './Logo.svg';
```

Then you can use it in JSX like `<div><Logo /></div>`.

### Use plain JavaScript instead of TypeScript

- remove the `@babel/typescript` preset from `babel.config.js`
- uninstall TypeScript: `npm uninstall typescript @babel/preset-typescript`
- uninstall all dependencies beginning with `@types/`
- delete `tsconfig.json` and `src/global.d.ts`
- remove `wiremore/typescript` from the `extends` section in `.eslintrc.js`
- remove all types from all files if there still are any
- remove `tsConfig` option from `.dependency-cruiser.js`

## License

MIT.

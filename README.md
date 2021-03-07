[icon]: https://img.icons8.com/ios/452/foundation.png

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/joe-glasgow/base-web-app/issues) [![Known Vulnerabilities](https://snyk.io/test/github/joe-glasgow/base-web-app/badge.svg)](https://snyk.io/test/github/joe-glasgow/base-web-app) [![CircleCI](https://circleci.com/gh/joe-glasgow/base-web-app/tree/main.svg?style=svg)](https://circleci.com/gh/joe-glasgow/base-web-app/tree/main)

# Base Web App [<img src="https://img.icons8.com/ios/452/foundation.png" width="55"/>](icon)

I've created this web app to enable rapid development of React projects that have performance and coding standards baked in.
This repo builds on the work of others and my additions lay on extra layers of enhancement (such as gzip, loadable components).

There is no included UI library, to keep the weight of the application as small as possible.
Just run and go!

Forked from the truly wonderful [manuelbieh/react-ssr-setup](https://github.com/manuelbieh/react-ssr-setup).

Twisted for my own purposes.

## Table of Contents

- [Features](#features)
- - [Gzip](#gzip-by-default)
- - [Languages](#languages)
- - [Frameworks](#frameworks)
- - [UI](#ui)
- - [Libraries](#libraries)
- - [Build tools](#build-tools)
- - [Containerisation](#containerisation)
- - [Code Quality](#code-quality)
- - [Testing](#testing)
- - [Utilities](#utilities)
- - [Other features](#other-features)
- [Composing The UI](##composing-the-ui)
- [Installation and Quickstart](#installation--quick-start)
- [Usage](#usage)
- - [Scripts](#scripts)
- [Tricks](#tricks)
- - [Component scaffolding using plop](#component-scaffolding-using-plop)
- - [Avoid source map generation for faster builds](#avoid-source-map-generation-for-faster-builds)
- - [Change the port of the dev environment](#change-the-port-of-the-dev-environment)
- - [Import SVGs as ReactComponent](#import-svgs-as-reactcomponent)
- - [Use plain JavaScript instead of TypeScript](#use-plain-javaScript-instead-of-typeScript)

## Features

### Gzip by default

Webpack builds assets (JS/CSS) to Gzip and the Express app serves these versions automatically.

This project has out-of-the-box support for the following libs, tools and packages:

### Languages

- [TypeScript](https://www.typescriptlang.org/) (via [Babel](https://babeljs.io/)) - Pure JS is optional

### Frameworks

- [React](https://reactjs.org/blog/2020/10/20/react-v17.html) 17

### UI

- [Storybook](https://storybook.js.org/) - (Dev build only, optional)

### Libraries

- [Redux](https://github.com/reduxjs/redux),
- [Reselect](https://github.com/reduxjs/reselect),

But please see [this interesting article](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) from Dan Abramove before implementing.
Consider [Context](https://reactjs.org/docs/context.html).

### Build tools

- [Babel](https://babeljs.io/) 7,
- [Webpack](https://webpack.js.org/) 5,

### Containerisation

- [Docker](https://www.docker.com/get-started) - optional

### Code Quality

- [ESLint](https://eslint.org/) 7,
- [Prettier](https://prettier.io/),

### Testing

- [Jest](https://jestjs.io/) 26,
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/),

### Utilities

- [Husky](https://github.com/typicode/husky),
- [SSR](https://medium.com/jspoint/a-beginners-guide-to-react-server-side-rendering-ssr-bf3853841d55) (Server Side Rendering),
- [HMR](https://webpack.js.org/concepts/hot-module-replacement/),
- [CSS Modules](https://github.com/css-modules/css-modules),
- [PostCSS](https://postcss.org/),

### Other features

- React Fast Refresh,
- React i18next,

## Composing the UI

The application comes bundled with [StoryBook](https://storybook.js.org/), to create your own UI free of opinions.
I've previously added [MaterialUI](https://material-ui.com/]) and [Bootstrap](https://react-bootstrap.github.io/) without much hassle!

## Installation & Quick Start

This app can be installed by using the command:

    npm install

To let docker take care of this in development mode:

    docker-compose -f docker-compose.dev.yml up

This will start the app on the chosen **port** value in development mode.
Alternatively to let npm start the dev app, you can also run:

    npm run start

To let docker take care of this in production mode:

    docker-compose -f docker-compose.yml up

This will distribute a production build to the **/dist** folder and run the node script on the specified **port**
Alternatively you can also run:

    npm run build && node ./dist/server/server.js

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

#### `npm run depgraph`

Render an SVG outlining project dependencies.
Please install [GraphViz](https://graphviz.org/download/)

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

- remove the `@babel/typescript` preset from `babel.preview.js`
- uninstall TypeScript: `npm uninstall typescript @babel/preset-typescript`
- uninstall all dependencies beginning with `@types/`
- delete `tsconfig.json` and `src/global.d.ts`
- remove `wiremore/typescript` from the `extends` section in `.eslintrc.js`
- remove all types from all files if there still are any
- remove `tsConfig` option from `.dependency-cruiser.js`

## License

MIT.

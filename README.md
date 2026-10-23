# React Native SVG to SVG Converter
Convert React Native SVG components to standard SVG format

[![Visit the app](https://img.shields.io/badge/Go-to_the_app-red.svg?style=flat-square)](https://triptrackr.vercel.app/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![first-timers-only Friendly](https://img.shields.io/badge/first--timers--only-friendly-blue.svg)](http://www.firsttimersonly.com/)

# About the App
This app allows you to convert React Native SVG components into standard SVG format.

It provides a user-friendly interface where you can paste your React Native SVG code, and it will generate the equivalent SVG code for you. You can optimize the SVG output and/or format it for better readability.

You can then copy the converted SVG code to your clipboard or download the SVG file directly.

![Walkthrough GIF](public/walkthrough.gif)

# Setup

Use Node.js `22.13.0` or newer in the 22.x line, or Node.js 24.x. The root `.nvmrc` selects Node.js 24. Use pnpm `11.9.0`.

Install the locked dependencies:

```sh
pnpm install --frozen-lockfile
```

Start the development server with `pnpm dev`, then open [http://localhost:3000](http://localhost:3000).

Run the static checks separately:

```sh
pnpm lint
pnpm typecheck
```

Create and run the production build with:

```sh
pnpm build
pnpm start
```

The production build is written to `.next`. Next.js builds do not run lint or type checking, so run both checks explicitly before release. Deployments should use the same supported Node.js runtime listed above.

# License
This project is licensed under the MIT License.

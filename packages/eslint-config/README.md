# eslint-config

An eslint configuration for channel web projects.

## Installation

`$ npm install --dev @channel.io/eslint-config`

### Supports

This config supports `Next`, `Web(React)`, `Node`

- `@channel.io/eslint-config`: the basic config for JavaScript projects for which there isn't a more specific config,
- `@channel.io/eslint-config/web`: the config for code that runs in web browsers, with support for React and JSX,
- `@channel.io/eslint-config/node`: the config for code that runs in Node.
- `@channel.io/eslint-config/next`: the config for Next.js Project

For React Web

```json
{
  "extends": "@channel.io/eslint-config/web"
}
```

For Node Projects

```json
{
  "extends": "@channel.io/eslint-config/web"
}
```

For Next

```json
{
  "extends": "@channel.io/eslint-config/web"
}
```

For Next

```json
{
  "extends": "@channel.io/eslint-config/web"
}
```

### Code Formatting

From ESLint 8.53.0, [formatting-related features are being deprecated gradually](https://eslint.org/blog/2023/10/deprecating-formatting-rules/). It is assumed that you are using Prettier for formatting in conjunction with this configuration.

For the prettier config that `Channel.io` is using, please check [@channel.io/prettier-config](../prettier-config/)

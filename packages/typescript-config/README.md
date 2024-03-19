# typescript-config

Base typescript configuration for Channel.io

## Installation

```bash
$ yarn add --dev @channel.io/typescript-config
```

## Usage

### React

```json
{
  "extends": "@channel.io/typescript-config/web.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": "."
  },
  "include": ["./app/**/*", "./client/**/*", "./server/**/*", "./tests/**/*"]
}
```

### React Library

```json
{
  "extends": "@channel.io/typescript-config/web-library.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": "."
  },
  "include": ["./app/**/*", "./client/**/*", "./server/**/*", "./tests/**/*"]
}
```

### Node

```json
{
  "extends": "@channel.io/typescript-config/node.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": "."
  },
  "include": ["./app/**/*", "./client/**/*", "./server/**/*", "./tests/**/*"]
}
```

### Node Library

```json
{
  "extends": "@channel.io/typescript-config/node-library.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": "."
  },
  "include": ["./app/**/*", "./client/**/*", "./server/**/*", "./tests/**/*"]
}
```

# 9_test

You would also need to put your github's personal token in root folder of the app.
The token is used to increase api requests rate limit.

If you don't have the token, you can easily create one (https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

Instructions:

1. Create a file 'token.js' in root directory
2. Put the following code inside 'token.js':

   ```
      const token = 'YOUR TOKEN';
      export default token;
   ```

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```

yarn run serve

```

### Compiles and minifies for production

```

yarn run build

```

### Run your tests

```

yarn run test

```

### Lints and fixes files

```

yarn run lint

```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

```

```

# Installation
```sh
lerna bootstrap
lerna --scope=@smfw/web exec yarn
lerna --scope=@smfw/cms exec yarn
```

# Test
### @smfw/web
```sh
lerna --scope=@smfw/web run start:test
#or
cd packages/smfw-web && yarn start:test
```

### @smfw/cms
```sh
lerna --scope=@smfw/cms run start:test
#or
cd packages/smfw-cms && yarn start:test
```

# Example
```ts
import { Engine,layouts, templates, themes, slices, createStore, createReducer } from '@smfw/web';

const engine = new Engine();
const store = createStore(createReducer(slices), []);

engine.addTheme('themes.classic', themes.classic);
engine.addLayout('layouts.classic.basic', layouts.classic.basic);
engine.addTemplate('templates.classic.login', 'layouts.classic.basic', templates.classic.login);

engine.addPage({
    title: 'Login',
    path: '/'
  },
  'templates.classic.login',
  'themes.classic'
);

engine.start({ store });
```

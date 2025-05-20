# fixes to the generated storybook files

Ensure to apply these fixes in the generated story files:

- Use an import statement for the component, for example:

```ts
import COMPONENT_NAME from './COMPONENT_NAME.svelte';
```

- For the meta object, ensure the component property references the component:

```ts
export default {
  title: 'COMPONENT_NAME',
  component: COMPONENT_NAME,
};
```


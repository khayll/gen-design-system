# GenDesignSystem

## Project Structure and Guidelines

This design system is generated from prompts located in the `prompts` directory. The system supports both text-based prompts and visual references through .png images. Components are automatically generated based on these prompts.

### Component Creation
- New components can be created by adding a new directory under the `components` directory
- Each component can have its own prompt file and supporting images
- .png images in the component directory will be automatically included as part of the prompt
- The system will generate the component implementation based on both text prompts and visual references

### Pull Request Guidelines
- Changes to prompts and component structure should be made in the `prompts` directory
- New components should be created by adding a new directory under `components`
- Supporting images (.png) should be placed in the respective component directory
- Generated components will be automatically updated based on prompt changes

## Development

To build the library use:

```sh
npx nx build
```

To version and release the library use:

```sh
npx nx release
```

Pass `--dry-run` to see what would happen without actually releasing the library.

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


## Original prompt

Prompts that started this project

### Simple prompt (no deep research)

You are an expert at the following technologies: node.js, javascript, typescript, web-components, NX Workspaces, Playwright, GitHub, and GitHub Actions for CI/CD, OpenAI node API, publishing to npm, visual design and design systems.Provide detailed steps to create a GitHub repository called gen-design-system to host an llm-based-build design system. On high level, these are the requirements:- this will be a web-component based implementation of a design system- components are described with prompts and images- the javascript source of the components should be generated for each build from scratch purely based on the prompts and images- the source codes for the components should be generated using the OpenAI node library and with a configurable model. By default the model should be the o3-mini-high- there are shared rules, that apply to all components to ensure consistency
- the components should be theme-able- for every pull request for all affected components the system should add an two images as a comment that show the previous and the new look of the component- there should be a gate before the build runs for the pull requests to prevent a misuse of the OpenAI API. This gate can only be approved by the owners of the repository- in the repository there should be a storybook library, that can show the latest version of the components- thus for each component there should be a storybook file as well, that  describes and showcases all the features of that component. This should be generated alongside the source for the component.- You may use the Lit framework to create the design system component as custom elements if it makes sense
- a component may consist of multiple custom-elements if that makes sense, in fact take Angular Material as a good example of how to compose design system components.- make sure, that each component is placed into a separate NX library, and I like typescript project references, so please use that for referring to each component, because I read in and NX blog, that npm workspaces and typescript references combined result in a really good performance in a CI/CD environment.- There should be one NX library called “core”, that depends on all the components (and potentially the shared library), and exports the design system components.- after a pull request is merged, and all the components are built the core library, that exports all components should be also built, and then published to npm with the import path @gds/core- in the published readme file for npm there should be a short description of the design system and all components with their inputs and events with images- create the initial shared prompt that describes a design system with a light and a dark theme, and a primary and a secondary action color, and multiples of 4 for padding and margin as overall rules for the components. Make up some good vibrant colors a generic rules.- create prompts for at least 2 example components one of which should be a button, the other is up to you.- make sure, that the build and publish process can be run on a development machine as well without the need to use GitHub Actionsfinally please do a really great job for this project, and double check, that everything would work well, and make sense. In the end I would like to have everything that I need to copy and paste into a git repository along with all the instructions on how to create the repository and where to place files and what commands to run. Once this project is in place the only thing that should be required to add a new component is to create the prompt and optionally supply the images created by a designer to add a new component into a pull request. As soon as the pull request is merged the results should be automatically published to npm.

### Deep research

Be an expert at the following technologies: node.js, javascript, typescript, web-components, NX Workspaces, Playwright, GitHub, and GitHub Actions for CI/CD, OpenAI node API, publishing to npm, visual design and design systems.

Provide detailed steps to create a GitHub repository called gen-design-system to host an llm-based-build design system. On high level, these are the requirements:

- this will be a web-component based implementation of a design system
  - components are described with prompts and images
  - the javascript source of the components should be generated for each build from scratch purely based on the prompts and images
  - the source codes for the components should be generated using the OpenAI node library and with a configurable model. By default the model should be the o3-mini-high
  - there are shared rules, that apply to all components to ensure consistency
- the components should be theme-able
- for every pull request for all affected components the system should add an two images as a comment that show the previous and the new look of the component
- there should be a gate before the build runs for the pull requests to prevent a misuse of the OpenAI API. This gate can only be approved by the owners of the repository
- in the repository there should be a storybook library, that can show the latest version of the components
- thus for each component there should be a storybook file as well, that describes and showcases all the features of that component. This should be generated alongside the source for the component.
- You may use the Lit framework to create the design system component as custom elements if it makes sense
- a component may consist of multiple custom-elements if that makes sense, in fact take Angular Material as a good example of how to compose design system components.
- make sure, that each component is placed into a separate NX library, and I like typescript project references, so please use that for referring to each component, because I read in and NX blog, that npm workspaces and typescript references combined result in a really good performance in a CI/CD environment.
- There should be one NX library called “core”, that depends on all the components (and potentially the shared library), and exports the design system components.
- after a pull request is merged, and all the components are built the core library, that exports all components should be also built, and then published to npm with the import path @gds/core- in the published readme file for npm there should be a short description of the design system and all components with their inputs and events with images
- create the initial shared prompt that describes a design system with a light and a dark theme, and a primary and a secondary action color, and multiples of 4 for padding and margin as overall rules for the components. Make up some good vibrant colors a generic rules.
- create prompts for at least 2 example components one of which should be a button, the other is up to you.
- make sure, that the build and publish process can be run on a development machine as well without the need to use GitHub Actions

finally please do a really great job for this project, and double check, that everything would work well, and make sense. In the end I would like to have everything that I need to copy and paste into a git repository along with all the instructions on how to create the repository and where to place files and what commands to run.

The goal is to have detailed instructions how the set this project up along with all necessary commands and scripts, so once it is in place the only thing that should be required to add a new component is to create the prompt and optionally supply the images created by a designer in a pull request to create a new component. As soon as the pull request is merged the results should be automatically published to npm.


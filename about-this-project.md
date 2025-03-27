# LLM based build for a Design System

__vibe coding__ - refers to an intuitive, exploratory style of programming that relies more on feel and experience than rigid methodologies.

The aim of this project is to explore whether natural language will be the next higher level programming language.

This project does that by building design system components from prompts.

## Topics to cover

- the goal of this project
- current state of the project
- an example PR
- what tools were used to create the project - an evolution from Chat to Cursor
- conclusion


## The goal of this repository

Create a JavaScript project for a design system library using LLMs that is:
- using NX for scaffolding
- has a prompts diredtory structure for system and component prompts
- you can add text and images in the prompts to guide the LLM
- you are able to generate components from the prompts locally, ans view results in storybook
- can take pull requests, but only run the LLM generation if the project owner approves to avoid abuse
- has a way to review the generated components before they are merged
- publishes the component library after a PR is merged to NPM


## Current state of the project

_It's hard to estimate the time required to build a project from scratch, and if you're using AI, it's even harder._

Project is scaffolded with NX based on commands from an LLM. (which LLM worked best?)

- LLM Generation is there, and it works pretty well.
- Local generation works, but there are some issue with Storybook. (haven't found a way to fix this yet with AI)
- in general can accept PRs and comment on PRs showcasing the generated components
- cannot accept PRs from forks (others?), because of permissions issues, that need to be fixed, but HOW?
- can't publish, although it's not far

## Example PR

Enough talking, let's see some (GitHub) action.

## What tools were used to create the project

(don't forget to talk about subscriptions)

- ChatGPT, o1 with deep research
- Claude Sonnet 3.7 - Extended (similar to deep research)
- Cursor (what models is Cursor using?)

- What about GitHub copilot? 
- What about Gemini or Coopilot or DeepSeek?
- Some examples for LLM responses.

## Conclusion

- higher level programming language?
- What is AI or LLMs good for - in the process of software development?

Should you be using LLMs for coding?











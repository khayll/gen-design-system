# Button Component v1

Create a versatile button component for the GDS design system that can be used throughout applications.

## Requirements:

1. Support multiple variants: primary, secondary, success, danger, warning, info, light, dark
2. Support multiple sizes: small, medium (default), large
3. Support disabled state
4. Support loading state with a spinner
5. Support icon before and/or after the button text
6. Support full-width option
7. Support outline variant for each button type
8. Ensure proper focus states for accessibility
9. Add ripple effect on click (optional)

## Props:

- `variant`: string - The button variant (primary, secondary, success, etc.)
- `size`: string - The button size (sm, md, lg)
- `disabled`: boolean - Whether the button is disabled
- `loading`: boolean - Whether the button is in loading state
- `icon`: string - Icon name for the button (optional)
- `iconPosition`: string - Position of the icon (left, right)
- `fullWidth`: boolean - Whether the button should take full width
- `outline`: boolean - Whether to use the outline variant
- `ripple`: boolean - Whether to show ripple effect on click

## Events:

- `click`: CustomEvent - Fired when button is clicked

## Example Usage:

```html
<gds-button variant="primary" size="md">Click Me</gds-button>
<gds-button variant="success" disabled>Success</gds-button>
<gds-button variant="danger" loading>Loading</gds-button>
<gds-button variant="primary" outline icon="arrow-right" iconPosition="right">Next</gds-button>
```

## Storybook Examples:

put the label 'Click me' into the button

Please include stories for:
1. All variants
2. All sizes
3. Disabled state
4. Loading state
5. With icons (left and right positions)
6. Full width
7. Outline variants
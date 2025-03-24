# Styling Guidelines for Design System Components

## Base Styling

Use CSS custom properties for theming with the following base tokens:

```css
:host {
    /* Colors */
    --gds-color-primary: #4263eb;
    --gds-color-primary-hover: #364fc7;
    --gds-color-secondary: #868e96;
    --gds-color-secondary-hover: #495057;
    --gds-color-success: #40c057;
    --gds-color-warning: #fcc419;
    --gds-color-danger: #fa5252;
    --gds-color-info: #15aabf;
    --gds-color-light: #f8f9fa;
    --gds-color-dark: #212529;

    /* Typography */
    --gds-font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --gds-font-size-xs: 0.75rem;
    --gds-font-size-sm: 0.875rem;
    --gds-font-size-md: 1rem;
    --gds-font-size-lg: 1.125rem;
    --gds-font-size-xl: 1.25rem;
    --gds-font-weight-normal: 400;
    --gds-font-weight-medium: 500;
    --gds-font-weight-bold: 700;

    /* Spacing */
    --gds-spacing-xs: 0.25rem;
    --gds-spacing-sm: 0.5rem;
    --gds-spacing-md: 1rem;
    --gds-spacing-lg: 1.5rem;
    --gds-spacing-xl: 2rem;

    /* Borders */
    --gds-border-radius-sm: 0.25rem;
    --gds-border-radius-md: 0.375rem;
    --gds-border-radius-lg: 0.5rem;
    --gds-border-radius-full: 9999px;
    --gds-border-width: 1px;

    /* Shadows */
    --gds-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --gds-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --gds-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

    /* Transitions */
    --gds-transition-fast: 150ms;
    --gds-transition-normal: 250ms;
    --gds-transition-slow: 350ms;
}
```

## Component-Specific Variables

Each component should define its own CSS custom properties that extend the base tokens:

```css
:host {
    /* Example for a button component */
    --gds-button-padding: var(--gds-spacing-sm) var(--gds-spacing-md);
    --gds-button-border-radius: var(--gds-border-radius-md);
    --gds-button-transition: all var(--gds-transition-fast) ease-in-out;
}
```

## Accessibility

- Ensure proper color contrast (WCAG 2.1 AA requires 4.5:1 for normal text, 3:1 for large text)
- Support dark mode if appropriate
- Components should work with keyboard navigation
- Add appropriate ARIA attributes

## Responsive Design

- Use relative units (rem, em) rather than fixed units (px) where appropriate
- Implement responsive behavior using CSS media queries when needed
- Use flexible layouts (flexbox, grid) for component internal structure
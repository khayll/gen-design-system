# Label Component v1

Create a versatile label component for the design system that can be used with form elements and other UI components to provide clear, accessible descriptions and instructions.

## Requirements:

1. Support for associating with form elements via 'for' attribute
2. Support for different visual styles: default, required, optional, disabled, error
3. Support for different sizes: small, medium (default), large
4. Support for different positions: top (default), right, bottom, left, floating
5. Support for different variants: default, bold, subtle
6. Support for icon prefixes and suffixes
7. Support for required/optional indicators
8. Support for tooltips to provide additional information
9. Support for character count display when associated with text inputs
10. Ensure proper semantic HTML for accessibility
11. Support for wrapping/truncating behavior for long labels
12. Support for colon display option (common in some design systems)

## Props:

- `for`: string - ID of the associated form element
- `text`: string - The label text content
- `required`: boolean - Whether the field is required (shows required indicator)
- `optional`: boolean - Whether the field is optional (shows optional indicator)
- `requiredText`: string - Custom text for required indicator (default: "*")
- `optionalText`: string - Custom text for optional indicator (default: "(optional)")
- `error`: boolean - Whether the label should show error styling
- `disabled`: boolean - Whether the label should show disabled styling
- `size`: string - Label size ('sm', 'md', 'lg')
- `position`: string - Label position ('top', 'right', 'bottom', 'left', 'floating')
- `variant`: string - Label variant ('default', 'bold', 'subtle')
- `prefixIcon`: string - Icon to display before the label text
- `suffixIcon`: string - Icon to display after the label text
- `tooltip`: string - Tooltip text to provide additional information
- `showCharCount`: boolean - Whether to show character count (when used with text inputs)
- `maxCharacters`: number - Maximum number of characters (for character count)
- `currentCharacters`: number - Current number of characters (for character count)
- `showColon`: boolean - Whether to show a colon after the label text
- `truncate`: boolean - Whether to truncate long label text with ellipsis
- `htmlFor`: string - Alias for 'for' attribute (for frameworks that don't allow 'for' as a prop)

## Events:

- `click`: CustomEvent - Fired when label is clicked
- `tooltipOpen`: CustomEvent - Fired when tooltip is opened
- `tooltipClose`: CustomEvent - Fired when tooltip is closed

## CSS Custom Properties:

- `--gds-label-font-size`: Font size of the label
- `--gds-label-font-weight`: Font weight of the label
- `--gds-label-color`: Text color of the label
- `--gds-label-margin`: Margin around the label
- `--gds-label-line-height`: Line height of the label
- `--gds-label-error-color`: Text color when in error state
- `--gds-label-disabled-color`: Text color when disabled
- `--gds-label-required-color`: Color of the required indicator
- `--gds-label-optional-color`: Color of the optional indicator
- `--gds-label-tooltip-color`: Color of the tooltip icon
- `--gds-label-gap`: Gap between label and icon/indicator
- `--gds-label-char-count-color`: Color of the character count text
- `--gds-label-char-count-error-color`: Color of the character count when exceeding limit

## Example Usage:

```html
<!-- Basic label -->
<gds-label for="username">Username</gds-label>

<!-- Required label -->
<gds-label for="email" required>Email Address</gds-label>

<!-- Optional label -->
<gds-label for="phone" optional>Phone Number</gds-label>

<!-- Label with tooltip -->
<gds-label for="password" tooltip="Password must be at least 8 characters">Password</gds-label>

<!-- Label with prefix icon -->
<gds-label for="search" prefixIcon="search">Search Term</gds-label>

<!-- Label with character count -->
<gds-label for="bio" showCharCount maxCharacters="200" currentCharacters="45">Biography</gds-label>

<!-- Label with error styling -->
<gds-label for="username" error>Username</gds-label>

<!-- Label with custom position -->
<gds-label for="remember-me" position="right">Remember me</gds-label>

<!-- Floating label (for material design style inputs) -->
<gds-label for="name" position="floating">Full Name</gds-label>

<!-- Bold variant with colon -->
<gds-label for="address" variant="bold" showColon>Shipping Address</gds-label>

<!-- Disabled label -->
<gds-label for="account-number" disabled>Account Number</gds-label>
```

## Accessibility Requirements:

1. Use proper HTML `<label>` element internally
2. Ensure 'for' attribute correctly associates with form element
3. Ensure proper color contrast for all states
4. Ensure tooltips are accessible via keyboard and screen readers
5. Ensure icons have appropriate aria-label or aria-hidden
6. Required status should be properly conveyed to screen readers
7. Error states should be properly announced to screen readers

## Storybook Examples:

Please include stories for:
1. Basic label variations
2. Different sizes (small, medium, large)
3. Different positions (top, right, bottom, left, floating)
4. Required, optional, and error states
5. Labels with icons
6. Labels with tooltips
7. Labels with character count
8. Different variants (default, bold, subtle)
9. Truncated long labels
10. Labels with colons
11. Interactive examples showing form element association


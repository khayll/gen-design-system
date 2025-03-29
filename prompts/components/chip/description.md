# Chip Component

Create a versatile chip component for the design system that can be used to display compact information, represent input entities, filter content, or trigger actions. Chips are small, interactive elements that typically represent a discrete piece of information, entity, or action.

## Requirements:

1. Support for different chip types: basic, input, filter, choice, action
2. Support for different visual states: default, selected, disabled
3. Support for different sizes: small, medium (default), large
4. Support for variants: filled (default), outlined, elevated
5. Support for different colors/themes (primary, secondary, success, warning, error, info, etc.)
6. Support for leading and trailing icons/avatars
7. Support for dismissible chips (with remove button)
8. Support for clickable chips (with click action)
9. Support for custom content/children
10. Support for max width with text truncation and tooltip
11. Support for multiple chips in a group/collection
12. Ensure proper focus states for accessibility

## Props:

- `label`: string - The text content of the chip
- `type`: string - Chip type ('basic', 'input', 'filter', 'choice', 'action')
- `variant`: string - Visual variant ('filled', 'outlined', 'elevated')
- `size`: string - Chip size ('sm', 'md', 'lg')
- `color`: string - Chip color theme ('default', 'primary', 'secondary', 'success', 'warning', 'error', 'info')
- `selected`: boolean - Whether the chip is selected
- `disabled`: boolean - Whether the chip is disabled
- `clickable`: boolean - Whether the chip is clickable
- `removable`: boolean - Whether the chip has a remove button
- `maxWidth`: string - Maximum width before truncation
- `leadingIcon`: string - Icon to display before the label
- `trailingIcon`: string - Icon to display after the label
- `avatar`: string/object - Avatar image URL or configuration
- `tabIndex`: number - Tab index for keyboard navigation
- `tooltip`: string - Text for tooltip when hovered
- `value`: any - Associated value for the chip (useful when in groups)

## Events:

- `click`: CustomEvent - Fired when the chip is clicked
- `remove`: CustomEvent - Fired when the chip's remove button is clicked
- `select`: CustomEvent - Fired when the chip's selection state changes
- `keydown`: CustomEvent - Fired for keyboard events on the chip

## CSS Custom Properties:

- `--gds-chip-height`: Height of the chip
- `--gds-chip-padding`: Horizontal padding of the chip
- `--gds-chip-border-radius`: Border radius of the chip
- `--gds-chip-background`: Background color of the chip
- `--gds-chip-text-color`: Text color of the chip
- `--gds-chip-border-color`: Border color for outlined variant
- `--gds-chip-shadow`: Box shadow for elevated variant
- `--gds-chip-hover-background`: Background color on hover
- `--gds-chip-active-background`: Background color when active/pressed
- `--gds-chip-selected-background`: Background color when selected
- `--gds-chip-disabled-opacity`: Opacity when disabled
- `--gds-chip-focus-outline`: Outline style when focused
- `--gds-chip-icon-size`: Size of icons
- `--gds-chip-avatar-size`: Size of avatar
- `--gds-chip-remove-button-size`: Size of remove button
- `--gds-chip-font-size`: Font size of the label
- `--gds-chip-font-weight`: Font weight of the label
- `--gds-chip-gap`: Gap between chip elements (label, icons, etc.)
- `--gds-chip-transition`: Transition for hover/active states

## Example Usage:

```html
<!-- Basic chip -->
<gds-chip label="Basic Chip"></gds-chip>

<!-- Outlined primary chip with icon -->
<gds-chip
  label="Primary Chip"
  variant="outlined"
  color="primary"
  leadingIcon="star"
></gds-chip>

<!-- Removable input chip -->
<gds-chip
  label="john.doe@example.com"
  type="input"
  removable
></gds-chip>

<!-- Filter chip with selection -->
<gds-chip
  label="Category: Electronics"
  type="filter"
  selected
  clickable
></gds-chip>

<!-- Disabled chip -->
<gds-chip
  label="Unavailable"
  disabled
></gds-chip>

<!-- Choice chip with icon -->
<gds-chip
  label="Small"
  type="choice"
  clickable
  trailingIcon="expand_more"
></gds-chip>

<!-- Action chip -->
<gds-chip
  label="Add to cart"
  type="action"
  clickable
  leadingIcon="shopping_cart"
  color="success"
></gds-chip>

<!-- Chip with avatar -->
<gds-chip
  label="Jane Smith"
  avatar="https://example.com/avatar.jpg"
  removable
></gds-chip>

<!-- Chip with max width and truncation -->
<gds-chip
  label="This is a very long chip that will be truncated"
  maxWidth="150px"
  tooltip="This is a very long chip that will be truncated"
></gds-chip>
```

## Chip Behavior by Type:

1. **Basic**: Simple information display, may be clickable or removable
2. **Input**: Represents an input entity (like an email address in a recipient field), typically removable
3. **Filter**: Used for filtering content, toggleable selection state, typically clickable
4. **Choice**: Represents a selectable option in a set, always clickable
5. **Action**: Triggers an action when clicked, similar to a compact button

## Accessibility Requirements:

1. Use appropriate roles:
   - Use `role="button"` for clickable chips
   - Use `role="option"` for choice chips within a group
   - Use `role="checkbox"` for filter chips with selection state

2. Keyboard support:
   - Tab navigation to focus chips
   - Space/Enter to select or activate
   - Delete/Backspace to remove (when removable)
   - Escape to blur/deselect

3. ARIA attributes:
   - `aria-selected` for selection state
   - `aria-disabled` for disabled state
   - `aria-label` for chips with only icons
   - `aria-describedby` for tooltip association

4. Focus management:
   - Visible focus state
   - Logical focus order
   - Focus trapping within chip group/collection when appropriate

## Storybook Examples:

Please include stories for:
1. All chip types (basic, input, filter, choice, action)
2. All variants (filled, outlined, elevated)
3. All sizes
4. Different colors/themes
5. With icons (leading and trailing)
6. With avatar
7. With remove button
8. Selected and disabled states
9. Clickable chips with events
10. Chips with truncated text
11. Chip collections/groups
12. Interactive examples demonstrating keyboard navigation

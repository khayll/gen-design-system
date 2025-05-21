# Toggle Component

Create a versatile toggle component for the design system that allows users to switch between two states (on/off, true/false, active/inactive). The toggle should provide a clear visual indication of its current state and offer smooth transitions between states.

## Requirements:

1. Support for binary states: checked/unchecked (on/off)
2. Support for different sizes: small, medium (default), large
3. Support for different visual styles: default, pill, square, ios-style, material-style
4. Support for different states: default, disabled, loading, read-only
5. Support for customizable colors for track and thumb in both states
6. Support for icons within the toggle thumb or on either side of the track
7. Support for labels on left, right, or both sides of the toggle
8. Support for animation/transition when changing states
9. Support for focus states and keyboard interaction
10. Support for indeterminate state (optional)
11. Support for optional text on the track ("ON"/"OFF" or similar)
12. Support for custom backgrounds, borders, and shadows

## Props:

- `checked`: boolean - Whether the toggle is checked (on)
- `defaultChecked`: boolean - Default checked state (uncontrolled component)
- `disabled`: boolean - Whether the toggle is disabled
- `loading`: boolean - Whether the toggle is in loading state
- `readonly`: boolean - Whether the toggle is read-only
- `size`: string - Toggle size ('sm', 'md', 'lg')
- `variant`: string - Visual style ('default', 'pill', 'square', 'ios', 'material')
- `color`: string - Color theme for the toggle ('primary', 'secondary', 'success', etc.)
- `label`: string - Text label for the toggle
- `labelPosition`: string - Position of the label ('left', 'right')
- `showLabelsOnTrack`: boolean - Whether to show on/off text on the track
- `onLabel`: string - Text to show on the track when checked (default: "ON")
- `offLabel`: string - Text to show on the track when unchecked (default: "OFF")
- `thumbIcon`: string - Icon to display in the toggle thumb
- `thumbCheckedIcon`: string - Icon to display in the thumb when checked (if different)
- `thumbUncheckedIcon`: string - Icon to display in the thumb when unchecked (if different)
- `name`: string - Name attribute for form submission
- `value`: string - Value attribute for form submission
- `required`: boolean - Whether the toggle is required in a form
- `indeterminate`: boolean - Whether the toggle is in indeterminate state
- `animationDuration`: number - Duration of the toggle animation in milliseconds

## Events:

- `change`: CustomEvent - Fired when the toggle state changes
- `focus`: CustomEvent - Fired when the toggle receives focus
- `blur`: CustomEvent - Fired when the toggle loses focus
- `keydown`: CustomEvent - Fired on keyboard interaction

## CSS Custom Properties:

- `--gds-toggle-width`: Width of the toggle
- `--gds-toggle-height`: Height of the toggle
- `--gds-toggle-thumb-size`: Size of the toggle thumb
- `--gds-toggle-thumb-color`: Color of the toggle thumb when unchecked
- `--gds-toggle-thumb-color-checked`: Color of the toggle thumb when checked
- `--gds-toggle-track-color`: Color of the toggle track when unchecked
- `--gds-toggle-track-color-checked`: Color of the toggle track when checked
- `--gds-toggle-border-radius`: Border radius of the toggle
- `--gds-toggle-transition-duration`: Duration of the toggle animation
- `--gds-toggle-focus-ring-color`: Color of the focus ring
- `--gds-toggle-disabled-opacity`: Opacity when toggle is disabled
- `--gds-toggle-label-gap`: Gap between toggle and label
- `--gds-toggle-label-font-size`: Font size of the label
- `--gds-toggle-label-color`: Color of the label
- `--gds-toggle-track-text-color`: Color of the text on the track
- `--gds-toggle-thumb-shadow`: Shadow of the toggle thumb
- `--gds-toggle-track-border`: Border of the toggle track
- `--gds-toggle-padding`: Internal padding within the toggle

## Example Usage:

```html
<!-- Basic toggle -->
<gds-toggle></gds-toggle>

<!-- Toggle with default checked state -->
<gds-toggle defaultChecked></gds-toggle>

<!-- Disabled toggle -->
<gds-toggle disabled></gds-toggle>

<!-- Toggle with label -->
<gds-toggle label="Dark Mode"></gds-toggle>

<!-- Toggle with label on the left -->
<gds-toggle label="Enable notifications" labelPosition="left"></gds-toggle>

<!-- Large toggle with custom colors -->
<gds-toggle 
  size="lg"
  color="success"
></gds-toggle>

<!-- Toggle with ON/OFF text on track -->
<gds-toggle 
  showLabelsOnTrack
  onLabel="ON"
  offLabel="OFF"
></gds-toggle>

<!-- iOS-style toggle -->
<gds-toggle 
  variant="ios"
  color="primary"
></gds-toggle>

<!-- Toggle with icons -->
<gds-toggle 
  thumbCheckedIcon="sun"
  thumbUncheckedIcon="moon"
></gds-toggle>

<!-- Required toggle in a form -->
<form>
  <gds-toggle 
    name="terms"
    required
    label="I agree to the terms and conditions"
  ></gds-toggle>
  <button type="submit">Submit</button>
</form>

<!-- Toggle with loading state -->
<gds-toggle loading></gds-toggle>
```

## Toggle vs Checkbox:

While both toggles and checkboxes are binary controls, they have different use cases:

1. **Toggles** are best for:
   - Immediate actions (e.g., turning something on/off)
   - Settings that take effect immediately
   - Binary choices with clear opposing states
   - Mobile-friendly interfaces

2. **Checkboxes** are best for:
   - Selections that will be submitted later
   - Lists of options where multiple items can be selected
   - Confirmation of agreement (e.g., terms and conditions)
   - When space is limited

## Accessibility Requirements:

1. Ensure proper semantic HTML structure:
   - Use `<button>` or correctly configured `<input type="checkbox">` internally
   - Ensure the component can receive focus

2. Keyboard support:
   - Tab to focus the toggle
   - Space or Enter to toggle the state
   - Ensure focus indication is clearly visible

3. ARIA attributes:
   - `aria-checked` to indicate the current state
   - `aria-disabled` when disabled
   - `aria-readonly` when read-only
   - `aria-labelledby` or `aria-label` for accessible name
   - `role="switch"` if not using a native checkbox

4. Form integration:
   - Proper label association
   - Support for form validation
   - Support for required attribute

5. Visual considerations:
   - Sufficient color contrast for both states
   - State indication beyond just color (position, icons)
   - Clear focus indication

## Storybook Examples:

Please include stories for:
1. Basic toggle (checked and unchecked states)
2. All sizes (small, medium, large)
3. All variants (default, pill, square, ios, material)
4. Different colors
5. With labels (different positions)
6. Disabled state
7. Loading state
8. Read-only state
9. With icons in thumb
10. With text on track
11. Toggle in forms (with validation)
12. Custom styling examples
13. Keyboard interaction demonstration

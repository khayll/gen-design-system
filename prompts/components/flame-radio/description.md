# Flame Radio Button Component

Create a visually striking custom radio button component for the design system that features animated flames when selected. This eye-catching component maintains all the functionality of a standard radio button while adding a playful, animated effect that can be used to highlight important choices or add visual flair to forms.

## Requirements:

1. Maintain all standard radio button functionality (selection, grouping, form integration)
2. Feature animated flames that appear/intensify when the radio button is selected
3. Support different flame animation styles: subtle, moderate, intense
4. Support different flame color schemes: standard (orange/red), blue, green, purple, rainbow
5. Support different sizes: small, medium (default), large
6. Support all standard states: default, hover, focus, selected, disabled
7. Support custom labels with flexible positioning
8. Ensure animations can be disabled for users with motion sensitivity
9. Support for custom backgrounds and flame container shapes (circle, square, hexagon)
10. Provide smooth animation transitions when state changes
11. Ensure proper accessibility despite custom styling
12. Support high contrast mode for accessibility
13. Allow flames to be visible only on hover (optional setting)

## Props:

- `name`: string - Name for form submission (radio button group name)
- `value`: string - Value for the radio button
- `checked`: boolean - Whether the radio button is checked
- `defaultChecked`: boolean - Default checked state (uncontrolled)
- `disabled`: boolean - Whether the radio button is disabled
- `required`: boolean - Whether the radio button is required in a form
- `label`: string - Label text
- `labelPosition`: string - Position of the label ('left', 'right', 'top', 'bottom')
- `size`: string - Size of the component ('sm', 'md', 'lg')
- `flameIntensity`: string - Intensity of the flame animation ('subtle', 'moderate', 'intense')
- `flameColor`: string - Color scheme for the flames ('standard', 'blue', 'green', 'purple', 'rainbow')
- `flameContainer`: string - Shape of the container for flames ('circle', 'square', 'hexagon')
- `disableAnimation`: boolean - Whether to disable animations (for accessibility)
- `showFlamesOnHoverOnly`: boolean - Show flames only on hover, even when selected
- `customClass`: string - Additional CSS class for styling
- `highContrast`: boolean - Enable high contrast mode for accessibility

## Events:

- `change`: CustomEvent - Fired when the radio button's checked state changes
- `focus`: CustomEvent - Fired when the radio button receives focus
- `blur`: CustomEvent - Fired when the radio button loses focus
- `animationComplete`: CustomEvent - Fired when a flame animation cycle completes

## CSS Custom Properties:

- `--gds-flame-radio-size`: Size of the radio button
- `--gds-flame-radio-color`: Base color of the radio button
- `--gds-flame-radio-checked-color`: Color of the radio button when checked
- `--gds-flame-radio-border`: Border of the radio button
- `--gds-flame-radio-bg`: Background of the radio button
- `--gds-flame-radio-disabled-opacity`: Opacity when disabled
- `--gds-flame-radio-flame-height`: Height of the flame animation
- `--gds-flame-radio-flame-width`: Width of the flame animation area
- `--gds-flame-radio-flame-color-primary`: Primary flame color
- `--gds-flame-radio-flame-color-secondary`: Secondary flame color
- `--gds-flame-radio-flame-color-tertiary`: Tertiary flame color (for gradient effects)
- `--gds-flame-radio-animation-duration`: Duration of the flame animation
- `--gds-flame-radio-animation-timing`: Timing function for the animation
- `--gds-flame-radio-label-gap`: Gap between the radio button and label
- `--gds-flame-radio-focus-ring-color`: Color of the focus ring
- `--gds-flame-radio-container-padding`: Padding around the radio button for the flames

## Example Usage:

```html
<!-- Basic flame radio button -->
<gds-flame-radio name="option" value="fire"></gds-flame-radio>

<!-- With label and default checked -->
<gds-flame-radio 
  name="element" 
  value="fire" 
  label="Fire Element" 
  defaultChecked
></gds-flame-radio>

<!-- Blue flames with high intensity -->
<gds-flame-radio 
  name="spell" 
  value="bluefire" 
  label="Blue Fire Spell"
  flameColor="blue"
  flameIntensity="intense"
></gds-flame-radio>

<!-- Disabled state -->
<gds-flame-radio 
  name="locked" 
  value="locked" 
  label="Locked Option"
  disabled
></gds-flame-radio>

<!-- Large size with subtle green flames in hexagon container -->
<gds-flame-radio 
  name="power" 
  value="nature" 
  label="Nature Power"
  size="lg"
  flameColor="green"
  flameIntensity="subtle"
  flameContainer="hexagon"
></gds-flame-radio>

<!-- Accessible version with animations disabled -->
<gds-flame-radio 
  name="accessible" 
  value="noflames" 
  label="No Animations"
  disableAnimation
  highContrast
></gds-flame-radio>

<!-- Radio button group with different flame styles -->
<div role="radiogroup" aria-labelledby="element-selection">
  <h3 id="element-selection">Choose your element:</h3>
  <gds-flame-radio name="element" value="fire" label="Fire" flameColor="standard"></gds-flame-radio>
  <gds-flame-radio name="element" value="ice" label="Ice" flameColor="blue"></gds-flame-radio>
  <gds-flame-radio name="element" value="nature" label="Nature" flameColor="green"></gds-flame-radio>
  <gds-flame-radio name="element" value="arcane" label="Arcane" flameColor="purple"></gds-flame-radio>
  <gds-flame-radio name="element" value="prismatic" label="Prismatic" flameColor="rainbow"></gds-flame-radio>
</div>
```

## Animation Implementation Guidance:

1. **Base Flame Animation**:
    - Use CSS animations with SVG or pseudo-elements to create flickering flame effects
    - Implement randomized subtle variations in the flame movement
    - Use layered elements with different opacity and animation timing

2. **Performance Considerations**:
    - Optimize animations to minimize CPU usage
    - Consider using CSS `will-change` property for better performance
    - Use `requestAnimationFrame` for JavaScript-based animations
    - Respect user preferences for reduced motion (`prefers-reduced-motion` media query)

3. **Flame Styles**:
    - Subtle: Small, gentle flames with minimal movement
    - Moderate: Medium-sized flames with regular movement
    - Intense: Large, dramatic flames with rapid movement and particle effects

4. **Color Variations**:
    - Standard: Orange/yellow/red gradient for realistic fire
    - Blue: Blue/cyan gradient for cool fire effect
    - Green: Green/teal gradient for nature-themed fire
    - Purple: Purple/pink gradient for arcane/magic themed fire
    - Rainbow: Shifting color spectrum for special effects

## Accessibility Requirements:

1. Ensure proper semantic HTML structure:
    - Use `<input type="radio">` internally
    - Ensure the component can receive focus

2. Keyboard support:
    - Tab to focus the radio button
    - Space to select the radio button
    - Arrow keys to navigate between radio buttons in a group

3. ARIA attributes:
    - `aria-checked` to indicate the current state
    - `aria-disabled` when disabled
    - `aria-labelledby` or `aria-label` for accessible name
    - Proper grouping with `role="radiogroup"`

4. Respect user preferences:
    - Honor `prefers-reduced-motion` media query
    - Provide high contrast mode
    - Ensure animation doesn't interfere with usability

5. Visual considerations:
    - Sufficient color contrast even with flame animations
    - State indication beyond just animation and color
    - Clear focus indication

## Storybook Examples:

Please include stories for:
1. Basic flame radio button (checked and unchecked states)
2. All flame intensity levels
3. All flame color schemes
4. All sizes
5. All container shapes
6. Different label positions
7. Radio button group with different flame styles
8. Animated vs. non-animated versions (for accessibility)
9. High contrast mode
10. Disabled state
11. Keyboard interaction demonstration
12. Hover-only flame effect
13. Flame animation cycle showcase
# Slider Component v1

Create a versatile slider component for the design system that allows users to select a value or range from a min-max range by dragging a handle or clicking on the track.

## Requirements:

1. Support for single value and range (dual handles) modes
2. Support for different orientations: horizontal (default) and vertical
3. Support for different sizes: small, medium (default), large
4. Support for custom min and max values
5. Support for custom step values (including decimal steps)
6. Support for marks/ticks along the track
7. Support for labels (at min, max, and custom positions)
8. Support for tooltips showing the current value(s)
9. Support for disabled state
10. Support for custom formatting of displayed values
11. Support for different track styles (continuous, segmented)
12. Ensure proper focus states for accessibility
13. Support for keyboard navigation (arrow keys, page up/down, home/end)
14. Support for touch and mouse interactions

## Props:

- `value`: number | [number, number] - Current value (single or range)
- `min`: number - Minimum value (default: 0)
- `max`: number - Maximum value (default: 100)
- `step`: number - Step increment (default: 1)
- `range`: boolean - Whether to use range mode with two handles
- `orientation`: string - 'horizontal' or 'vertical'
- `size`: string - Size of the slider ('sm', 'md', 'lg')
- `disabled`: boolean - Whether the slider is disabled
- `showTooltip`: boolean | string - When to show tooltip ('always', 'hover', 'drag', false)
- `tooltipFormat`: function - Function to format tooltip values
- `labelFormat`: function - Function to format label values
- `marks`: boolean | array - Whether to show marks at each step, or an array of custom marks
- `labels`: boolean | array - Whether to show labels at min/max, or an array of custom labels
- `showValues`: boolean - Whether to show min/max values
- `trackStyle`: string - Track style ('continuous', 'segmented')
- `color`: string - Color scheme for the slider
- `invertColors`: boolean - Whether to invert the track coloring

## Events:

- `input`: CustomEvent - Fired continuously during value change (drag)
- `change`: CustomEvent - Fired when value change is confirmed (drag end, click)
- `focus`: CustomEvent - Fired when slider handle gains focus
- `blur`: CustomEvent - Fired when slider handle loses focus

## CSS Custom Properties:

- `--gds-slider-height`: Height of the slider track
- `--gds-slider-track-color`: Color of the unfilled part of the track
- `--gds-slider-track-filled-color`: Color of the filled part of the track
- `--gds-slider-handle-size`: Size of the handle
- `--gds-slider-handle-color`: Color of the handle
- `--gds-slider-handle-border`: Border of the handle
- `--gds-slider-handle-focus-shadow`: Shadow effect when handle is focused
- `--gds-slider-disabled-opacity`: Opacity when slider is disabled
- `--gds-slider-mark-size`: Size of the marks/ticks
- `--gds-slider-mark-color`: Color of the marks/ticks
- `--gds-slider-tooltip-bg`: Background color of the tooltip
- `--gds-slider-tooltip-text-color`: Text color of the tooltip
- `--gds-slider-label-color`: Color of the slider labels
- `--gds-slider-label-font-size`: Font size of the slider labels

## Example Usage:

```html
<!-- Basic slider -->
<gds-slider value="50"></gds-slider>

<!-- Range slider -->
<gds-slider range value="[20, 80]"></gds-slider>

<!-- Slider with custom min/max and step -->
<gds-slider min="0" max="1" step="0.01" value="0.5"></gds-slider>

<!-- Slider with marks and labels -->
<gds-slider marks labels showValues></gds-slider>

<!-- Custom colored slider -->
<gds-slider color="success"></gds-slider>

<!-- Disabled slider -->
<gds-slider value="30" disabled></gds-slider>

<!-- Vertical slider -->
<gds-slider orientation="vertical" height="200px"></gds-slider>

<!-- Slider with custom marks and labels -->
<gds-slider 
  marks="[0, 25, 50, 75, 100]" 
  labels="[{value: 0, label: 'Min'}, {value: 50, label: 'Mid'}, {value: 100, label: 'Max'}]"
></gds-slider>

<!-- Slider with custom tooltip formatting -->
<gds-slider 
  min="0" 
  max="1000" 
  value="250" 
  tooltipFormat="(value) => `$${value}`"
></gds-slider>
```

## Accessibility Requirements:

1. Use proper ARIA attributes:
    - `role="slider"`
    - `aria-valuemin`
    - `aria-valuemax`
    - `aria-valuenow`
    - `aria-valuetext` (for formatted display of the value)
    - `aria-orientation`
    - `aria-disabled` (when disabled)
    - `aria-label` or `aria-labelledby` (for identifying the slider)

2. Keyboard navigation:
    - Arrow keys (Left/Right or Up/Down) to move by one step
    - Page Up/Down to move by larger amounts (e.g., 10%)
    - Home/End to move to min/max values
    - Tab to focus the handle

3. Ensure adequate color contrast between:
    - Track and background
    - Handle and track
    - Labels and background

4. Ensure tooltip is accessible to screen readers

## Storybook Examples:

Please include stories for:
1. Basic slider with default settings
2. Range slider (dual handles)
3. Different sizes (small, medium, large)
4. Horizontal and vertical orientations
5. With marks/ticks
6. With labels
7. With tooltips (different display modes)
8. Disabled state
9. Different colors/themes
10. Custom min/max and step values
11. Custom tooltip formatting
12. Interactive example with event display


# Modal Component

Create a flexible modal dialog component for the GDS design system that can be used for confirmations, alerts, and content display throughout applications.

## Requirements:

1. Support opening and closing with animations
2. Backdrop overlay with configurable opacity
3. Customizable header, content, and footer sections
4. Multiple size options: small, medium (default), large, and full-screen
5. Support for close button in the header
6. Ability to close on backdrop click (configurable)
7. Ability to close on ESC key press (configurable)
8. Focus trap for accessibility (focus should stay within the modal when open)
9. Return focus to trigger element when closed
10. Support for scrollable content when the modal content is larger than the viewport
11. Responsive design that works well on mobile devices
12. Support for custom positions (center, top, right, bottom, left)

## Props:

- `open`: boolean - Whether the modal is open
- `size`: string - The modal size ('sm', 'md', 'lg', 'full')
- `position`: string - The modal position ('center', 'top', 'right', 'bottom', 'left')
- `closeOnBackdrop`: boolean - Whether clicking the backdrop closes the modal
- `closeOnEsc`: boolean - Whether pressing ESC closes the modal
- `backdropOpacity`: number - The opacity of the backdrop (0-1)
- `showCloseButton`: boolean - Whether to show the close button in the header
- `ariaLabel`: string - Accessible label for the modal
- `ariaDescribedby`: string - ID of element describing the modal
- `preventScroll`: boolean - Whether to prevent body scrolling when modal is open
- `animation`: string - Animation style ('fade', 'slide', 'scale', 'none')
- `animationDuration`: number - Animation duration in milliseconds

## Slots:

- `header` - The modal header content
- `default` - The modal main content
- `footer` - The modal footer content

## Events:

- `open`: CustomEvent - Fired when modal opens
- `close`: CustomEvent - Fired when modal closes
- `backdrop-click`: CustomEvent - Fired when backdrop is clicked

## CSS Custom Properties:

- `--gds-modal-z-index`: Z-index for the modal
- `--gds-modal-border-radius`: Border radius for the modal
- `--gds-modal-background`: Background color for the modal
- `--gds-modal-shadow`: Shadow for the modal
- `--gds-modal-header-padding`: Padding for the header
- `--gds-modal-content-padding`: Padding for the content
- `--gds-modal-footer-padding`: Padding for the footer
- `--gds-modal-backdrop-color`: Color for the backdrop
- `--gds-modal-max-height`: Maximum height for the modal
- `--gds-modal-max-width`: Maximum width for the modal

## Example Usage:

```html
<!-- Basic modal -->
<gds-modal open aria-label="Example Modal">
  <div slot="header">Modal Title</div>
  <div>This is the modal content.</div>
  <div slot="footer">
    <button onclick="closeModal()">Close</button>
    <button onclick="saveModal()">Save</button>
  </div>
</gds-modal>

<!-- Confirmation modal -->
<gds-modal size="sm" position="center" animation="scale">
  <div slot="header">Confirm Action</div>
  <div>Are you sure you want to delete this item?</div>
  <div slot="footer">
    <button onclick="cancelDelete()">Cancel</button>
    <button onclick="confirmDelete()">Delete</button>
  </div>
</gds-modal>

<!-- Full-screen modal -->
<gds-modal size="full" close-on-backdrop="false" close-on-esc="false">
  <div slot="header">
    <h2>Full Screen Modal</h2>
    <button onclick="closeFullscreenModal()">Close</button>
  </div>
  <div style="height: 100%; overflow: auto;">
    <!-- Scrollable content here -->
  </div>
</gds-modal>
```

## Accessibility Requirements:

1. When open, focus should automatically move to the first focusable element in the modal
2. Focus should be trapped inside the modal when open
3. When closed, focus should return to the element that triggered the modal
4. The modal should have proper ARIA attributes (role="dialog", aria-modal="true")
5. ESC key should close the modal (unless configured otherwise)
6. All interactive elements should be keyboard accessible

## Storybook Examples:

Please include stories for:
1. Default modal (medium size, centered)
2. Different sizes (small, medium, large, full-screen)
3. Different positions
4. With and without header/footer
5. Modal with scrollable content
6. Modal with forms
7. Modal with custom animations
8. Confirmation dialog example
9. Alert dialog example
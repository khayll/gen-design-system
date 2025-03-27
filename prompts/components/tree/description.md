# Tree Component

Create a versatile tree component for the design system that can display hierarchical data structures with expandable/collapsible nodes. This component should support navigation, selection, and manipulation of hierarchical data such as file systems, organization charts, or category hierarchies.

## Requirements:

1. Support for displaying hierarchical data with parent and child nodes
2. Support for expandable/collapsible nodes with state persistence
3. Support for different selection modes: none, single, multiple
4. Support for icons and custom node rendering
5. Support for checkboxes on nodes (optional)
6. Support for keyboard navigation and accessibility
7. Support for searching/filtering nodes
8. Support for drag and drop operations (optional)
9. Support for node editing, adding, and removal (optional)
10. Support for lazy loading of child nodes
11. Support for node context menus
12. Support for animations when expanding/collapsing nodes
13. Support for custom node styling based on state or type
14. Ensure proper ARIA attributes for screen readers

## Props:

- `data`: array | object - The hierarchical data to display
- `expandedKeys`: array - Array of node keys that are expanded
- `selectedKeys`: array - Array of node keys that are selected
- `checkedKeys`: array - Array of node keys that are checked (if using checkboxes)
- `selectionMode`: string - Selection mode ('none', 'single', 'multiple')
- `showCheckboxes`: boolean - Whether to show checkboxes for nodes
- `showIcons`: boolean - Whether to show icons for nodes
- `showLines`: boolean - Whether to show connecting lines between nodes
- `nodeIndent`: number - Indentation space for each level
- `defaultExpandAll`: boolean - Whether to expand all nodes by default
- `defaultExpandParent`: boolean - Whether to expand parent nodes by default
- `autoExpandParent`: boolean - Whether to automatically expand parent nodes when a child is selected
- `draggable`: boolean - Whether nodes can be dragged
- `droppable`: boolean - Whether nodes can accept drops
- `editable`: boolean - Whether nodes can be edited
- `searchable`: boolean - Whether tree supports searching/filtering
- `searchValue`: string - Current search term
- `searchMode`: string - How to match search ('contains', 'startsWith', 'equals')
- `searchHighlight`: boolean - Whether to highlight matching text
- `loadData`: function - Function to load data asynchronously
- `itemHeight`: number - Fixed height for nodes (for virtual scrolling)
- `virtualScroll`: boolean - Whether to use virtual scrolling for large trees
- `nodeRenderer`: function - Custom renderer for nodes
- `iconRenderer`: function - Custom renderer for icons
- `emptyText`: string - Text to show when tree is empty
- `noMatchText`: string - Text to show when search has no matches

## Events:

- `expand`: CustomEvent - Fired when a node is expanded/collapsed
- `select`: CustomEvent - Fired when node selection changes
- `check`: CustomEvent - Fired when node checkbox state changes
- `dragstart`: CustomEvent - Fired when node drag starts
- `dragover`: CustomEvent - Fired when dragging over a node
- `drop`: CustomEvent - Fired when a node is dropped
- `edit`: CustomEvent - Fired when a node is edited
- `add`: CustomEvent - Fired when a node is added
- `remove`: CustomEvent - Fired when a node is removed
- `contextmenu`: CustomEvent - Fired when context menu is requested for a node
- `load`: CustomEvent - Fired when data is loaded asynchronously
- `searchchange`: CustomEvent - Fired when search criteria changes

## CSS Custom Properties:

- `--gds-tree-font-size`: Font size of node text
- `--gds-tree-line-height`: Line height of node text
- `--gds-tree-node-height`: Height of each node
- `--gds-tree-node-padding`: Padding within each node
- `--gds-tree-node-indent`: Indentation for each level
- `--gds-tree-node-color`: Text color of nodes
- `--gds-tree-node-bg`: Background color of nodes
- `--gds-tree-node-hover-bg`: Background color of nodes on hover
- `--gds-tree-node-selected-bg`: Background color of selected nodes
- `--gds-tree-node-selected-color`: Text color of selected nodes
- `--gds-tree-node-disabled-color`: Text color of disabled nodes
- `--gds-tree-icon-color`: Color of node icons
- `--gds-tree-icon-size`: Size of node icons
- `--gds-tree-line-color`: Color of connecting lines
- `--gds-tree-checkbox-color`: Color of checkboxes
- `--gds-tree-highlight-color`: Color for highlighted search matches
- `--gds-tree-drag-over-color`: Color indication when dragging over a node
- `--gds-tree-transition-duration`: Duration for expand/collapse animations

## Example Usage:

```html
<!-- Basic tree -->
<gds-tree 
  data="[
    { key: '1', label: 'Parent 1', children: [
      { key: '1-1', label: 'Child 1-1' },
      { key: '1-2', label: 'Child 1-2' }
    ]},
    { key: '2', label: 'Parent 2', children: [
      { key: '2-1', label: 'Child 2-1' }
    ]}
  ]"
></gds-tree>

<!-- Tree with selection and expanded nodes -->
<gds-tree 
  data="treeData"
  selectionMode="multiple"
  expandedKeys="['1', '2']"
  selectedKeys="['1-1']"
></gds-tree>

<!-- Tree with checkboxes -->
<gds-tree 
  data="fileSystemData"
  showCheckboxes
  checkedKeys="['1-1', '2-1']"
></gds-tree>

<!-- Tree with custom icons -->
<gds-tree 
  data="fileSystemData"
  showIcons
  iconRenderer="(node) => node.isDirectory ? 'folder' : 'file'"
></gds-tree>

<!-- Searchable tree -->
<gds-tree 
  data="largeDataset"
  searchable
  searchValue="search term"
  searchHighlight
></gds-tree>

<!-- Tree with drag and drop -->
<gds-tree 
  data="organizedData"
  draggable
  droppable
></gds-tree>

<!-- Tree with virtual scrolling for large datasets -->
<gds-tree 
  data="thousandsOfNodes"
  virtualScroll
  itemHeight="30"
></gds-tree>

<!-- Tree with lazy loading -->
<gds-tree 
  data="baseNodes"
  loadData="(node) => fetchChildrenForNode(node)"
></gds-tree>
```

## Data Structure Example:

```javascript
[
  {
    key: 'node1',           // Unique identifier for the node
    label: 'Node 1',        // Display text
    children: [             // Child nodes (optional)
      {
        key: 'node1-1',
        label: 'Node 1.1',
        icon: 'document',   // Custom icon (optional)
        disabled: false,    // Whether the node is disabled (optional)
        selectable: true,   // Whether the node can be selected (optional)
        checkable: true,    // Whether the node can be checked (optional)
        draggable: true,    // Whether the node can be dragged (optional)
        droppable: true,    // Whether other nodes can be dropped onto this node (optional)
        isLeaf: false,      // Whether the node is a leaf node (no children) (optional)
        data: {}            // Custom data attached to the node (optional)
      }
    ],
    expanded: false,        // Whether the node is expanded (optional)
    selected: false,        // Whether the node is selected (optional)
    checked: false,         // Whether the node is checked (optional)
    loading: false,         // Whether the node is loading children (optional)
    className: 'custom-node' // Custom CSS class for the node (optional)
  },
  // More nodes...
]
```

## Accessibility Requirements:

1. Use proper ARIA roles:
   - `role="tree"` for the tree container
   - `role="treeitem"` for individual nodes
   - `role="group"` for groups of tree items (children of a node)

2. Use appropriate ARIA attributes:
   - `aria-expanded` to indicate expanded/collapsed state
   - `aria-selected` to indicate selection state
   - `aria-checked` for checkbox state (if applicable)
   - `aria-disabled` for disabled nodes
   - `aria-level` to indicate the nesting level
   - `aria-posinset` and `aria-setsize` for position within a level
   - `aria-label` or `aria-labelledby` for identifying the tree
   - `aria-owns` to associate child nodes with their parent

3. Keyboard navigation:
   - Arrow keys (Up/Down) to navigate between visible nodes
   - Arrow keys (Left/Right) to collapse/expand nodes
   - Home/End to go to first/last visible node
   - Enter to select a node
   - Space to toggle checkbox state
   - Type-ahead functionality to navigate to nodes starting with typed characters
   - Tab should focus on the tree as a whole, not individual nodes

## Storybook Examples:

Please include stories for:
1. Basic tree with default settings
2. Tree with different selection modes (none, single, multiple)
3. Tree with checkboxes
4. Tree with custom icons
5. Tree with connecting lines
6. Tree with search/filter functionality
7. Tree with drag and drop
8. Tree with editing capabilities
9. Tree with virtual scrolling for large datasets
10. Tree with lazy loading
11. Tree with custom node rendering
12. Accessibility demonstration (keyboard navigation, screen reader compatibility)

Make sure to have items in th tree for all examples and showcases.





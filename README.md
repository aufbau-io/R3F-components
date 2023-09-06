# Globe Visualization Module

This module provides a 3D globe visualization with selectable country points and a toggle-able torus marker.

// ## Directory Structure

```
- index.jsx: Entry point for the React application.
- Globe/: Contains all the relevant files and sub-components for the globe visualization.
  - Scene.jsx: Acts as the main container for the Globe visualization, and houses the primary logic for rendering.
  - components/: Contains the individual React components that make up the globe visualization.
    - Globe.jsx: Renders the globe and handles its interactions.
    - GeoJSON.jsx: Processes and renders country outlines and details on the globe using the provided GeoJSON data.
  - data/: Contains the necessary data files for the globe.
    - ne_110m_admin_0_countries.json: GeoJSON data for country outlines and details.
```

## Integration Steps

1. Ensure that the necessary packages are installed. Check `package.json` for the required dependencies.
2. Import the main `Scene` component where you'd like to display the globe in your main application:
   ```jsx
   import Scene from "./Globe/Scene.jsx";
   ```
3. Use the component in your render method:

   ```jsx
   <Scene />
   ```

4. If you'd like to customize or use specific props, refer to the prop types and default values inside each component file.

## Customization

- **Country Selection**: You can pre-select a country's location on the globe using the `country` prop. The available locations can be found in the exported `COUNTRIES` enum in `index.jsx`.

- **Torus Marker**: The torus can be toggled on or off using the `showTorus` prop on the `Scene` component.

## Notes for Development

- If you wish to add more country points or adjust existing ones, modify the `COUNTRIES` enum in `index.jsx`.
- Styles related to the globe should be placed within the `Globe` directory to maintain modularity.
- When adding new components or data files, ensure they are appropriately imported and exported for ease of use in other parts of the application.

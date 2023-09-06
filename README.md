# Globe Visualization Module

This module provides a 3D globe visualization with selectable country points and a toggle-able torus marker.

## Directory Structure

```
|── index.jsx: App entry point.
|
|── Globe/
|   |── Scene.jsx: Main globe container.
|   |
|   |── components/
|   |   |── Globe.jsx: Globe render & interactions.
|   |   |── GeoJSON.jsx: Renders country data.
|   |
|   |── data/
|       |── ne_110m_admin_0_countries.json: Country outlines.
```

## Integration Steps

1. Ensure that the necessary packages are installed. Check `package.json` for the required dependencies.
2. Import the main `Scene` component where you'd like to display the globe in your main application:
   ```jsx
   import Scene from "./Globe/Scene.jsx";
   ```
3. Use the component in your render method:

   ```jsx
   <Scene country={country} showTorus={showTorus} />
   ```

4. If you'd like to customize or use specific props, refer to the prop types and default values inside each component file.

## Customization

- **Country Selection**: You can pre-select a country's location on the globe using the `country` prop. The available locations can be found in the exported `COUNTRIES` enum in `index.jsx`.

- **Torus Marker**: The torus can be toggled on or off using the `showTorus` prop on the `Scene` component.

## Notes for Development

- If you wish to add more country points or adjust existing ones, modify the `COUNTRIES` enum in `index.jsx`. The long/lat for each country could also be stored in the main app logic.

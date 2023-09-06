# Globe Visualization Module

This module provides a 3D globe visualization with selectable country points and an optional torus marker.

## Directory Structure

```
/src
|── index.jsx: App entry point.
|
|── components/
|   |── Scene.jsx: Main globe container.
|   |── Globe.jsx: Globe render & interactions.
|   |── GeoJSON.jsx: Renders country data.
|
|── data/
    |── ne_110m_admin_0_countries.json: Country outlines.
```

## Integration Steps

1. Ensure that the necessary packages are installed. Check `package.json` for the required dependencies.
2. Import the main `VFXBreakdown` component where you'd like to display the globe in your main application:
   ```jsx
   import VFXBreakdown from "./components/VFXBreakdown.jsx";
   ```
3. Use the component in your render method:

   ```jsx
   <VFXBreakdown {TODO} />
   ```

## Notes for Development

-

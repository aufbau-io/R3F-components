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
2. Import the main `Scene` component where you'd like to display the globe in your main application:
   ```jsx
   import Globe from "./components/Scene.jsx";
   ```
3. Use the component in your render method:

   ```jsx
   <Globe country={country} showTorus={showTorus} />
   ```

## Notes for Development

- If you wish to add more country points or adjust existing ones, modify the `COUNTRIES` enum in `index.jsx`. The long/lat for each country could also be stored in the main app logic.

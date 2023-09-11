# VFX Breakdown Module

This module provides a VFX Breakdown component with a split-apart functionality on scroll

## Directory Structure

```
/src
|── index.jsx: App entry point.
|
|── components/
|   |── Scene.jsx: Main vfx-breakdown container. Handle scroll + scale.
|   |── Plane.jsx: Render Image textures on plane geometries.
```

## Integration Steps

1. Ensure that the necessary packages are installed. Check `package.json` for the required dependencies.
2. Import the main `VFXBreakdown` component where you'd like to display the globe in your main application:
   ```jsx
   import VFXBreakdown from "./components/Scene.jsx";
   ```
3. Use the component in your render method:

   ```jsx
   <VFXBreakdown />
   ```

## Notes for Development

- Images will scale down to fit a 2:1 aspect ratio for the plane geometries, while mainatining their original aspect ratios. For best results use images with a 2:1 aspect ratio or manually adjust.

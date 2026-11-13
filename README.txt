FNFY 3D update patch

Files:
- index.html: customer site with touch/mouse angle-image viewer and optional GLB/GLTF 3D model viewer.
- admin.html: adds an optional 3D Model URL field when adding a product.

Installation:
1. Keep your existing firebase-config.js and assets folder in the same project root.
2. Replace the current index.html and admin.html with these files.
3. Existing Firebase products/orders are not deleted or migrated.
4. Upload up to 4 photos of one product from different angles (front, side, back, other side) for the basic image-sequence rotation. Four photos create only a stepped 4-angle effect, not a continuous true 3D model.
5. For full smooth 3D rotation, host a .glb/.gltf file at a public HTTPS URL and paste it in the new 3D Model URL field when adding a product.
6. The 3D Model tab shows a viewer only when the product has model3dUrl.

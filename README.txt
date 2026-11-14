FNFY 3D WEBSITE UPDATE

Included:
- index.html: customer website with 360 photo drag, interactive 3D product viewer, and 3D fashion mannequin preview.
- admin.html: optional custom GLB/GLTF model URL field for each product.
- assets/models/fnfy-shirt.glb: generated stylized 3D shirt demo.
- assets/models/fnfy-pant.glb: generated stylized 3D pant demo.
- assets/models/fnfy-fashion-model.glb: generated stylized mannequin wearing shirt and pants.

INSTALL:
1. Keep your existing firebase-config.js in the project root.
2. Keep your existing assets/fnfy-logo.png and other current assets.
3. Replace the old index.html and admin.html with the two files in this package.
4. Upload the included assets/models folder to the same project root, preserving its folder path.
5. Upload/publish the changes to your existing GitHub repository.

IMPORTANT:
- Existing Firebase Realtime Database products, orders, tracking, reviews and customer data are not deleted or migrated by these files.
- The included GLB files are stylized demonstration models, not photorealistic garment scans or human-sized fashion photography.
- Product 3D viewer chooses the shirt or pant demo according to the product name/category. If an individual product has a custom GLB URL saved in Admin, that URL overrides the demo.
- Fashion Model tab displays the included mannequin wearing a shirt and pants.
- 360 Photos uses the existing product images. Four images from front/side/back/side give stepped angles, not continuous 3D.
- Full custom realistic product models can replace these demo GLB files later, or be set per product in Admin.
- model-viewer loads from unpkg CDN, so internet access is needed to render 3D.

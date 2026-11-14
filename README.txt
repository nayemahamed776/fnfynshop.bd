FNFY Reference Layout Update

Included:
- index.html: Try the Look, selectable Transparent PNG models, In This Look, horizontal Shirt/Pant collection, product details, cart, checkout, tracking and reviews.
- admin.html: Existing admin product/order management plus Fashion Models upload and product assignment.

Important deployment notes:
1. Keep your existing firebase-config.js, assets folder, and other existing project files.
2. Replace only index.html and admin.html in your GitHub repository.
3. Firebase Realtime Database must permit authenticated admin read/write on /fashionModels. Customer clients need read access to /fashionModels.
4. Upload actual transparent PNG files from Admin > Fashion Models. Do not convert them to JPG; JPG cannot retain transparency.
5. Footwear products are hidden from the customer storefront. Product records are not deleted from Firebase.
6. The existing product, order, tracking, cart, checkout and review database paths are retained.
7. Test with a backup copy first. No changes are made to your live GitHub or Firebase account by this package.

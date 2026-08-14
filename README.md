FNFY FINAL ALL FIXED

Features:
- Premium responsive FNFY storefront
- PNG logo in assets/fnfy-logo.png
- Product gallery, size/color, cart and order
- Firebase Realtime Database orders
- Admin order status: Pending, Confirmed, Delivered, Cancelled
- Customer Order Tracking by Order ID (status only)
- WhatsApp: 01965460567
- Facebook footer: https://www.facebook.com/share/19RWoj5v3K/
- Product Video URL field in Admin (YouTube embed URL)

IMPORTANT:
Firebase Storage is not enabled on the current project, so direct MP4 upload is NOT used. Use a YouTube embed URL in the Product Video field. Direct video-file upload requires Storage/billing or another video hosting service.

Upload these to the GitHub repository root:
index.html
admin.html
firebase-config.js
database.rules.json
assets/fnfy-logo.png

Then publish database.rules.json in Firebase Realtime Database > Rules.
Enable Authentication > Email/Password.


## LOGO FIX
The FNFY logo is included in BOTH:
- fnfy-logo.png
- assets/fnfy-logo.png

index.html uses `fnfy-logo.png` so it matches a GitHub repository where the logo is uploaded in the root.

After replacing index.html, upload fnfy-logo.png to the ROOT of the GitHub repository.

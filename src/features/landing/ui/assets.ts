/**
 * Landing page image slots — swap these files when final assets arrive.
 * Keep the same export names so components do not need changes.
 */
export const landingAssets = {
  heroCollage: '/landing/hero-collage.png',
  heroImg: '/landing/hero_img.png',
  heroPanel: '/landing/hero-panel.png',
  heroImgBg: '/landing/hero_img_bg.png',
  car: '/landing/car.png',
  bike: '/landing/bike.png',
  electronics: '/landing/electronics.png',
  furniture: '/landing/furniture.png',
  giftBox: '/landing/gift-box.png',
  avatars: [
    '/landing/avatar-1.png',
    '/landing/avatar-2.png',
    '/landing/avatar-3.png',
    '/landing/avatar-4.png',
  ] as const,
} as const;

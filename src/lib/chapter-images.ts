// Unsplash images for each WIPA chapter — free for commercial use
// Each image is a city skyline or defining landmark
export const chapterImages: Record<string, string> = {
  atlanta:
    "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=800&q=80",
  austin:
    "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=800&q=80",
  boston:
    "https://images.unsplash.com/photo-1501979376754-2ff867a4f659?w=800&q=80",
  chicago:
    "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80",
  cleveland:
    "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800&q=80",
  colorado:
    "https://images.unsplash.com/photo-1546156929-a4c0ac411f47?w=800&q=80",
  connecticut:
    "https://images.unsplash.com/photo-1513622790541-eaa84d356909?w=800&q=80",
  "dallas-fort-worth":
    "https://images.unsplash.com/photo-1612427730856-433176671cfe?w=800&q=80",
  "greater-cincinnati":
    "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=800&q=80",
  houston:
    "https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?w=800&q=80",
  minneapolis:
    "https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=800&q=80",
  nashville:
    "https://images.unsplash.com/photo-1587162146766-e06b1189b907?w=800&q=80",
  nebraska:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  "new-york":
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
  "las-vegas":
    "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800&q=80",
  "north-carolina":
    "https://images.unsplash.com/photo-1560840067-ddcaeb7831d2?w=800&q=80",
  philadelphia:
    "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=800&q=80",
  phoenix:
    "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80",
  "san-francisco-bay-area":
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
  seattle:
    "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?w=800&q=80",
  "southeast-florida":
    "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=800&q=80",
  "southern-california":
    "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=800&q=80",
  "st-louis":
    "https://images.unsplash.com/photo-1518544866330-4e716499f800?w=800&q=80",
  utah:
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
  washington:
    "https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800&q=80",
};

export function getChapterImage(slug: string): string {
  return (
    chapterImages[slug] ||
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
  );
}

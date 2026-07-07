import { GalleryImage, Wish } from './types';

const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL || 'https://assets.shintahsan.my.id/';

export const WEDDING_DATE = '2026-06-02T11:00:00+08:00';

export const GOOGLE_CALENDAR_LINK = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ahsan+%26+Shinta+Wedding&dates=20260602T110000/20260602T130000&Bismillahirrahmanirrahim.+Dengan+memohon+rahmat+Allah+SWT,+kami+mengundang+Anda+untuk+merayakan+pernikahan+kami.&location=Balai+Sidang+Bosowa+45,+Makassar&sf=true&output=xml";

export const QURAN_VERSE = {
  arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  english: "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy.",
  reference: "Surah Ar-Rum 30:21"
};

export const BANK_DETAILS = [
  {
    bankName: "Bank Mandiri",
    accountNumber: "1520031802479",
    accountName: "Ahsan Mubariz"
  }
];

// ...existing code...
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    url: `${ASSETS_BASE_URL}IMG_9588.jpg`,
    caption: ''
  },
  {
    id: 2,
    url: `${ASSETS_BASE_URL}IMG_9721.jpg`,
    caption: ''
  },
  {
    id: 3,
    url: `${ASSETS_BASE_URL}DSC04974.jpg`,
    caption: ''
  },
  {
    id: 4,
    url: `${ASSETS_BASE_URL}mycover.jpg`,
    caption: ''
  },
  {
    id: 5,
    url: `${ASSETS_BASE_URL}IMG_9685.jpg`,
    caption: ''
  },
  {
    id: 6,
    url: `${ASSETS_BASE_URL}DSC05547.jpg`,
    caption: ''
  },
  {
    id: 7,
    url: `${ASSETS_BASE_URL}IMG_9681.jpg`,
    caption: ''
  },
  {
    id: 8,
    url: `${ASSETS_BASE_URL}IMG_0079.jpg`,
    caption: ''
  },
  {
    id: 9,
    url: `${ASSETS_BASE_URL}ft1.png`,
    caption: ''
  },
  {
    id: 10,
    url: `${ASSETS_BASE_URL}ft2.png`,
    caption: ''
  },
  {
    id: 11,
    url: `${ASSETS_BASE_URL}ft3.png`,
    caption: ''
  },
  {
    id: 12,
    url: `${ASSETS_BASE_URL}ft4.png`,
    caption: ''
  },
  {
    id: 13,
    url: `${ASSETS_BASE_URL}ft5.png`,
    caption: ''
  },
  {
    id: 14,
    url: `${ASSETS_BASE_URL}ft6.png`,
    caption: ''
  },
  {
    id: 15,
    url: `${ASSETS_BASE_URL}ft7.png`,
    caption: ''
  },
  {
    id: 16,
    url: `${ASSETS_BASE_URL}ft8.png`,
    caption: ''
  }
];

export const MOCK_WISHES: Wish[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    message: 'Cannot wait to celebrate with you two! It’s going to be magical. ✨',
    timestamp: 'Today 9:41 AM'
  },
  {
    id: '2',
    name: 'Mike Ross',
    message: 'Congrats guys! You look perfect together.',
    timestamp: 'Yesterday'
  }
];
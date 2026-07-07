import { GalleryImage, Wish } from './types';

const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL || 'https://assets.example.com/';

export const WEDDING_DATE = '2026-12-12T11:00:00+07:00';

export const GOOGLE_CALENDAR_LINK = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=John+%26+Sarah+Wedding&dates=20261212T110000/20261212T130000&details=With+the+blessings+of+our+families,+we+invite+you+to+celebrate+our+wedding.&location=Grand+Ballroom,+Jakarta&sf=true&output=xml";

export const QURAN_VERSE = {
  arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  english: "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy.",
  reference: "Surah Ar-Rum 30:21"
};

export const BANK_DETAILS = [
  {
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "1234567890",
    accountName: "John Carter"
  }
];

export const RUNDOWN_ITEMS = [
    {
        time: '08:00',
        date: '10 Mei 2026',
        title: 'Akad Nikah',
        location: 'Desa A, Bandung',
        description: 'Prosesi sakral pengucapan janji suci pernikahan.'
    },
    {
        time: '11:00',
        date: '10 Juni 2026',
        title: 'Resepsi',
        location: 'Gedung XYZ, Jakarta',
        description: 'Ramah tamah dan perayaan bersama keluarga dan kerabat terdekat.'
    }
];
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    url: `${ASSETS_BASE_URL}a.jpg`,
    caption: ''
  },
  {
    id: 2,
    url: `${ASSETS_BASE_URL}b.jpg`,
    caption: ''
  },
  {
    id: 3,
    url: `${ASSETS_BASE_URL}c.jpg`,
    caption: ''
  },
  {
    id: 4,
    url: `${ASSETS_BASE_URL}d.jpg`,
    caption: ''
  },
  {
    id: 5,
    url: `${ASSETS_BASE_URL}e.jpg`,
    caption: ''
  },
  {
    id: 6,
    url: `${ASSETS_BASE_URL}f.jpg`,
    caption: ''
  },
  {
    id: 7,
    url: `${ASSETS_BASE_URL}g.jpg`,
    caption: ''
  },
  {
    id: 8,
    url: `${ASSETS_BASE_URL}h.jpg`,
    caption: ''
  },
  {
    id: 9,
    url: `${ASSETS_BASE_URL}i.png`,
    caption: ''
  },
  {
    id: 10,
    url: `${ASSETS_BASE_URL}j.png`,
    caption: ''
  },
  {
    id: 11,
    url: `${ASSETS_BASE_URL}k.png`,
    caption: ''
  },
  {
    id: 12,
    url: `${ASSETS_BASE_URL}l.png`,
    caption: ''
  },
  {
    id: 13,
    url: `${ASSETS_BASE_URL}m.png`,
    caption: ''
  },
  {
    id: 14,
    url: `${ASSETS_BASE_URL}n.png`,
    caption: ''
  },
  {
    id: 15,
    url: `${ASSETS_BASE_URL}o.png`,
    caption: ''
  },
  {
    id: 16,
    url: `${ASSETS_BASE_URL}p.png`,
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

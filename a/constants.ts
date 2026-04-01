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

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
    caption: 'The Proposal'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=2076&auto=format&fit=crop',
    caption: 'First Trip'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop',
    caption: 'Paris'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=2043&auto=format&fit=crop',
    caption: 'The Future'
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
import { GalleryImage, Wish } from './types';

const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL || 'https://assets.example.com/';

export const WEDDING_DATE = '2026-12-12T18:00:00';

export const GOOGLE_CALENDAR_LINK = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Sarah+%26+John&dates=20261212T180000/20261212T230000&details=Dengan+memohon+rahmat+Allah+SWT,+kami+mengundang+Anda+untuk+merayakan+pernikahan+kami.&location=Kediaman+Mempelai,+Bandung&sf=true&output=xml";

export const QURAN_VERSE = {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    english: "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy.",
    indonesian: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
    reference: "QS. Ar-Rum: 21"
};

export const BISMILLAH = "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ";

export const BANK_DETAILS = [
    {
        bankName: "Bank Rakyat Indonesia (BRI)",
        accountNumber: "123401005678901",
        accountName: "Sarah Carter"
    }
    , {
        bankName: "Seabank",
        accountNumber: "901623345678",
        accountName: "Sarah Carter"
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
    }, {
        id: 9,
        url: `${ASSETS_BASE_URL}i.jpg`,
        caption: ''
    }

];

export const MOCK_WISHES: Wish[] = [
    {
        id: '1',
        name: 'Sarah Fatimah',
        message: 'Barakallahu lakuma wa baraka alaikuma wa jamaʿa bainakuma fi khair. Semoga Allah memberkahi pernikahan kalian! 🤲',
        timestamp: 'Hari ini 09:41'
    },
    {
        id: '2',
        name: 'Ahmad Rizki',
        message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin.',
        timestamp: 'Kemarin'
    }
];

export const RUNDOWN_ITEMS = [
    {
        time: '08:00',
        title: 'Akad Nikah',
        location: 'Kediaman Mempelai, Bandung',
        description: 'Prosesi sakral pengucapan ijab qabul dengan ridho Allah SWT.'
    },
    {
        time: '12:00',
        title: 'Resepsi',
        location: 'Kediaman Mempelai, Bandung',
        description: 'Walimatul ursy bersama keluarga dan kerabat terdekat.'
    }
];

export const STORY_STEPS = [
    {
        year: '2023',
        title: 'When We Met',
        description: 'Kami tidak bertemu lewat rencana besar. Hanya sebuah pertemuan sederhana... Namun dari sana, percakapan kecil berubah menjadi rasa nyaman yang diam-diam tumbuh di hati.',
    },
    {
        year: '2024',
        title: 'Becoming Us',
        description: 'Hari demi hari, kami belajar saling mengenal. Bukan hanya tentang bahagia, tetapi juga tentang perbedaan, luka, dan doa. Karena cinta bukan tentang kesempurnaan, melainkan tentang saling bertahan.',
    },
    {
        year: '2026',
        title: 'A Sacred Promise',
        description: 'Dengan keyakinan yang semakin kuat, dan restu dari kedua keluarga, kami mengikat sebuah janji dalam pertunangan. Sebagai langkah serius menuju masa depan bersama',
    },
    {
        year: '2026',
        title: 'Our Forever Begins',
        description: 'Kini, dengan niat yang sama dan doa yang menyertai, kami memilih untuk menyempurnakan perjalanan ini dalam ikatan suci pernikahan. Sebagai awal baru untuk berbagi hidup, tumbuh, dan menua bersama.',
    }
];

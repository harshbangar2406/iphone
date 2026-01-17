
import { Project, ProjectDetailData } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'jhansi',
    title: 'Jhansi Cinematography',
    category: 'Cinematography',
    description: 'A cinematic exploration of traditional heritage and divine rhythm. This piece serves as a visual companion to the works of mine for jhansi audience.',
    thumbnail: 'https://www.tourmyindia.com/states/uttarpradesh/images/jhansi-fort.jpg',
    year: '2024',
    tools: ['After Effects', 'Premiere Pro', 'DaVinci Resolve']
  },
  {
    id: 'music-videos',
    title: 'The Music Videos',
    category: 'Filmography',
    description: 'A series of rhythmic narratives blending ethereal soundscapes with atmospheric visual pacing in the high Andes.',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070',
    year: '2023',
    tools: ['Avid Media Composer', 'Pro Tools']
  },
  {
    id: 'commercial-work',
    title: 'Commercial Collection',
    category: 'Experimental',
    description: 'High-energy visual poems for global brands, capturing urban entropy through rapid-fire cutting and glitch aesthetics.',
    thumbnail: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070',
    year: '2024',
    tools: ['Premiere Pro', 'Cinema 4D']
  },
  {
    id: 'blue-horizon',
    title: 'Blue Horizon',
    category: 'Narrative Short',
    description: 'Award-winning short film focused on subtle character performances and a cool, desaturated color grade.',
    thumbnail: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2070',
    year: '2022',
    tools: ['DaVinci Resolve', 'Premiere Pro']
  }
];

export const PROJECT_DETAILS: Record<string, ProjectDetailData> = {
  'jhansi': {
    title: "Jhansi: Cinematic Heritage",
    client: "Department of Tourism",
    year: "2024",
    role: "Director / Lead Editor",
    heroImage: "https://www.tourmyindia.com/states/uttarpradesh/images/jhansi-fort.jpg",
    videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
    technicalDescription: "Native 4K RAW workflow utilizing a non-linear temporal approach. Color grading was executed in ACES color space to ensure future-proof HDR delivery.",
    shots: [
      { id: 1, title: "The Fort Sentinel", description: "A sweeping drone shot capturing the fort's scale against a 10-bit sunset.", image: "https://images.unsplash.com/photo-1582533044719-79848e026210?q=80&w=1200", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", aspect: "21:9" },
      { id: 2, title: "Stone Whispers", description: "Macro study of ancient carvings, emphasizing texture and time-worn details.", image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=1200", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", aspect: "16:9" },
      { id: 3, title: "Rhythmic Ghats", description: "Motion study of river waves interacting with temple steps.", image: "https://images.unsplash.com/photo-1517672651691-24622a91b550?q=80&w=1200", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", aspect: "16:9" }
    ]
  },
  'music-videos': {
    title: "Andean Rhythms",
    client: "Independent Artist Collective",
    year: "2023",
    role: "Editor / Sound Designer",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    technicalDescription: "Focused on seamless sound-to-image synchronization. Every cut is mathematically aligned to transients to create a hypnotic 'pulse' effect.",
    shots: [
      { id: 1, title: "Summit Silence", description: "Static wide shot held for 12 seconds to establish the sense of isolation.", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", aspect: "2.39:1" },
      { id: 2, title: "Echoing Valleys", description: "Low-light performance capture with high-grain film emulation.", image: "https://images.unsplash.com/photo-1493246507139-91e8bef99c02?q=80&w=1200", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", aspect: "16:9" },
      { id: 3, title: "Temporal Pulse", description: "Double exposure sequence blending textures with movement.", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdown.mp4", aspect: "21:9" }
    ]
  },
  'commercial-work': {
    title: "Urban Entropy",
    client: "Tech Wear International",
    year: "2024",
    role: "Lead Editor",
    heroImage: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    technicalDescription: "Utilizing speed-ramping and AI-assisted frame interpolation to create fluid, surreal motion between urban landscapes.",
    shots: [
      { id: 1, title: "Neon Corridor", description: "Ultra-fast cuts synchronized to a heavy bass-line.", image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", aspect: "4:3" },
      { id: 2, title: "Concrete Jungle", description: "Drone-hyperlapse of the Shibuya crossing, processed with custom glitch filters.", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", aspect: "16:9" },
      { id: 3, title: "Liquid Light", description: "Macro capture of rain on glass, serving as a transitional motif.", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackAd.mp4", aspect: "21:9" }
    ]
  },
  'blue-horizon': {
    title: "Blue Horizon",
    client: "Silver Screen Films",
    year: "2022",
    role: "Lead Editor / Colorist",
    heroImage: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2070",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    technicalDescription: "A masterclass in restraint. The edit prioritizes breath and subtle eye-lines to build a quiet narrative tension.",
    shots: [
      { id: 1, title: "The Shoreline", description: "Desaturated teal and orange grade emphasizing the cold coastal environment.", image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1200", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", aspect: "16:9" },
      { id: 2, title: "Internal Monologue", description: "Tight close-up with shallow depth of field, focusing on micro-expressions.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", aspect: "2.35:1" },
      { id: 3, title: "Infinite Blue", description: "Final shot dissolving into a solid blue frame.", image: "https://images.unsplash.com/photo-1464802686167-b939a67e052c?q=80&w=1200", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", aspect: "16:9" }
    ]
  }
};

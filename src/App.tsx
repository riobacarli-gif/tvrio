import React, { useState, useEffect } from 'react';
import {
  Grab,
  Settings,
  MoreHorizontal,
  Clock,
  Wifi,
  Bluetooth,
  Mic,
  MicOff,
  Airplay,
  Moon,
  Tv,
  Camera,
  Sun,
  Cast,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Music,
  Radio,
  ExternalLink,
  CheckCircle2,
  LogOut,
  Key,
  Lock,
  RefreshCw,
  Check,
  ArrowLeft,
  Headphones,
  Laptop,
  Search,
  Grid,
  Film
} from 'lucide-react';

const BACKGROUND_LAYER_IMAGE = 'https://i.pinimg.com/1200x/10/49/b6/1049b6b4e21931cdced4d4f18c193f92.jpg';

const WALLPAPERS = [
  { id: 'wp-1', url: 'https://i.pinimg.com/1200x/10/49/b6/1049b6b4e21931cdced4d4f18c193f92.jpg', title: 'Wallpaper 1' },
  { id: 'wp-2', url: 'https://i.pinimg.com/1200x/b3/6d/53/b36d537173956754f46cb378d83c2a11.jpg', title: 'Wallpaper 2' },
  { id: 'wp-3', url: 'https://i.pinimg.com/1200x/13/5b/80/135b8031023bc124c5ea10d9f226ed00.jpg', title: 'Wallpaper 3' },
  { id: 'wp-4', url: 'https://i.pinimg.com/1200x/ab/82/a7/ab82a77008198b3e5b8fe197bfae249e.jpg', title: 'Wallpaper 4' },
  { id: 'wp-6', url: 'https://i.pinimg.com/1200x/05/c7/21/05c721269ec50303a652364eac0c6e30.jpg', title: 'Wallpaper 5' },
  { id: 'wp-7', url: 'https://i.pinimg.com/1200x/1a/ea/2d/1aea2df9acd45d208fad4caeced74bb3.jpg', title: 'Wallpaper 6' },
];

const TRACKS = [
  { title: 'Blinding Lights', artist: 'The Weeknd', duration: 212 },
  { title: 'Starboy', artist: 'The Weeknd', duration: 230 },
  { title: 'Save Your Tears', artist: 'The Weeknd', duration: 215 },
];

interface LiveTrack {
  title: string;
  artist: string;
  albumArt: string;
  duration: number;
  progress: number;
  isPlaying: boolean;
}

interface KeepWatchingItem {
  id: string;
  service: string;
  serviceId: 'netflix' | 'prime' | 'youtube';
  serviceColor: string;
  serviceIcon: string;
  title: string;
  seasonEpisode: string;
  episodeShort: string;
  progress: number;
  thumbnail: string;
}

const KEEP_WATCHING_DATA: KeepWatchingItem[] = [
  {
    id: 'netflix-stranger-things',
    service: 'Netflix',
    serviceId: 'netflix',
    serviceColor: '#E50914',
    serviceIcon: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg',
    title: 'Stranger Things',
    seasonEpisode: 'Season 4, Episode 8',
    episodeShort: 'S4 E8',
    progress: 72,
    thumbnail: 'https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg',
  },
  {
    id: 'prime-the-boys',
    service: 'Prime Video',
    serviceId: 'prime',
    serviceColor: '#00A8E1',
    serviceIcon: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png',
    title: 'The Boys',
    seasonEpisode: 'Season 4, Episode 4',
    episodeShort: 'S4 E4',
    progress: 54,
    thumbnail: 'https://static.tvmaze.com/uploads/images/medium_landscape/206/515781.jpg',
  },
  {
    id: 'youtube-vision-pro',
    service: 'YouTube',
    serviceId: 'youtube',
    serviceColor: '#FF0000',
    serviceIcon: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
    title: 'Apple Vision Pro: 6 Months Later!',
    seasonEpisode: 'Marques Brownlee • 18:24 / 24:10',
    episodeShort: '18:24',
    progress: 76,
    thumbnail: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
  },
];

const CATEGORIES = ['All', 'Streaming', 'Music', 'Video', 'Live TV', 'Utilities', 'Games', 'Sports'];

const ALL_APPS = [
  { id: 'netflix', name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', category: 'Streaming' },
  { id: 'youtube', name: 'YouTube', logo: '', category: 'Video' },
  { id: 'spotify', name: 'Spotify', logo: 'https://brandlogos.net/wp-content/uploads/2021/12/spotify-brandlogo.net_-768x768.png', category: 'Music' },
  { id: 'appletv', name: 'Apple TV', logo: 'https://cdn.simpleicons.org/appletv/white', category: 'Streaming' },
  { id: 'disney', name: 'Disney+', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg', category: 'Streaming' },
  { id: 'prime', name: 'Prime Video', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg', category: 'Streaming' },
  { id: 'google', name: 'Google', logo: 'https://brandlogos.net/wp-content/uploads/2015/09/google_favicon-logo_brandlogos.net_cgzfg-768x785.png', category: 'Utilities' },
  { id: 'ytmusic', name: 'YouTube Music', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Youtube_Music_icon.svg', category: 'Music' },
  { id: 'hulu', name: 'Hulu', logo: 'https://brandlogos.net/wp-content/uploads/2025/02/hulu-logo_brandlogos.net_y7ezt-768x252.png', category: 'Streaming' },
  { id: 'twitch', name: 'Twitch', logo: 'https://brandlogos.net/wp-content/uploads/2025/05/twitch_icon-logo_brandlogos.net_dwcq1-768x894.png', category: 'Live TV' },
  { id: 'playstore', name: 'Google Play', logo: 'https://brandlogos.net/wp-content/uploads/2022/07/google_play-logo_brandlogos.net_kuk1d.png', category: 'Store' },
  { id: 'applemusic', name: 'Apple Music', logo: 'https://brandlogos.net/wp-content/uploads/2015/07/apple_music_2015-2019-logo_brandlogos.net_43wqw-768x185.png', category: 'Music' },
  { id: 'hbomax', name: 'Max', logo: 'https://cdn.simpleicons.org/hbomax/white', category: 'Streaming' },
  { id: 'paramount', name: 'Paramount+', logo: 'https://cdn.simpleicons.org/paramountplus/white', category: 'Streaming' },
  { id: 'peacock', name: 'Peacock', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/NBC_Peacock_%282022%29.svg', category: 'Streaming' },
  { id: 'crunchyroll', name: 'Crunchyroll', logo: 'https://cdn.simpleicons.org/crunchyroll/F47521', category: 'Streaming' },
  { id: 'plex', name: 'Plex', logo: 'https://cdn.simpleicons.org/plex/EBAF00', category: 'Media' },
  { id: 'espn', name: 'ESPN', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/ESPN_wordmark.svg', category: 'Sports' },
  { id: 'tubi', name: 'Tubi', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Tubi_logo_2024.svg', category: 'Streaming' },
  { id: 'tiktok', name: 'TikTok', logo: 'https://cdn.simpleicons.org/tiktok/white', category: 'Social' },
  { id: 'soundcloud', name: 'SoundCloud', logo: 'https://cdn.simpleicons.org/soundcloud/FF5500', category: 'Music' },
  { id: 'steam', name: 'Steam Link', logo: 'https://cdn.simpleicons.org/steam/white', category: 'Games' },
];

export interface TvAppInfo {
  id: string;
  name: string;
  pkg: string;
  scheme?: string;
  playStoreId: string;
}

export const TV_APP_REGISTRY: Record<string, TvAppInfo> = {
  netflix: {
    id: 'netflix',
    name: 'Netflix',
    pkg: 'com.netflix.ninja',
    scheme: 'nflx://',
    playStoreId: 'com.netflix.ninja',
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    pkg: 'com.google.android.youtube.tv',
    scheme: 'vnd.youtube://',
    playStoreId: 'com.google.android.youtube.tv',
  },
  spotify: {
    id: 'spotify',
    name: 'Spotify',
    pkg: 'com.spotify.tv.android',
    scheme: 'spotify://',
    playStoreId: 'com.spotify.tv.android',
  },
  appletv: {
    id: 'appletv',
    name: 'Apple TV',
    pkg: 'com.apple.atve.androidtv.appletv',
    scheme: 'appletv://',
    playStoreId: 'com.apple.atve.androidtv.appletv',
  },
  disney: {
    id: 'disney',
    name: 'Disney+',
    pkg: 'com.disney.disneyplus',
    scheme: 'disneyplus://',
    playStoreId: 'com.disney.disneyplus',
  },
  prime: {
    id: 'prime',
    name: 'Prime Video',
    pkg: 'com.amazon.amazonvideo.livingroom',
    scheme: 'primevideo://',
    playStoreId: 'com.amazon.amazonvideo.livingroom',
  },
  google: {
    id: 'google',
    name: 'Google TV',
    pkg: 'com.google.android.videos',
    scheme: 'googletv://',
    playStoreId: 'com.google.android.videos',
  },
  ytmusic: {
    id: 'ytmusic',
    name: 'YouTube Music',
    pkg: 'com.google.android.apps.youtube.music.tv',
    scheme: 'youtubemusic://',
    playStoreId: 'com.google.android.apps.youtube.music.tv',
  },
  hulu: {
    id: 'hulu',
    name: 'Hulu',
    pkg: 'com.hulu.livingroomplus',
    scheme: 'hulu://',
    playStoreId: 'com.hulu.livingroomplus',
  },
  twitch: {
    id: 'twitch',
    name: 'Twitch',
    pkg: 'tv.twitch.android.app',
    scheme: 'twitch://',
    playStoreId: 'tv.twitch.android.app',
  },
  playstore: {
    id: 'playstore',
    name: 'Google Play Store',
    pkg: 'com.android.vending',
    scheme: 'market://',
    playStoreId: 'com.android.vending',
  },
  applemusic: {
    id: 'applemusic',
    name: 'Apple Music',
    pkg: 'com.apple.android.music',
    scheme: 'applemusic://',
    playStoreId: 'com.apple.android.music',
  },
  hbomax: {
    id: 'hbomax',
    name: 'Max',
    pkg: 'com.wbd.stream',
    scheme: 'max://',
    playStoreId: 'com.wbd.stream',
  },
  paramount: {
    id: 'paramount',
    name: 'Paramount+',
    pkg: 'com.cbs.ott',
    scheme: 'paramountplus://',
    playStoreId: 'com.cbs.ott',
  },
  peacock: {
    id: 'peacock',
    name: 'Peacock',
    pkg: 'com.peacocktv.peacockandroid',
    scheme: 'peacock://',
    playStoreId: 'com.peacocktv.peacockandroid',
  },
  crunchyroll: {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    pkg: 'com.crunchyroll.crunchyroid',
    scheme: 'crunchyroll://',
    playStoreId: 'com.crunchyroll.crunchyroid',
  },
  plex: {
    id: 'plex',
    name: 'Plex',
    pkg: 'com.plexapp.android',
    scheme: 'plex://',
    playStoreId: 'com.plexapp.android',
  },
  espn: {
    id: 'espn',
    name: 'ESPN',
    pkg: 'com.espn.score_center',
    scheme: 'espn://',
    playStoreId: 'com.espn.score_center',
  },
  tubi: {
    id: 'tubi',
    name: 'Tubi',
    pkg: 'com.tubitv',
    scheme: 'tubitv://',
    playStoreId: 'com.tubitv',
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    pkg: 'com.tiktok.tv',
    scheme: 'snssdk1233://',
    playStoreId: 'com.tiktok.tv',
  },
  soundcloud: {
    id: 'soundcloud',
    name: 'SoundCloud',
    pkg: 'com.soundcloud.android',
    scheme: 'soundcloud://',
    playStoreId: 'com.soundcloud.android',
  },
  steam: {
    id: 'steam',
    name: 'Steam Link',
    pkg: 'com.valvesoftware.steamlink',
    scheme: 'steam://',
    playStoreId: 'com.valvesoftware.steamlink',
  },
};

export default function App() {
  const topBoxes = Array.from({ length: 3 }, (_, i) => i);
  const bottomBoxes = Array.from({ length: 14 }, (_, i) => i);

  // Control Center modal state triggered by the Settings gear icon
  const [showControlCenter, setShowControlCenter] = useState(false);

  // Floating Settings Sidebar, Themes Modal, and Wallpaper Modal State
  const [showSettingsSidebar, setShowSettingsSidebar] = useState(false);
  const [showThemesModal, setShowThemesModal] = useState(false);
  const [showWallpaperModal, setShowWallpaperModal] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>(() => {
    const saved = localStorage.getItem('user_selected_wallpaper');
    const isValid = saved && WALLPAPERS.some((wp) => wp.url === saved);
    return isValid ? saved : BACKGROUND_LAYER_IMAGE;
  });

  // All Apps Drawer State (triggered by three dots icon)
  const [showAllAppsDrawer, setShowAllAppsDrawer] = useState(false);
  const [appSearchQuery, setAppSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Rearranging Mode State
  const [isRearranging, setIsRearranging] = useState(false);
  const [rearrangingAppId, setRearrangingAppId] = useState<string | null>(null);
  const [rearrangeOrder, setRearrangeOrder] = useState<string[]>(['netflix', 'youtube', 'spotify', 'appletv', 'disney', 'prime', 'google', 'ytmusic', 'hulu', 'twitch', 'playstore', 'applemusic', 'settings', 'threedots']);

  // Control Center Subpanels ('none' | 'wifi' | 'bluetooth')
  const [controlCenterSubpanel, setControlCenterSubpanel] = useState<'none' | 'wifi' | 'bluetooth'>('none');
  const [isScanningNetworks, setIsScanningNetworks] = useState(false);

  // Launch app on Skyworth Google TV, with automatic Play Store fallback if not installed.
  // Direct execution: no modal pop-up, no dynamic island toast.
  const launchTvApp = (appId: string, _contentTitle?: string) => {
    const matchedApp = ALL_APPS.find((a) => a.id === appId);
    const appInfo = TV_APP_REGISTRY[appId] || {
      id: appId,
      name: matchedApp?.name || appId.charAt(0).toUpperCase() + appId.slice(1),
      pkg: `com.${appId}.tv`,
      playStoreId: `com.${appId}.tv`,
    };

    // Google Play Store URI for Android TV / Google TV
    const marketUri = appInfo.pkg === 'com.android.vending'
      ? 'market://launch?id=com.android.vending'
      : `market://details?id=${appInfo.playStoreId}`;

    // Standard Android Intent format for Android TV / Google TV OS:
    // If installed, launches the app activity directly on the TV.
    // If not installed, falls back to S.browser_fallback_url, opening Google Play Store directly to the app install page!
    const intentUri = `intent://#Intent;package=${appInfo.pkg};S.browser_fallback_url=${encodeURIComponent(marketUri)};end`;

    // Trigger intent directly (opens on TV; silent on laptop)
    try {
      window.location.href = intentUri;
    } catch (err) {
      // Silent on laptop/unsupported browser
    }
  };

  // Brightness Modal State
  const [showBrightnessModal, setShowBrightnessModal] = useState(false);
  const [brightnessLevel, setBrightnessLevel] = useState<number>(() => {
    const saved = localStorage.getItem('user_brightness_level');
    return saved !== null ? Number(saved) : 85;
  });
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleBrightnessChange = (value: number) => {
    setBrightnessLevel(value);
    localStorage.setItem('user_brightness_level', String(value));
  };

  // Wi-Fi Networks List (Empty initial state for real connections)
  const [wifiNetworks, setWifiNetworks] = useState<
    Array<{ id: string; ssid: string; signal: number; isLocked: boolean; isConnected: boolean }>
  >([]);

  // Bluetooth Devices List (Empty initial state for real connections)
  const [btDevices, setBtDevices] = useState<
    Array<{ id: string; name: string; type: string; battery: string | null; isConnected: boolean }>
  >([]);

  // Interactive states inside the Control Center
  const [isStandByActive, setIsStandByActive] = useState(false);
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [isBluetoothOn, setIsBluetoothOn] = useState(true);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isDndOn, setIsDndOn] = useState(false);
  const [isAirplayActive, setIsAirplayActive] = useState(false);
  const [isTvActive, setIsTvActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);
  const [showConnectSpotifyModal, setShowConnectSpotifyModal] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(84);

  // Real Spotify OAuth & Live API State
  const [spotifyToken, setSpotifyToken] = useState<string>(() => {
    return localStorage.getItem('spotify_access_token') || '';
  });
  const [spotifyClientId, setSpotifyClientId] = useState(() => {
    return localStorage.getItem('spotify_client_id') || '';
  });
  const [inputToken, setInputToken] = useState('');
  const [liveTrackData, setLiveTrackData] = useState<LiveTrack | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  // Poll Spotify API for currently playing song if token exists
  useEffect(() => {
    if (!spotifyToken) {
      setLiveTrackData(null);
      return;
    }

    const fetchCurrentlyPlaying = async () => {
      try {
        const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
        });

        if (res.status === 200) {
          const data = await res.json();
          if (data && data.item) {
            const track: LiveTrack = {
              title: data.item.name,
              artist: data.item.artists ? data.item.artists.map((a: any) => a.name).join(', ') : 'Unknown Artist',
              albumArt: data.item.album?.images[0]?.url || '',
              duration: Math.floor((data.item.duration_ms || 0) / 1000),
              progress: Math.floor((data.progress_ms || 0) / 1000),
              isPlaying: data.is_playing ?? false,
            };
            setLiveTrackData(track);
            setIsPlaying(track.isPlaying);
            setTrackProgress(track.progress);
          }
        } else if (res.status === 401) {
          console.warn('Spotify token expired or invalid');
        }
      } catch (err) {
        console.error('Error fetching Spotify currently playing:', err);
      }
    };

    fetchCurrentlyPlaying();
    const interval = setInterval(fetchCurrentlyPlaying, 2500);
    return () => clearInterval(interval);
  }, [spotifyToken]);

  // Listen for OAuth success message from popup window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'SPOTIFY_AUTH_SUCCESS') {
        const token = event.data.token;
        if (token) {
          setSpotifyToken(token);
          localStorage.setItem('spotify_access_token', token);
          setShowConnectSpotifyModal(false);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleConnectSpotifyOAuth = () => {
    const clientId = spotifyClientId.trim() || 'f892d192131940a4a15b3a322e70546d';
    if (spotifyClientId.trim()) {
      localStorage.setItem('spotify_client_id', spotifyClientId.trim());
    }
    const redirectUri = `${window.location.origin}/auth/callback`;
    const scopes = [
      'user-read-currently-playing',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-recently-played',
    ].join(' ');

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(
      clientId
    )}&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}&show_dialog=true`;

    window.open(authUrl, 'spotify_oauth', 'width=550,height=750');
  };

  const handleSaveManualToken = () => {
    if (inputToken.trim()) {
      const cleanToken = inputToken.trim();
      setSpotifyToken(cleanToken);
      localStorage.setItem('spotify_access_token', cleanToken);
      setInputToken('');
      setShowConnectSpotifyModal(false);
    }
  };

  const handleDisconnectSpotify = () => {
    setSpotifyToken('');
    localStorage.removeItem('spotify_access_token');
    setLiveTrackData(null);
  };

  const activeTitle = liveTrackData ? liveTrackData.title : currentTrack.title;
  const activeArtist = liveTrackData ? liveTrackData.artist : currentTrack.artist;
  const activeAlbumArt = liveTrackData?.albumArt || '';
  const activeDuration = liveTrackData ? liveTrackData.duration : currentTrack.duration;

  // Responsive music progress timer (for fallback/local playback)
  useEffect(() => {
    if (!isPlaying || spotifyToken) return;
    const interval = setInterval(() => {
      setTrackProgress((prev) => {
        if (prev >= currentTrack.duration) {
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, spotifyToken, currentTrack.duration]);

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setTrackProgress(0);
  };

  const handlePrevTrack = () => {
    if (trackProgress > 3) {
      setTrackProgress(0);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
      setTrackProgress(0);
    }
  };

  const handleTogglePlayPause = async () => {
    if (spotifyToken && liveTrackData) {
      try {
        const endpoint = isPlaying
          ? 'https://api.spotify.com/v1/me/player/pause'
          : 'https://api.spotify.com/v1/me/player/play';
        await fetch(endpoint, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${spotifyToken}` },
        });
        setIsPlaying((prev) => !prev);
      } catch (err) {
        console.error('Error toggling play/pause:', err);
      }
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleNext = async () => {
    if (spotifyToken && liveTrackData) {
      try {
        await fetch('https://api.spotify.com/v1/me/player/next', {
          method: 'POST',
          headers: { Authorization: `Bearer ${spotifyToken}` },
        });
      } catch (err) {
        console.error('Error skipping to next:', err);
      }
    } else {
      handleNextTrack();
    }
  };

  const handlePrev = async () => {
    if (spotifyToken && liveTrackData) {
      try {
        await fetch('https://api.spotify.com/v1/me/player/previous', {
          method: 'POST',
          headers: { Authorization: `Bearer ${spotifyToken}` },
        });
      } catch (err) {
        console.error('Error skipping to prev:', err);
      }
    } else {
      handlePrevTrack();
    }
  };

  const handleSeek = async (newSeconds: number) => {
    setTrackProgress(newSeconds);
    if (spotifyToken && liveTrackData) {
      try {
        await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${newSeconds * 1000}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${spotifyToken}` },
        });
      } catch (err) {
        console.error('Error seeking track:', err);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatRemainingTime = (seconds: number, total: number) => {
    const rem = Math.max(0, total - seconds);
    const mins = Math.floor(rem / 60);
    const secs = Math.floor(rem % 60);
    return `-${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Real-time clock display (matching mockup layout: "Tuesday 27 October" & "8:47")
  const [currentTimeStr, setCurrentTimeStr] = useState('8:47 am');
  const [clockHours, setClockHours] = useState('8');
  const [clockMinutes, setClockMinutes] = useState('47');
  const [currentDateStr, setCurrentDateStr] = useState('Tuesday 27 October');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      const displayHours = hours % 12 || 12;
      const hoursStr = String(displayHours);
      const minutesStr = minutes < 10 ? '0' + minutes : String(minutes);
      setCurrentTimeStr(`${displayHours}:${minutesStr} ${ampm}`);
      setClockHours(hoursStr);
      setClockMinutes(minutesStr);
      try {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
        setCurrentDateStr(now.toLocaleDateString('en-GB', options));
      } catch (e) {
        setCurrentDateStr('Tuesday 27 October');
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Network & Bluetooth Action Handlers
  const handleScanWifi = () => {
    setIsScanningNetworks(true);
    setTimeout(() => {
      setIsScanningNetworks(false);
    }, 1200);
  };

  const handleScanBt = async () => {
    setIsScanningNetworks(true);
    try {
      if ('bluetooth' in navigator && (navigator as any).bluetooth) {
        const device = await (navigator as any).bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['battery_service', 'device_information'],
        });
        if (device) {
          const newDev = {
            id: device.id || String(Date.now()),
            name: device.name || 'Bluetooth Device',
            type: 'audio',
            battery: 'Connected',
            isConnected: true,
          };
          setBtDevices((prev) => [newDev, ...prev.filter((d) => d.id !== newDev.id)]);
        }
      }
    } catch (err: any) {
      if (err.name !== 'NotFoundError') {
        console.warn('Bluetooth scan note:', err);
      }
    } finally {
      setIsScanningNetworks(false);
    }
  };

  const handleSelectWifi = (id: string) => {
    setWifiNetworks((prev) =>
      prev.map((net) => ({
        ...net,
        isConnected: net.id === id,
      }))
    );
  };

  const handleToggleBtDevice = (id: string) => {
    setBtDevices((prev) =>
      prev.map((dev) => ({
        ...dev,
        isConnected: dev.id === id ? !dev.isConnected : dev.isConnected,
      }))
    );
  };

  const connectedWifiSSID = wifiNetworks.find((n) => n.isConnected)?.ssid || 'Off';
  const connectedBtName = btDevices.find((d) => d.isConnected)?.name || 'Off';

  // Keyboard spatial navigation state
  const [keyboardFocusId, setKeyboardFocusId] = useState<string>('bottom-12');
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  const getFocusRing = (id: string, extraClasses?: string) => {
    if (isKeyboardActive && keyboardFocusId === id) {
      return `border-4 border-white scale-[1.05] z-30 transition-transform duration-150 ${extraClasses || ''}`;
    }
    return '';
  };

  useEffect(() => {
    if (keyboardFocusId && isKeyboardActive) {
      const el = document.getElementById(keyboardFocusId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    }
  }, [keyboardFocusId, isKeyboardActive]);

  // Full-app keyboard Arrow Up/Down/Left/Right, Enter, Escape navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (key === 'Escape') {
        if (showWallpaperModal) {
          setShowWallpaperModal(false);
          setKeyboardFocusId('settings-themes-btn');
        } else if (showSettingsSidebar) {
          setShowSettingsSidebar(false);
          setKeyboardFocusId('cc-settings');
        } else if (controlCenterSubpanel !== 'none') {
          setControlCenterSubpanel('none');
          setKeyboardFocusId('cc-wifi');
        } else {
          setShowControlCenter(false);
          setShowSpotifyModal(false);
          setShowConnectSpotifyModal(false);
          setShowBrightnessModal(false);
          setShowAllAppsDrawer(false);
          setKeyboardFocusId('bottom-12');
        }
        return;
      }

      // Check if user is typing into search input
      const activeElement = document.activeElement;
      const isTyping = activeElement?.tagName === 'INPUT' && (activeElement as HTMLInputElement).type === 'text';

      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(key)) {
        return;
      }

      // If user is typing in the search bar and presses Left/Right, don't hijack unless ArrowDown is pressed
      if (isTyping && activeElement?.id === 'apps-search' && (key === 'ArrowLeft' || key === 'ArrowRight')) {
        return;
      }

      setIsKeyboardActive(true);

      // 0. WALLPAPER MODAL NAVIGATION
      if (showWallpaperModal) {
        e.preventDefault();
        if (keyboardFocusId === 'wp-close-btn') {
          if (key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
            setKeyboardFocusId('wp-item-0');
          } else if (key === 'Enter' || key === ' ') {
            setShowWallpaperModal(false);
            setKeyboardFocusId('settings-themes-btn');
          }
        } else if (keyboardFocusId.startsWith('wp-item-')) {
          const idx = parseInt(keyboardFocusId.replace('wp-item-', ''), 10) || 0;
          const COLS = 5;
          if (key === 'ArrowLeft') {
            setKeyboardFocusId(`wp-item-${Math.max(0, idx - 1)}`);
          } else if (key === 'ArrowRight') {
            setKeyboardFocusId(`wp-item-${Math.min(WALLPAPERS.length - 1, idx + 1)}`);
          } else if (key === 'ArrowUp') {
            if (idx < COLS) {
              setKeyboardFocusId('wp-close-btn');
            } else {
              setKeyboardFocusId(`wp-item-${idx - COLS}`);
            }
          } else if (key === 'ArrowDown') {
            if (idx + COLS < WALLPAPERS.length) {
              setKeyboardFocusId(`wp-item-${idx + COLS}`);
            }
          } else if (key === 'Enter' || key === ' ') {
            const targetWp = WALLPAPERS[idx];
            if (targetWp) {
              setSelectedWallpaper(targetWp.url);
              localStorage.setItem('user_selected_wallpaper', targetWp.url);
            }
          }
        } else {
          setKeyboardFocusId('wp-item-0');
        }
        return;
      }

      // 1. BRIGHTNESS MODAL NAVIGATION
      if (showBrightnessModal) {
        e.preventDefault();
        if (key === 'ArrowUp' || key === 'ArrowRight') {
          if (keyboardFocusId === 'bright-darkmode') {
            setKeyboardFocusId('bright-slider');
          } else {
            handleBrightnessChange(Math.min(100, brightnessLevel + 5));
          }
        } else if (key === 'ArrowDown' || key === 'ArrowLeft') {
          if (brightnessLevel <= 15 || (keyboardFocusId === 'bright-slider' && brightnessLevel <= 20)) {
            setKeyboardFocusId('bright-darkmode');
          } else {
            handleBrightnessChange(Math.max(10, brightnessLevel - 5));
          }
        } else if (key === 'Enter' || key === ' ') {
          if (keyboardFocusId === 'bright-darkmode') {
            setIsDarkMode((prev) => !prev);
          }
        }
        return;
      }

      // 2. SPOTIFY MODAL NAVIGATION
      if (showSpotifyModal) {
        e.preventDefault();
        if (keyboardFocusId === 'sp-slider') {
          if (key === 'ArrowLeft') handleSeek(Math.max(0, trackProgress - 5));
          else if (key === 'ArrowRight') handleSeek(Math.min(activeDuration, trackProgress + 5));
          else if (key === 'ArrowDown') setKeyboardFocusId('sp-play');
        } else if (keyboardFocusId === 'sp-prev') {
          if (key === 'ArrowRight') setKeyboardFocusId('sp-play');
          else if (key === 'ArrowUp') setKeyboardFocusId('sp-slider');
          else if (key === 'ArrowDown') setKeyboardFocusId('sp-account');
          else if (key === 'Enter' || key === ' ') handlePrev();
        } else if (keyboardFocusId === 'sp-play') {
          if (key === 'ArrowLeft') setKeyboardFocusId('sp-prev');
          else if (key === 'ArrowRight') setKeyboardFocusId('sp-next');
          else if (key === 'ArrowUp') setKeyboardFocusId('sp-slider');
          else if (key === 'ArrowDown') setKeyboardFocusId('sp-account');
          else if (key === 'Enter' || key === ' ') handleTogglePlayPause();
        } else if (keyboardFocusId === 'sp-next') {
          if (key === 'ArrowLeft') setKeyboardFocusId('sp-play');
          else if (key === 'ArrowUp') setKeyboardFocusId('sp-slider');
          else if (key === 'ArrowDown') setKeyboardFocusId('sp-account');
          else if (key === 'Enter' || key === ' ') handleNext();
        } else if (keyboardFocusId === 'sp-account') {
          if (key === 'ArrowUp') setKeyboardFocusId('sp-play');
          else if (key === 'Enter' || key === ' ') {
            setShowSpotifyModal(false);
            setShowConnectSpotifyModal(true);
          }
        } else {
          setKeyboardFocusId('sp-play');
        }
        return;
      }

      // 3. ALL APPS DRAWER NAVIGATION
      if (showAllAppsDrawer) {
        e.preventDefault();
        const filtered = ALL_APPS.filter((app) => {
          const matchesCat = selectedCategory === 'All' || app.category === selectedCategory;
          const matchesQ = app.name.toLowerCase().includes(appSearchQuery.toLowerCase());
          return matchesCat && matchesQ;
        });

        if (keyboardFocusId === 'apps-search') {
          if (key === 'ArrowDown') {
            setKeyboardFocusId('apps-cat-0');
            (document.getElementById('apps-search') as HTMLElement)?.blur();
          }
        } else if (keyboardFocusId.startsWith('apps-cat-')) {
          const idx = parseInt(keyboardFocusId.replace('apps-cat-', ''), 10) || 0;
          if (key === 'ArrowLeft') {
            setKeyboardFocusId(`apps-cat-${Math.max(0, idx - 1)}`);
          } else if (key === 'ArrowRight') {
            setKeyboardFocusId(`apps-cat-${Math.min(CATEGORIES.length - 1, idx + 1)}`);
          } else if (key === 'ArrowUp') {
            setKeyboardFocusId('apps-search');
            document.getElementById('apps-search')?.focus();
          } else if (key === 'ArrowDown') {
            if (filtered.length > 0) setKeyboardFocusId('apps-item-0');
          } else if (key === 'Enter' || key === ' ') {
            setSelectedCategory(CATEGORIES[idx]);
          }
        } else if (keyboardFocusId.startsWith('apps-item-')) {
          const idx = parseInt(keyboardFocusId.replace('apps-item-', ''), 10) || 0;
          const COLS = 6;
          if (key === 'ArrowLeft') {
            setKeyboardFocusId(`apps-item-${Math.max(0, idx - 1)}`);
          } else if (key === 'ArrowRight') {
            setKeyboardFocusId(`apps-item-${Math.min(filtered.length - 1, idx + 1)}`);
          } else if (key === 'ArrowUp') {
            if (idx < COLS) {
              setKeyboardFocusId('apps-cat-0');
            } else {
              setKeyboardFocusId(`apps-item-${Math.max(0, idx - COLS)}`);
            }
          } else if (key === 'ArrowDown') {
            if (idx + COLS < filtered.length) {
              setKeyboardFocusId(`apps-item-${idx + COLS}`);
            }
          } else if (key === 'Enter' || key === ' ') {
            const targetApp = filtered[idx];
            if (targetApp) {
              setShowAllAppsDrawer(false);
              launchTvApp(targetApp.id);
            }
          }
        } else {
          setKeyboardFocusId('apps-item-0');
        }
        return;
      }

      // 4. CONTROL CENTER NAVIGATION
      if (showControlCenter) {
        e.preventDefault();
        if (controlCenterSubpanel !== 'none') {
          const itemsCount = controlCenterSubpanel === 'wifi' ? wifiNetworks.length : btDevices.length;
          if (keyboardFocusId === 'sub-toggle') {
            if (key === 'ArrowDown') {
              if (itemsCount > 0) setKeyboardFocusId('sub-item-0');
              else setKeyboardFocusId('sub-scan');
            } else if (key === 'Enter' || key === ' ') {
              if (controlCenterSubpanel === 'wifi') setIsWifiOn((prev) => !prev);
              else setIsBluetoothOn((prev) => !prev);
            }
          } else if (keyboardFocusId.startsWith('sub-item-')) {
            const idx = parseInt(keyboardFocusId.replace('sub-item-', ''), 10) || 0;
            if (key === 'ArrowUp') {
              if (idx === 0) setKeyboardFocusId('sub-toggle');
              else setKeyboardFocusId(`sub-item-${idx - 1}`);
            } else if (key === 'ArrowDown') {
              if (idx === itemsCount - 1) setKeyboardFocusId('sub-scan');
              else setKeyboardFocusId(`sub-item-${idx + 1}`);
            } else if (key === 'Enter' || key === ' ') {
              if (controlCenterSubpanel === 'wifi') {
                const net = wifiNetworks[idx];
                if (net) handleSelectWifi(net.id);
              } else {
                const dev = btDevices[idx];
                if (dev) handleToggleBtDevice(dev.id);
              }
            }
          } else if (keyboardFocusId === 'sub-scan') {
            if (key === 'ArrowUp') {
              if (itemsCount > 0) setKeyboardFocusId(`sub-item-${itemsCount - 1}`);
              else setKeyboardFocusId('sub-toggle');
            } else if (key === 'Enter' || key === ' ') {
              if (controlCenterSubpanel === 'wifi') handleScanWifi();
              else handleScanBt();
            }
          } else {
            setKeyboardFocusId('sub-toggle');
          }
          return;
        }

        // Inside main Control Center
        switch (keyboardFocusId) {
          case 'cc-cam':
            if (key === 'ArrowRight') setKeyboardFocusId('cc-user');
            else if (key === 'ArrowDown') setKeyboardFocusId('cc-spotify');
            break;
          case 'cc-user':
            if (key === 'ArrowLeft') setKeyboardFocusId('cc-cam');
            else if (key === 'ArrowDown') setKeyboardFocusId('cc-wifi');
            break;
          case 'cc-spotify':
            if (key === 'ArrowUp') setKeyboardFocusId('cc-cam');
            else if (key === 'ArrowRight') setKeyboardFocusId('cc-wifi');
            else if (key === 'ArrowDown') setKeyboardFocusId('cc-inputs');
            else if (key === 'Enter' || key === ' ') {
              setShowSpotifyModal(true);
              setKeyboardFocusId('sp-play');
            }
            break;
          case 'cc-wifi':
            if (key === 'ArrowUp') setKeyboardFocusId('cc-user');
            else if (key === 'ArrowLeft') setKeyboardFocusId('cc-spotify');
            else if (key === 'ArrowDown') setKeyboardFocusId('cc-bluetooth');
            else if (key === 'Enter' || key === ' ') {
              setControlCenterSubpanel('wifi');
              setKeyboardFocusId('sub-toggle');
            }
            break;
          case 'cc-bluetooth':
            if (key === 'ArrowUp') setKeyboardFocusId('cc-wifi');
            else if (key === 'ArrowLeft') setKeyboardFocusId('cc-spotify');
            else if (key === 'ArrowDown') setKeyboardFocusId('cc-settings');
            else if (key === 'Enter' || key === ' ') {
              setControlCenterSubpanel('bluetooth');
              setKeyboardFocusId('sub-toggle');
            }
            break;
          case 'cc-inputs':
            if (key === 'ArrowUp') setKeyboardFocusId('cc-spotify');
            else if (key === 'ArrowRight') setKeyboardFocusId('cc-settings');
            else if (key === 'ArrowDown') setKeyboardFocusId('cc-brightness');
            break;
          case 'cc-settings':
            if (key === 'ArrowUp') setKeyboardFocusId('cc-bluetooth');
            else if (key === 'ArrowLeft') setKeyboardFocusId('cc-inputs');
            else if (key === 'ArrowDown') setKeyboardFocusId('cc-cast');
            else if (key === 'Enter' || key === ' ') setShowControlCenter(false);
            break;
          case 'cc-brightness':
            if (key === 'ArrowUp') setKeyboardFocusId('cc-inputs');
            else if (key === 'ArrowRight') setKeyboardFocusId('cc-cast');
            else if (key === 'ArrowDown') setKeyboardFocusId('cc-mic');
            else if (key === 'Enter' || key === ' ') {
              setShowBrightnessModal(true);
              setKeyboardFocusId('bright-slider');
            }
            break;
          case 'cc-cast':
            if (key === 'ArrowUp') setKeyboardFocusId('cc-settings');
            else if (key === 'ArrowLeft') setKeyboardFocusId('cc-brightness');
            else if (key === 'ArrowDown') setKeyboardFocusId('cc-airplay');
            break;
          case 'cc-mic':
            if (key === 'ArrowUp') setKeyboardFocusId('cc-brightness');
            else if (key === 'ArrowRight') setKeyboardFocusId('cc-airplay');
            else if (key === 'Enter' || key === ' ') setIsMicMuted((prev) => !prev);
            break;
          case 'cc-airplay':
            if (key === 'ArrowUp') setKeyboardFocusId('cc-cast');
            else if (key === 'ArrowLeft') setKeyboardFocusId('cc-mic');
            else if (key === 'ArrowRight') setKeyboardFocusId('cc-dnd');
            else if (key === 'Enter' || key === ' ') setIsAirplayActive((prev) => !prev);
            break;
          case 'cc-dnd':
            if (key === 'ArrowUp') setKeyboardFocusId('cc-cast');
            else if (key === 'ArrowLeft') setKeyboardFocusId('cc-airplay');
            else if (key === 'ArrowRight') setKeyboardFocusId('cc-tv');
            else if (key === 'Enter' || key === ' ') setIsDarkMode((prev) => !prev);
            break;
          case 'cc-tv':
            if (key === 'ArrowUp') setKeyboardFocusId('cc-cast');
            else if (key === 'ArrowLeft') setKeyboardFocusId('cc-dnd');
            else if (key === 'Enter' || key === ' ') setIsTvActive((prev) => !prev);
            break;
          default:
            setKeyboardFocusId('cc-spotify');
            break;
        }
        return;
      }

      // 5. HOME SCREEN NAVIGATION
      e.preventDefault();
      if (keyboardFocusId.startsWith('bottom-')) {
        const idx = parseInt(keyboardFocusId.replace('bottom-', ''), 10) || 0;
        if (key === 'ArrowLeft') {
          setKeyboardFocusId(`bottom-${Math.max(0, idx - 1)}`);
        } else if (key === 'ArrowRight') {
          setKeyboardFocusId(`bottom-${Math.min(13, idx + 1)}`);
        } else if (key === 'ArrowUp') {
          const topCol = idx <= 4 ? 0 : idx <= 9 ? 1 : 2;
          setKeyboardFocusId(`top-${topCol}`);
        } else if (key === 'Enter' || key === ' ') {
          handleBoxClick(idx);
        }
      } else if (keyboardFocusId.startsWith('top-')) {
        const idx = parseInt(keyboardFocusId.replace('top-', ''), 10) || 0;
        if (key === 'ArrowLeft') {
          if (idx > 0) setKeyboardFocusId(`top-${idx - 1}`);
        } else if (key === 'ArrowRight') {
          if (idx < 2) setKeyboardFocusId(`top-${idx + 1}`);
          else setKeyboardFocusId('home-moon');
        } else if (key === 'ArrowDown') {
          const bottomCol = idx === 0 ? 2 : idx === 1 ? 7 : 12;
          setKeyboardFocusId(`bottom-${bottomCol}`);
        } else if (key === 'ArrowUp') {
          setKeyboardFocusId('home-moon');
        } else if (key === 'Enter' || key === ' ') {
          if (idx === 0) {
            launchTvApp('netflix', KEEP_WATCHING_DATA[0].title);
          } else if (idx === 1) {
            launchTvApp('prime', KEEP_WATCHING_DATA[1].title);
          } else if (idx === 2) {
            launchTvApp('youtube', KEEP_WATCHING_DATA[2].title);
          }
        }
      } else if (keyboardFocusId === 'home-moon') {
        if (key === 'ArrowLeft' || key === 'ArrowDown') {
          setKeyboardFocusId('top-2');
        } else if (key === 'Enter' || key === ' ') {
          setIsDarkMode((prev) => !prev);
        }
      } else {
        setKeyboardFocusId('bottom-12');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    controlCenterSubpanel,
    showControlCenter,
    showSpotifyModal,
    showBrightnessModal,
    showAllAppsDrawer,
    showConnectSpotifyModal,
    showThemesModal,
    showWallpaperModal,
    selectedWallpaper,
    keyboardFocusId,
    brightnessLevel,
    trackProgress,
    activeDuration,
    wifiNetworks,
    btDevices,
    selectedCategory,
    appSearchQuery,
    isWifiOn,
    isBluetoothOn,
    isKeyboardActive,
  ]);

  const handleBoxClick = (index: number) => {
    if (isRearranging) {
      if (rearrangingAppId) {
        // Confirm placement
        setRearrangingAppId(null);
        setIsRearranging(false);
      } else {
        // Select app to move
        setRearrangingAppId(rearrangeOrder[index]);
      }
      return;
    }

    const appId = rearrangeOrder[index];
    if (appId === 'settings') {
      // Settings gear icon clicked: toggle Control Center
      setShowControlCenter((prev) => !prev);
      setKeyboardFocusId('cc-spotify');
    } else if (appId === 'threedots') {
      // Three dots icon clicked: toggle All Apps drawer
      setShowAllAppsDrawer((prev) => !prev);
      setKeyboardFocusId('apps-item-0');
    } else if (appId) {
      // Any app clicked on Skyworth Google TV: open installed app or TV Google Play Store
      launchTvApp(appId);
    }
  };

  // Helper for long press to enter rearranging mode
  const handleBoxLongPress = (index: number) => {
    if (index === 13) { // Three dots
      setIsRearranging(true);
      // Trigger 1s shake animation for apps 0-11
    }
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden select-none font-sans text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${selectedWallpaper}')`,
      }}
    >
      {/* 3-Layer Depth System matching user mockup */}
      {/* Layer 1: Background (Vibrant Sunset Sky or Selected Wallpaper) */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0 transition-all duration-500 pointer-events-none"
        style={{
          backgroundImage: `url('${selectedWallpaper}')`,
          filter: showControlCenter ? 'blur(5px)' : 'none',
        }}
      />





      {/* Dynamic Screen Dimming Overlay based on Brightness Level */}
      <div
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-150"
        style={{
          backgroundColor: 'black',
          opacity: ((100 - brightnessLevel) / 100) * 0.75,
        }}
      />

      {/* Top right small box with crescent moon icon */}
      <div
        className={`fixed top-6 sm:top-8 right-6 sm:right-8 md:right-10 z-20 transition-all duration-300 ${
          showControlCenter ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <button
          type="button"
          id="home-moon"
          aria-label="Toggle Dark/Light Mode"
          onClick={() => setIsDarkMode((prev) => !prev)}
          className={`group relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 aspect-square rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center border transition-all duration-300 ease-out active:scale-95 cursor-pointer overflow-hidden focus:outline-none ${getFocusRing('home-moon')} ${
            !isDarkMode
              ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 text-amber-500 hover:bg-white/30'
              : 'bg-gradient-to-b from-black/50 via-black/40 to-black/30 border-white/15 text-white hover:border-white/30 hover:bg-black/60'
          }`}
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: !isDarkMode
              ? '0 8px 24px -4px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
              : '0 8px 20px -4px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
          }}
        >
          {!isDarkMode ? (
            <Sun className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-amber-500" strokeWidth={2} />
          ) : (
            <Moon
              className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-white/90 group-hover:text-white transition-colors"
              strokeWidth={2}
            />
          )}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
        </button>
      </div>

      {/* Interface stack at the bottom: 3 long boxes above, 10 small boxes below spanning from left to right */}
      <div
        className={`fixed bottom-6 sm:bottom-8 md:bottom-10 inset-x-0 flex flex-col items-center gap-3 sm:gap-4 md:gap-5 px-4 z-20 transition-all duration-300 ${
          showControlCenter ? 'opacity-30 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* "Keep watching" Section Header (matching screenshot) */}
        <div className="w-[88vw] max-w-[1380px] flex items-center justify-between px-1 -mb-1 sm:-mb-1.5">
          <span className={`text-xs sm:text-sm font-semibold tracking-wide ${!isDarkMode ? 'text-neutral-900' : 'text-white/85'}`}>
            Keep watching
          </span>
        </div>

        {/* Three big boxes with frosted glass */}
        <div className="w-[88vw] max-w-[1380px] flex items-stretch justify-between gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {topBoxes.map((index) => {
            if (index === 0) {
              const item = KEEP_WATCHING_DATA[0];
              return (
                <button
                  key="top-0"
                  id="top-0"
                  type="button"
                  tabIndex={0}
                  onClick={() => {
                    launchTvApp('netflix', item.title);
                  }}
                  className={`group relative flex-1 h-16 sm:h-20 md:h-22 lg:h-24 rounded-lg sm:rounded-xl md:rounded-2xl border transition-all duration-300 ease-out p-1.5 sm:p-2 md:p-2.5 overflow-hidden flex items-center shadow-xl active:scale-98 cursor-pointer focus:outline-none ${getFocusRing('top-0')} ${
                    !isDarkMode
                      ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 text-neutral-900 hover:bg-white/30'
                      : 'bg-gradient-to-b from-white/12 via-white/8 to-white/4 border-white/20 text-white hover:border-white/30'
                  }`}
                  style={{
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: !isDarkMode
                      ? '0 12px 28px -4px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                      : '0 12px 28px -4px rgba(0, 0, 0, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {/* Glossy top-half highlight */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl" />

                  {/* Left: 16:9 / 16:10 Thumbnail */}
                  <div className="relative h-full aspect-[16/10] sm:aspect-[16/9] rounded-md sm:rounded-lg overflow-hidden shrink-0 shadow-md border border-white/15 bg-black/40">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white drop-shadow-md" />
                    </div>
                  </div>

                  {/* Right: App Name on top, Title below, Season/Episode below that, Progress Bar */}
                  <div className="flex-1 min-w-0 h-full flex flex-col justify-between py-0.5 sm:py-1 pl-2 sm:pl-3 text-left">
                    <div>
                      {/* Top: App Name (e.g. Netflix) */}
                      <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] overflow-hidden shrink-0 flex items-center justify-center">
                          <img
                            src={item.serviceIcon}
                            alt={item.service}
                            className="w-full h-full object-contain pointer-events-none select-none"
                          />
                        </div>
                        <span className={`text-[9px] sm:text-[10px] md:text-xs font-bold tracking-wider uppercase truncate ${!isDarkMode ? 'text-neutral-700' : 'text-white/75'}`}>
                          {item.service}
                        </span>
                      </div>

                      {/* Below Name: Title */}
                      <h4 className={`text-xs sm:text-sm md:text-base font-bold tracking-tight truncate leading-tight mt-0.5 ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>
                        {item.title}
                      </h4>

                      {/* Below Title: Season and Episode */}
                      <p className={`text-[9px] sm:text-[10px] md:text-xs font-medium leading-none mt-0.5 ${!isDarkMode ? 'text-neutral-600' : 'text-white/60'}`}>
                        {item.seasonEpisode}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className={`w-full h-1 sm:h-1.5 rounded-full overflow-hidden ${!isDarkMode ? 'bg-black/15' : 'bg-white/20'}`}>
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${!isDarkMode ? 'bg-neutral-900' : 'bg-white'}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            }

            if (index === 1) {
              const item = KEEP_WATCHING_DATA[1];
              return (
                <button
                  key="top-1"
                  id="top-1"
                  type="button"
                  tabIndex={0}
                  onClick={() => {
                    launchTvApp('prime', item.title);
                  }}
                  className={`group relative flex-1 h-16 sm:h-20 md:h-22 lg:h-24 rounded-lg sm:rounded-xl md:rounded-2xl border transition-all duration-300 ease-out p-1.5 sm:p-2 md:p-2.5 overflow-hidden flex items-center shadow-xl active:scale-98 cursor-pointer focus:outline-none ${getFocusRing('top-1')} ${
                    !isDarkMode
                      ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 text-neutral-900 hover:bg-white/30'
                      : 'bg-gradient-to-b from-white/12 via-white/8 to-white/4 border-white/20 text-white hover:border-white/30'
                  }`}
                  style={{
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: !isDarkMode
                      ? '0 12px 28px -4px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                      : '0 12px 28px -4px rgba(0, 0, 0, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {/* Glossy top-half highlight */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl" />

                  {/* Left: 16:9 / 16:10 Thumbnail */}
                  <div className="relative h-full aspect-[16/10] sm:aspect-[16/9] rounded-md sm:rounded-lg overflow-hidden shrink-0 shadow-md border border-white/15 bg-black/40">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white drop-shadow-md" />
                    </div>
                  </div>

                  {/* Right: App Name on top, Title below, Season/Episode below that, Progress Bar */}
                  <div className="flex-1 min-w-0 h-full flex flex-col justify-between py-0.5 sm:py-1 pl-2 sm:pl-3 text-left">
                    <div>
                      {/* Top: App Name (e.g. Prime Video) */}
                      <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] overflow-hidden shrink-0 flex items-center justify-center">
                          <img
                            src={item.serviceIcon}
                            alt={item.service}
                            className="w-full h-full object-contain pointer-events-none select-none"
                          />
                        </div>
                        <span className={`text-[9px] sm:text-[10px] md:text-xs font-bold tracking-wider uppercase truncate ${!isDarkMode ? 'text-neutral-700' : 'text-white/75'}`}>
                          {item.service}
                        </span>
                      </div>

                      {/* Below Name: Title */}
                      <h4 className={`text-xs sm:text-sm md:text-base font-bold tracking-tight truncate leading-tight mt-0.5 ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>
                        {item.title}
                      </h4>

                      {/* Below Title: Season and Episode */}
                      <p className={`text-[9px] sm:text-[10px] md:text-xs font-medium leading-none mt-0.5 ${!isDarkMode ? 'text-neutral-600' : 'text-white/60'}`}>
                        {item.seasonEpisode}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className={`w-full h-1 sm:h-1.5 rounded-full overflow-hidden ${!isDarkMode ? 'bg-black/15' : 'bg-white/20'}`}>
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${!isDarkMode ? 'bg-neutral-900' : 'bg-white'}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            }

            if (index === 2) {
              const item = KEEP_WATCHING_DATA[2];
              return (
                <button
                  key="top-2"
                  id="top-2"
                  type="button"
                  tabIndex={0}
                  onClick={() => {
                    launchTvApp('youtube', item.title);
                  }}
                  className={`group relative flex-1 h-16 sm:h-20 md:h-22 lg:h-24 rounded-lg sm:rounded-xl md:rounded-2xl border transition-all duration-300 ease-out p-1.5 sm:p-2 md:p-2.5 overflow-hidden flex items-center shadow-xl active:scale-98 cursor-pointer focus:outline-none ${getFocusRing('top-2')} ${
                    !isDarkMode
                      ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 text-neutral-900 hover:bg-white/30'
                      : 'bg-gradient-to-b from-white/12 via-white/8 to-white/4 border-white/20 text-white hover:border-white/30'
                  }`}
                  style={{
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: !isDarkMode
                      ? '0 12px 28px -4px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                      : '0 12px 28px -4px rgba(0, 0, 0, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {/* Glossy top-half highlight */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl" />

                  {/* Left: 16:9 Thumbnail with timestamp and play hover */}
                  <div className="relative h-full aspect-[16/10] sm:aspect-[16/9] rounded-md sm:rounded-lg overflow-hidden shrink-0 shadow-md border border-white/15 bg-black/40">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                      loading="lazy"
                    />
                    {/* Timestamp badge */}
                    <div className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-[2px] text-[8px] sm:text-[9px] font-semibold text-white px-1 py-0.5 rounded leading-none pointer-events-none select-none shadow">
                      {item.episodeShort}
                    </div>
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white drop-shadow-md" />
                    </div>
                  </div>

                  {/* Right: App Name on top, Title below, Channel / left off below that, Progress Bar */}
                  <div className="flex-1 min-w-0 h-full flex flex-col justify-between py-0.5 sm:py-1 pl-2 sm:pl-3 text-left">
                    <div>
                      {/* Top: App Name (YouTube) */}
                      <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] overflow-hidden shrink-0 flex items-center justify-center">
                          <svg viewBox="0 0 68 48" className="w-full h-full object-contain pointer-events-none select-none">
                            <path
                              d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                              fill="#FF0000"
                            />
                            <polygon points="45,24 27,14 27,34" fill="#FFFFFF" />
                          </svg>
                        </div>
                        <span className={`text-[9px] sm:text-[10px] md:text-xs font-bold tracking-wider uppercase truncate ${!isDarkMode ? 'text-neutral-700' : 'text-white/75'}`}>
                          {item.service}
                        </span>
                      </div>

                      {/* Below Name: Video Title */}
                      <h4 className={`text-xs sm:text-sm md:text-base font-bold tracking-tight truncate leading-tight mt-0.5 ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>
                        {item.title}
                      </h4>

                      {/* Below Title: Channel & Time Watched */}
                      <p className={`text-[9px] sm:text-[10px] md:text-xs font-medium leading-none mt-0.5 ${!isDarkMode ? 'text-neutral-600' : 'text-white/60'}`}>
                        {item.seasonEpisode}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className={`w-full h-1 sm:h-1.5 rounded-full overflow-hidden ${!isDarkMode ? 'bg-black/15' : 'bg-white/20'}`}>
                      <div
                        className="h-full rounded-full transition-all duration-300 bg-white"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            }

            return (
              <button
                key={`top-${index}`}
                id={`top-${index}`}
                type="button"
                aria-label={`Featured Box ${index + 1}`}
                className={`group relative flex-1 h-16 sm:h-20 md:h-22 lg:h-24 rounded-lg sm:rounded-xl md:rounded-2xl border transition-all duration-300 ease-out active:scale-98 cursor-pointer overflow-hidden focus:outline-none flex items-center justify-center ${getFocusRing(`top-${index}`)} ${
                  !isDarkMode
                    ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 text-neutral-900 hover:bg-white/30'
                    : 'bg-gradient-to-b from-white/12 via-white/8 to-white/4 border-white/20 hover:border-white/30 hover:bg-white/15'
                }`}
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: !isDarkMode
                    ? '0 12px 28px -4px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                    : '0 12px 28px -4px rgba(0, 0, 0, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
                }}
              >
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
              </button>
            );
          })}
        </div>

        {/* Ten small boxes with reduced corner roundness */}
        <div className="w-[88vw] max-w-[1380px] flex items-center justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          {rearrangeOrder.map((appId, index) => {
            const isNetflix = appId === 'netflix';
            const isYouTube = appId === 'youtube';
            const isSpotify = appId === 'spotify';
            const isAppleTv = appId === 'appletv';
            const isDisney = appId === 'disney';
            const isPrimeVideo = appId === 'prime';
            const isGoogle = appId === 'google';
            const isYouTubeMusic = appId === 'ytmusic';
            const isHulu = appId === 'hulu';
            const isTwitch = appId === 'twitch';
            const isPlayStore = appId === 'playstore';
            const isAppleMusic = appId === 'applemusic';
            const isSettings = appId === 'settings';
            const isThreeDots = appId === 'threedots';

            return (
              <button
                key={`bottom-${index}`}
                id={`bottom-${index}`}
                type="button"
                onClick={() => handleBoxClick(index)}
                onMouseDown={() => {
                  if (appId === 'threedots') {
                    const timer = setTimeout(() => handleBoxLongPress(index), 1000);
                    (document.getElementById(`bottom-${index}`) as any).dataset.timer = timer;
                  }
                }}
                onMouseUp={() => {
                  const timer = (document.getElementById(`bottom-${index}`) as any).dataset.timer;
                  if (timer) clearTimeout(timer);
                }}
                aria-label={appId}
                className={`group relative flex-1 aspect-square rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center border transition-all duration-300 ease-out active:scale-95 cursor-pointer overflow-hidden focus:outline-none ${
                  !isDarkMode
                    ? isSettings && showControlCenter
                      ? 'bg-white/35 border-white/60 ring-2 ring-white/50 text-neutral-900'
                      : 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 text-neutral-900 hover:bg-white/30'
                    : isYouTubeMusic || isAppleMusic
                    ? 'bg-white border-white/40'
                    : isAppleTv || isDisney || isPrimeVideo
                    ? 'bg-black border-white/20'
                    : isSettings && showControlCenter
                    ? 'bg-white/25 border-white/50 ring-2 ring-white/30'
                    : 'bg-gradient-to-b from-black/50 via-black/40 to-black/30 border-white/15 hover:border-white/30 hover:bg-black/60'
                } ${isRearranging && appId === rearrangingAppId ? 'ring-4 ring-yellow-400' : ''} ${isRearranging && appId !== rearrangingAppId ? 'opacity-50' : 'opacity-100'} ${isRearranging && appId !== 'threedots' && appId !== 'settings' ? 'animate-shake' : ''} ${getFocusRing(`bottom-${index}`)}`}
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: !isDarkMode
                    ? '0 8px 24px -4px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                    : '0 8px 20px -4px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
                }}
              >
                {/* Netflix Logo for Button 1 */}
                {isNetflix && (
                  <div className="relative z-10 w-full h-full p-2 sm:p-2.5 flex items-center justify-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                      alt="Netflix"
                      className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* YouTube Logo for Button 2 */}
                {isYouTube && (
                  <div className="relative z-10 w-full h-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center">
                    <svg
                      viewBox="0 0 68 48"
                      className="w-full h-full object-contain select-none pointer-events-none filter drop-shadow-md"
                    >
                      <path
                        d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                        fill="#FF0000"
                      />
                      <polygon points="45,24 27,14 27,34" fill="#FFFFFF" />
                    </svg>
                  </div>
                )}

                {/* Spotify Logo for Button 3 */}
                {isSpotify && (
                  <div className="relative z-10 w-full h-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center">
                    <img
                      src="https://brandlogos.net/wp-content/uploads/2021/12/spotify-brandlogo.net_-768x768.png"
                      alt="Spotify"
                      className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Apple TV Logo for Button 4 (crisp pure white vector on dark dock box) */}
                {isAppleTv && (
                  <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center p-2.5 sm:p-3 overflow-hidden">
                    <svg
                      viewBox="0 0 24 24"
                      fill="#ffffff"
                      className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
                      aria-label="Apple TV"
                    >
                      <path d="M20.57 17.735h-1.815l-3.34-9.203h1.633l2.02 5.987c.075.231.273.9.586 2.012l.297-.997.33-1.006 2.094-6.004H24zm-5.344-.066a5.76 5.76 0 0 1-1.55.207c-1.23 0-1.84-.693-1.84-2.087V9.646h-1.063V8.532h1.121V7.081l1.476-.602v2.062h1.707v1.113H13.38v5.805c0 .446.074.75.214.932.14.182.396.264.75.264.207 0 .495-.041.883-.115zm-7.29-5.343c.017 1.764 1.55 2.358 1.567 2.366-.017.042-.248.842-.808 1.658-.487.71-.99 1.418-1.79 1.435-.783.016-1.03-.462-1.93-.462-.89 0-1.17.445-1.913.478-.758.025-1.344-.775-1.838-1.484-.998-1.451-1.765-4.098-.734-5.88.51-.89 1.426-1.451 2.416-1.46.75-.016 1.468.512 1.93.512.461 0 1.327-.627 2.234-.536.38.016 1.452.157 2.136 1.154-.058.033-1.278.743-1.27 2.219M6.468 7.988c.404-.495.685-1.18.61-1.864-.585.025-1.294.388-1.723.883-.38.437-.71 1.138-.619 1.806.652.05 1.328-.338 1.732-.825Z" />
                    </svg>
                  </div>
                )}

                {/* Disney Logo for Button 5 (edge-to-edge transparent vector) */}
                {isDisney && (
                  <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center p-2 overflow-hidden">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg"
                      alt="Disney+"
                      className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Prime Video Logo for Button 6 (clean transparent vector) */}
                {isPrimeVideo && (
                  <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center p-2 overflow-hidden">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg"
                      alt="Prime Video"
                      className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Google Logo for Button 7 */}
                {isGoogle && (
                  <div className="relative z-10 w-full h-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center">
                    <img
                      src="https://brandlogos.net/wp-content/uploads/2015/09/google_favicon-logo_brandlogos.net_cgzfg-768x785.png"
                      alt="Google"
                      className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* YouTube Music Logo for Button 8 */}
                {isYouTubeMusic && (
                  <div className="absolute inset-0 w-full h-full bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src="https://brandlogos.net/wp-content/uploads/2021/11/youtube-music-logo-1-768x768.png"
                      alt="YouTube Music"
                      className="w-[66%] h-[66%] object-contain select-none pointer-events-none filter drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Hulu Logo for Button 9 */}
                {isHulu && (
                  <div className="relative z-10 w-full h-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center">
                    <img
                      src="https://brandlogos.net/wp-content/uploads/2025/02/hulu-logo_brandlogos.net_y7ezt-768x252.png"
                      alt="Hulu"
                      className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Twitch Logo for Button 10 */}
                {isTwitch && (
                  <div className="relative z-10 w-full h-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center">
                    <img
                      src="https://brandlogos.net/wp-content/uploads/2025/05/twitch_icon-logo_brandlogos.net_dwcq1-768x894.png"
                      alt="Twitch"
                      className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Google Play Store Logo for Button 11 */}
                {isPlayStore && (
                  <div className="relative z-10 w-full h-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center">
                    <img
                      src="https://brandlogos.net/wp-content/uploads/2022/07/google_play-logo_brandlogos.net_kuk1d.png"
                      alt="Google Play"
                      className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Apple Music Logo for Button 12 */}
                {isAppleMusic && (
                  <div className="absolute inset-0 w-full h-full bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src="https://brandlogos.net/wp-content/uploads/2015/07/apple_music_2015-2019-logo_brandlogos.net_43wqw-768x185.png"
                      alt="Apple Music"
                      className="w-[72%] h-[72%] object-contain select-none pointer-events-none filter drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Settings Icon */}
                {isSettings && (
                  <Settings
                    className={`relative z-10 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 transition-all duration-300 ${
                      showControlCenter ? 'text-white rotate-90 scale-110' : 'text-white/90 group-hover:text-white group-hover:rotate-45'
                    }`}
                    strokeWidth={1.8}
                  />
                )}

                {/* Three Dots Icon */}
                {isThreeDots && (
                  <MoreHorizontal
                    className="relative z-10 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 text-white/90 group-hover:text-white transition-all duration-300"
                    strokeWidth={2.4}
                  />
                )}

                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
              </button>
            );
          })}
        </div>
      </div>

      {/* FULL-SCREEN OVERLAY WITH EXACT 20% BLUR (blur(5px)) */}
      {showControlCenter && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 flex justify-end items-start p-4 sm:p-6 md:p-8"
          style={{
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
          }}
          onClick={() => {
            if (controlCenterSubpanel !== 'none') {
              setControlCenterSubpanel('none');
            } else {
              setShowControlCenter(false);
            }
          }}
        >
          {/* CONTROL CENTER WITH INCREASED CONTENT SIZE IN TOP RIGHT */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[280px] sm:max-w-[305px] flex flex-col gap-3 animate-in slide-in-from-right-4 fade-in-0 duration-200"
          >
            {/* Top Row: Time on Left, Two Circular Buttons on Right (Camera + Panda Avatar) */}
            <div className="flex items-center justify-between px-1">
              {/* Time */}
              <span className="text-sm font-semibold tracking-wide text-white/95">
                {currentTimeStr}
              </span>

              {/* Circles on Right (Dark Translucent, 12% Blurry) */}
              <div className="flex items-center gap-2">
                {/* Circle 1: Camera / FaceTime */}
                <button
                  type="button"
                  id="cc-cam"
                  aria-label="Camera"
                  className={`group relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all active:scale-95 shadow-md overflow-hidden ${getFocusRing('cc-cam')} ${
                    !isDarkMode
                      ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 text-neutral-900 hover:bg-white/30'
                      : 'bg-gradient-to-b from-black/50 via-black/40 to-black/30 border-white/15 hover:border-white/30 hover:bg-black/60 text-white'
                  }`}
                  style={{
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: !isDarkMode
                      ? '0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
                      : '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
                  }}
                >
                  <Camera className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${!isDarkMode ? 'text-neutral-900' : 'text-white/90 group-hover:text-white'}`} strokeWidth={2} />
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-full" />
                </button>

                {/* Circle 2: User Profile Avatar */}
                <button
                  type="button"
                  id="cc-user"
                  aria-label="User Profile"
                  className={`group relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-sky-400/80 hover:border-sky-300 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md overflow-hidden ${getFocusRing('cc-user')} ${
                    !isDarkMode
                      ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 text-neutral-900'
                      : 'bg-gradient-to-b from-black/50 via-black/40 to-black/30 text-white'
                  }`}
                  style={{
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: !isDarkMode
                      ? '0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
                      : '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
                  }}
                >
                  <span className="text-sm select-none relative z-10" role="img" aria-label="Panda">
                    🐼
                  </span>
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-full" />
                </button>
              </div>
            </div>

            {/* IF SUBPANEL ACTIVE: Render Large Wi-Fi or Bluetooth Panel */}
            {controlCenterSubpanel !== 'none' ? (
              <div
                className={`relative rounded-[24px] p-4 border shadow-2xl flex flex-col justify-between min-h-[320px] animate-in fade-in-0 duration-200 ${
                  !isDarkMode
                    ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 text-neutral-900'
                    : 'bg-neutral-900/80 border-white/20 text-white'
                }`}
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: !isDarkMode
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Header: Icon, Title, and High Vibrant iOS Toggle Switch (Back Arrow Removed Completely) */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    {controlCenterSubpanel === 'wifi' ? (
                      <Wifi className={`w-5 h-5 ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`} strokeWidth={2} />
                    ) : (
                      <Bluetooth className={`w-5 h-5 ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`} strokeWidth={2} />
                    )}

                    <h3 className={`font-bold text-base tracking-tight ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>
                      {controlCenterSubpanel === 'wifi' ? 'Wi-Fi' : 'Bluetooth'}
                    </h3>
                  </div>

                  {/* iOS-Style Toggle Switch (Oval with Circle Thumb, High Vibrancy, NO text) */}
                  <button
                    type="button"
                    id="sub-toggle"
                    onClick={() => {
                      if (controlCenterSubpanel === 'wifi') {
                        setIsWifiOn((prev) => !prev);
                      } else {
                        setIsBluetoothOn((prev) => !prev);
                      }
                    }}
                    aria-label={`Toggle ${controlCenterSubpanel}`}
                    className={`w-11 h-6 rounded-full transition-all duration-200 cursor-pointer relative p-0.5 shadow-md ${getFocusRing('sub-toggle')} ${
                      (controlCenterSubpanel === 'wifi' ? isWifiOn : isBluetoothOn)
                        ? 'bg-[#30D158] shadow-[0_0_16px_rgba(48,209,88,0.8)] border border-emerald-300/60'
                        : 'bg-white/25 border border-white/20'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-lg transition-transform duration-200 transform ${
                        (controlCenterSubpanel === 'wifi' ? isWifiOn : isBluetoothOn)
                          ? 'translate-x-5'
                          : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Middle Area: Networks or Bluetooth Devices List (Sliding bar/scrollbar removed) */}
                <div className="flex-1 py-3 flex flex-col justify-start overflow-hidden">
                  {controlCenterSubpanel === 'wifi' ? (
                    !isWifiOn ? (
                      <div className={`flex flex-col items-center justify-center my-auto py-8 text-center gap-2 ${!isDarkMode ? 'text-neutral-600' : 'text-white/50'}`}>
                        <Wifi className="w-8 h-8 opacity-40" strokeWidth={1.5} />
                        <span className="text-xs font-medium">Wi-Fi is turned off</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[190px] pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {wifiNetworks.map((net, nIdx) => (
                          <button
                            key={net.id}
                            id={`sub-item-${nIdx}`}
                            type="button"
                            onClick={() => handleSelectWifi(net.id)}
                            className={`w-full px-3 py-2 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${getFocusRing(`sub-item-${nIdx}`)} ${
                              net.isConnected
                                ? (!isDarkMode ? 'bg-sky-500/30 border border-sky-400/50 text-neutral-900 font-semibold' : 'bg-sky-500/20 border border-sky-400/40 text-white font-semibold')
                                : (!isDarkMode ? 'bg-white/20 hover:bg-white/30 text-neutral-900 border border-transparent' : 'bg-white/5 hover:bg-white/10 text-white/80 border border-transparent')
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {net.isLocked ? (
                                <Lock className={`w-3.5 h-3.5 shrink-0 ${!isDarkMode ? 'text-neutral-700' : 'text-white/50'}`} strokeWidth={2} />
                              ) : (
                                <Wifi className={`w-3.5 h-3.5 shrink-0 ${!isDarkMode ? 'text-neutral-700' : 'text-white/50'}`} strokeWidth={2} />
                              )}
                              <span className="text-xs truncate">{net.ssid}</span>
                            </div>
                            {net.isConnected && (
                              <Check className="w-4 h-4 text-sky-400 shrink-0" strokeWidth={2.5} />
                            )}
                          </button>
                        ))}
                      </div>
                    )
                  ) : (
                    !isBluetoothOn ? (
                      <div className={`flex flex-col items-center justify-center my-auto py-8 text-center gap-2 ${!isDarkMode ? 'text-neutral-600' : 'text-white/50'}`}>
                        <Bluetooth className="w-8 h-8 opacity-40" strokeWidth={1.5} />
                        <span className="text-xs font-medium">Bluetooth is turned off</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[190px] pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {btDevices.map((dev, dIdx) => (
                          <button
                            key={dev.id}
                            id={`sub-item-${dIdx}`}
                            type="button"
                            onClick={() => handleToggleBtDevice(dev.id)}
                            className={`w-full px-3 py-2 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${getFocusRing(`sub-item-${dIdx}`)} ${
                              dev.isConnected
                                ? (!isDarkMode ? 'bg-indigo-500/30 border border-indigo-400/50 text-neutral-900 font-semibold' : 'bg-indigo-500/20 border border-indigo-400/40 text-white font-semibold')
                                : (!isDarkMode ? 'bg-white/20 hover:bg-white/30 text-neutral-900 border border-transparent' : 'bg-white/5 hover:bg-white/10 text-white/80 border border-transparent')
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {dev.type === 'audio' ? (
                                <Headphones className="w-3.5 h-3.5 text-indigo-400 shrink-0" strokeWidth={2} />
                              ) : dev.type === 'tv' ? (
                                <Tv className="w-3.5 h-3.5 text-indigo-400 shrink-0" strokeWidth={2} />
                              ) : dev.type === 'keyboard' ? (
                                <Laptop className="w-3.5 h-3.5 text-indigo-400 shrink-0" strokeWidth={2} />
                              ) : (
                                <Bluetooth className="w-3.5 h-3.5 text-indigo-400 shrink-0" strokeWidth={2} />
                              )}
                              <span className="text-xs truncate">{dev.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {dev.battery && (
                                <span className={`text-[10px] font-mono ${!isDarkMode ? 'text-neutral-700' : 'text-white/40'}`}>{dev.battery}</span>
                              )}
                              {dev.isConnected && (
                                <Check className="w-4 h-4 text-indigo-400 shrink-0" strokeWidth={2.5} />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )
                  )}
                </div>

                {/* Bottom Bar: Scan Button (Clickable Blue Text) */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    id="sub-scan"
                    onClick={controlCenterSubpanel === 'wifi' ? handleScanWifi : handleScanBt}
                    disabled={controlCenterSubpanel === 'wifi' ? !isWifiOn : !isBluetoothOn}
                    className={`text-sky-400 hover:text-sky-300 disabled:opacity-30 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors px-1 py-0.5 rounded ${getFocusRing('sub-scan')}`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isScanningNetworks ? 'animate-spin' : ''}`} />
                    <span>
                      {controlCenterSubpanel === 'wifi'
                        ? 'Scan for networks...'
                        : 'Scan for devices...'}
                    </span>
                  </button>

                  <span className={`text-[10px] ${!isDarkMode ? 'text-neutral-700' : 'text-white/40'}`}>
                    {controlCenterSubpanel === 'wifi'
                      ? `${wifiNetworks.length} nearby`
                      : `${btDevices.length} paired`}
                  </span>
                </div>
              </div>
            ) : (
              /* Normal Control Center Layout */
              <>
                {/* Main Upper Section: StandBy Square on Left, 2 Stacked Pills on Right */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Spotify Music Player Widget */}
                  <button
                    type="button"
                    id="cc-spotify"
                    onClick={() => setShowSpotifyModal(true)}
                    aria-label="Spotify Music Player"
                    className={`group relative rounded-[20px] flex-1 aspect-square transition-all duration-200 shadow-xl overflow-hidden border cursor-pointer hover:scale-[1.02] active:scale-95 focus:outline-none ${getFocusRing('cc-spotify')} ${
                      !isDarkMode
                        ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 hover:border-white/60'
                        : 'bg-black border-white/15 hover:border-white/30'
                    }`}
                    style={{
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      boxShadow: !isDarkMode
                        ? '0 8px 20px -4px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                        : '0 8px 20px -4px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    <img
                      src="https://i.pinimg.com/736x/f4/39/2e/f4392e0794ba59c7e01f522e7b294a34.jpg"
                      alt="Spotify Player"
                      className="w-full h-full object-cover select-none pointer-events-none"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[20px]" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
                  </button>

                  {/* Stack of Two Frosted Boxes (Wi-Fi & Bluetooth) */}
                  <div className="flex flex-col gap-2.5 justify-between">
                    {/* Wi-Fi Pill Box */}
                    <button
                      type="button"
                      id="cc-wifi"
                      onClick={() => setControlCenterSubpanel('wifi')}
                      className={`group relative flex-1 rounded-[16px] px-3 py-2.5 flex items-center gap-2.5 border transition-all active:scale-95 shadow-md text-left overflow-hidden cursor-pointer ${getFocusRing('cc-wifi')} ${
                        isWifiOn
                          ? (!isDarkMode
                              ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 hover:bg-white/30 text-neutral-900'
                              : 'bg-gradient-to-b from-black/50 via-black/40 to-black/30 border-white/15 hover:border-white/30 hover:bg-black/60 text-white')
                          : (!isDarkMode ? 'bg-white/15 border-white/20 opacity-50 text-neutral-900' : 'bg-black/40 border-white/10 opacity-50 text-white')
                      }`}
                      style={{
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        boxShadow: !isDarkMode
                          ? '0 6px 16px -3px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                          : '0 6px 16px -3px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
                      }}
                    >
                      <Wifi
                        className={`w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 relative z-10 ${!isDarkMode ? 'text-neutral-900' : isWifiOn ? 'text-white' : 'text-white/40'}`}
                        strokeWidth={2}
                      />
                      <div className="flex flex-col min-w-0 relative z-10">
                        <span className={`text-xs font-semibold leading-tight ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>
                          Wi-Fi
                        </span>
                        <span className={`text-[10px] truncate leading-tight mt-0.5 ${!isDarkMode ? 'text-neutral-700' : 'text-white/60'}`}>
                          {isWifiOn ? connectedWifiSSID : 'Off'}
                        </span>
                      </div>
                      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[16px]" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
                    </button>

                    {/* Bluetooth Pill Box */}
                    <button
                      type="button"
                      id="cc-bluetooth"
                      onClick={() => setControlCenterSubpanel('bluetooth')}
                      className={`group relative flex-1 rounded-[16px] px-3 py-2.5 flex items-center gap-2.5 border transition-all active:scale-95 shadow-md text-left overflow-hidden cursor-pointer ${getFocusRing('cc-bluetooth')} ${
                        isBluetoothOn
                          ? (!isDarkMode
                              ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 hover:bg-white/30 text-neutral-900'
                              : 'bg-gradient-to-b from-black/50 via-black/40 to-black/30 border-white/15 hover:border-white/30 hover:bg-black/60 text-white')
                          : (!isDarkMode ? 'bg-white/15 border-white/20 opacity-50 text-neutral-900' : 'bg-black/40 border-white/10 opacity-50 text-white')
                      }`}
                      style={{
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        boxShadow: !isDarkMode
                          ? '0 6px 16px -3px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                          : '0 6px 16px -3px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
                      }}
                    >
                      <Bluetooth
                        className={`w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 relative z-10 ${!isDarkMode ? 'text-neutral-900' : isBluetoothOn ? 'text-white' : 'text-white/40'}`}
                        strokeWidth={2}
                      />
                      <div className="flex flex-col min-w-0 relative z-10">
                        <span className={`text-xs font-semibold leading-tight ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>
                          Bluetooth
                        </span>
                        <span className={`text-[10px] truncate leading-tight mt-0.5 ${!isDarkMode ? 'text-neutral-700' : 'text-white/60'}`}>
                          {isBluetoothOn ? connectedBtName : 'Off'}
                        </span>
                      </div>
                      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[16px]" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
                    </button>
                  </div>
                </div>

                {/* Row 3: Two Side-by-Side Horizontal Pill Boxes (Inputs & Settings) */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Inputs Box */}
                  <button
                    type="button"
                    id="cc-inputs"
                    className={`group relative h-10 sm:h-11 rounded-[15px] border flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md overflow-hidden cursor-pointer ${getFocusRing('cc-inputs')} ${
                      !isDarkMode
                        ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 hover:bg-white/30 text-neutral-900'
                        : 'bg-gradient-to-b from-black/50 via-black/40 to-black/30 border-white/15 hover:border-white/30 hover:bg-black/60 text-white'
                    }`}
                    style={{
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      boxShadow: !isDarkMode
                        ? '0 6px 16px -3px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                        : '0 6px 16px -3px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
                    }}
                  >
                    <svg
                      className={`w-4 h-4 relative z-10 ${!isDarkMode ? 'text-neutral-900' : 'text-white/90 group-hover:text-white'}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 8l4 4-4 4" />
                      <path d="M4 12h14" />
                      <path d="M20 4v16" />
                    </svg>
                    <span className={`text-xs font-semibold relative z-10 ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>Inputs</span>
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[15px]" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
                  </button>

                  {/* Settings Box */}
                  <button
                    type="button"
                    id="cc-settings"
                    onClick={() => {
                      setShowControlCenter(false);
                      setShowSettingsSidebar(true);
                    }}
                    className={`group relative h-10 sm:h-11 rounded-[15px] border flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md overflow-hidden cursor-pointer ${getFocusRing('cc-settings')} ${
                      !isDarkMode
                        ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 hover:bg-white/30 text-neutral-900'
                        : 'bg-gradient-to-b from-black/50 via-black/40 to-black/30 border-white/15 hover:border-white/30 hover:bg-black/60 text-white'
                    }`}
                    style={{
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      boxShadow: !isDarkMode
                        ? '0 6px 16px -3px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                        : '0 6px 16px -3px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
                    }}
                  >
                    <Settings className={`w-4 h-4 relative z-10 ${!isDarkMode ? 'text-neutral-900' : 'text-white/90 group-hover:text-white'}`} strokeWidth={2} />
                    <span className={`text-xs font-semibold relative z-10 ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>Settings</span>
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[15px]" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
                  </button>
                </div>

                {/* Row 3.5: Two Side-by-Side Horizontal Pill Boxes (Brightness & Cast) */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Brightness Box */}
                  <button
                    type="button"
                    id="cc-brightness"
                    onClick={() => setShowBrightnessModal(true)}
                    className={`group relative h-10 sm:h-11 rounded-[15px] border flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md overflow-hidden cursor-pointer ${getFocusRing('cc-brightness')} ${
                      !isDarkMode
                        ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 hover:bg-white/30 text-neutral-900'
                        : 'bg-gradient-to-b from-black/50 via-black/40 to-black/30 border-white/15 hover:border-white/30 hover:bg-black/60 text-white'
                    }`}
                    style={{
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      boxShadow: !isDarkMode
                        ? '0 6px 16px -3px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                        : '0 6px 16px -3px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
                    }}
                  >
                    <Sun className={`w-4 h-4 relative z-10 ${!isDarkMode ? 'text-amber-600' : 'text-amber-300'}`} strokeWidth={2} />
                    <span className={`text-xs font-semibold relative z-10 ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>Brightness</span>
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[15px]" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
                  </button>

                  {/* Cast Box */}
                  <button
                    type="button"
                    id="cc-cast"
                    className={`group relative h-10 sm:h-11 rounded-[15px] border flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md overflow-hidden cursor-pointer ${getFocusRing('cc-cast')} ${
                      !isDarkMode
                        ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 hover:bg-white/30 text-neutral-900'
                        : 'bg-gradient-to-b from-black/50 via-black/40 to-black/30 border-white/15 hover:border-white/30 hover:bg-black/60 text-white'
                    }`}
                    style={{
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      boxShadow: !isDarkMode
                        ? '0 6px 16px -3px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                        : '0 6px 16px -3px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
                    }}
                  >
                    <Cast className={`w-4 h-4 relative z-10 ${!isDarkMode ? 'text-neutral-900' : 'text-white/90 group-hover:text-white'}`} strokeWidth={2} />
                    <span className={`text-xs font-semibold relative z-10 ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>Cast</span>
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[15px]" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
                  </button>
                </div>
              </>
            )}

            {/* Row 4: Four Circular Buttons (Mic, Airplay, Moon/DND, TV) */}
            <div className="grid grid-cols-4 gap-2.5 pt-0.5">
              {/* Button 1: Microphone */}
              <button
                type="button"
                id="cc-mic"
                onClick={() => setIsMicMuted((prev) => !prev)}
                aria-label="Microphone"
                className={`group relative h-9 w-9 sm:h-10 sm:w-10 mx-auto aspect-square rounded-full border flex items-center justify-center transition-all active:scale-90 shadow-md overflow-hidden ${getFocusRing('cc-mic')} ${
                  isMicMuted
                    ? 'bg-rose-500/30 border-rose-400/60 text-rose-200'
                    : !isDarkMode
                    ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 hover:bg-white/30 text-neutral-900'
                    : 'bg-gradient-to-b from-black/50 via-black/40 to-black/30 border-white/15 hover:border-white/30 hover:bg-black/60 text-white'
                }`}
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: !isDarkMode
                    ? '0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                    : '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
                }}
              >
                <span className="relative z-10">
                  {isMicMuted ? (
                    <MicOff className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
                  ) : (
                    <Mic className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
                  )}
                </span>
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-full" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
              </button>

              {/* Button 2: AirPlay */}
              <button
                type="button"
                id="cc-airplay"
                onClick={() => setIsAirplayActive((prev) => !prev)}
                aria-label="AirPlay"
                className={`group relative h-9 w-9 sm:h-10 sm:w-10 mx-auto aspect-square rounded-full border flex items-center justify-center transition-all active:scale-90 shadow-md overflow-hidden ${getFocusRing('cc-airplay')} ${
                  isAirplayActive
                    ? 'bg-sky-500/30 border-sky-400/60 text-sky-200'
                    : !isDarkMode
                    ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 hover:bg-white/30 text-neutral-900'
                    : 'bg-gradient-to-b from-black/50 via-black/40 to-black/30 border-white/15 hover:border-white/30 hover:bg-black/60 text-white'
                }`}
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: !isDarkMode
                    ? '0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                    : '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
                }}
              >
                <Airplay className="w-4 h-4 sm:w-4.5 sm:h-4.5 relative z-10" strokeWidth={2} />
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-full" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
              </button>

              {/* Button 3: Dark & Light Mode Toggle */}
              <button
                type="button"
                id="cc-dnd"
                onClick={() => setIsDarkMode((prev) => !prev)}
                aria-label="Toggle Dark and Light Mode"
                className={`group relative h-9 w-9 sm:h-10 sm:w-10 mx-auto aspect-square rounded-full border flex items-center justify-center transition-all active:scale-90 shadow-md overflow-hidden ${getFocusRing('cc-dnd')} ${
                  !isDarkMode
                    ? 'bg-amber-400/30 border-amber-300/60 text-amber-600'
                    : 'bg-gradient-to-b from-black/50 via-black/40 to-black/30 border-white/15 hover:border-white/30 hover:bg-black/60 text-white'
                }`}
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: !isDarkMode
                    ? '0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                    : '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
                }}
              >
                {isDarkMode ? (
                  <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 relative z-10" strokeWidth={2} />
                ) : (
                  <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 relative z-10 text-amber-600" strokeWidth={2} />
                )}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-full" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
              </button>

              {/* Button 4: TV Screen */}
              <button
                type="button"
                id="cc-tv"
                onClick={() => setIsTvActive((prev) => !prev)}
                aria-label="TV Display"
                className={`group relative h-9 w-9 sm:h-10 sm:w-10 mx-auto aspect-square rounded-full border flex items-center justify-center transition-all active:scale-90 shadow-md overflow-hidden ${getFocusRing('cc-tv')} ${
                  isTvActive
                    ? 'bg-emerald-500/30 border-emerald-400/60 text-emerald-200'
                    : !isDarkMode
                    ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 hover:bg-white/30 text-neutral-900'
                    : 'bg-gradient-to-b from-black/50 via-black/40 to-black/30 border-white/15 hover:border-white/30 hover:bg-black/60 text-white'
                }`}
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: !isDarkMode
                    ? '0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                    : '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
                }}
              >
                <Tv className="w-4 h-4 sm:w-4.5 sm:h-4.5 relative z-10" strokeWidth={2} />
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-full" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SPOTIFY NOW PLAYING CENTERED POPUP MODAL (3% Blurred Background) */}
      {showSpotifyModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 flex items-center justify-center p-4 sm:p-6"
          style={{
            backdropFilter: 'blur(1.8px)',
            WebkitBackdropFilter: 'blur(1.8px)',
          }}
          onClick={() => setShowSpotifyModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: !isDarkMode
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
            className={`relative w-full max-w-[320px] sm:max-w-[360px] rounded-[32px] border p-6 flex flex-col items-center gap-5 shadow-2xl animate-in zoom-in-95 duration-200 ${
              !isDarkMode
                ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 text-neutral-900'
                : 'bg-neutral-900/60 border-white/20 text-white'
            }`}
          >
            {/* Album Artwork */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-gradient-to-br from-[#1DB954]/30 via-neutral-800/80 to-black border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden group mt-1">
              {activeAlbumArt ? (
                <img
                  src={activeAlbumArt}
                  alt={activeTitle}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-[#1DB954]/15 blur-2xl rounded-full scale-90" />
                  <Music className="w-20 h-20 text-[#1DB954] drop-shadow-xl relative z-10" strokeWidth={1.8} />
                </>
              )}
            </div>

            {/* Song Header Info: Song Name, Artist Name */}
            <div className="flex flex-col items-center text-center w-full px-2">
              {/* Song Name */}
              <h2 className={`text-xl sm:text-2xl font-bold tracking-tight leading-tight ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>
                {activeTitle}
              </h2>

              {/* Artist Name */}
              <p className={`text-sm font-medium mt-1 ${!isDarkMode ? 'text-neutral-700' : 'text-white/60'}`}>
                {activeArtist}
              </p>
            </div>

            {/* Responsive Track Progress Bar / Slider */}
            <div className="w-full flex flex-col gap-1.5 px-2">
              <input
                type="range"
                id="sp-slider"
                min={0}
                max={activeDuration}
                value={trackProgress}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className={`w-full h-1.5 ${!isDarkMode ? 'bg-neutral-900/20' : 'bg-white/20'} rounded-full appearance-none cursor-pointer accent-[#1DB954] focus:outline-none ${getFocusRing('sp-slider')}`}
              />
              <div className={`flex items-center justify-between text-[11px] font-medium ${!isDarkMode ? 'text-neutral-700' : 'text-white/50'}`}>
                <span>{formatTime(trackProgress)}</span>
                <span>{formatRemainingTime(trackProgress, activeDuration)}</span>
              </div>
            </div>

            {/* Responsive Media Playback Controls */}
            <div className="flex items-center justify-center gap-8 w-full py-1">
              <button
                type="button"
                id="sp-prev"
                onClick={handlePrev}
                aria-label="Previous track"
                className={`transition-all hover:scale-110 active:scale-95 cursor-pointer p-1 rounded-full ${!isDarkMode ? 'text-neutral-800 hover:text-neutral-950' : 'text-white/80 hover:text-white'} ${getFocusRing('sp-prev')}`}
              >
                <SkipBack className="w-7 h-7" strokeWidth={2} />
              </button>

              <button
                type="button"
                id="sp-play"
                onClick={handleTogglePlayPause}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer p-3 ${
                  !isDarkMode
                    ? 'bg-white/40 border border-white/60 text-neutral-900 hover:bg-white/60'
                    : 'bg-white text-black'
                } ${getFocusRing('sp-play')}`}
              >
                {isPlaying ? (
                  <img
                    src="https://img.icons8.com/?size=100&id=ExAmvvELyujF&format=png&color=000000"
                    alt="Pause"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                ) : (
                  <img
                    src="https://img.icons8.com/?size=100&id=pfz9gI0fUZwN&format=png&color=000000"
                    alt="Play"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                )}
              </button>

              <button
                type="button"
                id="sp-next"
                onClick={handleNext}
                aria-label="Next track"
                className={`transition-all hover:scale-110 active:scale-95 cursor-pointer p-1 rounded-full ${!isDarkMode ? 'text-neutral-800 hover:text-neutral-950' : 'text-white/80 hover:text-white'} ${getFocusRing('sp-next')}`}
              >
                <SkipForward className="w-7 h-7" strokeWidth={2} />
              </button>
            </div>

            {/* Connect / Account Control */}
            <div className={`flex items-center justify-between w-full pt-1 border-t px-1 text-xs ${!isDarkMode ? 'border-neutral-900/10' : 'border-white/10'}`}>
              <div className={`flex items-center gap-2 ${!isDarkMode ? 'text-neutral-700' : 'text-white/50'}`}>
                <Airplay className="w-4 h-4 text-[#1DB954]" strokeWidth={2} />
                <span>Playing on TV</span>
              </div>
              <button
                type="button"
                id="sp-account"
                onClick={() => {
                  setShowSpotifyModal(false);
                  setShowConnectSpotifyModal(true);
                }}
                className={`text-[#1DB954] hover:underline font-semibold cursor-pointer px-2 py-1 rounded ${getFocusRing('sp-account')}`}
              >
                {spotifyToken ? 'Account' : 'Connect Account'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONNECT REAL SPOTIFY ACCOUNT MODAL */}
      {showConnectSpotifyModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowConnectSpotifyModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: !isDarkMode
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
            className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl flex flex-col gap-5 animate-in zoom-in-95 duration-200 relative ${
              !isDarkMode
                ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 text-neutral-900'
                : 'bg-neutral-900 border-white/20 text-white'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between border-b pb-3 ${!isDarkMode ? 'border-neutral-900/10' : 'border-white/10'}`}>
              <div className="flex items-center gap-2.5">
                <img
                  src="https://brandlogos.net/wp-content/uploads/2021/12/spotify-brandlogo.net_-768x768.png"
                  alt="Spotify"
                  className="w-7 h-7 object-contain"
                />
                <div>
                  <h3 className={`font-bold text-lg ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>Connect Spotify</h3>
                  <p className={`text-xs ${!isDarkMode ? 'text-neutral-600' : 'text-white/60'}`}>Live playback details sync</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConnectSpotifyModal(false)}
                className={`text-sm cursor-pointer p-1 ${!isDarkMode ? 'text-neutral-700 hover:text-black' : 'text-white/60 hover:text-white'}`}
              >
                ✕
              </button>
            </div>

            {/* Current Status */}
            {spotifyToken ? (
              <div className="p-4 rounded-xl bg-[#1DB954]/15 border border-[#1DB954]/40 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#1DB954] font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Spotify Account Connected</span>
                </div>
                <p className={`text-xs ${!isDarkMode ? 'text-neutral-800' : 'text-white/80'}`}>
                  Live playback data is sync'd in real-time. Start playing a song on your Spotify app to see details live!
                </p>
                <button
                  type="button"
                  onClick={handleDisconnectSpotify}
                  className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-600 dark:text-rose-300 text-xs font-medium cursor-pointer transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Disconnect Account
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Method 1: 1-Click Spotify OAuth */}
                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-semibold ${!isDarkMode ? 'text-neutral-800' : 'text-white/80'}`}>Option 1: OAuth Login</label>
                  <button
                    type="button"
                    onClick={handleConnectSpotifyOAuth}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Log in with Spotify OAuth
                  </button>
                  <p className={`text-[11px] ${!isDarkMode ? 'text-neutral-600' : 'text-white/50'}`}>
                    Opens official Spotify authorization popup directly.
                  </p>
                </div>

                <div className="relative flex items-center justify-center my-1">
                  <div className={`border-t w-full ${!isDarkMode ? 'border-neutral-900/10' : 'border-white/10'}`} />
                  <span className={`px-3 text-[11px] uppercase font-bold absolute ${!isDarkMode ? 'bg-white/80 text-neutral-600' : 'bg-neutral-900 text-white/40'}`}>
                    or
                  </span>
                </div>

                {/* Method 2: Manual Access Token Input */}
                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-semibold flex items-center gap-1.5 ${!isDarkMode ? 'text-neutral-800' : 'text-white/80'}`}>
                    <Key className="w-3.5 h-3.5 text-[#1DB954]" />
                    Option 2: Paste Spotify Access Token
                  </label>
                  <input
                    type="text"
                    placeholder="Paste Spotify access_token here..."
                    value={inputToken}
                    onChange={(e) => setInputToken(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#1DB954] ${!isDarkMode ? 'bg-white/40 border-black/10 text-neutral-900 placeholder-neutral-500' : 'bg-black/50 border-white/20 text-white'}`}
                  />
                  <button
                    type="button"
                    onClick={handleSaveManualToken}
                    disabled={!inputToken.trim()}
                    className={`w-full py-2 px-3 rounded-xl disabled:opacity-40 text-xs font-semibold transition-all cursor-pointer border ${!isDarkMode ? 'bg-white/30 hover:bg-white/50 border-white/40 text-neutral-900' : 'bg-white/10 hover:bg-white/20 border-transparent text-white'}`}
                  >
                    Save Token
                  </button>
                </div>

                {/* OAuth Setup Guidance */}
                <div className={`mt-1 p-3 rounded-xl border text-[11px] flex flex-col gap-1 ${!isDarkMode ? 'bg-white/30 border-white/40 text-neutral-700' : 'bg-white/5 border-white/10 text-white/60'}`}>
                  <span className={`font-semibold ${!isDarkMode ? 'text-neutral-900' : 'text-white/80'}`}>Spotify OAuth Setup Information:</span>
                  <span>Callback URL required in Spotify Developer Dashboard:</span>
                  <code className={`px-2 py-1 rounded text-[10px] select-all break-all ${!isDarkMode ? 'bg-black/10 text-emerald-700 font-mono' : 'bg-black/60 text-[#1DB954]'}`}>
                    {`${window.location.origin}/auth/callback`}
                  </code>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CENTERING BRIGHTNESS SLIDER POPUP MODAL */}
      {showBrightnessModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 flex flex-col items-center justify-center p-6 gap-6"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          onClick={() => setShowBrightnessModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-6 animate-in zoom-in-95 duration-200"
          >
            {/* White Sun Icon at top */}
            <div className="flex flex-col items-center gap-1">
              <Sun className="w-8 h-8 text-white drop-shadow-md" strokeWidth={2} />
              <span className="text-xs font-semibold text-white/80">{brightnessLevel}%</span>
            </div>

            {/* iOS-Style Vertical Thick Brightness Slider with Perfectly Rounded Corners */}
            <div
              id="bright-slider"
              className={`relative w-24 sm:w-28 h-64 sm:h-72 rounded-full border shadow-2xl overflow-hidden flex flex-col justify-end select-none ${
                !isDarkMode
                  ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40'
                  : 'bg-neutral-900/80 border-white/20'
              } ${getFocusRing('bright-slider')}`}
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              {/* Fill indicator with flat top edge for precise level reading */}
              <div
                className="w-full bg-white transition-all duration-75 rounded-b-[40px] rounded-t-none"
                style={{
                  height: `${brightnessLevel}%`,
                }}
              />

              {/* Sun Icon overlay inside TOP ONLY of slider (bottom icon removed) */}
              <div className="absolute inset-x-0 top-0 flex justify-center p-4 pointer-events-none">
                <Sun className={`w-6 h-6 transition-colors ${brightnessLevel > 80 ? 'text-neutral-900' : 'text-white/70'}`} strokeWidth={2} />
              </div>

              {/* Invisible Range Input spanning the vertical slider */}
              <input
                type="range"
                min={10}
                max={100}
                value={brightnessLevel}
                onChange={(e) => handleBrightnessChange(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [writing-mode:vertical-lr] [direction:rtl]"
                aria-label="Brightness level"
              />
            </div>

            {/* Dark Mode Toggle Button Directly Below Slider */}
            <button
              type="button"
              id="bright-darkmode"
              onClick={() => setIsDarkMode((prev) => !prev)}
              aria-label="Toggle Dark Mode"
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                isDarkMode
                  ? 'bg-neutral-800/90 border-white/20 text-indigo-400 hover:border-indigo-400/50'
                  : 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 text-amber-500 hover:bg-white/30'
              } ${getFocusRing('bright-darkmode')}`}
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              {isDarkMode ? (
                <Moon className="w-7 h-7" strokeWidth={2} />
              ) : (
                <Sun className="w-7 h-7" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      )}

      {/* ALL APPS GALLERY DRAWER MODAL (3% Blurred Background: blur(1.8px)) */}
      {showAllAppsDrawer && (
        <div
          className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 flex items-center justify-center p-4 sm:p-6 md:p-8"
          style={{
            backdropFilter: 'blur(1.8px)',
            WebkitBackdropFilter: 'blur(1.8px)',
          }}
          onClick={() => setShowAllAppsDrawer(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: !isDarkMode
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
            className={`w-full max-w-4xl max-h-[85vh] rounded-[32px] border p-6 sm:p-8 flex flex-col gap-6 shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden ${
              !isDarkMode
                ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 text-neutral-900'
                : 'bg-neutral-900/70 border border-white/20 text-white'
            }`}
          >
            {/* Header: Title, Search & Category Filters */}
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4 ${!isDarkMode ? 'border-neutral-900/10' : 'border-white/10'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${!isDarkMode ? 'bg-white/25 border-white/40 text-neutral-900' : 'bg-white/10 border-white/20 text-white'}`}>
                  <Grid className="w-5 h-5" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold tracking-tight ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>All Applications</h2>
                  <p className={`text-xs ${!isDarkMode ? 'text-neutral-600' : 'text-white/50'}`}>Browse and launch installed apps</p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${!isDarkMode ? 'text-neutral-500' : 'text-white/40'}`} />
                <input
                  type="text"
                  id="apps-search"
                  placeholder="Search apps..."
                  value={appSearchQuery}
                  onChange={(e) => setAppSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs focus:outline-none transition-colors border ${
                    !isDarkMode
                      ? 'bg-white/25 border-white/40 text-neutral-900 placeholder-neutral-500 focus:border-white/70'
                      : 'bg-white/10 border-white/15 text-white placeholder-white/40 focus:border-white/40'
                  } ${getFocusRing('apps-search')}`}
                />
              </div>
            </div>

            {/* Category Filter Pills (1% Blur: blur(0.8px), natural circular pill enclosure with full vertical breathing room) */}
            <div className="flex items-center gap-2.5 overflow-x-auto py-3 px-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map((cat, idx) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    id={`apps-cat-${idx}`}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                    }}
                    className={`h-9 px-5 flex items-center justify-center rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                      !isDarkMode
                        ? isSelected
                          ? 'bg-white/50 text-neutral-900 border-white/60 shadow-md font-bold'
                          : 'bg-white/20 text-neutral-800 hover:bg-white/30 border-white/30'
                        : isSelected
                        ? 'bg-white text-black border-white shadow-md font-bold'
                        : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border-white/15'
                    } ${getFocusRing(`apps-cat-${idx}`)}`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* App Grid with Fade Scrolling Feature (Mask Gradient at Top/Bottom) */}
            <div
              className="flex-1 overflow-y-auto pr-2 py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
              }}
            >
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6 p-4">
                {ALL_APPS.filter((app) => {
                  const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
                  const matchesSearch = app.name.toLowerCase().includes(appSearchQuery.toLowerCase());
                  return matchesCategory && matchesSearch;
                }).map((app, index) => {
                  const isYouTube = app.id === 'youtube';
                  const isSpotify = app.id === 'spotify';
                  const isAppleTv = app.id === 'appletv';
                  const isPeacock = app.id === 'peacock';
                  const isWhiteApp = app.id === 'ytmusic' || app.id === 'applemusic';

                  return (
                    <button
                      key={app.id}
                      type="button"
                      id={`apps-item-${index}`}
                      onClick={() => {
                        setShowAllAppsDrawer(false);
                        launchTvApp(app.id);
                      }}
                      className={`group flex flex-col items-center gap-2.5 transition-all duration-200 cursor-pointer focus:outline-none rounded-2xl p-1 animate-in fade-in zoom-in duration-300 fill-mode-backwards ${getFocusRing(`apps-item-${index}`)}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* App Icon Container - All properly fitted in allocated box */}
                      <div
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl active:scale-95 overflow-hidden ${
                          !isDarkMode
                            ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40'
                            : isWhiteApp
                            ? 'bg-white border-white/40 p-2 sm:p-2.5'
                            : 'bg-black border-white/20 group-hover:border-white/50'
                        }`}
                        style={{
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                        }}
                      >
                        {isYouTube ? (
                          /* Dedicated YouTube Icon matching homepage SVG with dark background like Netflix */
                          <div className="w-full h-full p-2.5 sm:p-3 flex items-center justify-center">
                            <svg
                              viewBox="0 0 68 48"
                              className="w-full h-full object-contain select-none pointer-events-none filter drop-shadow-md"
                            >
                              <path
                                d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                                fill="#FF0000"
                              />
                              <polygon points="45,24 27,14 27,34" fill="#FFFFFF" />
                            </svg>
                          </div>
                        ) : isAppleTv ? (
                          /* Dedicated Apple TV Icon - Pure White Vector for High Contrast on Dark Background */
                          <div className="w-full h-full p-2.5 sm:p-3 flex items-center justify-center">
                            <svg
                              viewBox="0 0 24 24"
                              fill="#ffffff"
                              className="w-full h-full object-contain select-none pointer-events-none filter drop-shadow-md"
                              aria-label="Apple TV"
                            >
                              <path d="M20.57 17.735h-1.815l-3.34-9.203h1.633l2.02 5.987c.075.231.273.9.586 2.012l.297-.997.33-1.006 2.094-6.004H24zm-5.344-.066a5.76 5.76 0 0 1-1.55.207c-1.23 0-1.84-.693-1.84-2.087V9.646h-1.063V8.532h1.121V7.081l1.476-.602v2.062h1.707v1.113H13.38v5.805c0 .446.074.75.214.932.14.182.396.264.75.264.207 0 .495-.041.883-.115zm-7.29-5.343c.017 1.764 1.55 2.358 1.567 2.366-.017.042-.248.842-.808 1.658-.487.71-.99 1.418-1.79 1.435-.783.016-1.03-.462-1.93-.462-.89 0-1.17.445-1.913.478-.758.025-1.344-.775-1.838-1.484-.998-1.451-1.765-4.098-.734-5.88.51-.89 1.426-1.451 2.416-1.46.75-.016 1.468.512 1.93.512.461 0 1.327-.627 2.234-.536.38.016 1.452.157 2.136 1.154-.058.033-1.278.743-1.27 2.219M6.468 7.988c.404-.495.685-1.18.61-1.864-.585.025-1.294.388-1.723.883-.38.437-.71 1.138-.619 1.806.652.05 1.328-.338 1.732-.825Z" />
                            </svg>
                          </div>
                        ) : isPeacock ? (
                          /* Dedicated Peacock Icon - High Contrast White "p" with Vibrant Multi-Color Spectrum Dots */
                          <div className="w-full h-full p-2.5 sm:p-3 flex items-center justify-center">
                            <svg
                              viewBox="0 0 72 70"
                              className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
                              aria-label="Peacock"
                            >
                              <path
                                fill="#FFFFFF"
                                d="M 48.344 23.376 c 0 14.582 -11.297 26.178 -36.608 29.087 v 15.477 H 0 V 24.602 C 0 9.105 10.948 0 24.698 0 c 13.75 0 23.646 10.244 23.646 23.376 m -11.736 0.437 c 0 -7.18 -5.43 -12.606 -12.349 -12.606 c -6.92 0 -12.525 4.902 -12.525 13.394 v 16.714 C 21.134 41.049 36.606 35.785 36.606 23.814 Z"
                              />
                              <circle cx="64" cy="5.5" r="5.5" fill="#FFC200" />
                              <circle cx="64" cy="20" r="5.5" fill="#FF6400" />
                              <circle cx="64" cy="34.5" r="5.5" fill="#E20074" />
                              <circle cx="64" cy="49" r="5.5" fill="#7847FF" />
                              <circle cx="64" cy="63.5" r="5.5" fill="#00A637" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-full h-full p-2.5 sm:p-3 flex items-center justify-center">
                            <img
                              src={app.logo}
                              alt={app.name}
                              className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-2xl" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-white/10 to-transparent pointer-events-none" />
                        
                        {/* Drag handle */}
                        {isRearranging && app.id !== 'threedots' && app.id !== 'settings' && (
                          <div className="absolute bottom-1 right-1 bg-black/50 p-0.5 rounded">
                            <Grab className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <span className={`text-xs font-semibold transition-colors text-center line-clamp-1 ${!isDarkMode ? 'text-neutral-900 group-hover:text-black' : 'text-white/80 group-hover:text-white'}`}>
                        {app.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* FLOATING SETTINGS SIDEBAR (With 89% background blur) */}
      {showSettingsSidebar && (
        <div
          className="fixed inset-0 z-50 bg-black/25 transition-opacity duration-300 flex items-start justify-end p-6 sm:p-10 pt-20"
          style={{
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
          }}
          onClick={() => setShowSettingsSidebar(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-80 sm:w-96 max-h-[80vh] rounded-[28px] p-6 flex flex-col gap-5 shadow-2xl animate-in slide-in-from-top-4 duration-200 relative overflow-hidden border ${
              !isDarkMode
                ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 text-neutral-900'
                : 'bg-gradient-to-b from-white/15 via-white/5 to-transparent border-white/25 text-white'
            }`}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: !isDarkMode
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                : '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
            }}
          >
            {/* Glossy top-half highlight overlay */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[28px]" />
            <div className={`flex items-center justify-between border-b pb-4 ${!isDarkMode ? 'border-black/10' : 'border-white/10'}`}>
              <div className="flex items-center gap-2.5">
                <Settings className={`w-5 h-5 ${!isDarkMode ? 'text-neutral-900' : 'text-white/90'}`} />
                <h3 className={`text-base font-bold ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>Settings</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSettingsSidebar(false)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer border ${
                  !isDarkMode
                    ? 'bg-white/20 hover:bg-white/30 border-white/40 text-neutral-800'
                    : 'bg-white/10 hover:bg-white/20 border-transparent text-white/80 hover:text-white'
                }`}
              >
                ✕
              </button>
            </div>

            {/* Sidebar Options */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                id="settings-themes-btn"
                onClick={() => {
                  setShowWallpaperModal(true);
                  setKeyboardFocusId('wp-item-0');
                }}
                className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-between transition-all cursor-pointer group shadow-md border ${
                  !isDarkMode
                    ? 'bg-white/20 hover:bg-white/30 border-white/40 text-neutral-900 backdrop-blur-md'
                    : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                } ${getFocusRing('settings-themes-btn')}`}
              >
                <span>Wallpapers</span>
                <span className={`${!isDarkMode ? 'text-neutral-500 group-hover:text-neutral-900' : 'text-white/40 group-hover:text-white'} transition-colors`}>›</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WALLPAPER PICKER CENTERED POPUP MODAL */}
      {showWallpaperModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 flex items-center justify-center p-4"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          onClick={() => setShowWallpaperModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-2xl max-h-[85vh] rounded-3xl p-6 sm:p-8 flex flex-col gap-5 relative shadow-2xl animate-in zoom-in-95 duration-200 border overflow-hidden ${
              !isDarkMode
                ? 'bg-gradient-to-b from-white/25 via-white/20 to-white/10 border-white/40 text-neutral-900'
                : 'bg-neutral-900/90 border-white/30 text-white'
            }`}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: !isDarkMode
                ? '0 30px 60px -15px rgba(0, 0, 0, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)'
                : '0 30px 60px -15px rgba(0, 0, 0, 0.8)',
            }}
          >
            {/* Glossy top-half highlight overlay */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-3xl" />
            {/* Header */}
            <div className={`flex items-center justify-between border-b pb-4 ${!isDarkMode ? 'border-black/10' : 'border-white/10'}`}>
              <div>
                <h3 className={`text-lg font-bold tracking-tight ${!isDarkMode ? 'text-neutral-900' : 'text-white'}`}>Wallpaper Gallery</h3>
                <p className={`text-xs ${!isDarkMode ? 'text-neutral-600' : 'text-white/60'}`}>Select a wallpaper image to set as system background</p>
              </div>
              <button
                type="button"
                id="wp-close-btn"
                onClick={() => {
                  setShowWallpaperModal(false);
                  setKeyboardFocusId('settings-themes-btn');
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer border ${
                  !isDarkMode
                    ? 'bg-white/20 hover:bg-white/30 border-white/40 text-neutral-800'
                    : 'bg-white/10 hover:bg-white/20 border-transparent text-white/80 hover:text-white'
                } ${getFocusRing('wp-close-btn')}`}
              >
                ✕
              </button>
            </div>

            {/* Wallpaper Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 overflow-y-auto p-1 max-h-[52vh] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {WALLPAPERS.map((wp, index) => {
                const isSelected = selectedWallpaper === wp.url;
                return (
                  <button
                    key={wp.id}
                    id={`wp-item-${index}`}
                    type="button"
                    onClick={() => {
                      setSelectedWallpaper(wp.url);
                      localStorage.setItem('user_selected_wallpaper', wp.url);
                    }}
                    aria-label={wp.title}
                    className={`group relative aspect-[9/16] rounded-2xl overflow-hidden border-2 transition-all duration-200 cursor-pointer shadow-lg active:scale-95 ${
                      isSelected
                        ? 'border-sky-400 ring-4 ring-sky-400/40 scale-[1.02]'
                        : !isDarkMode
                        ? 'border-neutral-300 hover:border-sky-400 hover:scale-[1.03]'
                        : 'border-white/20 hover:border-white/60 hover:scale-[1.03]'
                    } ${getFocusRing(`wp-item-${index}`)}`}
                  >
                    <img
                      src={wp.url}
                      alt={wp.title}
                      className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-lg border border-white/50 z-10">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

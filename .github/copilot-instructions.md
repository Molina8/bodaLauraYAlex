# Wedding Invitation App - Copilot Instructions

## Project Overview
This is a React-based wedding invitation website for Laura & Alex's wedding. The app presents an elegant, single-page invitation with form submission for RSVP confirmations.

## Architecture & Key Components

### Core Structure
- **Single-page React app** with scroll-based navigation between sections
- **Three main sections**: Cover (full-screen), Details, and RSVP form with smooth scroll
- **Component hierarchy**: `App.tsx` → `WeddingInvitation.tsx` (main component with all logic)

### Tech Stack Specifics
- **Vite + React 18 + TypeScript**: Modern development setup
- **Tailwind CSS**: Utility-first styling with gradient backgrounds and backdrop blur effects
- **Lucide React**: Icon library for consistent iconography (`Heart`, `MapPin`, `Clock`, `Users`, etc.)
- **Form handling**: Pure React state management (no external form libraries)

## Development Patterns

### Component Design
- **Monolithic component**: `WeddingInvitation.tsx` handles all state and UI logic (500+ lines)
- **Section-based layout**: Three main sections with `id` attributes for smooth scrolling
- **TypeScript interfaces**: Well-defined types for `Guest`, `FormData` with specific string literals for `busService`
- **Responsive design**: Uses Tailwind's responsive utilities (`md:grid-cols-2`, etc.) for layout
### Styling Conventions
- **Full-screen cover**: Background image with overlay (`bg-black/20`) for text readability
- **Gradient backgrounds**: `bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50` for content pages
- **Glass morphism**: `bg-white/80 backdrop-blur-sm` for card overlays
- **Color scheme**: Rose/pink palette (`rose-300`, `rose-400`, `pink-300`) with purple accents
- **Typography**: Large serif fonts for headings, light weights for elegance

### State Management Pattern
```tsx
const [formData, setFormData] = useState<FormData>({
  // Complex nested state with guests array
  guests: [], // Dynamic array managed with add/remove/update functions
  busService: 'none' | 'roundtrip' | 'oneway-there' | 'oneway-back'
});

// Form state
const [showForm, setShowForm] = useState(false);

// Audio control state
const [isPlaying, setIsPlaying] = useState(false);
const audioRef = useRef<HTMLAudioElement>(null);
```

## Key Features & Implementation Details

### Audio Control System
- **Background music**: Auto-plays `/cancion.mp3` on load with fallback for browser autoplay policies
- **Play/pause toggle**: Floating button in bottom-right with `Play`/`Pause` icons from Lucide
- **State management**: Uses `useRef` for audio element control and `useState` for play state

### Dynamic Guest Management
- Guests added as objects with unique IDs (`Date.now().toString()`)
- Update pattern: `updateGuest(id, field, value)` with immutable state updates
- Remove pattern: Filter by ID to maintain referential integrity

### Form Validation & UX
- **Required fields**: Only name and lastName are required
- **Conditional sections**: Bus service and dietary restrictions only show if attending
- **Smooth scroll UX**: Cover → Details → Form → Success confirmation with smooth scroll navigation

### Asset References
- **Cover image**: `/portada.jpg` for full-screen background in cover view
- **Audio file**: `/cancion.mp3` background music with play/pause control
- **Font setup**: Google Fonts integration with Playfair Display (serif) and Inter

## Development Workflow

### Available Scripts
```bash
npm run dev     # Development server with hot reload
npm run build   # Production build
npm run preview # Preview production build locally
npm run lint    # ESLint with TypeScript rules
```

### Configuration Notes
- **Vite config**: Excludes `lucide-react` from optimization for better tree-shaking
- **ESLint**: Uses flat config with TypeScript, React hooks, and React refresh rules
- **Tailwind**: Standard setup scanning `./src/**/*.{js,ts,jsx,tsx}`

## Project-Specific Guidelines

### When Adding Features
- Maintain the three-section pattern (cover/details/form)
- Use the established color palette and glass morphism styling
- Follow the immutable state update patterns for form data
- Add new icons from `lucide-react` library

### Form Extensions
- New fields should be added to the `FormData` interface first
- Follow the controlled component pattern with `value` and `onChange`
- Use the established grid layout (`md:grid-cols-2`) for field pairs

### Styling Consistency
- Cards: `bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg`
- Buttons: `bg-gradient-to-r from-rose-300 to-pink-300 hover:from-rose-400 hover:to-pink-400`
- Form inputs: `rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-300`

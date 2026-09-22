import { create } from 'zustand';
import {
    firebaseSignInWithEmail,
    firebaseRegisterWithEmail,
    firebaseSignInWithGoogle,
    firebaseSignInWithGithub,
    firebaseSendPasswordReset,
    firebaseResendVerification,
    firebaseSignOut,
    onAuthChange,
    type User as FirebaseUser,
} from '@/lib/firebase';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const AUTH_MODE = process.env.NEXT_PUBLIC_AUTH_MODE || 'local';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar: string;
    photoURL?: string;
    emailVerified?: boolean;
    provider?: string;
}

interface TrafficZone {
    zoneId: string;
    zoneName: string;
    lat: number;
    lng: number;
    congestionLevel: number;
    congestionCategory: string;
    averageSpeed: number;
    vehicleCount: number;
    incidents: number;
    timestamp: string;
}

interface EmissionZone {
    zoneId: string;
    zoneName: string;
    lat: number;
    lng: number;
    co2Emission: number;
    noxEmission: number;
    pm25Level: number;
    airQualityIndex: number;
    vehicleCount: number;
    congestionLevel: number;
    timestamp: string;
}

interface Route {
    id: string;
    name: string;
    type: string;
    distance: number;
    estimatedTime: number;
    congestionLevel: number;
    co2Emission: number;
    fuelConsumption: number;
    emissionSaved: number;
    waypoints: { lat: number; lng: number }[];
    color: string;
}

interface Alert {
    id: string;
    type: string;
    severity: string;
    icon: string;
    title: string;
    zone: string;
    lat: number;
    lng: number;
    message: string;
    timestamp: string;
    isRead: boolean;
}

interface HistoricalData {
    date: string;
    avgCongestion: number;
    totalVehicles: number;
    co2Emissions: number;
    noxEmissions: number;
    fuelConsumed: number;
    avgSpeed: number;
    incidents: number;
    peakHour: string;
}

interface HourlyData {
    hour: string;
    congestion: number;
    vehicles: number;
    co2: number;
    speed: number;
}

interface Overview {
    avgCongestion: number;
    totalVehicles: number;
    totalCO2: number;
    avgSpeed: number;
    totalIncidents: number;
    activeZones: number;
    congestionTrend: string;
    emissionTrend: string;
}

interface Settings {
    dataSources: { gps: boolean; iot: boolean; publicApi: boolean; historical: boolean };
    emissionThresholds: { low: number; medium: number; high: number };
    refreshInterval: number;
    mapStyle: string;
    notifications: { congestion: boolean; accidents: boolean; emissions: boolean; roadwork: boolean };
    unit: string;
}

interface PredictiveZone {
    zoneId: string;
    zoneName: string;
    currentCongestion: number;
    forecast1h: number;
    forecast3h: number;
    forecast6h: number;
    trend: string;
    confidenceScore: number;
    suggestedAction: string;
}

interface EmergencyCorridor {
    corridorId: string;
    vehicleType: string;
    status: string;
    origin: string;
    destination: string;
    signalsSynchronized: number;
    estimatedTimeSavedMin: number;
    priorityLevel: string;
    dispatchTimestamp: string;
}

interface LeaderboardItem {
    rank: number;
    name: string;
    category: string;
    co2SavedKg: number;
    ecoPoints: number;
    badge: string;
}

interface CopilotResponse {
    success: boolean;
    provider: string;
    intent: string;
    answer: string;
    dataSources: string[];
    confidence: number;
    recommendations: string[];
    explanation: string;
}

interface IncidentItem {
    incidentId: string;
    type: string;
    severity: string;
    zone: string;
    confidence: number;
    detectedAt: string;
    estimatedImpact: { delayMinutes: number; affectedVehicles: number };
    recommendedActions: string[];
    status: string;
}

interface ForecastTimelineItem {
    horizon: string;
    congestionPercent: number;
    averageSpeedKmh: number;
    vehicleVolume: number;
    travelTimeMultiplier: number;
    queueLengthMeters: number;
    incidentRisk: string;
    co2EmissionKg: number;
}

interface AppState {
    // Safe-Flow X State
    copilotLoading: boolean;
    copilotResponse: CopilotResponse | null;
    incidents: IncidentItem[];
    forecastTimeline: ForecastTimelineItem[];
    digitalTwinResult: any | null;
    systemHealth: any | null;
    demoStep: number;
    demoActive: boolean;
    chaosActive: boolean;

    // Future AI & Eco State
    predictiveData: PredictiveZone[];
    activeCorridor: EmergencyCorridor | null;
    leaderboard: LeaderboardItem[];
    offsetResult: { monthlyKm: number; monthlyCO2Kg: number; yearlyCO2Tonnes: number; treesNeededToOffset: number; ecoCreditsEarnable: number } | null;
    // Auth
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loginError: string | null;
    loginLoading: boolean;
    authMode: 'local' | 'firebase';
    authView: 'login' | 'register' | 'forgot-password';
    authMessage: string | null;
    firebaseUser: FirebaseUser | null;

    // Navigation
    activePage: string;
    sidebarCollapsed: boolean;

    // Data
    trafficData: TrafficZone[];
    emissionData: EmissionZone[];
    routes: Route[];
    alerts: Alert[];
    historicalData: HistoricalData[];
    hourlyData: HourlyData[];
    overview: Overview | null;
    settings: Settings | null;

    // Loading states
    loading: {
        traffic: boolean;
        emissions: boolean;
        routes: boolean;
        alerts: boolean;
        analytics: boolean;
    };

    // Auth Actions
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    loginWithGithub: () => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resendVerification: () => Promise<void>;
    logout: () => void;
    setAuthView: (view: 'login' | 'register' | 'forgot-password') => void;
    setAuthMode: (mode: 'local' | 'firebase') => void;
    clearAuthError: () => void;
    initFirebaseAuth: () => void;

    // Navigation
    setActivePage: (page: string) => void;
    toggleSidebar: () => void;

    // Data Actions
    fetchTrafficData: () => Promise<void>;
    fetchEmissionData: () => Promise<void>;
    fetchRoutes: (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) => Promise<void>;
    fetchAlerts: () => Promise<void>;
    fetchAnalytics: () => Promise<void>;
    fetchHistoricalData: (days?: number) => Promise<void>;
    fetchHourlyData: () => Promise<void>;
    fetchSettings: () => Promise<void>;
    updateSettings: (settings: Partial<Settings>) => Promise<void>;
    markAlertRead: (id: string) => void;

    // Safe-Flow X Actions
    queryCopilot: (prompt: string) => Promise<void>;
    fetchIncidents: () => Promise<void>;
    fetchForecastTimeline: (strategy?: string) => Promise<void>;
    simulateScenario: (scenario: string, parameters?: any) => Promise<void>;
    fetchSystemHealth: () => Promise<void>;
    startDemo: () => void;
    nextDemoStep: () => void;
    stopDemo: () => void;
    toggleChaos: () => void;

    // Future Scope Actions
    fetchPredictiveTraffic: () => Promise<void>;
    dispatchEmergencyCorridor: (vehicleType: string, originZone: string, destinationZone: string) => Promise<void>;
    calculateOffset: (monthlyKm: number, vehicleType: string) => Promise<void>;
    fetchLeaderboard: () => Promise<void>;
}

// Helper: Convert Firebase User to App User
function firebaseUserToAppUser(fbUser: FirebaseUser): User {
    const name = fbUser.displayName || fbUser.email?.split('@')[0] || 'User';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const providerData = fbUser.providerData[0];
    const provider = providerData?.providerId === 'google.com' ? 'google'
        : providerData?.providerId === 'github.com' ? 'github'
            : 'email';

    return {
        id: fbUser.uid,
        email: fbUser.email || '',
        name,
        role: 'citizen', // Default role; can be overridden by backend
        avatar: initials,
        photoURL: fbUser.photoURL || undefined,
        emailVerified: fbUser.emailVerified,
        provider,
    };
}

const useStore = create<AppState>((set, get) => ({
    // Auth
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('mobility_token') : null,
    isAuthenticated: false,
    loginError: null,
    loginLoading: false,
    authMode: (AUTH_MODE as 'local' | 'firebase') || 'local',
    authView: 'login',
    authMessage: null,
    firebaseUser: null,

    // Navigation
    activePage: 'dashboard',
    sidebarCollapsed: false,

    // Data
    trafficData: [],
    emissionData: [],
    routes: [],
    alerts: [],
    historicalData: [],
    hourlyData: [],
    overview: null,
    settings: null,
    predictiveData: [],
    activeCorridor: null,
    leaderboard: [],
    offsetResult: null,

    // Safe-Flow X Initial State
    copilotLoading: false,
    copilotResponse: null,
    incidents: [],
    forecastTimeline: [],
    digitalTwinResult: null,
    systemHealth: null,
    demoStep: 0,
    demoActive: false,
    chaosActive: false,

    // Loading
    loading: {
        traffic: false,
        emissions: false,
        routes: false,
        alerts: false,
        analytics: false,
    },

    // ============== AUTH ACTIONS ==============

    // Initialize Firebase Auth listener
    initFirebaseAuth: () => {
        if (get().authMode !== 'firebase') return;

        onAuthChange(async (fbUser) => {
            if (fbUser) {
                const idToken = await fbUser.getIdToken();
                const appUser = firebaseUserToAppUser(fbUser);

                // Try to sync user with backend
                try {
                    const res = await fetch(`${API_BASE}/auth/firebase-login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${idToken}`,
                        },
                        body: JSON.stringify({
                            uid: fbUser.uid,
                            email: fbUser.email,
                            name: fbUser.displayName,
                            photoURL: fbUser.photoURL,
                            provider: appUser.provider,
                        }),
                    });
                    const data = await res.json();
                    if (data.user?.role) {
                        appUser.role = data.user.role;
                    }
                    localStorage.setItem('mobility_token', data.token || idToken);
                    set({
                        user: appUser,
                        token: data.token || idToken,
                        isAuthenticated: true,
                        firebaseUser: fbUser,
                        loginLoading: false,
                    });
                } catch {
                    // Fallback: use Firebase token directly
                    localStorage.setItem('mobility_token', idToken);
                    set({
                        user: appUser,
                        token: idToken,
                        isAuthenticated: true,
                        firebaseUser: fbUser,
                        loginLoading: false,
                    });
                }
            } else {
                localStorage.removeItem('mobility_token');
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    firebaseUser: null,
                });
            }
        });
    },

    // Email/Password Login (supports both local and Firebase)
    login: async (email: string, password: string) => {
        set({ loginLoading: true, loginError: null, authMessage: null });
        const { authMode } = get();

        if (authMode === 'firebase') {
            const result = await firebaseSignInWithEmail(email, password);
            if (!result.success) {
                set({ loginError: result.error, loginLoading: false });
            }
            // Firebase auth listener will handle the rest
        } else {
            // Local JWT auth
            try {
                const res = await fetch(`${API_BASE}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Login failed');

                localStorage.setItem('mobility_token', data.token);
                set({ user: data.user, token: data.token, isAuthenticated: true, loginLoading: false });
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Login failed';
                set({ loginError: message, loginLoading: false });
            }
        }
    },

    // Google Sign-In (Firebase only)
    loginWithGoogle: async () => {
        set({ loginLoading: true, loginError: null, authMessage: null });
        const result = await firebaseSignInWithGoogle();
        if (!result.success) {
            set({ loginError: result.error, loginLoading: false });
        }
        // Firebase auth listener handles the rest
    },

    // GitHub Sign-In (Firebase only)
    loginWithGithub: async () => {
        set({ loginLoading: true, loginError: null, authMessage: null });
        const result = await firebaseSignInWithGithub();
        if (!result.success) {
            set({ loginError: result.error, loginLoading: false });
        }
    },

    // Register new account (Firebase only)
    register: async (email: string, password: string, name: string) => {
        set({ loginLoading: true, loginError: null, authMessage: null });
        const { authMode } = get();

        if (authMode === 'firebase') {
            const result = await firebaseRegisterWithEmail(email, password, name);
            if (result.success) {
                set({
                    loginLoading: false,
                    authMessage: result.message || 'Account created! Please verify your email.',
                    authView: 'login',
                });
            } else {
                set({ loginError: result.error, loginLoading: false });
            }
        } else {
            // Local registration via backend
            try {
                const res = await fetch(`${API_BASE}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, name }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Registration failed');
                set({
                    loginLoading: false,
                    authMessage: 'Account created! You can now sign in.',
                    authView: 'login',
                });
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Registration failed';
                set({ loginError: message, loginLoading: false });
            }
        }
    },

    // Password Reset
    forgotPassword: async (email: string) => {
        set({ loginLoading: true, loginError: null, authMessage: null });
        const { authMode } = get();

        if (authMode === 'firebase') {
            const result = await firebaseSendPasswordReset(email);
            if (result.success) {
                set({
                    loginLoading: false,
                    authMessage: result.message || 'Password reset email sent!',
                    authView: 'login',
                });
            } else {
                set({ loginError: result.error, loginLoading: false });
            }
        } else {
            // Simulate for local mode
            set({
                loginLoading: false,
                authMessage: 'Password reset email sent! (Demo mode)',
                authView: 'login',
            });
        }
    },

    // Resend Verification Email (Firebase only)
    resendVerification: async () => {
        const result = await firebaseResendVerification();
        if (result.success) {
            set({ authMessage: result.message || 'Verification email sent!' });
        } else {
            set({ loginError: result.error });
        }
    },

    // Logout
    logout: () => {
        const { authMode } = get();
        if (authMode === 'firebase') {
            firebaseSignOut();
        }
        localStorage.removeItem('mobility_token');
        set({
            user: null,
            token: null,
            isAuthenticated: false,
            firebaseUser: null,
            activePage: 'dashboard',
            authView: 'login',
            authMessage: null,
            loginError: null,
        });
    },

    // Auth View Navigation
    setAuthView: (view) => set({ authView: view, loginError: null, authMessage: null }),
    setAuthMode: (mode) => set({ authMode: mode, loginError: null, authMessage: null }),
    clearAuthError: () => set({ loginError: null, authMessage: null }),

    // ============== NAVIGATION ==============
    setActivePage: (page: string) => set({ activePage: page }),
    toggleSidebar: () => set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),

    // ============== DATA FETCHING ==============
    fetchTrafficData: async () => {
        const { token } = get();
        if (!token) return;
        set(state => ({ loading: { ...state.loading, traffic: true } }));
        try {
            const res = await fetch(`${API_BASE}/traffic/realtime`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            set(state => ({ trafficData: data.data, loading: { ...state.loading, traffic: false } }));
        } catch {
            set(state => ({ loading: { ...state.loading, traffic: false } }));
        }
    },

    fetchEmissionData: async () => {
        const { token } = get();
        if (!token) return;
        set(state => ({ loading: { ...state.loading, emissions: true } }));
        try {
            const res = await fetch(`${API_BASE}/emissions/realtime`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            set(state => ({ emissionData: data.data, loading: { ...state.loading, emissions: false } }));
        } catch {
            set(state => ({ loading: { ...state.loading, emissions: false } }));
        }
    },

    fetchRoutes: async (origin, destination) => {
        const { token } = get();
        if (!token) return;
        set(state => ({ loading: { ...state.loading, routes: true } }));
        try {
            const res = await fetch(`${API_BASE}/routes/optimize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ origin, destination }),
            });
            const data = await res.json();
            set(state => ({ routes: data.routes, loading: { ...state.loading, routes: false } }));
        } catch {
            set(state => ({ loading: { ...state.loading, routes: false } }));
        }
    },

    fetchAlerts: async () => {
        const { token } = get();
        if (!token) return;
        set(state => ({ loading: { ...state.loading, alerts: true } }));
        try {
            const res = await fetch(`${API_BASE}/alerts`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            set(state => ({ alerts: data.alerts, loading: { ...state.loading, alerts: false } }));
        } catch {
            set(state => ({ loading: { ...state.loading, alerts: false } }));
        }
    },

    fetchAnalytics: async () => {
        const { token } = get();
        if (!token) return;
        set(state => ({ loading: { ...state.loading, analytics: true } }));
        try {
            const res = await fetch(`${API_BASE}/analytics/overview`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            set(state => ({
                overview: data.overview,
                trafficData: data.trafficByZone,
                emissionData: data.emissionByZone,
                loading: { ...state.loading, analytics: false },
            }));
        } catch {
            set(state => ({ loading: { ...state.loading, analytics: false } }));
        }
    },

    fetchHistoricalData: async (days = 30) => {
        const { token } = get();
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/analytics/historical?days=${days}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            set({ historicalData: data.data });
        } catch { /* noop */ }
    },

    fetchHourlyData: async () => {
        const { token } = get();
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/analytics/peak-hours`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            set({ hourlyData: data.data });
        } catch { /* noop */ }
    },

    fetchSettings: async () => {
        const { token } = get();
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/settings`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            set({ settings: data.settings });
        } catch { /* noop */ }
    },

    updateSettings: async (newSettings) => {
        const { token } = get();
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/settings`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(newSettings),
            });
            const data = await res.json();
            set({ settings: data.settings });
        } catch { /* noop */ }
    },

    markAlertRead: (id: string) => {
        set(state => ({
            alerts: state.alerts.map(a => a.id === id ? { ...a, isRead: true } : a),
        }));
    },

    fetchPredictiveTraffic: async () => {
        const { token } = get();
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/routes/predictive-traffic`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            set({ predictiveData: data.predictions || [] });
        } catch { /* noop */ }
    },

    dispatchEmergencyCorridor: async (vehicleType, originZone, destinationZone) => {
        const { token } = get();
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/routes/emergency-corridor`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ vehicleType, originZone, destinationZone }),
            });
            const data = await res.json();
            set({ activeCorridor: data });
        } catch { /* noop */ }
    },

    calculateOffset: async (monthlyKm, vehicleType) => {
        const { token } = get();
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/emissions/offset-calculator`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ monthlyKm, vehicleType }),
            });
            const data = await res.json();
            set({ offsetResult: data });
        } catch { /* noop */ }
    },

    fetchLeaderboard: async () => {
        const { token } = get();
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/gamification/leaderboard`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            set({ leaderboard: data.leaderboard || [] });
        } catch { /* noop */ }
    },

    // Safe-Flow X Actions
    queryCopilot: async (prompt: string) => {
        const { token } = get();
        if (!token) return;
        set({ copilotLoading: true });
        try {
            const res = await fetch(`${API_BASE}/ai/copilot`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ prompt }),
            });
            const data = await res.json();
            set({ copilotResponse: data, copilotLoading: false });
        } catch {
            set({ copilotLoading: false });
        }
    },

    fetchIncidents: async () => {
        const { token } = get();
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/incidents`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            set({ incidents: data.incidents || [] });
        } catch { /* noop */ }
    },

    fetchForecastTimeline: async (strategy = 'TIME_SERIES') => {
        const { token } = get();
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/ai/traffic-forecast?strategy=${strategy}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            set({ forecastTimeline: data.timeline || [] });
        } catch { /* noop */ }
    },

    simulateScenario: async (scenario, parameters = {}) => {
        const { token } = get();
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/digital-twin/simulate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ scenario, parameters }),
            });
            const data = await res.json();
            set({ digitalTwinResult: data });
        } catch { /* noop */ }
    },

    fetchSystemHealth: async () => {
        try {
            const res = await fetch(`${API_BASE}/system/health`);
            const data = await res.json();
            set({ systemHealth: data });
        } catch { /* noop */ }
    },

    startDemo: () => set({ demoActive: true, demoStep: 1, activePage: 'command-center' }),
    nextDemoStep: () => set(state => ({ demoStep: Math.min(10, state.demoStep + 1) })),
    stopDemo: () => set({ demoActive: false, demoStep: 0 }),
    toggleChaos: () => set(state => ({ chaosActive: !state.chaosActive })),
}));

export default useStore;
export type { TrafficZone, EmissionZone, Route, Alert, HistoricalData, HourlyData, Overview, Settings, User, PredictiveZone, EmergencyCorridor, LeaderboardItem, CopilotResponse, IncidentItem, ForecastTimelineItem };

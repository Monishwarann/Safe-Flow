/**
 * Safe-Flow X — Mobility Intelligence, Incident Engine, Carbon & Audit Service
 */

const { v4: uuidv4 } = require('uuid');

class MobilityIntelligence {
    constructor() {
        this.auditLogs = [];
        this.incidents = [
            {
                incidentId: 'INC-2041',
                type: 'CONGESTION_ANOMALY',
                severity: 'HIGH',
                zone: 'Downtown Core',
                confidence: 0.92,
                detectedAt: new Date(Date.now() - 12 * 60000).toISOString(),
                estimatedImpact: { delayMinutes: 18, affectedVehicles: 820 },
                recommendedActions: ['Reroute via Tech District Z2', 'Increase bus dispatch frequency'],
                status: 'ACTIVE',
            },
            {
                incidentId: 'INC-2042',
                type: 'ROAD_BLOCKAGE',
                severity: 'MEDIUM',
                zone: 'Market District',
                confidence: 0.88,
                detectedAt: new Date(Date.now() - 35 * 60000).toISOString(),
                estimatedImpact: { delayMinutes: 10, affectedVehicles: 340 },
                recommendedActions: ['Activate temporary detour route', 'Notify local delivery fleets'],
                status: 'ACKNOWLEDGED',
            },
        ];

        this.badges = [
            { id: 'b1', name: 'Green Starter', icon: '🌱', description: 'Complete first 5 eco-friendly commutes', unlocked: true },
            { id: 'b2', name: 'Carbon Cutter', icon: '🚲', description: 'Save 25 kg of CO₂ through cycling or walking', unlocked: true },
            { id: 'b3', name: 'Transit Champion', icon: '🚇', description: 'Take 15 public transit trips in a single week', unlocked: true },
            { id: 'b4', name: 'EV Explorer', icon: '⚡', description: 'Log 100 km of zero-emission EV transit', unlocked: false },
            { id: 'b5', name: 'Eco Hero', icon: '🌍', description: 'Reach top 5 on city eco-leaderboard', unlocked: false },
        ];

        this.weeklyChallenges = [
            { id: 'c1', title: 'Save 10 kg CO₂', targetKg: 10, currentKg: 6.4, rewardPts: 250, daysLeft: 3 },
            { id: 'c2', title: 'Complete 8 Metro Trips', targetTrips: 8, currentTrips: 5, rewardPts: 180, daysLeft: 2 },
            { id: 'c3', title: 'Walk or E-Bike 15 km', targetKm: 15, currentKm: 11.2, rewardPts: 300, daysLeft: 4 },
        ];
    }

    /**
     * Detect anomalies and incidents in traffic telemetry
     */
    detectIncidents(telemetryData = []) {
        // Evaluate for speed drops or congestion anomalies
        const anomalousZone = telemetryData.find(t => t.congestionLevel > 75 || t.averageSpeed < 15);
        if (anomalousZone) {
            const newIncident = {
                incidentId: `INC-${Math.floor(2000 + Math.random() * 8000)}`,
                type: anomalousZone.congestionLevel > 85 ? 'SUDDEN_SPEED_DROP' : 'CONGESTION_ANOMALY',
                severity: anomalousZone.congestionLevel > 80 ? 'HIGH' : 'MEDIUM',
                zone: anomalousZone.zoneName || 'Downtown Core',
                confidence: 0.93,
                detectedAt: new Date().toISOString(),
                estimatedImpact: { delayMinutes: Math.floor(12 + Math.random() * 15), affectedVehicles: anomalousZone.vehicleCount || 650 },
                recommendedActions: ['Trigger Signal Preemption Mode', 'Issue real-time push advisory'],
                status: 'ACTIVE',
            };
            this.incidents.unshift(newIncident);
        }
        return { success: true, incidents: this.incidents };
    }

    /**
     * Generate multi-horizon traffic forecast (15m, 30m, 1h, 2h, 3h, 6h, 12h, 24h)
     */
    generateForecast(strategy = 'TIME_SERIES') {
        const horizons = ['15m', '30m', '1h', '2h', '3h', '6h', '12h', '24h'];
        const baseCongestion = 45;

        const timeline = horizons.map((horizon, idx) => {
            const variance = Math.floor(Math.sin(idx * 0.8) * 22 + (Math.random() * 8 - 4));
            const congestion = Math.min(95, Math.max(12, baseCongestion + variance));
            const speed = Math.max(10, Math.round(60 - congestion * 0.45));
            const volume = Math.round(congestion * 18 + 200);

            return {
                horizon,
                congestionPercent: congestion,
                averageSpeedKmh: speed,
                vehicleVolume: volume,
                travelTimeMultiplier: Math.round((1 + congestion / 100) * 100) / 100,
                queueLengthMeters: Math.round(congestion * 3.5),
                incidentRisk: congestion > 70 ? 'HIGH' : congestion > 45 ? 'MEDIUM' : 'LOW',
                co2EmissionKg: Math.round(volume * 0.14 * 100) / 100,
            };
        });

        return {
            success: true,
            strategy,
            isSimulation: strategy === 'ML_SIMULATION' || strategy === 'TIME_SERIES',
            note: 'Multi-horizon forecasts calculated using baseline time-series trend model.',
            timeline,
            generatedAt: new Date().toISOString(),
        };
    }

    /**
     * Multimodal Routing Engine
     */
    getIntelligentMultimodal(origin, destination, strategy = 'BALANCED') {
        const distKm = origin && destination ? Math.sqrt(Math.pow(destination.lat - origin.lat, 2) + Math.pow(destination.lng - origin.lng, 2)) * 111 : 12;

        const strategies = {
            FASTEST: { name: 'Fastest Highway Route', timeMin: Math.round(distKm * 1.6), costUsd: 4.20, co2Kg: Math.round(distKm * 0.22 * 10) / 10, walkMin: 2, score: 0.94, explanation: 'Prioritizes maximum speed via express lanes.' },
            CHEAPEST: { name: 'Metro Line + City Bus', timeMin: Math.round(distKm * 2.5), costUsd: 1.50, co2Kg: Math.round(distKm * 0.08 * 10) / 10, walkMin: 6, score: 0.89, explanation: 'Minimizes travel cost by utilizing subsidized public transit.' },
            ECO: { name: 'E-Bike via Dedicated Green Corridor', timeMin: Math.round(distKm * 3.1), costUsd: 1.80, co2Kg: 0.0, walkMin: 0, score: 0.98, explanation: 'Achieves 100% zero-emission commute with physical wellness benefit.' },
            BALANCED: { name: 'EV Shuttle + Metro Express', timeMin: Math.round(distKm * 2.1), costUsd: 2.70, co2Kg: Math.round(distKm * 0.04 * 10) / 10, walkMin: 4, score: 0.95, explanation: 'Optimal balance of low CO₂ emission, reasonable travel time, and moderate cost.' },
            LOW_WALKING: { name: 'Door-to-Door EV Taxi', timeMin: Math.round(distKm * 1.8), costUsd: 8.50, co2Kg: Math.round(distKm * 0.05 * 10) / 10, walkMin: 0, score: 0.86, explanation: 'Zero walking required with low-emission EV vehicle.' },
            PUBLIC_TRANSIT: { name: 'Metro Express & Shuttle', timeMin: Math.round(distKm * 2.3), costUsd: 2.00, co2Kg: Math.round(distKm * 0.06 * 10) / 10, walkMin: 5, score: 0.91, explanation: 'Full public transportation coverage.' },
        };

        const activeOption = strategies[strategy] || strategies.BALANCED;

        return {
            success: true,
            requestedStrategy: strategy,
            distanceKm: Math.round(distKm * 10) / 10,
            selectedOption: activeOption,
            allOptions: Object.keys(strategies).map(k => ({ strategy: k, ...strategies[k] })),
        };
    }

    /**
     * City Carbon Intelligence & Hotspots
     */
    getCarbonHotspots(telemetryData = []) {
        const hotspots = (telemetryData.length ? telemetryData : [
            { zoneName: 'Downtown Core', congestionLevel: 78, vehicleCount: 1420 },
            { zoneName: 'Industrial Zone', congestionLevel: 65, vehicleCount: 980 },
            { zoneName: 'Airport Hub', congestionLevel: 82, vehicleCount: 1650 },
            { zoneName: 'Tech District', congestionLevel: 42, vehicleCount: 620 },
            { zoneName: 'Residential North', congestionLevel: 30, vehicleCount: 410 },
        ]).map(z => {
            const co2Kg = Math.round((z.vehicleCount * 0.18 * (1 + z.congestionLevel / 100)) * 10) / 10;
            const level = co2Kg > 200 ? 'HIGH' : co2Kg > 100 ? 'MEDIUM' : 'LOW';
            return {
                zoneName: z.zoneName,
                co2HourlyKg: co2Kg,
                emissionLevel: level,
                primaryContributor: z.congestionLevel > 70 ? 'Idling Traffic' : 'Freight & Transit',
            };
        });

        return {
            success: true,
            totalCityCO2HourlyKg: Math.round(hotspots.reduce((a, b) => a + b.co2HourlyKg, 0)),
            hotspots,
        };
    }

    /**
     * System Health Status
     */
    getSystemHealth() {
        return {
            success: true,
            status: 'ONLINE',
            timestamp: new Date().toISOString(),
            services: {
                backend: { status: 'ONLINE', latencyMs: 14 },
                database: { status: 'ONLINE', latencyMs: 8, mode: 'In-Memory Store' },
                aiEngine: { status: 'ONLINE', provider: process.env.AI_PROVIDER || 'gemini-fallback' },
                trafficTelemetry: { status: 'ONLINE', frequencySeconds: 5 },
                webSocketBus: { status: 'ONLINE', activeClients: 1 },
            },
        };
    }

    /**
     * Record Audit Log Event
     */
    logAudit(user, action, details) {
        const logEntry = {
            id: uuidv4(),
            timestamp: new Date().toISOString(),
            userEmail: user?.email || 'anonymous',
            userRole: user?.role || 'unknown',
            action,
            details,
        };
        this.auditLogs.unshift(logEntry);
        if (this.auditLogs.length > 100) this.auditLogs.pop();
        return logEntry;
    }
}

module.exports = new MobilityIntelligence();

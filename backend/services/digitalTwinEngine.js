/**
 * Safe-Flow X — Digital Twin & Scenario Lab Engine
 * Software representation of the city mobility network with what-if scenario testing & adaptive signal control.
 */

class DigitalTwinEngine {
    constructor() {
        this.scenarios = {
            'ROAD_CLOSURE': { name: 'Major Arterial Road Closure', defaultImpact: { congestionChange: +24, delayChangeMin: +14, co2ChangeKg: +185 } },
            'VOLUME_SPIKE_20': { name: '20% Traffic Density Spike', defaultImpact: { congestionChange: +20, delayChangeMin: +11, co2ChangeKg: +142 } },
            'RAIN_EVENT': { name: 'Heavy Rain / Weather Incident', defaultImpact: { congestionChange: +18, delayChangeMin: +9, co2ChangeKg: +95 } },
            'EV_ADOPTION_30': { name: '30% Fleet EV Adoption', defaultImpact: { congestionChange: 0, delayChangeMin: -2, co2ChangeKg: -310 } },
            'TRANSIT_PRIORITY': { name: 'Dedicated Transit Signal Phase', defaultImpact: { congestionChange: -12, delayChangeMin: -7, co2ChangeKg: -190 } },
        };

        this.intersections = [
            { id: 'INT-101', name: 'Downtown Main & 5th Ave', phases: { northSouth: 45, eastWest: 35 }, status: 'NORMAL', queueLength: 14 },
            { id: 'INT-102', name: 'Tech District Hub Signal', phases: { northSouth: 30, eastWest: 50 }, status: 'PEAK', queueLength: 22 },
            { id: 'INT-103', name: 'Airport Outer Expressway', phases: { northSouth: 60, eastWest: 20 }, status: 'OPTIMIZED', queueLength: 8 },
            { id: 'INT-104', name: 'University Way Interchange', phases: { northSouth: 40, eastWest: 40 }, status: 'EMERGENCY_PREEMPT', queueLength: 4 },
        ];
    }

    /**
     * Run digital twin scenario simulation
     */
    simulateScenario(scenarioType, parameters = {}) {
        const template = this.scenarios[scenarioType] || {
            name: scenarioType || 'Custom Scenario',
            defaultImpact: { congestionChange: +15, delayChangeMin: +8, co2ChangeKg: +110 }
        };

        const volumeMultiplier = parameters.volumeMultiplier || (parameters.trafficVolumeChange ? 1 + parameters.trafficVolumeChange / 100 : 1.0);
        const roadClosed = parameters.roadClosed || false;
        const rainEvent = parameters.rainEvent || false;
        const evAdoptionRate = parameters.evAdoptionRate || 0;

        let congestionDelta = Math.round(template.defaultImpact.congestionChange * volumeMultiplier);
        if (roadClosed) congestionDelta += 15;
        if (rainEvent) congestionDelta += 10;

        let delayDelta = Math.round(template.defaultImpact.delayChangeMin * volumeMultiplier);
        let co2Delta = Math.round(template.defaultImpact.co2ChangeKg * (1 - evAdoptionRate / 100));

        return {
            success: true,
            scenarioId: `SIM-${Math.floor(1000 + Math.random() * 9000)}`,
            scenarioName: template.name,
            parametersUsed: { volumeMultiplier, roadClosed, rainEvent, evAdoptionRate },
            impact: {
                congestionChangePercent: congestionDelta,
                averageDelayChangeMin: delayDelta,
                co2ChangeKg: co2Delta,
            },
            affectedZones: ['Downtown Core', 'Tech District', 'Residential North'],
            recommendedMitigations: [
                'Extend North-South green light phase by +12 seconds at INT-101',
                'Reroute commercial freight vehicles to Industrial Bypass Z3',
                'Issue automated push alerts via Mobile App',
            ],
            simulatedAt: new Date().toISOString(),
        };
    }

    /**
     * Compare Baseline vs Simulated Scenarios
     */
    compareScenarios(scenariosList = []) {
        const comparisons = scenariosList.map(s => this.simulateScenario(s.type, s.parameters));
        return {
            success: true,
            baseline: {
                avgCongestion: 48,
                avgSpeedKmh: 35,
                hourlyCO2Kg: 520,
            },
            simulations: comparisons,
        };
    }

    /**
     * Get or Optimize Adaptive Signal Timings
     */
    optimizeSignals(mode = 'NORMAL') {
        const modeMultiplier = mode === 'PEAK' ? 1.3 : mode === 'EMERGENCY' ? 0.7 : 1.0;
        
        const updatedIntersections = this.intersections.map(int => {
            const nsSeconds = Math.round(int.phases.northSouth * modeMultiplier);
            const ewSeconds = Math.round(int.phases.eastWest * (mode === 'PEAK' ? 1.1 : 1.0));
            const newQueue = Math.max(2, Math.round(int.queueLength * (2 - modeMultiplier)));

            return {
                ...int,
                currentMode: mode,
                phases: { northSouth: nsSeconds, eastWest: ewSeconds },
                remainingPhaseSeconds: Math.floor(10 + Math.random() * 25),
                queueLength: newQueue,
                optimizationStatus: mode === 'EMERGENCY' ? 'GREEN_CORRIDOR_PREEMPTION' : 'AI_ADAPTIVE_BALANCED',
            };
        });

        return {
            success: true,
            mode,
            intersections: updatedIntersections,
            totalQueuedVehicles: updatedIntersections.reduce((a, b) => a + b.queueLength, 0),
            optimizedAt: new Date().toISOString(),
        };
    }
}

module.exports = new DigitalTwinEngine();

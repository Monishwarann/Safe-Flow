'use client';

import React, { useEffect, useState } from 'react';
import useStore from '@/store/useStore';
import Header from './Header';
import AICopilotDrawer from './AICopilotDrawer';
import SystemHealthModal from './SystemHealthModal';
import DemoModeBar from './DemoModeBar';
import { motion } from 'framer-motion';
import {
    Activity,
    Bot,
    Siren,
    TrendingUp,
    ShieldAlert,
    TreePine,
    Zap,
    Cpu,
    Radio,
    Play,
    RefreshCw,
    MapPin,
    Clock,
    Award,
} from 'lucide-react';

export default function CommandCenterPage() {
    const {
        trafficData,
        fetchTrafficData,
        incidents,
        fetchIncidents,
        forecastTimeline,
        fetchForecastTimeline,
        activeCorridor,
        dispatchEmergencyCorridor,
        startDemo,
        chaosActive,
    } = useStore();

    const [isCopilotOpen, setIsCopilotOpen] = useState(false);
    const [isHealthOpen, setIsHealthOpen] = useState(false);

    useEffect(() => {
        fetchTrafficData();
        fetchIncidents();
        fetchForecastTimeline('TIME_SERIES');
    }, []);

    // Calculate Mobility Health Index
    const avgCongestion = trafficData.length ? Math.round(trafficData.reduce((a, b) => a + b.congestionLevel, 0) / trafficData.length) : 48;
    const avgSpeed = trafficData.length ? Math.round(trafficData.reduce((a, b) => a + b.averageSpeed, 0) / trafficData.length) : 34;
    const mobilityHealthScore = Math.max(10, 100 - avgCongestion);

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--bg-primary)' }}>
            <Header title="Safe-Flow X Command Center" subtitle="Smart City AI Mobility Intelligence & Digital Twin Network Operations" />

            {/* Quick Action Toolbar */}
            <div style={{ padding: '12px 24px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                        onClick={() => setIsCopilotOpen(true)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: 10,
                            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                            color: 'white',
                            fontWeight: 700,
                            border: 'none',
                            fontSize: 13,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
                        }}
                    >
                        <Bot size={18} /> Launch AI Mobility Copilot
                    </button>

                    <button
                        onClick={startDemo}
                        className="btn-secondary"
                        style={{ padding: '8px 16px', fontSize: 13, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                        <Play size={14} color="#10b981" /> Launch Guided Demo Mode
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {chaosActive && (
                        <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', fontWeight: 800 }}>
                            ⚠️ Failure Simulation Active
                        </span>
                    )}

                    <button
                        onClick={() => setIsHealthOpen(true)}
                        className="btn-secondary"
                        style={{ padding: '8px 14px', fontSize: 12, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                        <Activity size={14} color="#10b981" /> System Health
                    </button>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Top Smart City KPI Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
                    <div className="card" style={{ padding: 16, textAlign: 'center' }}>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, fontWeight: 700, textTransform: 'uppercase' }}>Mobility Health</p>
                        <p style={{ fontSize: 24, fontWeight: 800, margin: '6px 0 0', color: mobilityHealthScore > 60 ? '#10b981' : '#f59e0b' }}>
                            {mobilityHealthScore}/100
                        </p>
                    </div>

                    <div className="card" style={{ padding: 16, textAlign: 'center' }}>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, fontWeight: 700, textTransform: 'uppercase' }}>Avg City Velocity</p>
                        <p style={{ fontSize: 24, fontWeight: 800, margin: '6px 0 0', color: 'var(--accent-blue)' }}>
                            {avgSpeed} km/h
                        </p>
                    </div>

                    <div className="card" style={{ padding: 16, textAlign: 'center' }}>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, fontWeight: 700, textTransform: 'uppercase' }}>Active Incidents</p>
                        <p style={{ fontSize: 24, fontWeight: 800, margin: '6px 0 0', color: incidents.length > 0 ? '#ef4444' : '#10b981' }}>
                            {incidents.length} Alert{incidents.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    <div className="card" style={{ padding: 16, textAlign: 'center' }}>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, fontWeight: 700, textTransform: 'uppercase' }}>Green Corridors</p>
                        <p style={{ fontSize: 24, fontWeight: 800, margin: '6px 0 0', color: activeCorridor ? '#10b981' : 'var(--text-muted)' }}>
                            {activeCorridor ? '1 Active' : '0 Idle'}
                        </p>
                    </div>

                    <div className="card" style={{ padding: 16, textAlign: 'center' }}>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, fontWeight: 700, textTransform: 'uppercase' }}>CO₂ Avoided Today</p>
                        <p style={{ fontSize: 24, fontWeight: 800, margin: '6px 0 0', color: '#10b981' }}>
                            1,840 kg
                        </p>
                    </div>

                    <div className="card" style={{ padding: 16, textAlign: 'center' }}>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, fontWeight: 700, textTransform: 'uppercase' }}>AI Confidence</p>
                        <p style={{ fontSize: 24, fontWeight: 800, margin: '6px 0 0', color: '#8b5cf6' }}>
                            94.2%
                        </p>
                    </div>
                </div>

                {/* Main Digital Twin Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
                    {/* Left: Spatial Digital Twin & Forecast Timeline */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {/* Spatial Zone Matrix */}
                        <div className="card" style={{ padding: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <Radio size={20} color="var(--accent-blue)" />
                                    <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Smart City Digital Twin Network Matrix</h4>
                                </div>
                                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>10 Active Telemetry Sectors</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                                {trafficData.map((zone) => (
                                    <div
                                        key={zone.zoneId}
                                        style={{
                                            padding: 14,
                                            borderRadius: 12,
                                            background: 'var(--bg-secondary)',
                                            border: '1px solid var(--border-color)',
                                            position: 'relative',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <span style={{ fontSize: 12, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {zone.zoneName}
                                            </span>
                                        </div>

                                        <p style={{ fontSize: 20, fontWeight: 800, margin: 0, color: zone.congestionLevel > 70 ? '#ef4444' : zone.congestionLevel > 40 ? '#f59e0b' : '#10b981' }}>
                                            {zone.congestionLevel}%
                                        </p>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
                                            <span>{zone.averageSpeed} km/h</span>
                                            <span>{zone.vehicleCount} veh</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Forecast Timeline (15m - 24h) */}
                        <div className="card" style={{ padding: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                <TrendingUp size={20} color="var(--accent-blue)" />
                                <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Multi-Horizon AI Congestion Forecast (15m to 24h)</h4>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 10, textAlign: 'center' }}>
                                {forecastTimeline.map((item) => (
                                    <div key={item.horizon} style={{ padding: 12, borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                        <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, margin: 0 }}>{item.horizon}</p>
                                        <p style={{ fontSize: 16, fontWeight: 800, margin: '4px 0', color: item.congestionPercent > 70 ? '#ef4444' : item.congestionPercent > 40 ? '#f59e0b' : '#10b981' }}>
                                            {item.congestionPercent}%
                                        </p>
                                        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{item.averageSpeedKmh} km/h</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Live Incident Detection Feed & Emergency Control */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {/* Live Incidents Panel */}
                        <div className="card" style={{ padding: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <ShieldAlert size={18} color="#ef4444" />
                                    <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>AI Incident Detection</h4>
                                </div>
                                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', fontWeight: 800 }}>LIVE</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {incidents.map((inc) => (
                                    <div key={inc.incidentId} style={{ padding: 12, borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: '#ef4444' }}>{inc.type.replace('_', ' ')}</span>
                                            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{inc.zone}</span>
                                        </div>
                                        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>
                                            Estimated Delay: +{inc.estimatedImpact?.delayMinutes} min ({inc.estimatedImpact?.affectedVehicles} vehicles affected)
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Emergency Response Orchestrator */}
                        <div className="card" style={{ padding: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                                <Siren size={18} color="#ef4444" />
                                <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Emergency Green Wave Dispatch</h4>
                            </div>

                            <button
                                onClick={() => dispatchEmergencyCorridor('Ambulance', 'Downtown Core', 'Airport Hub')}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: 10,
                                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                    color: 'white',
                                    fontWeight: 700,
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: 13,
                                }}
                            >
                                🚨 Dispatch Emergency Corridor
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals & Floating Drawers */}
            <AICopilotDrawer isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
            <SystemHealthModal isOpen={isHealthOpen} onClose={() => setIsHealthOpen(false)} />
            <DemoModeBar />
        </div>
    );
}

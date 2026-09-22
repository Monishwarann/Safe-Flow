'use client';

import React, { useState, useEffect } from 'react';
import useStore from '@/store/useStore';
import Header from './Header';
import { motion } from 'framer-motion';
import {
    Sparkles,
    Siren,
    TreePine,
    Award,
    TrendingUp,
    Cpu,
    CheckCircle2,
    Bike,
    ShieldAlert,
    RefreshCw,
} from 'lucide-react';

export default function FutureScopePage() {
    const {
        predictiveData,
        fetchPredictiveTraffic,
        activeCorridor,
        dispatchEmergencyCorridor,
        offsetResult,
        calculateOffset,
        leaderboard,
        fetchLeaderboard,
        trafficData,
    } = useStore();

    const [activeTab, setActiveTab] = useState<'forecasting' | 'emergency' | 'carbon' | 'multimodal'>('forecasting');
    const [emergencyVehicle, setEmergencyVehicle] = useState('Ambulance');
    const [originZone, setOriginZone] = useState('Downtown Core');
    const [destZone, setDestZone] = useState('Airport Hub');
    const [monthlyKm, setMonthlyKm] = useState(450);
    const [vehicleType, setVehicleType] = useState('car');
    const [isDispatching, setIsDispatching] = useState(false);

    useEffect(() => {
        fetchPredictiveTraffic();
        fetchLeaderboard();
        calculateOffset(monthlyKm, vehicleType);
    }, []);

    const handleDispatch = async () => {
        setIsDispatching(true);
        await dispatchEmergencyCorridor(emergencyVehicle, originZone, destZone);
        setIsDispatching(false);
    };

    const handleCalculateOffset = () => {
        calculateOffset(monthlyKm, vehicleType);
    };

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--bg-primary)' }}>
            <Header title="Eco AI & Future Scope" subtitle="Next-generation intelligent traffic control, emergency preemption & sustainability innovations" />

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                {/* Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(16, 185, 129, 0.15))',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: 16,
                        padding: '20px 24px',
                        marginBottom: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            background: 'linear-gradient(135deg, #3b82f6, #10b981)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Sparkles size={24} color="white" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                                Safe-Flow AI Innovation Suite (Future Scope)
                            </h3>
                            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '4px 0 0' }}>
                                Autonomous signal synchronization, predictive time-series modeling, emergency green waves & carbon offsets.
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button
                            onClick={() => { fetchPredictiveTraffic(); fetchLeaderboard(); }}
                            className="btn-secondary"
                            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 10 }}
                        >
                            <RefreshCw size={14} /> Refresh AI Engine
                        </button>
                    </div>
                </motion.div>

                {/* Sub-Navigation Tabs */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 24, borderBottom: '1px solid var(--border-color)', paddingBottom: 12 }}>
                    {[
                        { id: 'forecasting', label: 'AI Traffic Forecast', icon: Cpu },
                        { id: 'emergency', label: 'Emergency Green Corridor', icon: Siren },
                        { id: 'carbon', label: 'Carbon Offset & Leaderboard', icon: TreePine },
                        { id: 'multimodal', label: 'Multimodal Transit', icon: Bike },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '10px 18px',
                                borderRadius: 10,
                                border: 'none',
                                background: activeTab === tab.id ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                                color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
                                fontWeight: 600,
                                fontSize: 13,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab 1: AI Traffic Forecasting */}
                {activeTab === 'forecasting' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div className="card" style={{ padding: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <TrendingUp size={20} color="var(--accent-blue)" />
                                    <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Predictive Congestion Forecast (1h - 6h Horizon)</h4>
                                </div>
                                <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-blue)', fontWeight: 600 }}>
                                    Neural Time-Series Engine Active
                                </span>
                            </div>

                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                                            <th style={{ padding: '12px' }}>Zone</th>
                                            <th style={{ padding: '12px' }}>Current</th>
                                            <th style={{ padding: '12px' }}>+1 Hour</th>
                                            <th style={{ padding: '12px' }}>+3 Hours</th>
                                            <th style={{ padding: '12px' }}>+6 Hours</th>
                                            <th style={{ padding: '12px' }}>AI Confidence</th>
                                            <th style={{ padding: '12px' }}>Recommended AI Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {predictiveData.map((zone) => (
                                            <tr key={zone.zoneId} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                <td style={{ padding: '14px 12px', fontWeight: 600 }}>{zone.zoneName}</td>
                                                <td style={{ padding: '14px 12px' }}>
                                                    <span style={{ fontWeight: 700, color: zone.currentCongestion > 70 ? '#ef4444' : zone.currentCongestion > 40 ? '#f59e0b' : '#10b981' }}>
                                                        {zone.currentCongestion}%
                                                    </span>
                                                </td>
                                                <td style={{ padding: '14px 12px' }}>{zone.forecast1h}%</td>
                                                <td style={{ padding: '14px 12px', fontWeight: 700 }}>{zone.forecast3h}%</td>
                                                <td style={{ padding: '14px 12px' }}>{zone.forecast6h}%</td>
                                                <td style={{ padding: '14px 12px' }}>
                                                    <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{zone.confidenceScore}%</span>
                                                </td>
                                                <td style={{ padding: '14px 12px' }}>
                                                    <span style={{
                                                        padding: '4px 8px',
                                                        borderRadius: 6,
                                                        fontSize: 11,
                                                        fontWeight: 600,
                                                        background: zone.forecast3h > 70 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                                        color: zone.forecast3h > 70 ? '#ef4444' : '#10b981',
                                                    }}>
                                                        {zone.suggestedAction}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Tab 2: Emergency Corridor */}
                {activeTab === 'emergency' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        <div className="card" style={{ padding: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                <Siren size={22} color="#ef4444" />
                                <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Green Wave Signal Preemption Dispatcher</h4>
                            </div>
                            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>
                                Automatically clears traffic lights ahead of emergency response vehicles to minimize dispatch delay.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Vehicle Category</label>
                                    <select
                                        value={emergencyVehicle}
                                        onChange={(e) => setEmergencyVehicle(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: 4 }}
                                    >
                                        <option value="Ambulance">🚑 Ambulance (Critical Response)</option>
                                        <option value="Fire Engine">🚒 Fire Engine (Emergency Response)</option>
                                        <option value="Police Patrol">🚔 Law Enforcement Escort</option>
                                    </select>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div>
                                        <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Origin Zone</label>
                                        <select
                                            value={originZone}
                                            onChange={(e) => setOriginZone(e.target.value)}
                                            style={{ width: '100%', padding: '10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: 4 }}
                                        >
                                            {trafficData.map(z => <option key={z.zoneId} value={z.zoneName}>{z.zoneName}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Destination Zone</label>
                                        <select
                                            value={destZone}
                                            onChange={(e) => setDestZone(e.target.value)}
                                            style={{ width: '100%', padding: '10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: 4 }}
                                        >
                                            {trafficData.map(z => <option key={z.zoneId} value={z.zoneName}>{z.zoneName}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={handleDispatch}
                                    disabled={isDispatching}
                                    style={{
                                        padding: '12px',
                                        borderRadius: 10,
                                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                        color: 'white',
                                        fontWeight: 700,
                                        border: 'none',
                                        cursor: 'pointer',
                                        marginTop: 10,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 8,
                                    }}
                                >
                                    {isDispatching ? 'Synchronizing Traffic Signals...' : '🚨 Dispatch Green Corridor'}
                                </button>
                            </div>
                        </div>

                        {/* Dispatch Result Status */}
                        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {activeCorridor ? (
                                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, color: '#10b981' }}>
                                        <CheckCircle2 size={24} />
                                        <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Corridor Dispatch Active</h4>
                                    </div>
                                    <div style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Corridor ID:</span>
                                            <span style={{ fontWeight: 700 }}>{activeCorridor.corridorId}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Signals Overridden:</span>
                                            <span style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{activeCorridor.signalsSynchronized} Signals</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Est. Time Saved:</span>
                                            <span style={{ fontWeight: 700, color: '#10b981' }}>-{activeCorridor.estimatedTimeSavedMin} mins</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Priority Protocol:</span>
                                            <span style={{ fontWeight: 700, color: '#ef4444' }}>{activeCorridor.priorityLevel}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                    <ShieldAlert size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                                    <p>Select origin and destination to simulate real-time signal preemption.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Tab 3: Carbon Offset & Leaderboard */}
                {activeTab === 'carbon' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        {/* Carbon Calculator */}
                        <div className="card" style={{ padding: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                <TreePine size={22} color="#10b981" />
                                <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Carbon Offset Calculator</h4>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <div>
                                    <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Monthly Commute Distance ({monthlyKm} km)</label>
                                    <input
                                        type="range"
                                        min={50}
                                        max={2000}
                                        step={50}
                                        value={monthlyKm}
                                        onChange={(e) => { setMonthlyKm(Number(e.target.value)); handleCalculateOffset(); }}
                                        style={{ width: '100%', marginTop: 8 }}
                                    />
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Primary Vehicle Mode</label>
                                    <select
                                        value={vehicleType}
                                        onChange={(e) => { setVehicleType(e.target.value); handleCalculateOffset(); }}
                                        style={{ width: '100%', padding: '10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: 4 }}
                                    >
                                        <option value="car">Gasoline Sedan (0.21 kg/km)</option>
                                        <option value="suv">SUV / Truck (0.28 kg/km)</option>
                                        <option value="hybrid">Hybrid Vehicle (0.11 kg/km)</option>
                                        <option value="electric">Electric Vehicle (0.05 kg/km)</option>
                                    </select>
                                </div>

                                {offsetResult && (
                                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: 16, borderRadius: 12, marginTop: 10 }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, textAlign: 'center' }}>
                                            <div>
                                                <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>Monthly CO2</p>
                                                <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 0' }}>{offsetResult.monthlyCO2Kg} kg</p>
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>Trees to Offset</p>
                                                <p style={{ fontSize: 18, fontWeight: 800, color: '#10b981', margin: '4px 0 0' }}>🌳 {offsetResult.treesNeededToOffset} Trees</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Leaderboard */}
                        <div className="card" style={{ padding: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                <Award size={22} color="#f59e0b" />
                                <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>City Eco-Leaderboard</h4>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {leaderboard.map((item) => (
                                    <div
                                        key={item.rank}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '10px 14px',
                                            borderRadius: 10,
                                            background: 'var(--bg-secondary)',
                                            border: '1px solid var(--border-color)',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span style={{ fontWeight: 800, width: 20, color: 'var(--text-muted)' }}>#{item.rank}</span>
                                            <div>
                                                <p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{item.name}</p>
                                                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.badge}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontSize: 13, fontWeight: 800, color: '#10b981', margin: 0 }}>{item.co2SavedKg} kg CO2</p>
                                            <span style={{ fontSize: 11, color: 'var(--accent-blue)', fontWeight: 600 }}>{item.ecoPoints} pts</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Tab 4: Multimodal Transit */}
                {activeTab === 'multimodal' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card" style={{ padding: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <Bike size={22} color="var(--accent-blue)" />
                            <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Multimodal Zero-Emission Transit Planner</h4>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
                            Combines Metro lines, electric buses, micro-mobility e-scooters, and green walking paths for optimal sustainability.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <div style={{ padding: 18, borderRadius: 12, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <span style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>Option A: EV Bus + Metro Express</span>
                                    <span style={{ fontWeight: 800, color: '#10b981' }}>-85% CO2</span>
                                </div>
                                <ul style={{ fontSize: 13, color: 'var(--text-muted)', paddingLeft: 20, margin: 0 }}>
                                    <li>5 min E-Scooter to Metro Line 1</li>
                                    <li>12 min High-Speed Metro</li>
                                    <li>8 min Electric Bus Route 4</li>
                                </ul>
                            </div>

                            <div style={{ padding: 18, borderRadius: 12, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <span style={{ fontWeight: 700, color: '#10b981' }}>Option B: Dedicated Green Bike Lane</span>
                                    <span style={{ fontWeight: 800, color: '#10b981' }}>-100% CO2</span>
                                </div>
                                <ul style={{ fontSize: 13, color: 'var(--text-muted)', paddingLeft: 20, margin: 0 }}>
                                    <li>22 min E-Bike trip along Green Belt</li>
                                    <li>Zero emission & 150 kcal burned</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

'use client';

import React, { useState } from 'react';
import useStore from '@/store/useStore';
import Header from './Header';
import { motion } from 'framer-motion';
import {
    Cpu,
    Sliders,
    Zap,
    TrendingUp,
    ShieldAlert,
    CloudRain,
    Car,
    RefreshCw,
    BarChart3,
} from 'lucide-react';

export default function DigitalTwinLab() {
    const { digitalTwinResult, simulateScenario } = useStore();

    const [selectedScenario, setSelectedScenario] = useState('ROAD_CLOSURE');
    const [volumeChange, setVolumeChange] = useState(20);
    const [roadClosed, setRoadClosed] = useState(false);
    const [rainEvent, setRainEvent] = useState(false);
    const [evAdoption, setEvAdoption] = useState(15);
    const [isSimulating, setIsSimulating] = useState(false);

    const handleRunSimulation = async () => {
        setIsSimulating(true);
        await simulateScenario(selectedScenario, {
            trafficVolumeChange: volumeChange,
            roadClosed,
            rainEvent,
            evAdoptionRate: evAdoption,
        });
        setIsSimulating(false);
    };

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--bg-primary)' }}>
            <Header title="Smart City Digital Twin & Scenario Lab" subtitle="Software simulation network for what-if city mobility stress testing" />

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24 }}>
                    {/* Left Panel: Scenario Controls */}
                    <div className="card" style={{ padding: 24, height: 'fit-content' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <Sliders size={20} color="var(--accent-blue)" />
                            <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Simulation Variables</h4>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                            <div>
                                <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Preset Scenario Template</label>
                                <select
                                    value={selectedScenario}
                                    onChange={(e) => setSelectedScenario(e.target.value)}
                                    style={{ width: '100%', padding: '10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: 6 }}
                                >
                                    <option value="ROAD_CLOSURE">🚧 Major Arterial Road Closure</option>
                                    <option value="VOLUME_SPIKE_20">🚘 20% Peak Traffic Density Spike</option>
                                    <option value="RAIN_EVENT">🌧️ Heavy Rain / Weather Incident</option>
                                    <option value="EV_ADOPTION_30">⚡ 30% Fleet EV Adoption</option>
                                    <option value="TRANSIT_PRIORITY">🚇 Dedicated Transit Priority Signal</option>
                                </select>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Traffic Volume Variance ({volumeChange > 0 ? `+${volumeChange}%` : `${volumeChange}%`})</span>
                                </div>
                                <input
                                    type="range"
                                    min={-50}
                                    max={100}
                                    value={volumeChange}
                                    onChange={(e) => setVolumeChange(Number(e.target.value))}
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>EV Adoption Rate ({evAdoption}%)</span>
                                </div>
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={evAdoption}
                                    onChange={(e) => setEvAdoption(Number(e.target.value))}
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, cursor: 'pointer' }}>
                                    <input type="checkbox" checked={roadClosed} onChange={(e) => setRoadClosed(e.target.checked)} />
                                    <span>Simulate Emergency Road Closure</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, cursor: 'pointer' }}>
                                    <input type="checkbox" checked={rainEvent} onChange={(e) => setRainEvent(e.target.checked)} />
                                    <span>Simulate Adverse Weather / Heavy Rain</span>
                                </label>
                            </div>

                            <button
                                onClick={handleRunSimulation}
                                disabled={isSimulating}
                                style={{
                                    padding: '12px',
                                    borderRadius: 10,
                                    background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
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
                                {isSimulating ? <RefreshCw className="spin" size={16} /> : <Zap size={16} />}
                                {isSimulating ? 'Simulating Twin Matrix...' : 'Run Digital Twin Simulation'}
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Before vs After Impact Visualization */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {digitalTwinResult ? (
                            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div className="card" style={{ padding: 24 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <Cpu size={22} color="var(--accent-blue)" />
                                            <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Digital Twin Simulation Output</h4>
                                        </div>
                                        <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }}>
                                            ID: {digitalTwinResult.scenarioId}
                                        </span>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
                                        <div style={{ padding: 16, borderRadius: 12, background: 'var(--bg-secondary)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                                            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>Congestion Impact</p>
                                            <p style={{ fontSize: 22, fontWeight: 800, margin: '6px 0 0', color: digitalTwinResult.impact?.congestionChangePercent > 0 ? '#ef4444' : '#10b981' }}>
                                                {digitalTwinResult.impact?.congestionChangePercent > 0 ? `+${digitalTwinResult.impact?.congestionChangePercent}%` : `${digitalTwinResult.impact?.congestionChangePercent}%`}
                                            </p>
                                        </div>
                                        <div style={{ padding: 16, borderRadius: 12, background: 'var(--bg-secondary)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                                            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>Avg Delay Delta</p>
                                            <p style={{ fontSize: 22, fontWeight: 800, margin: '6px 0 0', color: digitalTwinResult.impact?.averageDelayChangeMin > 0 ? '#f59e0b' : '#10b981' }}>
                                                {digitalTwinResult.impact?.averageDelayChangeMin > 0 ? `+${digitalTwinResult.impact?.averageDelayChangeMin} min` : `${digitalTwinResult.impact?.averageDelayChangeMin} min`}
                                            </p>
                                        </div>
                                        <div style={{ padding: 16, borderRadius: 12, background: 'var(--bg-secondary)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                                            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>Hourly CO₂ Delta</p>
                                            <p style={{ fontSize: 22, fontWeight: 800, margin: '6px 0 0', color: digitalTwinResult.impact?.co2ChangeKg > 0 ? '#ef4444' : '#10b981' }}>
                                                {digitalTwinResult.impact?.co2ChangeKg > 0 ? `+${digitalTwinResult.impact?.co2ChangeKg} kg` : `${digitalTwinResult.impact?.co2ChangeKg} kg`}
                                            </p>
                                        </div>
                                    </div>

                                    <h5 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Recommended City Mitigations</h5>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {digitalTwinResult.recommendedMitigations?.map((mit, i) => (
                                            <div key={i} style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)', fontSize: 13, color: 'var(--text-primary)' }}>
                                                💡 {mit}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
                                <Cpu size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
                                <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Digital Twin Ready for Simulation</h4>
                                <p style={{ fontSize: 13, marginTop: 8 }}>Select parameters on the left and run simulation to stress test city network scenarios.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

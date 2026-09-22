'use client';

import React, { useEffect } from 'react';
import useStore from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity,
    Server,
    Database,
    Cpu,
    Wifi,
    AlertTriangle,
    X,
    CheckCircle2,
    ShieldAlert,
} from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function SystemHealthModal({ isOpen, onClose }: Props) {
    const { systemHealth, fetchSystemHealth, chaosActive, toggleChaos } = useStore();

    useEffect(() => {
        if (isOpen) fetchSystemHealth();
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'black', zIndex: 990 }} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 520,
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 16,
                            padding: 24,
                            zIndex: 999,
                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Activity size={22} color="var(--accent-green)" />
                                <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Safe-Flow X System Health</h3>
                            </div>
                            <button onClick={onClose} className="btn-icon" style={{ width: 32, height: 32 }}><X size={16} /></button>
                        </div>

                        {/* Services Grid */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                            {[
                                { name: 'Express Backend Service', icon: Server, status: 'ONLINE', latency: '14 ms' },
                                { name: 'In-Memory Smart Data Store', icon: Database, status: 'ONLINE', latency: '8 ms' },
                                { name: 'AI Mobility Copilot Engine', icon: Cpu, status: 'ONLINE', latency: '120 ms' },
                                { name: 'Real-Time Telemetry Bus (WS)', icon: Wifi, status: chaosActive ? 'DEGRADED' : 'ONLINE', latency: chaosActive ? 'FAILED' : '5s poll' },
                            ].map((s, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <s.icon size={18} color="var(--text-muted)" />
                                        <span style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.latency}</span>
                                        <span style={{
                                            fontSize: 10,
                                            fontWeight: 800,
                                            padding: '2px 8px',
                                            borderRadius: 6,
                                            background: s.status === 'ONLINE' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                            color: s.status === 'ONLINE' ? '#10b981' : '#ef4444',
                                        }}>
                                            {s.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Developer Chaos Engineering Panel */}
                        <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: 16, borderRadius: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ef4444', fontWeight: 700, fontSize: 13 }}>
                                        <ShieldAlert size={16} /> Developer Chaos & Failure Simulator
                                    </div>
                                    <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '4px 0 0' }}>Simulate telemetry disconnects to test graceful UI degradation.</p>
                                </div>
                                <button
                                    onClick={toggleChaos}
                                    style={{
                                        padding: '6px 14px',
                                        borderRadius: 8,
                                        border: 'none',
                                        background: chaosActive ? '#ef4444' : 'var(--bg-secondary)',
                                        color: chaosActive ? 'white' : 'var(--text-primary)',
                                        fontWeight: 700,
                                        fontSize: 12,
                                        cursor: 'pointer',
                                    }}
                                >
                                    {chaosActive ? 'Disable Chaos' : 'Simulate Failure'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

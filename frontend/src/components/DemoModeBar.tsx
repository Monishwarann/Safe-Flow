'use client';

import React from 'react';
import useStore from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, SkipForward, Square, CheckCircle2 } from 'lucide-react';

export default function DemoModeBar() {
    const { demoActive, demoStep, nextDemoStep, stopDemo } = useStore();

    const steps = [
        '1. Traffic Normal',
        '2. Congestion Prediction Appears',
        '3. Incident Detected',
        '4. AI Copilot Explains Issue',
        '5. Alternative Routes Generated',
        '6. Emergency Request Arrives',
        '7. Green Corridor Signal Preemption Activated',
        '8. Traffic Congestion Relieved',
        '9. Carbon Offset Calculated',
        '10. Digital Twin Before/After Comparison',
    ];

    if (!demoActive) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                style={{
                    position: 'fixed',
                    bottom: 24,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--accent-blue)',
                    borderRadius: 30,
                    padding: '10px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    zIndex: 9999,
                    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: 'var(--accent-blue)',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: 11,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {demoStep}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                        {steps[demoStep - 1] || 'Demo Completed'}
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                        onClick={nextDemoStep}
                        className="btn-secondary"
                        style={{ padding: '6px 12px', fontSize: 12, borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                        <SkipForward size={14} /> Next Step
                    </button>
                    <button
                        onClick={stopDemo}
                        style={{
                            padding: '6px 12px',
                            fontSize: 12,
                            borderRadius: 20,
                            border: 'none',
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: '#ef4444',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                        }}
                    >
                        <Square size={12} /> Exit Demo Mode
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

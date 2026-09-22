'use client';

import React, { useState } from 'react';
import useStore from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot,
    Send,
    X,
    Sparkles,
    CheckCircle2,
    Database,
    HelpCircle,
    ArrowRight,
    Zap,
} from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function AICopilotDrawer({ isOpen, onClose }: Props) {
    const { copilotResponse, copilotLoading, queryCopilot } = useStore();
    const [query, setQuery] = useState('');

    const samplePrompts = [
        'Why is traffic increasing in Central Zone?',
        'Which route produces the least CO₂?',
        'What will traffic look like in 3 hours?',
        'Simulate an ambulance emergency corridor.',
        'Why did congestion suddenly increase?',
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim() || copilotLoading) return;
        queryCopilot(query);
    };

    const handlePromptClick = (p: string) => {
        setQuery(p);
        queryCopilot(p);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ position: 'fixed', inset: 0, background: 'black', zIndex: 990 }}
                    />

                    {/* Sliding Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: 440,
                            background: 'var(--bg-secondary)',
                            borderLeft: '1px solid var(--border-color)',
                            zIndex: 999,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.4)',
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: 10,
                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Bot size={20} color="white" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Safe-Flow AI Copilot</h3>
                                    <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>Explainable Mobility Intelligence</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="btn-icon" style={{ width: 32, height: 32 }}><X size={16} /></button>
                        </div>

                        {/* Body / Conversation */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {/* Sample Prompts */}
                            <div>
                                <p style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
                                    Suggested City Queries
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {samplePrompts.map((p, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handlePromptClick(p)}
                                            style={{
                                                textAlign: 'left',
                                                padding: '8px 12px',
                                                borderRadius: 8,
                                                background: 'var(--bg-primary)',
                                                border: '1px solid var(--border-color)',
                                                color: 'var(--text-primary)',
                                                fontSize: 12,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <span>{p}</span>
                                            <ArrowRight size={12} color="var(--text-muted)" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Copilot Response Output */}
                            {copilotLoading && (
                                <div style={{ padding: 16, borderRadius: 12, background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <Sparkles size={18} className="spin" color="var(--accent-blue)" />
                                    <span>Retrieving real-time city telemetry & running AI reasoning...</span>
                                </div>
                            )}

                            {copilotResponse && !copilotLoading && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                    {/* Intent & Confidence Badge */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11 }}>
                                        <span style={{ padding: '4px 10px', borderRadius: 20, background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', fontWeight: 700 }}>
                                            Intent: {copilotResponse.intent}
                                        </span>
                                        <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>
                                            {Math.round(copilotResponse.confidence * 100)}% Confidence
                                        </span>
                                    </div>

                                    {/* AI Answer Box */}
                                    <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: 16, borderRadius: 12 }}>
                                        <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, color: 'var(--text-primary)' }}>
                                            {copilotResponse.answer}
                                        </p>
                                    </div>

                                    {/* Data Sources */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                        <Database size={12} color="var(--text-muted)" />
                                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Verified Data Sources:</span>
                                        {copilotResponse.dataSources?.map((src, idx) => (
                                            <span key={idx} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 6, background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                                                {src}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Recommendations */}
                                    {copilotResponse.recommendations?.length > 0 && (
                                        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: 14, borderRadius: 10 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: '#10b981', fontWeight: 700, fontSize: 12 }}>
                                                <CheckCircle2 size={14} /> AI Action Recommendations
                                            </div>
                                            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: 'var(--text-primary)' }}>
                                                {copilotResponse.recommendations.map((rec, i) => (
                                                    <li key={i} style={{ marginBottom: 4 }}>{rec}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Explainability footer */}
                                    <p style={{ fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
                                        {copilotResponse.explanation}
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Footer */}
                        <form onSubmit={handleSubmit} style={{ padding: 16, borderTop: '1px solid var(--border-color)', display: 'flex', gap: 8 }}>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ask Safe-Flow X AI..."
                                style={{
                                    flex: 1,
                                    padding: '10px 14px',
                                    borderRadius: 10,
                                    background: 'var(--bg-primary)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    fontSize: 13,
                                }}
                            />
                            <button
                                type="submit"
                                disabled={copilotLoading}
                                style={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 10,
                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                    color: 'white',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}


'use client'

import { useActionState } from 'react';
import { login } from '../admin/actions';
import { User, Lock, ArrowRight, Shield } from 'lucide-react';

export default function LoginPage() {
    const [state, action, isPending] = useActionState(login, null);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0f172a', /* Navy background */
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: 'Inter, sans-serif'
        }}>
            {/* Animated Background Shapes */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(15,23,42,0) 70%)', /* Gold glow */
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'float 6s ease-in-out infinite'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(15,23,42,0) 70%)', /* Gold glow */
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'float 8s ease-in-out infinite reverse'
            }} />

            <div style={{
                maxWidth: '440px',
                width: '100%',
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                padding: '48px',
                position: 'relative',
                zIndex: 1,
                border: '1px solid rgba(212,175,55,0.2)'
            }}>
                {/* Logo/Icon */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '32px'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.4)',
                        border: '2px solid #d4af37'
                    }}>
                        <Shield size={40} color="#d4af37" />
                    </div>
                </div>

                {/* Title */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: '#1a202c',
                        margin: '0 0 8px 0'
                    }}>Yönetici Girişi</h2>
                    <p style={{
                        fontSize: '14px',
                        color: '#718096',
                        margin: 0
                    }}>42 Turizm Admin Paneli</p>
                </div>

                <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Email Input */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#2d3748',
                            marginBottom: '8px'
                        }}>E-posta Adresi</label>
                        <div style={{ position: 'relative' }}>
                            <User style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#a0aec0'
                            }} size={20} />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="admin@42turizm.com"
                                style={{
                                    width: '100%',
                                    padding: '14px 16px 14px 48px',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    color: '#2d3748',
                                    outline: 'none',
                                    transition: 'all 0.3s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#d4af37'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#2d3748',
                            marginBottom: '8px'
                        }}>Şifre</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#a0aec0'
                            }} size={20} />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '14px 16px 14px 48px',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    color: '#2d3748',
                                    outline: 'none',
                                    transition: 'all 0.3s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#d4af37'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {state?.error && (
                        <div style={{
                            padding: '12px 16px',
                            background: '#fed7d7',
                            border: '1px solid #fc8181',
                            borderRadius: '12px',
                            color: '#c53030',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>
                            {state.error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isPending}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: isPending ? '#a0aec0' : '#0f172a',
                            color: isPending ? '#e2e8f0' : '#d4af37',
                            border: '1px solid #d4af37',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: isPending ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.3s',
                            boxShadow: '0 4px 15px rgba(15, 23, 42, 0.4)',
                            marginTop: '8px'
                        }}
                        onMouseEnter={(e) => {
                            if (!isPending) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.background = '#d4af37';
                                e.currentTarget.style.color = '#0f172a';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isPending) {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.background = '#0f172a';
                                e.currentTarget.style.color = '#d4af37';
                            }
                        }}
                    >
                        {isPending ? (
                            <>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    border: '3px solid rgba(255,255,255,0.3)',
                                    borderTop: '3px solid white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                                Giriş yapılıyor...
                            </>
                        ) : (
                            <>
                                Giriş Yap
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div style={{
                    marginTop: '32px',
                    textAlign: 'center',
                    fontSize: '13px',
                    color: '#a0aec0'
                }}>
                    © 2024 42 Turizm. Tüm hakları saklıdır.
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

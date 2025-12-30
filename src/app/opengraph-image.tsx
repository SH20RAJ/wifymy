import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Wify - Open Social Links Directly in Apps';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#09090b', // zinc-950
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 40,
                    }}
                >
                    <div style={{ fontSize: 80, marginRight: 20 }}>⚡</div>
                    <div style={{ fontSize: 80, fontWeight: 'bold', color: 'white' }}>Wify.my</div>
                </div>
                <div style={{ fontSize: 50, fontWeight: 'bold', color: '#3b82f6', textAlign: 'center', padding: '0 40px' }}>
                    Open social links directly in apps.
                </div>
                <div style={{ fontSize: 30, color: '#a1a1aa', marginTop: 30 }}>
                    No Auth • No Tracking • Free
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}

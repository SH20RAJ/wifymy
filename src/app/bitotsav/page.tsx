import { Metadata } from 'next';
import BitotsavClient from './BitotsavClient';
import { getBitotsavData } from '../actions/bitotsav';

export const metadata: Metadata = {
    title: 'Bitotsav 2026 🎊',
    description: 'The biggest cultural fest of East India! Join the party with our live clap counter.',
    openGraph: {
        title: 'Bitotsav 2026 🎊',
        description: 'Join the party! Live clap counter and more.',
    }
};

// Ensure fresh data on every visit for the live counter
export const dynamic = 'force-dynamic';

export default async function BitotsavPage() {
    const data = await getBitotsavData();
    return <BitotsavClient initialClaps={data?.claps || 0} />;
}

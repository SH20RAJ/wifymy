import { Metadata } from 'next';
import BitotsavClient from './BitotsavClient';

export const metadata: Metadata = {
    title: 'Bitotsav 2026 🎊',
    description: 'The biggest cultural fest of East India! Join the party with our live clap counter.',
    openGraph: {
        title: 'Bitotsav 2026 🎊',
        description: 'Join the party! Live clap counter and more.',
    }
};

export default function BitotsavPage() {
    return <BitotsavClient />;
}

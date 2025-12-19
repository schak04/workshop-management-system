import {useEffect, useState} from 'react';
import api from '../api/axios';
import {useAuth} from '../context/AuthContext';

export default function Registrations() {
    const {user} = useAuth();
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const res = await api.get('/registrations');
                setRegistrations(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load registrations");
            } finally {
                setLoading(false);
            }
        };

        fetchRegistrations();
    }, []);

    if (loading) return <p className='p-6'>Loading...</p>;
    if (error) return <p className='p-6 text-red-600'>{error}</p>;

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-semibold mb-4'>
                {user.role === 'participant'
                    ? "My Registrations"
                    : "Workshop Registrations"}
            </h1>

            {registrations.length === 0 ? (
                <p className='text-gray-600'>No registrations found.</p>
            ) : (
                <div className='space-y-4'>
                    {registrations.map(reg => (
                        <div
                            key={reg._id}
                            className='border p-4 rounded'
                        >
                            <h2 className='text-lg font-medium'>
                                {reg.workshop?.title}
                            </h2>

                            <p className='text-sm text-gray-600'>
                                Participant: {reg.user?.name} ({reg.user?.email})
                            </p>

                            <p className='text-sm text-gray-600'>
                                Status: <strong>{reg.status}</strong>
                            </p>

                            <p className='text-sm text-gray-600'>
                                Registered on:{' '}
                                {new Date(reg.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
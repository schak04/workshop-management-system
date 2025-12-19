import {useEffect, useState} from 'react';
import api from '../api/axios';
import {useAuth} from '../context/AuthContext';

export default function Feedback() {
    const {user} = useAuth();

    const [workshops, setWorkshops] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);

    const [workshop, setWorkshop] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        api.get('/workshops')
            .then(res => setWorkshops(res.data))
            .catch(err => console.error(err));
    }, []);

    const loadFeedback = async (workshopId = '') => {
        try {
            const res = await api.get(
                workshopId ? `/feedback?workshop=${workshopId}` : '/feedback'
            );
            setFeedbacks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user?.role === 'admin') {
            loadFeedback();
        }
    }, [user]);

    const submitFeedback = async (e) => {
        e.preventDefault();
        try {
            await api.post('/feedback', {
                workshop,
                rating,
                comment
            });

            alert("Feedback submitted successfully");

            setWorkshop('');
            setRating('');
            setComment('');
        } catch (err) {
            console.error(err);
            alert("Error submitting feedback");
        }
    };

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-semibold mb-6'>Feedback</h1>

            {user?.role === 'participant' && (
                <form
                    onSubmit={submitFeedback}
                    className='border p-4 rounded max-w-md mb-8'
                >
                    <h2 className='font-semibold mb-4'>Submit Feedback</h2>

                    <select
                        className='border p-2 mb-3 w-full'
                        value={workshop}
                        onChange={e => setWorkshop(e.target.value)}
                        required
                    >
                        <option value=''>Select Workshop</option>
                        {workshops.map(w => (
                            <option key={w._id} value={w._id}>
                                {w.title}
                            </option>
                        ))}
                    </select>

                    <select
                        className='border p-2 mb-3 w-full'
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                        required
                    >
                        <option value=''>Rating (1–5)</option>
                        {[1, 2, 3, 4, 5].map(r => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>

                    <textarea
                        placeholder="Comment (optional)"
                        className='border p-2 mb-3 w-full'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />

                    <button className='border px-4 py-2 rounded'>
                        Submit Feedback
                    </button>
                </form>
            )}

            {user?.role === 'admin' && (
                <>
                    <div className='mb-4 max-w-md'>
                        <select
                            className='border p-2 w-full'
                            onChange={e => loadFeedback(e.target.value)}
                        >
                            <option value=''>All Workshops</option>
                            {workshops.map(w => (
                                <option key={w._id} value={w._id}>
                                    {w.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <table className='w-full border'>
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='border p-2'>User</th>
                                <th className='border p-2'>Rating</th>
                                <th className='border p-2'>Comment</th>
                                <th className='border p-2'>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map(f => (
                                <tr key={f._id}>
                                    <td className='border p-2'>
                                        {f.user?.name}
                                    </td>
                                    <td className='border p-2'>
                                        {f.rating}
                                    </td>
                                    <td className='border p-2'>
                                        {f.comment || '-'}
                                    </td>
                                    <td className='border p-2'>
                                        {new Date(f.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
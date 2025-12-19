import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-semibold mb-1'>
                Welcome, {user.name}
            </h1>

            <p className='mb-6 text-gray-600'>
                Role: <strong>{user.role}</strong>
            </p>

            <div className='grid gap-4 max-w-md'>

                <Link className='border p-3 rounded' to='/workshops'>
                    View Workshops
                </Link>

                {user.role === 'admin' && (
                    <Link className='border p-3 rounded' to='/workshops/create'>
                        Create Workshop
                    </Link>
                )}

                {user.role === 'participant' && (
                    <>
                        <Link className='border p-3 rounded' to='/certificates'>
                            My Certificates
                        </Link>
                        <Link className='border p-3 rounded' to='/feedback'>
                            Submit Feedback
                        </Link>
                    </>
                )}

                {(user.role === 'instructor' || user.role === 'admin') && (
                    <>
                        <Link className='border p-3 rounded' to='/attendance'>
                            Manage Attendance
                        </Link>
                        <Link className='border p-3 rounded' to='/feedback'>
                            View Feedback
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
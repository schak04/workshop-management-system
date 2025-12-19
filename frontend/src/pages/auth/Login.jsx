import {useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({email: '', password: ''});

    const submit = async (e) => {
        e.preventDefault();
        await login(form);
        navigate('/');
    };

    return (
        <form onSubmit={submit} className='p-8 max-w-md mx-auto'>
            <input placeholder='Email' className='input' onChange={e => setForm({...form, email: e.target.value})} />
            <input type='password' placeholder='Password' className='input' onChange={e => setForm({...form, password: e.target.value})} />
            <button className='btn'>Login</button>
        </form>
    );
}
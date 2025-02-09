import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2, Mail, Lock, UserCircle, Eye, EyeOff } from 'lucide-react';
import Footer from '../shared/Footer';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateForm = () => {
        const newErrors = {};
        if (!input.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(input.email)) newErrors.email = 'Email is invalid';
        if (!input.password) newErrors.password = 'Password is required';
        if (!input.role) newErrors.role = 'Please select a role';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
            <Navbar />
            <div className="flex-grow container mx-auto flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-[450px]">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back! 👋</h1>
                        <p className="text-gray-600">Enter your credentials to access your account</p>
                    </div>

                    <form
                        onSubmit={submitHandler}
                        className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300"
                    >
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <Label className="text-sm font-semibold text-gray-700">Email Address</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 h-5 w-5" />
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="name@example.com"
                                        className={`pl-10 h-12 w-full rounded-xl border ${
                                            errors.email 
                                                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500' 
                                                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                                        } transition-all duration-200`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label className="text-sm font-semibold text-gray-700">Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 h-5 w-5" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className={`pl-10 pr-10 h-12 w-full rounded-xl border ${
                                            errors.password 
                                                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500' 
                                                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                                        } transition-all duration-200`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-semibold text-gray-700">Select Role</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { value: 'student', label: 'Student', icon: '👨‍🎓' },
                                        { value: 'recruiter', label: 'Recruiter', icon: '👔' }
                                    ].map((role) => (
                                        <div
                                            key={role.value}
                                            onClick={() => changeEventHandler({ target: { name: 'role', value: role.value } })}
                                            className={`relative cursor-pointer group p-4 rounded-xl border-2 transition-all duration-200 transform hover:-translate-y-1 ${
                                                input.role === role.value
                                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center space-y-2">
                                                <span className="text-2xl">{role.icon}</span>
                                                <span className="text-sm font-medium text-gray-700">{role.label}</span>
                                            </div>
                                            <Input
                                                type="radio"
                                                name="role"
                                                value={role.value}
                                                checked={input.role === role.value}
                                                onChange={changeEventHandler}
                                                className="hidden"
                                            />
                                        </div>
                                    ))}
                                </div>
                                {errors.role && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                        {errors.role}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className={`w-full h-12 rounded-xl font-medium transition-all duration-200 ${
                                    loading
                                        ? 'bg-gray-100 text-gray-400'
                                        : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </div>

                        <div className="mt-6 text-center">
                            <span className="text-gray-600">
                                Don't have an account?{' '}
                                <Link 
                                    to="/signup" 
                                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                                >
                                    Sign up
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;

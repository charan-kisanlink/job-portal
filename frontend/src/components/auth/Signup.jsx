import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { UserCircle, Mail, Phone, Lock, ImagePlus } from 'lucide-react';
import Footer from '../shared/Footer';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "",
    });

    const { loading, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
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
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-blue-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-64px)]">
                <div className="w-full max-w-[540px] animate-fadeIn">
                    {/* Header Section */}
                    <div className="text-center mb-8 space-y-3">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            Join Our Community
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Create an account to unlock all features
                        </p>
                    </div>

                    {/* Signup Form */}
                    <form
                        onSubmit={submitHandler}
                        className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 
                        shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white/60"
                    >
                        <div className="space-y-7">
                            {/* Personal Information Section */}
                            <div className="space-y-5">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Personal Information
                                </h2>
                                
                                {/* Full Name Field */}
                                <div className="relative group">
                                    <Label className="text-gray-700 font-medium pl-1 mb-2 block">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 
                                        text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
                                        <Input
                                            type="text"
                                            value={input.fullname}
                                            name="fullname"
                                            onChange={changeEventHandler}
                                            placeholder="Enter your full name"
                                            className="h-14 pl-12 rounded-xl border text-base
                                            border-gray-200 hover:border-gray-300 focus:border-indigo-500
                                            transition-all duration-200 bg-white/80"
                                        />
                                    </div>
                                </div>

                                {/* Contact Information Grid */}
                                <div className="grid md:grid-cols-2 gap-5">
                                    {/* Email Field */}
                                    <div className="relative group">
                                        <Label className="text-gray-700 font-medium pl-1 mb-2 block">
                                            Email Address
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 
                                            text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
                                            <Input
                                                type="email"
                                                value={input.email}
                                                name="email"
                                                onChange={changeEventHandler}
                                                placeholder="example@gmail.com"
                                                className="h-14 pl-12 rounded-xl border text-base
                                                border-gray-200 hover:border-gray-300 focus:border-indigo-500
                                                transition-all duration-200 bg-white/80"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Number Field */}
                                    <div className="relative group">
                                        <Label className="text-gray-700 font-medium pl-1 mb-2 block">
                                            Phone Number
                                        </Label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 
                                            text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
                                            <Input
                                                type="text"
                                                value={input.phoneNumber}
                                                name="phoneNumber"
                                                onChange={changeEventHandler}
                                                placeholder="0000-0000-0000"
                                                className="h-14 pl-12 rounded-xl border text-base
                                                border-gray-200 hover:border-gray-300 focus:border-indigo-500
                                                transition-all duration-200 bg-white/80"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="relative group">
                                    <Label className="text-gray-700 font-medium pl-1 mb-2 block">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 
                                        text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
                                        <Input
                                            type="password"
                                            value={input.password}
                                            name="password"
                                            onChange={changeEventHandler}
                                            placeholder="Create a strong password"
                                            className="h-14 pl-12 rounded-xl border text-base
                                            border-gray-200 hover:border-gray-300 focus:border-indigo-500
                                            transition-all duration-200 bg-white/80"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Account Type Section */}
                            <div className="space-y-5">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Account Type & Profile
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Role Selection */}
                                    <div className="space-y-3">
                                        <Label className="text-gray-700 font-medium pl-1">I am a</Label>
                                        <RadioGroup className="grid grid-cols-2 gap-3">
                                            {[
                                                { value: 'student', label: 'Student', emoji: '👨‍🎓' },
                                                { value: 'recruiter', label: 'Recruiter', emoji: '👔' }
                                            ].map((role) => (
                                                <div
                                                    key={role.value}
                                                    onClick={() => changeEventHandler({ 
                                                        target: { name: 'role', value: role.value } 
                                                    })}
                                                    className={`flex flex-col items-center justify-center p-4 
                                                    rounded-xl border-2 cursor-pointer transition-all duration-300 
                                                    hover:-translate-y-1 hover:shadow-md
                                                    ${input.role === role.value 
                                                        ? 'border-indigo-500 bg-indigo-50/50 shadow-sm' 
                                                        : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50/50'
                                                    }`}
                                                >
                                                    <span className="text-2xl mb-2">{role.emoji}</span>
                                                    <span className="font-medium text-gray-700">{role.label}</span>
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
                                        </RadioGroup>
                                    </div>

                                    {/* Profile Upload */}
                                    <div className="space-y-3">
                                        <Label className="text-gray-700 font-medium pl-1">Profile Photo</Label>
                                        <div className="relative group">
                                            <Input
                                                accept="image/*"
                                                type="file"
                                                onChange={changeFileHandler}
                                                className="file:mr-4 file:py-2.5 file:px-4 file:rounded-xl
                                                file:border-0 file:text-sm file:font-medium
                                                file:bg-indigo-50 file:text-indigo-600
                                                hover:file:bg-indigo-100 cursor-pointer
                                                h-[104px] pt-8 text-gray-600 text-sm
                                                border-2 border-dashed rounded-xl
                                                border-gray-300 hover:border-indigo-400
                                                transition-all duration-200 bg-white/80"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 
                                            text-gray-400 pointer-events-none flex items-center gap-2">
                                                <ImagePlus className="h-5 w-5" />
                                                <span className="text-sm">Upload</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className={`w-full h-14 rounded-xl text-base font-medium 
                                transition-all duration-300 transform active:scale-[0.98]
                                ${loading 
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:opacity-90 hover:shadow-lg'
                                }`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Creating your account...</span>
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </div>

                        {/* Login Link */}
                        <div className="mt-8 text-center">
                            <span className="text-gray-600">
                                Already have an account?{' '}
                                <Link 
                                    to="/login" 
                                    className="text-indigo-600 font-medium hover:text-indigo-700 
                                    hover:underline transition-colors"
                                >
                                    Sign in instead
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

export default Signup;

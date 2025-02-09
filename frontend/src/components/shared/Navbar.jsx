import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { LogOut, User2, Bell, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/notifications`, {
          params: { role: user?.role },
          withCredentials: true,
        });
        setNotifications(res.data.notifications || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`relative px-3 py-2 transition-colors duration-200
          ${isActive 
            ? 'text-[#F83002]' 
            : 'text-gray-700 hover:text-[#F83002]'
          }
          ${isActive && 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#F83002] after:rounded-full'}`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-sm fixed top-0 w-full z-50 border-b border-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-6">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Job Portal Logo"
            className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <h1 className="text-3xl font-bold text-gray-900">
            AgriSkill<span className="text-[#F83002]">Academy</span>
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className={`hidden lg:flex items-center gap-12`}>
          <ul className="flex font-medium items-center gap-8">
            {user && user.role === 'recruiter' ? (
              <>
                <li><NavLink to="/admin/home">Candidates</NavLink></li>
                <li><NavLink to="/admin/companies">Companies</NavLink></li>
                <li><NavLink to="/admin/jobs">Jobs</NavLink></li>
                <li><NavLink to="/admin/applicants">Applications</NavLink></li>
              </>
            ) : (
              <>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/companies">Companies</NavLink></li>
                <li><NavLink to="/jobs">Jobs</NavLink></li>
                <li><NavLink to="/applications">Applications</NavLink></li>
              </>
            )}
          </ul>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            {user && (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Bell className="h-6 w-6 text-gray-700" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                        {notifications.length}
                      </span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 rounded-xl shadow-lg">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <div
                          key={index}
                          className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <p className="text-sm text-gray-700">{notification.message}</p>
                          <span className="text-xs text-gray-500 mt-1">Just now</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No new notifications
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {/* Auth Buttons / User Menu */}
            {!user ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" className="font-medium hover:text-[#F83002]">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] font-medium px-6">
                    Sign up
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                    <Avatar className="h-9 w-9 ring-2 ring-white">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                      <AvatarFallback className="bg-[#6A38C2] text-white">
                        {user?.fullname?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4 rounded-xl shadow-lg">
                  <div className="flex gap-3 pb-4 border-b border-gray-100">
                    <Avatar className="h-12 w-12 ring-2 ring-white">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                      <AvatarFallback className="bg-[#6A38C2] text-white">
                        {user?.fullname?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="py-2 space-y-1">
                    {user?.role === 'student' && (
                      <Link to="/profile">
                        <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
                          <User2 className="h-4 w-4" />
                          View Profile
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      onClick={logoutHandler}
                      className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 font-normal"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`
        lg:hidden fixed inset-x-0 top-20 bg-white border-b border-gray-100 transition-all duration-300 transform
        ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}>
        <ul className="flex flex-col p-4 space-y-3">
          {user && user.role === 'recruiter' ? (
            <>
              <li><NavLink to="/admin/home">Candidates</NavLink></li>
              <li><NavLink to="/admin/companies">Companies</NavLink></li>
              <li><NavLink to="/admin/jobs">Jobs</NavLink></li>
              <li><NavLink to="/admin/applicants">Applications</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/companies">Companies</NavLink></li>
              <li><NavLink to="/jobs">Jobs</NavLink></li>
              <li><NavLink to="/applications">Applications</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

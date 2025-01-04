import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [notifications, setNotifications] = useState([]);

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

  return (
    <div className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-6">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Job Portal Logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-3xl font-semibold text-gray-900">
            AgriSkill<span className="text-[#F83002]">Academy</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to="/admin/home" className="hover:text-[#F83002]">
                    Candiadates
                  </Link>
                </li>
                <li>
                  <Link to="/admin/companies" className="hover:text-[#F83002]">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-[#F83002]">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/admin/applicants" className="hover:text-[#F83002]">
                    Applications
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-[#F83002]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/companies" className="hover:text-[#F83002]">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-[#F83002]">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/applications" className="hover:text-[#F83002]">
                    Applications
                  </Link>
                </li>
              </>
            )}
          </ul>

          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative">
                  <Bell className="h-6 w-6 text-gray-700" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="text-gray-700">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <div
                        key={index}
                        className="p-2 border-b hover:bg-gray-100"
                      >
                        {notification.message}
                      </div>
                    ))
                  ) : (
                    <p className="text-center">No notifications</p>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="User Avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-2 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="User Avatar"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === 'student' && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

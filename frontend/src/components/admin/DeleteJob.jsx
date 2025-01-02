import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { Loader2 } from 'lucide-react';

const DeleteJob = () => {
    const [job, setJob] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();
    const { id } = useParams(); 
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    setJob(res.data.job);
                } else {
                    toast.error('Job not found.');
                    navigate('/admin/jobs');
                }
            } catch (error) {
                toast.error('Error fetching job details.');
                navigate('/admin/jobs');
            }
        };
        fetchJobDetails();
    }, [id, navigate]);
    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, {
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs'); 
            } else {
                toast.error('Failed to delete the job.');
            }
        } catch (error) {
            toast.error('Error deleting the job.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-40">
                {job ? (
                    <div className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
                        <h2 className="text-xl font-bold text-red-600 mb-4">
                            Are you sure you want to delete this job?
                        </h2>
                        <div className="mb-6">
                            <p><strong>Title:</strong> {job.title}</p>
                            <p><strong>Description:</strong> {job.description}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Salary:</strong> {job.salary}</p>
                        </div>
                        {loading ? (
                            <Button className="w-full bg-red-500 text-white">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </Button>
                        ) : (
                            <Button
                                className="w-full bg-red-600 text-white"
                                onClick={handleDelete}
                            >
                                Confirm Delete
                            </Button>
                        )}
                        <Button
                            className="w-full mt-4"
                            onClick={() => navigate('/admin/jobs')}
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <p>Loading job details...</p>
                )}
            </div>
        </div>
    );
};

export default DeleteJob;

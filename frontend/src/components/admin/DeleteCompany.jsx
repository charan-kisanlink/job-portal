import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Trash, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const DeleteCompany = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${params.id}`, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-2xl mx-auto mt-28 mb-10 p-8 bg-white rounded-xl shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        onClick={() => navigate('/admin/companies')}
                        variant="outline"
                        className="flex items-center gap-2 text-gray-600 font-semibold border-gray-300"
                    >
                        <ArrowLeft />
                        <span>Back</span>
                    </Button>
                    <h1 className="font-bold text-2xl text-gray-700">Delete Company</h1>
                </div>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure you want to delete this company?</h2>
                    <p className="text-gray-600 mb-6">
                        Deleting this company is permanent and cannot be undone. Please confirm if you want to proceed.
                    </p>

                    <div className="flex justify-between items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => navigate('/admin/companies')}
                            className="w-full py-3 text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => setConfirmDelete(true)}
                            className="w-full py-3 bg-red-600 text-white hover:bg-red-700 flex items-center justify-center"
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </section>
                {confirmDelete && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this company? This action cannot be undone.
                            </p>
                            <div className="flex justify-between items-center gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => navigate('/admin/companies')}
                                    className="w-full py-3 text-gray-600 hover:bg-gray-100"
                                >
                                    Cancel
                                </Button>
                                {loading ? (
                                    <Button className="w-full py-3 bg-red-600 text-white hover:bg-red-700 flex items-center justify-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Deleting...
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleDelete}
                                        className="w-full py-3 bg-red-600 text-white hover:bg-red-700"
                                    >
                                        Confirm Delete
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeleteCompany;

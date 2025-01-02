import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    const filteredJobs = allAppliedJobs.filter(job => job.job?.title);

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-6">
            <Table>
                <TableCaption className="text-xl font-semibold text-gray-600">A list of your applied jobs</TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="text-sm font-medium text-gray-700">Date</TableHead>
                        <TableHead className="text-sm font-medium text-gray-700">Job Role</TableHead>
                        <TableHead className="text-sm font-medium text-gray-700">Company</TableHead>
                        <TableHead className="text-sm font-medium text-gray-700 text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center text-lg text-gray-500">You haven't applied any job yet.</TableCell>
                        </TableRow>
                    ) : (
                        filteredJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="hover:bg-gray-50">
                                <TableCell className="text-sm text-gray-600">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-sm text-gray-600">{appliedJob.job?.title}</TableCell>
                                <TableCell className="text-sm text-gray-600">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-sm text-right">
                                    <Badge className={`text-white px-2 py-1 rounded-full ${appliedJob?.status === 'rejected' ? 'bg-red-500' : appliedJob.status === 'pending' ? 'bg-yellow-400' : 'bg-green-500'}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
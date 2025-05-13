import { useState, useEffect } from "react";
import { useSession } from "../context/SessionContext";
import { useNotification } from "../context/NotificationContext";

const JobsPage = ({ onViewJob, onLoadJob }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);
    const { jobs } = useSession();
    const { showNotification } = useNotification();

    useEffect(() => {
        filterJobs();
    }, [jobs, searchTerm]);

    const filterJobs = () => {
        if (!searchTerm.trim()) {
            setFilteredJobs(
                [...jobs].sort(
                    (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
                ),
            );
            return;
        }

        const filter = searchTerm.toLowerCase();
        const filtered = jobs.filter(
            (job) =>
                job.id.toLowerCase().includes(filter) ||
                job.timestamp.toLowerCase().includes(filter),
        );

        setFilteredJobs(
            [...filtered].sort(
                (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
            ),
        );
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleViewJob = (jobId) => {
        const job = jobs.find((j) => j.id === jobId);
        if (!job) {
            showNotification("Job not found.", "error");
            return;
        }
        onViewJob(job);
    };

    const handleLoadJob = (jobId) => {
        const job = jobs.find((j) => j.id === jobId);
        if (!job) {
            showNotification("Job not found.", "error");
            return;
        }
        onLoadJob(job);
    };

    return (
        <div className="jobs-container">
            <div className="jobs-header">
                <h2>Job History</h2>
                <div className="jobs-actions">
                    <div className="search-container">
                        <input
                            type="text"
                            id="job-search"
                            placeholder="Search jobs..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>

            <div className="jobs-table-container">
                <table id="jobs-table" className="jobs-table">
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Timestamp</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <tr key={job.id}>
                                    <td>{job.id}</td>
                                    <td>{job.timestamp}</td>

                                    <td>
                                        <button
                                            className="action-btn"
                                            title="View Results"
                                            onClick={() =>
                                                handleViewJob(job.id)
                                            }
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button
                                            className="action-btn"
                                            title="Load Inputs"
                                            onClick={() =>
                                                handleLoadJob(job.id)
                                            }
                                        >
                                            <i className="fas fa-copy"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>
                                    No jobs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobsPage;

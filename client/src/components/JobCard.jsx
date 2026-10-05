// JobCard receives one job object through props
function JobCard({ job, user, applied, onApply, onDelete }) {
  return (
    <div className="job-card">
      <div className="job-header">
        <h3>{job.title}</h3>
        <span className="job-type">{job.type || 'Job'}</span>
      </div>
      <div className="company-info">
        <span className="company-name">{job.company}</span>
      </div>
      <div className="job-details">
        <div className="detail-item">
          <i className="fas fa-map-marker-alt"></i> {job.location}
        </div>
        <div className="detail-item">
          <i className="fas fa-money-bill-alt"></i> {job.salary || 'Salary not listed'}
        </div>
      </div>
      {job.eligibility && (
        <div className="eligibility">
          <i className="fas fa-check-circle"></i>
          <span><strong>Eligibility:</strong> {job.eligibility}</span>
        </div>
      )}
      {job.description && <p className="job-description">{job.description}</p>}
      <div className="job-footer">
        <div className="job-actions">
          <a
            className="btn-apply"
            href={job.applyLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => onApply(job)}
          >
            {applied ? 'Applied' : 'Apply'}
          </a>
          {user && user.role === 'admin' && (
            <button className="btn-delete" onClick={() => onDelete(job._id)}>Delete</button>
          )}
        </div>
        {job.lastDate && (
          <span className="last-date">
            <i className="fas fa-calendar-alt"></i> Last: {job.lastDate}
          </span>
        )}
      </div>
    </div>
  );
}

export default JobCard;

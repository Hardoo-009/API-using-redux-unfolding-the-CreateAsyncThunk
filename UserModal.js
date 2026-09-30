import { useDispatch, useSelector } from 'react-redux';
import { closeUserModal } from './Slicer1';
import './UserModal.css';

export default function UserModal() {
  const dispatch = useDispatch();
  const { selectedUserModal, modalLoading } = useSelector(
    (state) => state.github,
  );

  if (!selectedUserModal && !modalLoading) return null;

  return (
    <div className="modal-backdrop" onClick={() => dispatch(closeUserModal())}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={() => dispatch(closeUserModal())}
        >
          ✕
        </button>

        {modalLoading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p>Loading Profile Details & Repositories...</p>
          </div>
        ) : (
          selectedUserModal && (
            <>
              <div className="modal-header">
                <img
                  src={selectedUserModal.userDetail.avatar_url}
                  alt={selectedUserModal.userDetail.login}
                  className="modal-avatar"
                />
                <div className="modal-user-info">
                  <h2>
                    {selectedUserModal.userDetail.name ||
                      selectedUserModal.userDetail.login}
                  </h2>
                  <p>@{selectedUserModal.userDetail.login}</p>
                  {selectedUserModal.userDetail.bio && (
                    <p style={{ marginTop: '8px', color: '#c9d1d9' }}>
                      {selectedUserModal.userDetail.bio}
                    </p>
                  )}
                </div>
              </div>

              <div className="modal-stats">
                <div className="stat-item">
                  <span>Public Repos</span>
                  <strong>{selectedUserModal.userDetail.public_repos}</strong>
                </div>
                <div className="stat-item">
                  <span>Followers</span>
                  <strong>{selectedUserModal.userDetail.followers}</strong>
                </div>
                <div className="stat-item">
                  <span>Following</span>
                  <strong>{selectedUserModal.userDetail.following}</strong>
                </div>
              </div>

              <h3 className="modal-section-title">Latest Repositories</h3>

              <div className="repos-grid">
                {selectedUserModal.repos.length === 0 ? (
                  <p style={{ color: '#8b949e' }}>
                    No public repositories found.
                  </p>
                ) : (
                  selectedUserModal.repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="repo-card"
                    >
                      <div className="repo-name">
                        {repo.name}
                        <span>↗</span>
                      </div>
                      <div className="repo-desc">
                        {repo.description || 'No description provided'}
                      </div>
                      <div className="repo-meta">
                        {repo.language && <span>⭐ {repo.language}</span>}
                        <span>★ {repo.stargazers_count}</span>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

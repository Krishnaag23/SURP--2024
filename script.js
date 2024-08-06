// Function to get the current domain from URL parameters
function getCurrentDomain() {
    const urlParams = new URLSearchParams(window.location.search);
    const domain = urlParams.get('domain');
    return domain ? domain.charAt(0).toUpperCase() + domain.slice(1) : null; // Capitalize the first letter if domain exists
}

// Fetch the projects JSON data
fetch('projects.json')
    .then(response => response.json())
    .then(projects => {
        const projectCardsContainer = document.getElementById('project-cards');
        const currentDomain = getCurrentDomain();

        // Filter projects based on the current domain
        const filteredProjects = projects.filter(project => project.Domain === currentDomain);

        // Update the heading based on the current domain
        const title = document.querySelector('.title');
        title.textContent = `PROJECTS IN THE ${currentDomain.toUpperCase()} DEPARTMENT`;

        filteredProjects.forEach((project, index) => {
            // Calculate progress percentage 
            let appliedStudents = 0; 
            const maxStudents = project['Number of Students Required'];
            let progress = (appliedStudents / maxStudents) * 100;
            
            // Create tags string
            const tags = project['Tags'] ? project['Tags'].map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('') : '';
            
            // Create project card
            const card = document.createElement('div');
            card.className = 'col mb-4';
            card.innerHTML = `
                <div class="card h-100 shadow">
                    <h5 class="card-title text-center">${project["Project Title"]}</h5>
                    <div class="card-body">
                        <div class="card-text">
                            <h6>Professor: ${project["Name of Professor"]}</h6>
                            <h6>UID: ${project["Project UID"]}</h6>
                        </div>
                        
                        <div class="progress mb-3">
                            <div class="progress-bar progress-bar-striped progress-bar-animated ${progress > 0 && progress <= 25 ? "bg-info" : progress > 25 && progress <= 50 ? "bg-info" : progress > 50 && progress <= 75 ? "bg-warning" : progress > 75 && progress < 100 ? "bg-danger" : "bg-success"}" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">${appliedStudents}/${maxStudents}</div>
                        </div>
                        <button
                            type="button"
                            class="btn btn-primary btn-details mb-2"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-${index}"
                            style="background-color: #004AAD; border-color: #004AAD">
                            Details
                        </button>
                        <span class="tags mb-2 mx-2">${tags}</span>
                    </div>
                </div>
            `;
            projectCardsContainer.appendChild(card);
            
            // Create project modal
            const existingModal = document.getElementById(`modal-${index}`);
            if (!existingModal) {
                const modal = document.createElement('div');
                modal.className = 'modal fade';
                modal.id = `modal-${index}`;
                modal.style.marginTop = '100px';
                modal.setAttribute('data-bs-backdrop', 'static');
                modal.setAttribute('data-bs-keyboard', 'false');
                modal.setAttribute('tabindex', '-1');
                modal.setAttribute('aria-labelledby', `modalLabel-${index}`);
                modal.setAttribute('aria-hidden', 'true');
                modal.innerHTML = `
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="modalLabel-${index}">${project['Project UID']}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body table-responsive">
                                <table class="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Description</th>
                                            <td>${project['Project Description']}</td>
                                        </tr>
                                        <tr>
                                            <th>Number of students</th>
                                            <td>${project['Number of Students Required']}</td>
                                        </tr>
                                        <tr>
                                            <th>Year of study</th>
                                            <td>${project['Year of Study Criteria']}</td>
                                        </tr>
                                        <tr>
                                            <th>CPI</th>
                                            <td>${project['CPI Eligibility Criteria']}</td>
                                        </tr>
                                        <tr>
                                            <th>Prerequisites</th>
                                            <td>${project['Prerequisites']}</td>
                                        </tr>
                                        <tr>
                                            <th>Duration</th>
                                            <td>${project['Duration']}</td>
                                        </tr>
                                        <tr>
                                            <th>Learning outcome</th>
                                            <td>${project['Learning Outcome & Expectations from the students']}</td>
                                        </tr>
                                        <tr>
                                            <th>Weekly time commitment</th>
                                            <td>${project['Weekly Time Commitment']}</td>
                                        </tr>
                                        <tr>
                                            <th>Assignment</th>
                                            <td>${project['Assignment'] ? `<a href="${project['Assignment']}" target="_blank">Link</a>` : 'Not provided'}</td>
                                        </tr>
                                        <tr>
                                            <th>Instructions for assignment</th>
                                            <td>${project['Instructions for assignment'] || 'Not provided'}</td>
                                        </tr>
                                        <tr>
                                            <th>Additional key points</th>
                                            <td>${project['Additional key points'] || 'Not provided'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button
                                    type="button"
                                    class="btn btn-primary btn-apply"
                                    style="background-color: #004AAD; border-color: #004AAD">
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);
            }
            
            // Attach event listener to Apply button
            const applyButton = document.querySelector(`#modal-${index} .btn-apply`);
            applyButton.addEventListener('click', function () {
                // Redirect to Google Form
                window.location.href = 'https://forms.gle/aX6r6dxfnggVMdrVA';
            });
        });
    })
    .catch(error => console.error('Error fetching project data:', error));

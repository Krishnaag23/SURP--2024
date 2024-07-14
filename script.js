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
            // Create project card
            const card = document.createElement('div');
            card.className = 'col';
            card.innerHTML = `
                <div class="card h-100 shadow">
                    <h5 class="card-title text-center">${project["Project Title"]}</h5>
                    <div class="card-body">
                        <div class="card-text">
                            <h6>Professor: ${project["Name of Professor"]}</h6>
                            <h6>UID: ${project["Project UID"]}</h6>
                        </div>
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-${index}"
                            style="background-color: #004AAD; border-color: #004AAD">
                            Details
                        </button>
                    </div>
                </div>
            `;
            projectCardsContainer.appendChild(card);

            // Create project modal
            const modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.id = `modal-${index}`;
            modal.setAttribute('data-bs-backdrop', 'static');
            modal.setAttribute('data-bs-keyboard', 'false');
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('aria-labelledby', `modalLabel-${index}`);
            modal.setAttribute('aria-hidden', 'true');
            modal.innerHTML = `
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="modalLabel-${index}">${project["Project UID"]}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body table-responsive">
                            <table class="table table-bordered">
                                <tr>
                                    <th>Description</th>
                                    <td>${project["Project Description"]}</td>
                                </tr>
                                <tr>
                                    <th>Number of students</th>
                                    <td>${project["Number of Students Required"]}</td>
                                </tr>
                                <tr>
                                    <th>Year of study</th>
                                    <td>${project["Year of Study Criteria"]}</td>
                                </tr>
                                <tr>
                                    <th>CPI</th>
                                    <td>${project["CPI Eligibility Criteria"]}</td>
                                </tr>
                                <tr>
                                    <th>Prerequisites</th>
                                    <td>${project["Prerequisites"]}</td>
                                </tr>
                                <tr>
                                    <th>Duration</th>
                                    <td>${project["Duration"]}</td>
                                </tr>
                                <tr>
                                    <th>Learning outcome</th>
                                    <td>${project["Learning Outcome & Expectations from the students"]}</td>
                                </tr>
                                <tr>
                                    <th>Weekly time commitment</th>
                                    <td>${project["Weekly Time Commitment"]}</td>
                                </tr>
                                <tr>
                                    <th>Assignment</th>
                                    <td>${project["Assignment"]}</td>
                                </tr>
                                <tr>
                                    <th>Instructions for assignment</th>
                                    <td>${project["Instructions for assignment"]}</td>
                                </tr>
                                  <tr>
                                    <th>Additional key points</th>
                                    <td>${project["Additional key points"]}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        });
    })
    .catch(error => console.error('Error fetching project data:', error));

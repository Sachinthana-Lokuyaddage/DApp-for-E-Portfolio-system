import { useEffect, useState } from 'react';
import './Projects.css';

const Projects = ({ state }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const { contract } = state;

        const fetchProjectDetails = async () => {
            if (contract) {
                try {
                    const projectsData = await contract.methods.allProjects().call();
                    setProjects(projectsData);
                } catch (error) {
                    console.error("Error fetching project details:", error);
                }
            }
        };

        fetchProjectDetails();
    }, [state]);

    return (
        <section className="project-section">
            <h1 className="title">Projects</h1>
            <div className="card-wrapper">
                {projects.length > 0 ? projects.map((project) => (
                    <a 
                        key={project.id} 
                        href={project.githubLink} 
                        className="project-card" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <div className="card-img">
                            <img src={`https://gateway.pinata.cloud/ipfs/${project.image}`} alt={project.name} />
                        </div>
                        <div className="card-text">
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                        </div>
                    </a>
                )) : <p>No projects available.</p>}
            </div>
        </section>
    );
};

export default Projects;

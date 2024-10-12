import { useState, useEffect } from "react";
import './Experience.css';
import { SlCalender } from "react-icons/sl";

const Experience = ({ state }) => {
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);

    useEffect(() => {
        const { contract } = state;

        const fetchEducationDetails = async () => {
            if (contract) {
                const educationDetails = await contract.methods.allEductationDetails().call();
                setEducation(educationDetails);
            }
        };

        const fetchExperienceDetails = async () => {
            if (contract) {
                const experienceDetails = await contract.methods.allExperienceDetails().call();
                setExperience(experienceDetails);
            }
        };

        fetchEducationDetails();
        fetchExperienceDetails();
    }, [state]);

    return (
        <section className="exp-section">
            <h1 className="title">Experience & Education</h1>

            <div className="container">
                {/* Education Section */}
                <div className="education">
                    <h1 className="edu-title">Education</h1>
                    {education.length > 0 && education.map((edu) => (
                        <div key={edu.id} className="edu-card">
                            <p className="card-text1">
                                 {edu.date}
                            </p>
                            <h3 className="card-text2">{edu.degree}</h3>
                            <p className="card-text3">{edu.knowledgeAcquired}</p>
                            <p className="card-text4">
                                {edu.instutionName}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Experience Section */}
                <div className="experience">
                    <h1 className="edu-title">Experience</h1>
                    {experience.length > 0 && experience.map((exp) => (
                        <div key={exp.id} className="edu-card">
                            <p className="card-text1">
                               {exp.date}
                            </p>
                            <h3 className="card-text2">{exp.post}</h3>
                            <p className="card-text3">{exp.knowledgeAcquired}</p>
                            <p className="card-text4">
                                {exp.companyName}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;

import React, { useState, useEffect } from 'react';
import './Skills.css';

const Skills = ({ state }) => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const { contract } = state;

        const fetchSkills = async () => {
            try {
                if (contract) {
                    const skillsData = await contract.methods.getSkills().call();
                    setSkills(skillsData);
                }
            } catch (error) {
                console.error("Error fetching skills:", error);
            }
        };

        fetchSkills();
    }, [state]);

    return (
      <section className='skills'>
<h1 className="title">SKILLS </h1>
        <section className="skills-section">
                      

            {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                    <h4>{skill.name}</h4>
                    <p>{skill.proficiency}</p>
                </div>
            ))}
        </section>
        </section>
    );
};

export default Skills;

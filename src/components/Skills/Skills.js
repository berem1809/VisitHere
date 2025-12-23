import React, { useContext, useState } from 'react';
import Marquee from "react-fast-marquee";

import './Skills.css'

import { ThemeContext } from '../../contexts/ThemeContext';
import { skillsData } from '../../data/skillsData'
import { skillsImage } from '../../utils/skillsImage'

function Skills() {

    const { theme } = useContext(ThemeContext);
    const [showAll, setShowAll] = useState(false);

    const skillBoxStyle = {
        backgroundColor: theme.secondary,
        boxShadow: `0px 0px 30px ${theme.primary30}`
    }

    return (
        <div className="skills" style={{backgroundColor: theme.secondary}}>
            <div className="skillsHeader">
                <h2 style={{color: theme.primary}}>Skills</h2>
                <button
                    className="skills--viewAll"
                    onClick={() => setShowAll(true)}
                    aria-haspopup="dialog"
                    aria-expanded={showAll}
                >
                    View All
                </button>
            </div>
            <div className="skillsContainer">
                <div className="skill--scroll">
                    <Marquee 
                        gradient={false} 
                        speed={80} 
                        pauseOnHover={true}
                        pauseOnClick={true} 
                        delay={0}
                        play={true} 
                        direction="left"
                    >
                        {skillsData.map((skill, id) => (
                            <div className="skill--box" key={id} style={skillBoxStyle}>
                                <img src={skillsImage(skill)} alt={skill} />
                                <h3 style={{color: theme.tertiary}}>
                                    {skill}
                                </h3>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>

            {showAll && (
                <div className="skillsModal" role="dialog" aria-modal="true">
                    <div className="skillsModalContent" style={{backgroundColor: theme.secondary}}>
                        <div className="skillsModalHeader">
                            <h3 style={{color: theme.primary}}>All Skills</h3>
                            <button className="skillsModalClose" onClick={() => setShowAll(false)} aria-label="Close">×</button>
                        </div>
                        <div className="skillsGrid">
                            {skillsData.map((skill, id) => (
                                <div className="skill--box" key={id} style={skillBoxStyle}>
                                    <img src={skillsImage(skill)} alt={skill} />
                                    <h3 style={{color: theme.tertiary}}>{skill}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Skills

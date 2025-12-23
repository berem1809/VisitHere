import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaCode, FaGithub, FaTimes } from 'react-icons/fa';
import Fade from 'react-reveal/Fade';

import placeholder from '../../../assets/png/placeholder.png';
import './SingleProject.css';

function SingleProject({ id, name, desc, tags, code, demo, image, theme }) {
    const [open, setOpen] = useState(false);
    const cardRef = useRef(null);

    const useStyles = makeStyles((t) => ({
        iconBtn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 50,
            border: `2px solid ${theme.tertiary}`,
            color: theme.tertiary,
            transition: 'all 0.2s',
            '&:hover': {
                backgroundColor: theme.secondary,
                color: theme.primary,
                transform: 'scale(1.1)',
                border: `2px solid ${theme.secondary}`,
            },
        },
        icon: {
            fontSize: '1.1rem',
            transition: 'all 0.2s',
            '&:hover': {},
        },
        iconBtnMuted: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 50,
            border: `2px dashed ${theme.tertiary80}`,
            color: theme.tertiary80,
            opacity: 0.6,
            cursor: 'not-allowed',
        }
    }));

    const classes = useStyles();

    // close when clicking outside or pressing Escape (supports touch)
    useEffect(() => {
        function handleOutside(e) {
            if (cardRef.current && !cardRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        function handleKey(e) {
            if (e.key === 'Escape') setOpen(false);
        }
        document.addEventListener('mousedown', handleOutside);
        document.addEventListener('touchstart', handleOutside);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleOutside);
            document.removeEventListener('touchstart', handleOutside);
            document.removeEventListener('keydown', handleKey);
        };
    }, []);

    return (
        <Fade bottom>
            <div
                ref={cardRef}
                key={id}
                className={`singleProject ${open ? 'open' : ''}`}
                style={{ backgroundColor: theme.primary400 }}
            >
                <div className='projectContent'>
                    <h2
                        id={name.replace(' ', '-').toLowerCase()}
                        style={{ color: theme.tertiary }}
                    >
                        {name}
                    </h2>
                    <img src={image ? image : placeholder} alt={name} />
                    <div className='project--showcaseBtn'>


                        {/* Toggle details (</> icon). This only toggles the description and tags */}
                        <button
                            className={classes.iconBtn}
                            title='Show details'
                            onClick={() => setOpen((s) => !s)}
                            aria-expanded={open}
                            aria-controls={`${name.replace(' ', '-').toLowerCase()}-details`}
                        >
                            <FaCode
                                id={`${name
                                    .replace(' ', '-')
                                    .toLowerCase()}-toggle`}
                                className={classes.icon}
                                aria-label='Toggle details'
                            />
                        </button>

                        {/* Github icon - opens repo in new tab (only if code link exists) */}
                        {code ? (
                            <a
                                href={code}
                                target='_blank'
                                rel='noreferrer'
                                className={classes.iconBtn}
                                aria-label='GitHub Repo'
                            >
                                <FaGithub className={classes.icon} />
                            </a>
                        ) : (
                            <div className={classes.iconBtnMuted} title='No repository available' aria-hidden='true'>
                                <FaGithub className={classes.icon} />
                            </div>
                        )}
                    </div>
                </div>

                {/* details: hidden unless `open` */}
                <div
                    id={`${name.replace(' ', '-').toLowerCase()}-details`}
                    className='project--desc'
                    role='region'
                    aria-hidden={!open}
                    style={{
                        background: theme.secondary,
                        color: theme.tertiary,
                        display: open ? 'block' : 'none'
                    }}
                >
                    <button
                        className='project--closeBtn'
                        aria-label='Close details'
                        onClick={() => setOpen(false)}
                    >
                        <FaTimes />
                    </button>
                    <div className='project--descContent'>{desc}</div>
                </div>

                <div
                    className='project--lang'
                    style={{
                        background: theme.secondary,
                        color: theme.tertiary80,
                        display: open ? 'flex' : 'none'
                    }}
                >
                    {tags.map((tag, id) => (
                        <span key={id}>{tag}</span>
                    ))}
                </div>
            </div>
        </Fade>
    );
}

export default SingleProject;

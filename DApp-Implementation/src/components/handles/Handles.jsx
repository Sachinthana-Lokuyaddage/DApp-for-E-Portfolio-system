import React, { useState, useEffect } from 'react';import './Handles.css'
import { AiFillLinkedin, AiFillTwitterSquare } from 'react-icons/ai';
import { FaGithubSquare } from 'react-icons/fa';


const iconMapping = {
  "LinkedIn": <AiFillLinkedin className='icon' />,
  "Twitter": <AiFillTwitterSquare className='icon' />,
  "GitHub": <FaGithubSquare className='icon' />,
  // Add more platforms and corresponding icons as needed
};

const Handles = ({ state }) => {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
      const { contract } = state;

      const fetchSocialMediaLinks = async () => {
          try {
              if (contract) {
                  const links = await contract.methods.getSocialMedia().call();
                  setSocialLinks(links);
              }
          } catch (error) {
              console.error("Error fetching social media links:", error);
          }
      };

      fetchSocialMediaLinks();
  }, [state]);

  return (
      <section className='socials'>
          {socialLinks.map((social, index) => (
              <a key={index} href={social.link} target='_blank' rel="noopener noreferrer" aria-label={social.platform}>
                  {iconMapping[social.platform] || <span className='icon'>{social.platform}</span>}
              </a>
          ))}
      </section>
  );
};

export default Handles;

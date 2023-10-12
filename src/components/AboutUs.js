import React from 'react';
import '../css/aboutus.css'; // Import the CSS file

const developers = [
  {
    name: 'Shikshya Gurung',
    role: 'Frontend Developer',
    bio: 'Shikshya is a passionate frontend developer with expertise in React and CSS. He loves creating beautiful and intuitive user interfaces.',
  },
  {
    name: 'Anglika Kafle',
    role: 'Backend Developer',
    bio: 'Anglika is a skilled backend developer who specializes in Node.js and database management. She enjoys building robust and scalable applications.',
  },
  {
    name: 'Simana Poudel',
    role: 'Full Stack Developer',
    bio: 'Simana is a versatile full stack developer proficient in both frontend and backend technologies. He enjoys solving complex problems and building end-to-end solutions.',
  },
];

const About = () => {
  return (
    <div className="container-aboutus">
      <h1 className='heading'>About Us</h1>
      <div className="developers">
        {developers.map((developer, index) => (
          <div key={index} className="developer">
            <div className="details">
              <h2 className='name'>{developer.name}</h2>
              <h3 className='role'>{developer.role}</h3>
              <p className='bio'>{developer.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

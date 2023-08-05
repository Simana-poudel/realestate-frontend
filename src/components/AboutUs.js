import React from 'react';
// import styles from '../styles/About.module.css';

const developers = [
  {
    name: 'John Doe',
    role: 'Frontend Developer',
    bio: 'John is a passionate frontend developer with expertise in React and CSS. He loves creating beautiful and intuitive user interfaces.',
  },
  {
    name: 'Jane Smith',
    role: 'Backend Developer',
    bio: 'Jane is a skilled backend developer who specializes in Node.js and database management. She enjoys building robust and scalable applications.',
  },
  {
    name: 'Mike Johnson',
    role: 'Full Stack Developer',
    bio: 'Mike is a versatile full stack developer proficient in both frontend and backend technologies. He enjoys solving complex problems and building end-to-end solutions.',
  },
];

const About = () => {
  return (
    <>
    <div className="container">
      <h1 className='h11'>About Us</h1>
      <div className="developers">
        {developers.map((developer, index) => (
          <div key={index} className="developer">
            <img className='img1' src={developer.photo} alt={developer.name} />
            <div className="details">
              <h2 className='h22'>{developer.name}</h2>
              <h3 className='h33'>{developer.role}</h3>
              <p className='pp'>{developer.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* <div className='foot-gap'> </div> */}
    </>
  );
};

export default About;
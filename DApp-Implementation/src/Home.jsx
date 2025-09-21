import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.css'; // Import the custom CSS file

function Home() {
  const navigate = useNavigate(); // Initialize the navigate function
  
  // Function to handle button click
  const handleButtonClick = () => {
    navigate('/Dapp'); // Navigate to the Dapp page
  };

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Blockchain-Based Secure e-Portfolio Management System</h1>
            <button className="cta-button" onClick={handleButtonClick}>Get Started</button>
          </div>
        </div>
      </header>

      <section className="intro-section">
        <p>
          Experience the future of secure and transparent e-portfolio management, powered by blockchain technology.
        </p>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <h3>Decentralized Storage</h3>
            <p>Store and manage your files securely with IPFS and Pinata.</p>
          </div>
          <div className="feature-card">
            <h3>Smart Contracts</h3>
            <p>Ensure authenticity with Ethereum-based credential verification.</p>
          </div>
          <div className="feature-card">
            <h3>Secure & Transparent</h3>
            <p>Protect your achievements and credentials with blockchain security.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>About the Project</h2>
        <p>
          Our system integrates blockchain technology to revolutionize how digital portfolios are managed.
          By leveraging Ethereum, IPFS, and smart contracts, we provide a robust, censorship-resistant platform for
          showcasing your achievements.
        </p>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Secure e-Portfolio Management. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;

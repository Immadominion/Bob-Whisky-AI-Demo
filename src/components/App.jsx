import React, { useState, useEffect, useCallback } from 'react';
import '../styles/App.css';
import BottleCard from './BottleCard';
import BottleGrid from './BottleGrid';
import Navbar from './NavBar';
import Sidebar from './SideBar';
import LoadingSpinner from './LoadingSpinner';

function App() {
  const [username, setUsername] = useState(process.env.REACT_APP_DEFAULT_USERNAME || '');
  const [hasSubmittedUsername, setHasSubmittedUsername] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeEndpoint, setActiveEndpoint] = useState('direct-recommendations');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const endpoints = [
    { id: 'direct-recommendations', label: 'Bob\'s Picks', description: 'Personalized bottle recommendations for you' },
    { id: 'recommendations/similar-price', label: 'Similar Price Range', description: 'Bottles within your preferred price range' },
    { id: 'recommendations/similar-profile', label: 'Similar Profile', description: 'Bottles with flavor profiles you might enjoy' },
    { id: 'recommendations/complementary', label: 'Complementary Selection', description: 'Bottles that complement your collection' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchRecommendations = useCallback(async (endpoint) => {
    if (!username.trim()) {
      setError("Please enter a username first");
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      // Format URL based on endpoint type
      let url;
      
      if (endpoint === 'direct-recommendations') {
        url = `${API_BASE_URL}/direct-recommendations/${username}`;
      } else if (endpoint === 'recommendations/similar-price') {
        url = `${API_BASE_URL}/recommendations/${username}/similar-price`;
      } else if (endpoint === 'recommendations/similar-profile') {
        url = `${API_BASE_URL}/recommendations/${username}/similar-profile`;
      } else if (endpoint === 'recommendations/complementary') {
        url = `${API_BASE_URL}/recommendations/${username}/complementary`;
      } else {
        // Default to general recommendations
        url = `${API_BASE_URL}/recommendations/${username}`;
      }
      
    console.log(`Fetching from: ${url}`);
    
    const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response from server");
      }
      
      const data = await response.json();
      setRecommendations(data);
  
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(`Failed to fetch recommendations: ${err.message}`);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, username]);

  useEffect(() => {
    if (hasSubmittedUsername && username.trim()) {
      fetchRecommendations(activeEndpoint);
    } else {
      setRecommendations([]);
      setError(null);
      setLoading(false);
    }
  }, [activeEndpoint, fetchRecommendations, hasSubmittedUsername, username]);

  useEffect(() => {
    if (!username.trim()) {
      setHasSubmittedUsername(false);
      setRecommendations([]);
      setError(null);
      setLoading(false);
    }
  }, [username]);

  const handleEndpointChange = (endpoint) => {
    if (hasSubmittedUsername && username.trim()) {
      setActiveEndpoint(endpoint);
      // Don't need to call fetchRecommendations directly as it will be triggered by useEffect
    } else {
      // Just change the endpoint without fetching if no valid username
      setActiveEndpoint(endpoint);
    }
    
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };
  
  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setHasSubmittedUsername(true);
      // useEffect will handle the fetch
    } else {
      setError("Please enter a valid username");
    }
  };

  return (
    <div className="app">
      <Navbar 
        toggleSidebar={toggleSidebar}
        username={username}
        setUsername={setUsername}
        handleUsernameSubmit={handleUsernameSubmit}
      />
      
      <div className="main-content">
        <Sidebar 
          isOpen={sidebarOpen}
          endpoints={endpoints}
          activeEndpoint={activeEndpoint}
          onEndpointChange={handleEndpointChange}
          toggleSidebar={toggleSidebar}
        />
        
        <div className={`content ${sidebarOpen ? 'with-sidebar-open' : ''}`}>
          <h1 className="content-title">
            {endpoints.find(e => e.id === activeEndpoint)?.label || 'Recommendations'}
          </h1>
          <p className="content-description">
            {endpoints.find(e => e.id === activeEndpoint)?.description || 'Personalized bottle recommendations for your bar'}
          </p>
          
          {!hasSubmittedUsername ? (
            <div className="enter-username-message">
              Please enter your username to see recommendations.
            </div>
          ) : loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : recommendations.length === 0 ? (
            <div className="empty-recommendations">
              <div className="empty-icon">🥃</div>
              <h3>No recommendations found</h3>
              <p>We couldn't find any recommendations in this category for {username}.</p>
              <p>Try selecting a different category from the sidebar</p>
              <p>Or add more drinks to your bar on Baxus</p>
            </div>
          ) : (
            <BottleGrid>
              {recommendations.map((item, index) => (
                <BottleCard 
                  key={index}
                  bottle={item}
                />
              ))}
            </BottleGrid>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Browse } from './pages/Browse';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ProfileSetup } from './components/ProfileSetup';
import { Profile } from './components/Profile';
import { ChatWindow } from './components/ChatWindow';
import { AILibrarian } from './components/AILibrarian';
import { ListingDetail } from './components/ListingDetail';
import { SellBook } from './pages/SellBook';
import { ListingSuccess } from './pages/ListingSuccess';
import { MyListings } from './pages/MyListings';
import { SAMPLE_LISTINGS } from './constants';
import { Listing, User } from './types';
import { authService } from './services/authService';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [activeChatListing, setActiveChatListing] = useState<Listing | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());

  // Toggle Dark Mode class on body/html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleChatClick = (listing: Listing) => {
    if (!user) {
      setCurrentPage('login');
      return;
    }
    setActiveChatListing(listing);
  };

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing);
    setCurrentPage('listing-detail');
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (!loggedInUser.phone || !loggedInUser.city) {
      setCurrentPage('profile-setup');
    } else {
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            listings={SAMPLE_LISTINGS} 
            onSearchClick={() => setCurrentPage('browse')}
            onSellClick={() => user ? setCurrentPage('sell') : setCurrentPage('login')}
            onChatClick={handleChatClick}
            onListingClick={handleListingClick}
          />
        );
      case 'browse':
        return (
          <Browse 
            listings={SAMPLE_LISTINGS} 
            onChatClick={handleChatClick}
            onListingClick={handleListingClick}
          />
        );
      case 'listing-detail':
        return selectedListing ? (
          <ListingDetail 
            listing={selectedListing} 
            onBack={() => setCurrentPage('browse')}
            onChatClick={handleChatClick}
          />
        ) : (
          <Browse 
            listings={SAMPLE_LISTINGS} 
            onChatClick={handleChatClick}
            onListingClick={handleListingClick}
          />
        );
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} onNavigateToSignup={() => setCurrentPage('signup')} />;
      case 'signup':
        return <Signup onSignupSuccess={(u) => { setUser(u); setCurrentPage('profile-setup'); }} onNavigateToLogin={() => setCurrentPage('login')} />;
      case 'profile-setup':
        return user ? <ProfileSetup user={user} onComplete={(u) => { setUser(u); setCurrentPage('home'); }} /> : <Login onLoginSuccess={handleLoginSuccess} onNavigateToSignup={() => setCurrentPage('signup')} />;
      case 'profile':
        return user ? <Profile user={user} onEdit={() => setCurrentPage('profile-setup')} onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} onNavigateToSignup={() => setCurrentPage('signup')} />;
      
      // NEW ROUTES
      case 'sell':
        return user ? <SellBook user={user} onSuccess={() => setCurrentPage('sell-success')} /> : <Login onLoginSuccess={handleLoginSuccess} onNavigateToSignup={() => setCurrentPage('signup')} />;
      case 'sell-success':
        return <ListingSuccess onGoHome={() => setCurrentPage('home')} onSellAnother={() => setCurrentPage('sell')} onViewListings={() => setCurrentPage('my-listings')} />;
      case 'my-listings':
        return user ? <MyListings user={user} /> : <Login onLoginSuccess={handleLoginSuccess} onNavigateToSignup={() => setCurrentPage('signup')} />;
        
      case 'chats':
        return user ? <div className="p-20 text-center dark:text-white">All Chats List Placeholder</div> : <Login onLoginSuccess={handleLoginSuccess} onNavigateToSignup={() => setCurrentPage('signup')} />;
      default:
        return <Home listings={SAMPLE_LISTINGS} onSearchClick={() => setCurrentPage('browse')} onSellClick={() => {}} onChatClick={handleChatClick} onListingClick={handleListingClick}/>;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bgLight dark:bg-brand-bgDark transition-colors duration-200">
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        currentPage={currentPage}
        setPage={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      
      <main>
        {renderPage()}
      </main>

      {/* Floating Elements */}
      {currentPage !== 'login' && currentPage !== 'signup' && (
        <AILibrarian 
            allListings={SAMPLE_LISTINGS} 
            onViewListing={(id) => {
                const listing = SAMPLE_LISTINGS.find(l => l.id === id);
                if (listing) handleListingClick(listing);
            }}
        />
      )}
      
      {activeChatListing && (
        <ChatWindow 
          activeListing={activeChatListing} 
          onClose={() => setActiveChatListing(null)} 
        />
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-brand-cardDark border-t dark:border-gray-800 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2024 BookBridge India. Built for students.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

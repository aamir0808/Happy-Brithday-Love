import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [started, setStarted] = useState(false);
  const [theme, setTheme] = useState('rose');
  const [currentSong, setCurrentSong] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [revealedNotes, setRevealedNotes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openedGifts, setOpenedGifts] = useState([]);
  const [cakeBlown, setCakeBlown] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const musicRef = useRef(null);
  const canvasRef = useRef(null);
  const cakeCanvasRef = useRef(null);

  // Music - single song
  const song = { url: '/romantic-music.mp3' };

  // Photo data
  const photos = [
    { url: '/_kCS8328.jpg', caption: 'Every moment with you is magical ✨' },
    { url: '/_KCS8329.jpg', caption: 'Your smile lights up my world 🌟' },
    { url: '/_KCS8338.jpg', caption: 'Together we create beautiful memories 💕' },
    { url: '/_KCS8383.jpg', caption: 'Forever and always, my love ❤️' }
  ];

  // Theme configurations
  const themes = {
    rose: { name: 'Pink Rose', gradient: 'from-pink-400 via-rose-400 to-pink-300', accent: '#ff4b7d' },
    purple: { name: 'Purple Dream', gradient: 'from-purple-400 via-pink-400 to-purple-300', accent: '#9333ea' },
    red: { name: 'Red Passion', gradient: 'from-red-400 via-pink-400 to-red-300', accent: '#dc2626' },
    blue: { name: 'Blue Ocean', gradient: 'from-blue-400 via-cyan-300 to-blue-300', accent: '#2563eb' }
  };

  // Hidden love notes
  const loveNotes = [
    "In your eyes, I found my home. In your heart, I found my love. In your soul, I found my forever.",
    "You are the poetry I could never write, the music I could never compose, and the art I could never create.",
    "Every beat of my heart whispers your name. Every breath I take carries thoughts of you.",
    "With you, I've discovered that love isn't just a feeling—it's a promise, a journey, a beautiful destiny.",
    "In a world of temporary things, you are my forever constant.",
    "You didn't just enter my life; you became my life, my reason, my everything.",
    "When I count my blessings, I count you twice—once for being mine, and once for being you.",
    "Your love is the light that guides me through the darkest nights and the joy that colors my brightest days.",
    "I choose you. And I'll choose you over and over, without pause, without doubt, in a heartbeat. I'll keep choosing you.",
    "You are my today and all of my tomorrows. My always and my forever.",
    "In your arms, I've found the safest place I've ever known. In your love, I've found my strength.",
    "Every love story is beautiful, but ours is my favorite because it's real, it's deep, and it's ours.",
    "You are the dream I never knew I had and the reality that exceeds all my dreams.",
    "With you, I am home. With you, I am whole. With you, I am truly myself.",
    "My love for you isn't just about today—it's a promise for all our tomorrows, for all the years to come."
  ];

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "In our journey together, what moment made you realize our love was forever?",
      options: [
        "The first time our eyes truly met",
        "When you stood by me in difficult times",
        "A quiet moment that felt like home",
        "When I imagined life without you and couldn't"
      ]
    },
    {
      id: 2,
      question: "What is the one quality in our relationship that you treasure most?",
      options: [
        "Our deep understanding of each other",
        "The way we grow together",
        "Our ability to find joy in simple moments",
        "The unwavering trust we share"
      ]
    },
    {
      id: 3,
      question: "When I'm not around, what memory of us brings you the most comfort?",
      options: [
        "Your warm embrace and gentle words",
        "Our shared laughter and inside jokes",
        "The peaceful silence we share",
        "The promises we've made to each other"
      ]
    },
    {
      id: 4,
      question: "What dream do you hold closest to your heart for our future together?",
      options: [
        "Building a life filled with love and laughter",
        "Growing old together, hand in hand",
        "Creating a beautiful family",
        "Exploring the world side by side"
      ]
    },
    {
      id: 5,
      question: "In difficult times, what about us gives you the strength to keep going?",
      options: [
        "Knowing we face everything together",
        "The unconditional love we share",
        "Our shared dreams and future",
        "The way you believe in me"
      ]
    },
    {
      id: 6,
      question: "If you could describe our love in one word, what would it be?",
      options: [
        "Eternal - timeless and everlasting",
        "Sacred - precious and profound",
        "Boundless - infinite and limitless",
        "Destined - meant to be together"
      ]
    }
  ];

  // Reasons I Love You
  const reasons = [
    "Your smile that brightens even my darkest days",
    "The way you understand me without words",
    "Your kindness that touches everyone around you",
    "The warmth of your embrace that feels like home",
    "Your strength that inspires me every day",
    "The way you make ordinary moments extraordinary",
    "Your laughter that is music to my soul",
    "The dreams we build together",
    "Your unwavering support and belief in me",
    "The way you love me, unconditionally and completely",
    "Your beautiful heart that chose to love mine",
    "Every little thing that makes you uniquely you"
  ];

  // Virtual gifts
  const gifts = [
    { id: 1, title: 'A Promise', content: 'To love you more with each passing day' },
    { id: 2, title: 'My Heart', content: 'Forever yours, completely and eternally' },
    { id: 3, title: 'Our Future', content: 'A lifetime of love, laughter, and adventures' },
    { id: 4, title: 'My Devotion', content: 'To stand by your side through everything' }
  ];

  // Start surprise
  const startSurprise = () => {
    setStarted(true);
    if (musicRef.current) {
      musicRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    launchFireworks();
  };

  // Slideshow effect
  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [started, photos.length]);

  // Heart rain effect
  useEffect(() => {
    const interval = setInterval(() => {
      createHeart();
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const createHeart = () => {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (20 + Math.random() * 25) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  };

  // Fireworks animation
  const launchFireworks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    
    for (let i = 0; i < 180; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 7 + 2,
        life: 120
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;
        
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 70%)`;
        ctx.fillRect(p.x, p.y, 3, 3);
      });
      
      particles = particles.filter(p => p.life > 0);
      
      if (particles.length > 0) requestAnimationFrame(animate);
    };
    
    animate();
  };

  // Reveal love note
  const revealNote = (index) => {
    if (!revealedNotes.includes(index)) {
      setRevealedNotes([...revealedNotes, index]);
    }
  };

  // Open gift
  const openGift = (id) => {
    if (!openedGifts.includes(id)) {
      setOpenedGifts([...openedGifts, id]);
      launchConfetti();
    }
  };

  // Confetti effect
  const launchConfetti = () => {
    const colors = ['#ff4b7d', '#ff7eb3', '#fad0c4', '#ffd700', '#ff69b4'];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  };

  // Birthday cake blow animation
  const blowCake = () => {
    setCakeBlown(true);
    launchFireworks();
    launchConfetti();
  };

  // Handle quiz answer
  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answer });
  };

  // Submit quiz
  const submitQuiz = () => {
    setShowResults(true);
    launchConfetti();
  };

  // Removed changeSong function - using single song only

  return (
    <div className={`app-container bg-gradient-to-br ${themes[theme].gradient} min-h-screen`}>
      {/* Starry Background */}
      <div className="stars-container">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Canvas for fireworks */}
      <canvas ref={canvasRef} className="fireworks-canvas" />

      {/* Audio element */}
      <audio ref={musicRef} loop>
        <source src={song.url} type="audio/mp3" />
      </audio>

      {/* Theme Switcher */}
      <div className="theme-switcher" data-testid="theme-switcher">
        {Object.entries(themes).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            className={`theme-btn ${theme === key ? 'active' : ''}`}
            style={{ background: value.accent }}
            title={value.name}
            data-testid={`theme-${key}`}
          >
            🎨
          </button>
        ))}
      </div>

      {!started ? (
        // Hero Section
        <section className="hero-section" data-testid="hero-section">
          <h1 className="hero-title">Happy Birthday My Love ❤️</h1>
          <p className="subtitle">A special surprise made with all my heart</p>
          <button onClick={startSurprise} className="surprise-btn" data-testid="start-surprise-btn">
            Open Your Surprise ✨
          </button>
        </section>
      ) : (
        <div className="content-wrapper">
          {/* Polaroid Gallery */}
          <section className="gallery-section" data-testid="gallery-section">
            <h2 className="section-title">Our Beautiful Memories 📸</h2>
            <div className="polaroid-container">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className={`polaroid ${currentSlide === index ? 'active' : ''}`}
                  data-testid={`polaroid-${index}`}
                >
                  <div className="polaroid-image">
                    <img src={photo.url} alt={`Memory ${index + 1}`} onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x500/ff758c/ffffff?text=Memory+${index + 1}`;
                    }} />
                  </div>
                  <div className="polaroid-caption">{photo.caption}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Hidden Love Notes */}
          <section className="love-notes-section" data-testid="love-notes-section">
            <h2 className="section-title">Hidden Love Notes 💌</h2>
            <p className="section-subtitle">Click the hearts to reveal my messages</p>
            <div className="notes-grid">
              {loveNotes.map((note, index) => (
                <div
                  key={index}
                  onClick={() => revealNote(index)}
                  className={`note-card ${revealedNotes.includes(index) ? 'revealed' : ''}`}
                  data-testid={`note-${index}`}
                >
                  {revealedNotes.includes(index) ? (
                    <p className="note-text">{note}</p>
                  ) : (
                    <div className="note-heart">❤️</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 3D Rose Garden */}
          <section className="rose-garden-section" data-testid="rose-garden-section">
            <h2 className="section-title">A Garden of Roses for You 🌹</h2>
            <div className="rose-garden">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="rose-3d" style={{ animationDelay: `${index * 0.2}s` }}>
                  🌹
                </div>
              ))}
            </div>
          </section>

          {/* Virtual Gift Boxes */}
          <section className="gifts-section" data-testid="gifts-section">
            <h2 className="section-title">Virtual Gifts for You 🎁</h2>
            <p className="section-subtitle">Click each gift to open</p>
            <div className="gifts-grid">
              {gifts.map((gift) => (
                <div
                  key={gift.id}
                  onClick={() => openGift(gift.id)}
                  className={`gift-box ${openedGifts.includes(gift.id) ? 'opened' : ''}`}
                  data-testid={`gift-${gift.id}`}
                >
                  {openedGifts.includes(gift.id) ? (
                    <div className="gift-content">
                      <h3 className="gift-title">{gift.title}</h3>
                      <p className="gift-text">{gift.content}</p>
                    </div>
                  ) : (
                    <div className="gift-icon">🎁</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Birthday Cake */}
          <section className="cake-section" data-testid="cake-section">
            <h2 className="section-title">Make a Wish & Blow the Candles 🎂</h2>
            <div className="cake-container" onClick={blowCake}>
              {!cakeBlown ? (
                <div className="cake" data-testid="cake">
                  <div className="cake-layer layer-3"></div>
                  <div className="cake-layer layer-2"></div>
                  <div className="cake-layer layer-1"></div>
                  <div className="candles">
                    <div className="candle"><div className="flame">🔥</div></div>
                    <div className="candle"><div className="flame">🔥</div></div>
                    <div className="candle"><div className="flame">🔥</div></div>
                  </div>
                </div>
              ) : (
                <div className="cake-blown" data-testid="cake-blown">
                  <p className="cake-message">🎉 Happy Birthday! Your wish will come true! 🎉</p>
                </div>
              )}
            </div>
          </section>

          {/* Reasons I Love You */}
          <section className="reasons-section" data-testid="reasons-section">
            <h2 className="section-title">Reasons I Love You 💭</h2>
            <div className="reasons-list">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="reason-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-testid={`reason-${index}`}
                >
                  <span className="reason-number">{index + 1}</span>
                  <p className="reason-text">{reason}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Couple Quiz */}
          <section className="quiz-section" data-testid="quiz-section">
            <h2 className="section-title">Our Love Quiz 🎮</h2>
            <p className="section-subtitle">Answer from your heart</p>
            
            {!showResults ? (
              <div className="quiz-container">
                {quizQuestions.map((q) => (
                  <div key={q.id} className="quiz-question" data-testid={`quiz-question-${q.id}`}>
                    <h3 className="question-text">{q.question}</h3>
                    <div className="options-grid">
                      {q.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(q.id, option)}
                          className={`option-btn ${quizAnswers[q.id] === option ? 'selected' : ''}`}
                          data-testid={`quiz-option-${q.id}-${index}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {Object.keys(quizAnswers).length === quizQuestions.length && (
                  <button onClick={submitQuiz} className="submit-quiz-btn" data-testid="submit-quiz-btn">
                    Submit Your Answers ❤️
                  </button>
                )}
              </div>
            ) : (
              <div className="quiz-results" data-testid="quiz-results">
                <h3 className="results-title">Your Heart Has Spoken 💕</h3>
                <p className="results-text">
                  Every answer you chose reflects the beautiful depth of your heart.
                  Thank you for being you, for loving me, and for making every moment magical.
                  These aren't just answers—they're the foundation of our forever.
                </p>
                <button onClick={() => { setShowResults(false); setQuizAnswers({}); }} className="retake-btn">
                  Retake Quiz
                </button>
              </div>
            )}
          </section>

          {/* Original Love Letter */}
          <section className="love-letter-section" data-testid="love-letter-section">
            <div className="love-card">
              <h2 className="love-card-title">My Love Letter To You</h2>
              <div className="love-card-content">
                <p>You came into my life like the most beautiful surprise.</p>
                <p>Before you, I never knew someone could mean so much to me. Every smile of yours brightens my darkest days.</p>
                <p>Every moment with you becomes a memory I want to keep forever.</p>
                <p>I promise to support you, stand beside you, and love you in every stage of life.</p>
                <p>No matter where life takes us, my heart will always choose you.</p>
                <p className="signature">Forever and always — it's you and me. ❤️</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;


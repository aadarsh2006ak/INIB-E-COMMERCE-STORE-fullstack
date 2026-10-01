import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const originalSlides = [
  {
    id: 1,
    badge: 'OUR BEST SELLERS',
    title: 'Latest Arrivals',
    subtitle: 'SHOP NOW',
    image: assets.hero_img,
    link: '/collection',
    alt: 'Latest Arrivals Collection',
  },
  {
    id: 2,
    badge: "MEN'S COLLECTION",
    title: 'Urban & Sleek Styles',
    subtitle: 'EXPLORE MEN',
    image: assets.hero_slide_2,
    link: '/collection',
    alt: "Men's Urban Streetwear Collection",
  },
  {
    id: 3,
    badge: "WOMEN'S LUXURY",
    title: 'Elegance Reimagined',
    subtitle: 'DISCOVER MORE',
    image: assets.hero_slide_3,
    link: '/collection',
    alt: "Women's Timeless Luxury Collection",
  },
];

// Cloned array for seamless infinite looping: [LastClone, ...originals, FirstClone]
const slides = [
  { ...originalSlides[originalSlides.length - 1], cloneId: 'clone-prev' },
  ...originalSlides,
  { ...originalSlides[0], cloneId: 'clone-next' },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const isMoving = useRef(false);

  // Drag & Swipe state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startX = useRef(0);
  const currentDragX = useRef(0);
  const containerRef = useRef(null);

  const nextSlide = () => {
    if (isMoving.current) return;
    isMoving.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isMoving.current) return;
    isMoving.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (slideIdx) => {
    if (isMoving.current) return;
    isMoving.current = true;
    setIsTransitioning(true);
    setCurrentIndex(slideIdx + 1);
  };

  // Seamless boundary teleport for infinite looping
  const handleTransitionEnd = () => {
    isMoving.current = false;
    if (currentIndex === slides.length - 1) {
      // Reached next-clone -> silently snap to actual first slide
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      // Reached prev-clone -> silently snap to actual last slide
      setIsTransitioning(false);
      setCurrentIndex(originalSlides.length);
    }
  };

  // Auto-slide effect in ONE forward direction infinitely
  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3600);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, isDragging]);

  // Touch Handlers for Mobile Swipe (Both Directions)
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
    currentDragX.current = e.touches[0].clientX;
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    currentDragX.current = e.touches[0].clientX;
    const diff = currentDragX.current - startX.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = currentDragX.current - startX.current;
    if (diff < -50) {
      nextSlide();
    } else if (diff > 50) {
      prevSlide();
    }
    setDragOffset(0);
    setIsPaused(false);
  };

  // Mouse Drag Handlers for Desktop (Both Directions)
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsPaused(true);
    setIsDragging(true);
    startX.current = e.clientX;
    currentDragX.current = e.clientX;
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    currentDragX.current = e.clientX;
    const diff = currentDragX.current - startX.current;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = currentDragX.current - startX.current;
    if (diff < -60) {
      nextSlide();
    } else if (diff > 60) {
      prevSlide();
    }
    setDragOffset(0);
    setIsPaused(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
    setIsPaused(false);
  };

  // Calculate which indicator dot is active
  const activeDotIndex =
    currentIndex === 0
      ? originalSlides.length - 1
      : currentIndex === slides.length - 1
      ? 0
      : currentIndex - 1;

  return (
    <div
      ref={containerRef}
      className='relative overflow-hidden border border-gray-300 rounded-sm group select-none my-2 cursor-grab active:cursor-grabbing'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div
        className='flex'
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
          transition: isDragging
            ? 'none'
            : isTransitioning
            ? 'transform 650ms cubic-bezier(0.25, 1, 0.5, 1)'
            : 'none',
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.cloneId ? `${slide.cloneId}-${index}` : slide.id}
            className='flex flex-col flex-shrink-0 w-full sm:flex-row min-h-[380px] sm:min-h-[420px] md:min-h-[460px]'
          >
            {/* Hero left side */}
            <div className='flex items-center justify-center w-full px-6 py-10 bg-white sm:w-1/2 sm:py-0 sm:px-12 pointer-events-auto'>
              <div className='text-[#414141] max-w-md'>
                <div className='flex items-center gap-2'>
                  <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                  <p className='text-xs font-semibold tracking-wider md:text-sm uppercase text-[#555]'>
                    {slide.badge}
                  </p>
                </div>
                <h1 className='text-3xl font-normal leading-tight sm:py-3 lg:text-5xl prata-regular text-[#222] my-2'>
                  {slide.title}
                </h1>
                <Link
                  to={slide.link}
                  onClick={(e) => {
                    if (Math.abs(dragOffset) > 10) e.preventDefault();
                  }}
                  className='inline-flex items-center gap-2 transition-transform duration-200 hover:translate-x-1 group/btn'
                >
                  <p className='text-xs font-semibold tracking-widest md:text-sm text-[#111] group-hover/btn:text-black'>
                    {slide.subtitle}
                  </p>
                  <p className='w-8 md:w-11 h-[1px] bg-[#414141] group-hover/btn:w-14 transition-all duration-300'></p>
                </Link>
              </div>
            </div>

            {/* Hero right side */}
            <div className='relative flex items-center justify-center w-full overflow-hidden bg-gray-50 sm:w-1/2 min-h-[260px] sm:min-h-full pointer-events-none'>
              <img
                className='object-cover w-full h-full max-h-[480px] pointer-events-none select-none'
                src={slide.image}
                alt={slide.alt}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Manual Left (Prev) Arrow Button */}
      <button
        type='button'
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        aria-label='Previous Slide'
        className='absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 focus:outline-none z-20 cursor-pointer border border-gray-200'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-5 h-5 text-gray-700'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M15 19l-7-7 7-7' />
        </svg>
      </button>

      {/* Manual Right (Next) Arrow Button */}
      <button
        type='button'
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        aria-label='Next Slide'
        className='absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 focus:outline-none z-20 cursor-pointer border border-gray-200'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-5 h-5 text-gray-700'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M9 5l7 7-7 7' />
        </svg>
      </button>

      {/* Slide Indicators / Dots */}
      <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-[4px]'>
        {originalSlides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeDotIndex === index
                ? 'w-6 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/90'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;

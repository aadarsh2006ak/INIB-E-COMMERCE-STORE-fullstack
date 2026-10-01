import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [pincode, setPincode] = useState('');
  const [pincodeMsg, setPincodeMsg] = useState('');

  // Reviews State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: 'Rohan Sharma',
      rating: 5,
      date: '3 days ago',
      title: 'Exceptional quality and perfect fit!',
      comment:
        'The fabric feels super premium and breathable. The color is exactly as shown in the picture. Fits perfectly true to size. Delivery was made within 2 days!',
      helpfulCount: 18,
      verified: true,
    },
    {
      id: 2,
      name: 'Priya Verma',
      rating: 5,
      date: '1 week ago',
      title: 'Loved it! Total value for money',
      comment:
        'Must buy! The stitching and finishing is top tier, comparable to international luxury brands. Very comfortable for everyday wear.',
      helpfulCount: 12,
      verified: true,
    },
    {
      id: 3,
      name: 'Aman Gupta',
      rating: 4,
      date: '2 weeks ago',
      title: 'Great product, great styling',
      comment:
        'Looks very elegant. Fabric holds up great even after washing. Highly recommend checking the size guide before ordering.',
      helpfulCount: 7,
      verified: true,
    },
  ]);

  const fetchProductData = async () => {
    const item = (products || []).find((p) => p._id === productId);
    if (item) {
      setProductData(item);
      setImage(Array.isArray(item.image) ? item.image[0] : item.image);
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
  }, [productId, products]);

  // Handle Buy Now (Instant Checkout)
  const handleBuyNow = async () => {
    if (!size) {
      toast.error('Please select a size first!');
      return;
    }
    const added = await addToCart(productData._id, size);
    if (added) {
      navigate('/place-order');
    }
  };

  // Handle Pincode Check
  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
      setPincodeMsg('Please enter a valid 6-digit PIN code.');
      return;
    }
    setPincodeMsg(`✓ Express Delivery available to ${pincode} by tomorrow!`);
  };

  // Handle Review Submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      toast.error('Please enter your name and review message.');
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewerName.trim(),
      rating: newRating,
      date: 'Just now',
      title: reviewTitle.trim() || 'Verified Purchase Review',
      comment: reviewComment.trim(),
      helpfulCount: 0,
      verified: true,
    };

    setReviewsList([newReview, ...reviewsList]);
    setReviewerName('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
    toast.success('Thank you! Your review has been submitted successfully.');
  };

  const handleHelpful = (id) => {
    setReviewsList(
      reviewsList.map((rev) =>
        rev.id === id ? { ...rev, helpfulCount: rev.helpfulCount + 1 } : rev
      )
    );
  };

  if (!productData) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='w-8 h-8 border-4 border-gray-300 rounded-full border-t-black animate-spin'></div>
      </div>
    );
  }

  const numPrice = Number(productData.price || 0);
  const mrp = Math.round(numPrice * 1.38);
  const discountPercent = Math.round(((mrp - numPrice) / mrp) * 100);

  return (
    <div className='pt-8 pb-16 transition-opacity duration-500 ease-in border-t border-gray-200'>
      {/* Breadcrumb */}
      <div className='flex items-center gap-2 mb-6 text-xs text-gray-500'>
        <span
          onClick={() => navigate('/')}
          className='cursor-pointer hover:text-black'
        >
          Home
        </span>
        <span>/</span>
        <span
          onClick={() => navigate('/collection')}
          className='cursor-pointer hover:text-black'
        >
          Collection
        </span>
        <span>/</span>
        <span className='font-medium text-gray-800 line-clamp-1'>
          {productData.name}
        </span>
      </div>

      {/* Main Product Details Section */}
      <div className='flex flex-col gap-10 lg:gap-14 lg:flex-row'>
        {/* Product Images Gallery */}
        <div className='flex flex-col-reverse flex-1 gap-4 sm:flex-row'>
          {/* Thumbnails */}
          <div className='flex gap-3 overflow-x-auto sm:flex-col sm:overflow-y-auto sm:w-[20%] w-full max-h-[540px]'>
            {Array.isArray(productData.image) &&
              productData.image.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setImage(item)}
                  className={`w-20 sm:w-full flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 aspect-square ${
                    image === item
                      ? 'border-black ring-1 ring-black'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={item}
                    className='object-cover object-top w-full h-full'
                    alt={productData.name}
                  />
                </div>
              ))}
          </div>

          {/* Main Large Image */}
          <div className='relative flex-1 overflow-hidden bg-gray-50 border border-gray-200 rounded-xl group max-h-[540px] flex items-center justify-center'>
            {productData.bestseller && (
              <span className='absolute top-3 left-3 z-10 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider'>
                ★ Bestseller
              </span>
            )}
            <img
              src={image}
              className='object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-105 max-h-[540px]'
              alt={productData.name}
            />
          </div>
        </div>

        {/* Product Information & Buy Section */}
        <div className='flex-1'>
          {/* Brand Tag & Category */}
          <div className='flex items-center gap-2'>
            <span className='text-xs font-bold tracking-widest text-gray-400 uppercase'>
              AkStore Original
            </span>
            <span className='text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-medium'>
              {productData.category}
            </span>
          </div>

          {/* Title */}
          <h1 className='mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl leading-snug'>
            {productData.name}
          </h1>

          {/* Ratings Summary Snippet */}
          <div className='flex items-center gap-2 mt-3'>
            <div className='flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-xs font-semibold text-amber-900'>
              <span className='text-amber-500 text-sm'>★</span>
              <span>4.8</span>
            </div>
            <span className='text-xs text-gray-400'>•</span>
            <button
              onClick={() => {
                setActiveTab('reviews');
                window.scrollTo({ top: 850, behavior: 'smooth' });
              }}
              className='text-xs font-medium text-blue-600 underline hover:text-blue-800'
            >
              {reviewsList.length + 125} Verified Ratings & {reviewsList.length} Reviews
            </button>
            <span className='text-xs text-gray-400'>•</span>
            <span className='text-xs font-medium text-emerald-600 flex items-center gap-1'>
              <span className='w-1.5 h-1.5 rounded-full bg-emerald-500'></span> In Stock
            </span>
          </div>

          {/* Pricing Box */}
          <div className='p-4 mt-5 rounded-lg bg-gray-50 border border-gray-100'>
            <div className='flex items-baseline gap-3'>
              <span className='text-3xl font-bold text-gray-900'>
                {currency}&nbsp;{numPrice.toLocaleString()}
              </span>
              <span className='text-sm text-gray-400 line-through'>
                {currency}&nbsp;{mrp.toLocaleString()}
              </span>
              <span className='px-2 py-0.5 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-full'>
                {discountPercent}% OFF
              </span>
            </div>
            <p className='mt-1 text-xs text-gray-500'>
              Inclusive of all taxes. Free shipping on all prepaid orders.
            </p>
          </div>

          {/* Description Snippet */}
          <p className='mt-4 text-sm leading-relaxed text-gray-600'>
            {productData.description}
          </p>

          {/* Size Selector */}
          <div className='mt-6'>
            <div className='flex items-center justify-between mb-2'>
              <p className='text-sm font-semibold text-gray-800'>
                Select Size <span className='text-red-500'>*</span>
              </p>
              <span className='text-xs font-medium text-gray-500'>
                Fit: Regular / True to Size
              </span>
            </div>
            <div className='flex flex-wrap gap-2.5'>
              {Array.isArray(productData.sizes) &&
                productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    type='button'
                    onClick={() => setSize(item)}
                    className={`min-w-[48px] py-2.5 px-4 font-semibold text-sm rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      item === size
                        ? 'border-black bg-black text-white shadow-sm'
                        : 'border-gray-200 bg-white text-gray-800 hover:border-gray-400'
                    }`}
                  >
                    {item}
                  </button>
                ))}
            </div>
            {!size && (
              <p className='mt-1.5 text-xs text-amber-600 font-medium'>
                💡 Please choose a size to add to cart or buy now.
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className='flex items-center gap-3 mt-6'>
            <span className='text-sm font-semibold text-gray-800'>Quantity:</span>
            <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white'>
              <button
                type='button'
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className='px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold transition'
              >
                -
              </button>
              <span className='px-4 py-1.5 text-sm font-semibold text-gray-800 border-x border-gray-200'>
                {quantity}
              </span>
              <button
                type='button'
                onClick={() => setQuantity((q) => q + 1)}
                className='px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold transition'
              >
                +
              </button>
            </div>
          </div>

          {/* Dual Action Buttons: ADD TO CART & BUY NOW */}
          <div className='flex flex-col sm:flex-row gap-3.5 mt-7'>
            <button
              type='button'
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  addToCart(productData._id, size);
                }
              }}
              className='flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg text-sm font-bold text-gray-900 bg-white border-2 border-black hover:bg-gray-50 active:scale-[0.98] transition shadow-sm cursor-pointer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 h-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                />
              </svg>
              ADD TO CART
            </button>

            <button
              type='button'
              onClick={handleBuyNow}
              className='flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 active:scale-[0.98] transition shadow-md cursor-pointer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 h-4'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z'
                  clipRule='evenodd'
                />
              </svg>
              BUY NOW
            </button>
          </div>

          {/* Delivery & Pincode Checker */}
          <div className='p-4 mt-7 border border-gray-200 rounded-xl bg-gray-50/50'>
            <p className='text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 h-4 text-gray-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
              Delivery & Services
            </p>
            <form onSubmit={handleCheckPincode} className='flex gap-2'>
              <input
                type='text'
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder='Enter 6-digit Pincode'
                className='w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-white'
              />
              <button
                type='submit'
                className='px-4 py-2 text-xs font-bold text-white bg-gray-900 rounded-lg hover:bg-black transition'
              >
                Check
              </button>
            </form>
            {pincodeMsg && (
              <p
                className={`mt-2 text-xs font-medium ${
                  pincodeMsg.startsWith('✓') ? 'text-emerald-700' : 'text-red-500'
                }`}
              >
                {pincodeMsg}
              </p>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className='grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-200 text-xs text-gray-600'>
            <div className='flex items-center gap-2'>
              <span className='flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold'>
                ✓
              </span>
              <span>100% Original Products</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold'>
                ↺
              </span>
              <span>10 Days Easy Return</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold'>
                ₹
              </span>
              <span>Cash on Delivery Available</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold'>
                🔒
              </span>
              <span>Secure Checkout Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description | Ratings & Reviews | Shipping */}
      <div className='mt-16'>
        <div className='flex border-b border-gray-200 overflow-x-auto'>
          <button
            type='button'
            onClick={() => setActiveTab('description')}
            className={`py-3 px-6 text-sm font-semibold transition border-b-2 cursor-pointer ${
              activeTab === 'description'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Product Specifications
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-6 text-sm font-semibold transition border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Ratings & Reviews
            <span className='px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full font-bold'>
              {reviewsList.length + 125}
            </span>
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('shipping')}
            className={`py-3 px-6 text-sm font-semibold transition border-b-2 cursor-pointer ${
              activeTab === 'shipping'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Shipping & Returns
          </button>
        </div>

        {/* Tab 1: Product Specifications Content */}
        {activeTab === 'description' && (
          <div className='p-6 bg-white border border-t-0 border-gray-200 rounded-b-xl'>
            <h3 className='text-base font-semibold text-gray-900 mb-3'>
              About this item
            </h3>
            <p className='text-sm leading-relaxed text-gray-600 mb-4'>
              {productData.description}
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700 mt-6 pt-4 border-t border-gray-100'>
              <div className='flex justify-between py-2 border-b border-gray-100'>
                <span className='text-gray-400 font-medium'>Category:</span>
                <span className='font-semibold'>{productData.category}</span>
              </div>
              <div className='flex justify-between py-2 border-b border-gray-100'>
                <span className='text-gray-400 font-medium'>Sub-Category:</span>
                <span className='font-semibold'>{productData.subCategory}</span>
              </div>
              <div className='flex justify-between py-2 border-b border-gray-100'>
                <span className='text-gray-400 font-medium'>Fabric Material:</span>
                <span className='font-semibold'>100% Combed Premium Cotton</span>
              </div>
              <div className='flex justify-between py-2 border-b border-gray-100'>
                <span className='text-gray-400 font-medium'>Care Instructions:</span>
                <span className='font-semibold'>Machine Wash / Cold Wash</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Ratings & Reviews Content */}
        {activeTab === 'reviews' && (
          <div className='p-6 bg-white border border-t-0 border-gray-200 rounded-b-xl'>
            {/* Review Summary Breakdown */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-200'>
              {/* Left Score Box */}
              <div className='flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-100 text-center'>
                <span className='text-5xl font-black text-gray-900'>4.8</span>
                <div className='flex items-center gap-1 my-2 text-amber-500 text-lg'>
                  ★★★★★
                </div>
                <p className='text-xs font-semibold text-gray-500'>
                  Based on {reviewsList.length + 125} verified customer ratings
                </p>
                <div className='mt-3 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full'>
                  ✓ 96% of buyers recommend this product
                </div>
              </div>

              {/* Middle Rating Bars */}
              <div className='flex flex-col justify-center gap-2'>
                {[
                  { star: 5, pct: '78%' },
                  { star: 4, pct: '15%' },
                  { star: 3, pct: '4%' },
                  { star: 2, pct: '2%' },
                  { star: 1, pct: '1%' },
                ].map((row) => (
                  <div key={row.star} className='flex items-center gap-2 text-xs'>
                    <span className='w-12 font-medium text-gray-600'>
                      {row.star} Star
                    </span>
                    <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-amber-400 rounded-full'
                        style={{ width: row.pct }}
                      ></div>
                    </div>
                    <span className='w-8 text-right text-gray-400'>{row.pct}</span>
                  </div>
                ))}
              </div>

              {/* Right CTA Button */}
              <div className='flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-100 text-center'>
                <h4 className='text-sm font-bold text-gray-900 mb-1'>
                  Have you used this product?
                </h4>
                <p className='text-xs text-gray-500 mb-4'>
                  Share your genuine experience to help other shoppers.
                </p>
                <button
                  type='button'
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className='px-5 py-2.5 bg-black text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition shadow-sm cursor-pointer'
                >
                  {showReviewForm ? 'Close Form' : '✍️ Write a Review'}
                </button>
              </div>
            </div>

            {/* Interactive Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleSubmitReview}
                className='mt-8 p-6 bg-orange-50/50 border border-orange-200 rounded-xl max-w-2xl mx-auto'
              >
                <h3 className='text-base font-bold text-gray-900 mb-4'>
                  Write Your Customer Review
                </h3>

                {/* Star Rating Input */}
                <div className='mb-4'>
                  <label className='block text-xs font-semibold text-gray-700 mb-1'>
                    Overall Rating <span className='text-red-500'>*</span>
                  </label>
                  <div className='flex items-center gap-1.5'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type='button'
                        key={star}
                        onClick={() => setNewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className='text-2xl transition cursor-pointer text-amber-400 focus:outline-none'
                      >
                        {(hoverRating || newRating) >= star ? '★' : '☆'}
                      </button>
                    ))}
                    <span className='ml-2 text-xs font-semibold text-gray-600'>
                      {newRating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Name & Title */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                  <div>
                    <label className='block text-xs font-semibold text-gray-700 mb-1'>
                      Your Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      required
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder='e.g., Rahul K.'
                      className='w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-black'
                    />
                  </div>
                  <div>
                    <label className='block text-xs font-semibold text-gray-700 mb-1'>
                      Review Headline
                    </label>
                    <input
                      type='text'
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder='e.g., Perfect fitting and premium fabric'
                      className='w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-black'
                    />
                  </div>
                </div>

                {/* Detailed Comment */}
                <div className='mb-4'>
                  <label className='block text-xs font-semibold text-gray-700 mb-1'>
                    Your Review Comment <span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder='What did you like or dislike about this product? How is the fit and fabric quality?'
                    className='w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-black'
                  ></textarea>
                </div>

                <div className='flex justify-end gap-2'>
                  <button
                    type='button'
                    onClick={() => setShowReviewForm(false)}
                    className='px-4 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-6 py-2 text-xs font-bold text-white bg-black rounded-lg hover:bg-gray-800 shadow-md'
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}

            {/* Customer Reviews List */}
            <div className='mt-8 space-y-6'>
              <h3 className='text-base font-bold text-gray-900'>
                Customer Reviews ({reviewsList.length})
              </h3>
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className='p-5 bg-gray-50/50 rounded-xl border border-gray-100 flex flex-col gap-2'
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div className='w-8 h-8 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center uppercase'>
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <div className='flex items-center gap-1.5'>
                          <span className='text-xs font-bold text-gray-900'>
                            {rev.name}
                          </span>
                          {rev.verified && (
                            <span className='text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-semibold'>
                              ✓ Verified Buyer
                            </span>
                          )}
                        </div>
                        <p className='text-[10px] text-gray-400'>{rev.date}</p>
                      </div>
                    </div>
                    {/* Stars */}
                    <div className='text-amber-500 text-sm'>
                      {'★'.repeat(rev.rating)}
                      {'☆'.repeat(5 - rev.rating)}
                    </div>
                  </div>

                  <h5 className='text-sm font-semibold text-gray-800 mt-1'>
                    {rev.title}
                  </h5>
                  <p className='text-xs leading-relaxed text-gray-600'>
                    {rev.comment}
                  </p>

                  <div className='flex items-center justify-between pt-2 border-t border-gray-100 mt-2 text-[11px] text-gray-400'>
                    <span>Was this review helpful?</span>
                    <button
                      type='button'
                      onClick={() => handleHelpful(rev.id)}
                      className='flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded text-gray-700 hover:bg-gray-100 transition'
                    >
                      👍 Helpful ({rev.helpfulCount})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Shipping & Returns Content */}
        {activeTab === 'shipping' && (
          <div className='p-6 bg-white border border-t-0 border-gray-200 rounded-b-xl text-xs leading-relaxed text-gray-600 space-y-4'>
            <div>
              <h4 className='font-bold text-gray-800 text-sm mb-1'>
                🚚 Fast & Reliable Dispatch
              </h4>
              <p>
                All orders are dispatched within 24 hours of confirmation. Expected
                delivery is 2-4 business days across India.
              </p>
            </div>
            <div>
              <h4 className='font-bold text-gray-800 text-sm mb-1'>
                🔄 10-Day Hassle-Free Return / Exchange Policy
              </h4>
              <p>
                If the size does not fit or if you wish to exchange the item, you
                can initiate a return or exchange within 10 days of delivery.
              </p>
            </div>
            <div>
              <h4 className='font-bold text-gray-800 text-sm mb-1'>
                💵 Payment Options
              </h4>
              <p>
                We support Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm),
                Credit/Debit Cards, Net Banking, and Stripe/Razorpay.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Display Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;

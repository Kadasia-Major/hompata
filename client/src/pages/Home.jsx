import React, { useState, useCallback, useMemo } from "react";
import { 
  FaWhatsapp, 
  FaFacebookF, 
  FaTwitter, 
  FaBed, 
  FaBath, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaStar,
  FaRegHeart,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { FaShareAlt, FaDollarSign } from "react-icons/fa";

// ========================
// Constants
// ========================
const propertiesData = [
  {
    id: 1,
    title: "Modern Family House",
    location: "Kilimani, Nairobi",
    price: "KSh 25,000,000",
    beds: 4,
    baths: 3,
    type: "House",
    featured: true,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
  },
  {
    id: 2,
    title: "Luxury Apartment",
    location: "Westlands, Nairobi",
    price: "KSh 18,500,000",
    beds: 3,
    baths: 2,
    type: "Apartment",
    featured: true,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
  },
  {
    id: 3,
    title: "Cozy Starter Home",
    location: "Ruiru, Kiambu",
    price: "KSh 9,800,000",
    beds: 2,
    baths: 2,
    type: "House",
    featured: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
  },
  {
    id: 4,
    title: "Elegant Villa",
    location: "Karen, Nairobi",
    price: "KSh 45,000,000",
    beds: 5,
    baths: 5,
    type: "Villa",
    featured: true,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
  },
  {
    id: 5,
    title: "Studio Apartment",
    location: "Thika Road, Nairobi",
    price: "KSh 3,500,000",
    beds: 1,
    baths: 1,
    type: "Studio",
    featured: false,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
  },
  {
    id: 6,
    title: "Penthouse Suite",
    location: "Lavington, Nairobi",
    price: "KSh 32,000,000",
    beds: 4,
    baths: 4,
    type: "Penthouse",
    featured: true,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
  },
];

const COUNTIES = ["All Counties", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu", "Machakos", "Kajiado", "Uasin Gishu", "Rift Valley", "Coast", "Western", "Eastern", "Nyanza", "Central", "North Eastern"];
const AREAS = ["All Areas", "Westlands", "Kilimani", "Karen", "Lavington", "Runda", "Ridgeways", "Thika Road", "Waiyaki Way", "Ngong Road", "Juja", "Ruiru", "Thika", "Kitengela", "Ongata Rongai", "Dagoretti North", "Dagoretti South", "Langata", "Kibra", "Roysambu", "Kasarani", "Ruaraka", "Embakasi North", "Embakasi South", "Embakasi West", "Embakasi East", "Makadara", "Kamukunji", "Starehe", "Mathare"];
const PROPERTY_TYPES = ["All Types", "Bedsitter", "Single Room", "One Bedroom", "Two Bedroom", "Three Bedroom", "Apartment", "Studio", "Mansion", "Villa", "Townhouse", "Bungalow", "Penthouse", "Loft", "Duplex", "Cottage"];
const PRICE_RANGES = ["Any", "Under 10M", "10M - 30M", "30M+"];
const BEDROOM_OPTIONS = ["Any", "1+", "2+", "3+", "4+"];

// ========================
// Helper Functions
// ========================
const parsePriceToNumber = (priceStr) => {
  return parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
};

const matchesPriceRange = (price, range) => {
  const numericPrice = parsePriceToNumber(price);
  if (range === "Under 10M") return numericPrice < 10_000_000;
  if (range === "10M - 30M") return numericPrice >= 10_000_000 && numericPrice <= 30_000_000;
  if (range === "30M+") return numericPrice > 30_000_000;
  return true;
};


const matchesBedroomFilter = (beds, filter) => {
  if (filter === "Any") return true;
  const minBeds = parseInt(filter, 10);
  return beds >= minBeds;
};

// ========================
// Components
// ========================
const PropertyCard = ({ property, onContact, variant = "standard" }) => {
  const imageHeight = variant === "featured" ? "h-56" : "h-48";
  
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className={`${imageHeight} w-full object-cover group-hover:scale-105 transition-transform duration-500`}
        />
        {property.featured && variant === "featured" && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md flex items-center gap-1">
            <FaStar className="text-yellow-300" size={12} />
            Featured
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{property.title}</h3>
          <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-lg text-xs font-medium">
            {property.type}
          </span>
        </div>
        
        <div className="flex items-center text-gray-500 mb-3">
          <FaMapMarkerAlt className="mr-1.5 text-green-600" size={16} />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <FaBed className="text-green-600" size={14} />
            <span className="text-sm">{property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBath className="text-green-600" size={14} />
            <span className="text-sm">{property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}</span>
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-2xl font-bold text-green-600 mb-4">{property.price}</p>
          
          <div className="flex gap-2 mb-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877F2] hover:bg-[#166fe5] text-white p-2.5 rounded-lg transition-all duration-200 hover:scale-105"
              aria-label="Share on Facebook"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${property.title} in ${property.location} for ${property.price}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1DA1F2] hover:bg-[#1a91da] text-white p-2.5 rounded-lg transition-all duration-200 hover:scale-105"
              aria-label="Share on Twitter"
            >
              <FaTwitter size={16} />
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${property.title} - ${property.location} for ${property.price}`);
                alert("Property details copied to clipboard!");
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white p-2.5 rounded-lg transition-all duration-200 hover:scale-105"
              aria-label="Copy property link"
            >
              <FaShareAlt size={16} />
            </button>
          </div>

          <button
            onClick={() => onContact(property)}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
          >
            Contact Agent
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterSelect = ({ label, value, options, onChange }) => (
  <div>
    <label className="font-medium text-gray-700 text-sm">{label}</label>
    <select 
      className="w-full border border-gray-200 p-2.5 rounded-lg mt-1.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const ContactModal = ({ property, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  if (!property) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `Hello, I'm interested in ${property.title} (${property.location} - ${property.price}).%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/254700000000?text=${whatsappMessage}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>

        <div className="text-center mb-5">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaEnvelope className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Contact Agent</h2>
          <p className="text-gray-500 text-sm mt-1">{property.title} - {property.location}</p>
          <p className="text-green-600 font-semibold text-lg mt-1">{property.price}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g., John Doe"
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="e.g., 0712345678"
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Message (Optional)</label>
            <textarea
              placeholder="I would like to schedule a viewing..."
              rows={3}
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={18} />
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

// ========================
// Main Component
// ========================
const HomePage = function() {
  // State
  const [search, setSearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    county: "All Counties",
    area: "All Areas",
    type: "All Types",
    price: "Any",
    bedrooms: "Any"
  });

  // Mobile filters toggle
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter handlers
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      county: "All Counties",
      area: "All Areas",
      type: "All Types",
      price: "Any",
      bedrooms: "Any"
    });
    setSearch("");
  }, []);

  
  // Filtered properties
  const filteredProperties = useMemo(() => {
    return propertiesData.filter(property => {
      const matchesSearch = search === "" || 
        property.title.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase()) ||
        property.type.toLowerCase().includes(search.toLowerCase());
      
      const matchesCounty = filters.county === "All Counties" || 
        property.location.toLowerCase().includes(filters.county.toLowerCase());
      
      const matchesArea = filters.area === "All Areas" || 
        property.location.toLowerCase().includes(filters.area.toLowerCase());
      
      const matchesType = filters.type === "All Types" || 
        property.type.toLowerCase().includes(filters.type.toLowerCase());
      
      const matchesPrice = filters.price === "Any" || 
        matchesPriceRange(property.price, filters.price);
      
      const matchesBedrooms = matchesBedroomFilter(property.beds, filters.bedrooms);
      
      return matchesSearch && matchesCounty && matchesArea && matchesType && matchesPrice && matchesBedrooms;
    });
  }, [search, filters]);

  const featuredProperties = useMemo(() => 
    filteredProperties.filter(p => p.featured), 
    [filteredProperties]
  );
  
  const standardProperties = useMemo(() => 
    filteredProperties.filter(p => !p.featured), 
    [filteredProperties]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-700 via-emerald-700 to-teal-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 py-20 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Find Your Dream <span className="text-yellow-300">Property</span>
          </h1>
          <p className="mb-8 text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
            Search from thousands of homes, apartments, and villas across Kenya. Your perfect home is just a click away.
          </p>

          <div className="max-w-xl mx-auto">
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-green-500 transition">
                {/* Input + Icon */}
                <div className="flex items-center flex-1 px-3">
                  <FaSearch className="text-gray-400 mr-2" size={16} />
                  <input
                    type="text"
                    placeholder="Search anything..."
                    className="w-full py-3 text-sm sm:text-base outline-none text-gray-800"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                {/* Green Button */}
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-3 text-sm sm:text-base font-medium transition whitespace-nowrap"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

                  </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 -mt-1 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="bg-white p-5 rounded-2xl shadow-lg h-fit lg:sticky lg:top-24 border border-gray-100">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden w-full flex items-center justify-between p-3 bg-green-50 rounded-lg mb-4"
            >
              <span className="font-bold text-gray-800 flex items-center gap-2">
                <FaFilter className="text-green-600" size={16} />
                Filters
              </span>
              {showMobileFilters ? (
                <FaChevronUp className="text-green-600" />
              ) : (
                <FaChevronDown className="text-green-600" />
              )}
            </button>

            {/* Desktop Header & Clear All */}
            <div className="hidden lg:flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <FaFilter className="text-green-600" size={16} />
                Filters
              </h3>
              <button 
                onClick={clearAllFilters}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Clear All
              </button>
            </div>

            {/* Filter Options - Collapsible on mobile */}
            <div className={`space-y-4 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
              <FilterSelect
                label="County"
                value={filters.county}
                options={COUNTIES}
                onChange={(v) => updateFilter("county", v)}
              />
              
              <FilterSelect
                label="Constituency/Area"
                value={filters.area}
                options={AREAS}
                onChange={(v) => updateFilter("area", v)}
              />
              
              <FilterSelect
                label="Property Type"
                value={filters.type}
                options={PROPERTY_TYPES}
                onChange={(v) => updateFilter("type", v)}
              />
              
              <FilterSelect
                label="Price Range"
                value={filters.price}
                options={PRICE_RANGES}
                onChange={(v) => updateFilter("price", v)}
              />

              <FilterSelect
                label="Bedrooms"
                value={filters.bedrooms}
                options={BEDROOM_OPTIONS}
                onChange={(v) => updateFilter("bedrooms", v)}
              />
            </div>
          </aside>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {/* Featured Properties */}
            {featuredProperties.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  Featured Properties
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onContact={setSelectedProperty}
                      variant="featured"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All/Standard Properties */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                All Properties
                {filteredProperties.length > 0 && (
                  <span className="text-base font-normal text-gray-500 ml-3">
                    ({filteredProperties.length} properties)
                  </span>
                )}
              </h2>
              
              {filteredProperties.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaSearch className="text-gray-400 text-2xl" />
                  </div>
                  <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
                  <button 
                    onClick={clearAllFilters}
                    className="mt-4 text-green-600 hover:text-green-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {standardProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onContact={setSelectedProperty}
                      variant="standard"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      
      {/* Contact Modal */}
      <ContactModal 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />

      {/* Add custom animation styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
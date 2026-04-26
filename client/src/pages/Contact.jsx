import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaEnvelope, FaWhatsapp, FaFacebook, FaPaperPlane, FaCheckCircle, FaClock, FaBuilding, FaQuestionCircle, FaMapMarkerAlt } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    subject: 'Property Inquiry'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.email.trim()) return 'Please enter your email'
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email address'
    if (!formData.message.trim()) return 'Please enter your message'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationError = validateForm()
    if (validationError) {
      setSubmitStatus({ type: 'error', message: validationError })
      setTimeout(() => setSubmitStatus({ type: '', message: '' }), 5000)
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you! We\'ll get back to you within 24 hours.' 
      })
      
      setFormData({
        email: '',
        message: '',
        subject: 'Property Inquiry'
      })
      
      formRef.current?.reset()
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Something went wrong. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus({ type: '', message: '' }), 5000)
    }
  }

  const contactMethods = [
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      details: 'Online Platform - Serving All Kenya',
      action: null
    },
    {
      icon: FaPhone,
      title: 'Phone',
      details: '+254 712 345 678',
      action: 'tel:+254712345678'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: 'info@hompata.com',
      action: 'mailto:info@hompata.com'
    },
    {
      icon: FaFacebook,
      title: 'Facebook',
      details: 'Connect with us on Facebook',
      action: 'https://facebook.com/hompata'
    }
  ]

  const faqs = [
    {
      question: 'How do I list my property on Hompata?',
      answer: 'You can list your property by creating an account, clicking on "Post Property" and filling in the required details about your property. Our team will review and approve it within 24 hours.'
    },
    {
      question: 'What are the fees for listing properties?',
      answer: 'We offer both free and premium listing options. Basic listings are completely free, while premium listings start from KES 500/month for enhanced visibility and featured placement.'
    },
    {
      question: 'How do I verify a property listing?',
      answer: 'Our team manually verifies all property listings through document verification and site visits when possible. Look for the "Verified" badge on property listings for guaranteed authenticity.'
    },
    {
      question: 'Can I schedule property viewings online?',
      answer: 'Yes! You can schedule viewings directly through our platform. Simply click "Request Viewing" on any property page and choose your preferred date and time.'
    },
    {
      question: 'Is Hompata available outside Kenya?',
      answer: 'Currently, Hompata focuses exclusively on the Kenyan real estate market. We\'re planning to expand to other East African countries soon!'
    },
    {
      question: 'How do I report an issue with a listing?',
      answer: 'Use the "Report" button on any property listing or contact our support team directly via email or WhatsApp. We take all reports seriously and investigate promptly.'
    }
  ]

  const quickLinks = [
    { text: 'Browse Properties', to: '/buy', color: 'green' },
    { text: 'Properties for Sale', to: '/buy', color: 'blue' },
    { text: 'Properties for Rent', to: '/rent', color: 'blue' },
    { text: 'List Your Property', to: '/list-property', color: 'purple' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-700 via-emerald-700 to-teal-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white rounded-full opacity-50" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 py-16 md:py-20 lg:py-24">
          <div className="inline-flex items-center gap-2 bg-green-600 rounded-full px-4 py-2 mb-6">
            <FaQuestionCircle className="text-yellow-300" />
            <span className="text-sm font-medium">We're Here to Help</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Get In <span className="text-yellow-300 relative inline-block">
              Touch
              <svg className="absolute bottom-2 left-0 w-full h-3 -z-10" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0 5 Q50 10 100 5 Q150 0 200 5" stroke="#FBBF24" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="mb-8 text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
            We're here to help! Whether you have questions, feedback, or need assistance with properties, 
            our team is available 24/7 to assist you.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#contact-form" className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">
              Send Message
            </a>
            <a href="#faq" className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Read FAQs
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Form Card */}
          <div
            id="contact-form"
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Send us a Message
              </h2>
              <p className="text-gray-500 text-sm">
                Fill out the form below and we'll respond within 24 hours.
              </p>
            </div>

            {/* Status */}
            {submitStatus?.message && (
              <div className={`mb-5 p-4 rounded-lg flex items-start gap-3 ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 border-l-4 border-green-500 text-green-700'
                  : 'bg-red-50 border-l-4 border-red-500 text-red-700'
              }`}>
                <FaCheckCircle className="mt-0.5 flex-shrink-0" />
                <p className="text-sm">{submitStatus.message}</p>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300
                             focus:ring-2 focus:ring-green-500 focus:border-transparent
                             outline-none transition placeholder:text-gray-400"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="How can we help you?"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300
                             focus:ring-2 focus:ring-green-500 focus:border-transparent
                             outline-none resize-none transition placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600
                           hover:from-green-700 hover:to-emerald-700
                           text-white font-semibold py-3.5 rounded-lg
                           transition shadow-md flex items-center justify-center gap-2
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                We respect your privacy and will never share your information.
              </p>
            </form>
          </div>

          {/* Info Card */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Get in Touch
              </h3>
              <p className="text-gray-500 text-sm">
                Choose the best way to reach us.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-2 flex-1">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                
                if (method.action) {
                  return (
                    <a
                      key={index}
                      href={method.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-white hover:shadow-md transition cursor-pointer"
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 shrink-0">
                        <Icon className="text-green-600 text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{method.title}</p>
                        <p className="text-gray-500 text-sm truncate">{method.details}</p>
                      </div>
                      <span className="text-gray-400">→</span>
                    </a>
                  )
                }
                
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 shrink-0">
                      <Icon className="text-green-600 text-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{method.title}</p>
                      <p className="text-gray-500 text-sm truncate">{method.details}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/254712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 bg-green-500 hover:bg-green-600
                         text-white font-semibold py-4 rounded-xl
                         flex items-center justify-center gap-3
                         transition shadow-md"
            >
              <FaWhatsapp size={20} />
              <span>Chat on WhatsApp</span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs">Fastest</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-gray-50 py-16 md:py-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Can't find what you're looking for? Check out our most commonly asked questions below.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition">
                      <span className="text-green-600 font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-green-600 transition">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600">Still have questions?</p>
            <a href="#contact-form" className="inline-block mt-2 text-green-600 font-semibold hover:text-green-700 underline">
              Contact our support team →
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Home?</h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Start exploring thousands of properties or list your own today. Your dream property is just a click away.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              to="/buy" 
              className="bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Browse Properties
            </Link>
            <Link 
              to="/list-property" 
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-green-600 transition-all transform hover:scale-105"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  )
}

export default Contact
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Users, ShieldCheck, TrendingUp, ArrowRight, Home as HomeIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'react-toastify';
import './Home.css';

export const Home = () => {
  const isAuthenticated = !!localStorage.getItem('userToken');
  const [expandedCard, setExpandedCard] = useState(null);

  const handleViewPrograms = () => {
    if (!isAuthenticated) {
      toast.error("Unable to access programs. Please login first.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } else {
      window.location.href = '/programs';
    }
  };

  const toggleExpand = (idx) => {
    setExpandedCard(expandedCard === idx ? null : idx);
  };

  const verticals = [
    { 
      title: "Beneficiary Led Construction", 
      desc: "Provides financial assistance to individual families to construct new houses on their own land.",
      moreInfo: "Eligible families receive technical support and phased fund releases based on construction milestones to ensure quality housing standards."
    },
    { 
      title: "Affordable Housing in Partnership", 
      desc: "Central assistance for owning a house in partnership with public and private agencies.",
      moreInfo: "This vertical encourages private sector participation through incentives, ensuring urban poor have access to modern residential amenities."
    },
    { 
      title: "Affordable Rental Housing", 
      desc: "Constructing rental housing for urban poor and industrial workers to ensure mobility.",
      moreInfo: "Focuses on providing dignified living spaces near workplaces for migrants and industrial labor, reducing slum proliferation."
    },
    { 
      title: "Interest Subsidy Scheme", 
      desc: "Subsidy provided on home loans sanctioned for eligible low-income groups.",
      moreInfo: "Up to 6.5% interest subvention is provided on home loans, significantly reducing the EMI burden for first-time home buyers."
    }
  ];

  return (
    <div className="container-fluid p-0">
      <div className="container py-5">
        <section className="row align-items-center min-vh-75">
          <div className="col-lg-7 text-start">
            <span className="badge bg-light text-primary border px-3 py-2 rounded-pill mb-3">Official Government Portal</span>
            <h1 className="display-4 fw-bold mb-4">National Financial <br /><span className="text-primary">Economic Governance</span></h1>
            <p className="lead text-muted mb-5">FinanceGov is a web-based platform designed for finance ministries and regulatory agencies to manage national financial regulation, economic programs, and compliance[cite: 3].</p>
            <div className="d-flex gap-3">
              <button className="btn btn-primary btn-lg px-4" onClick={handleViewPrograms}>View Programs <ArrowRight size={20} className="ms-2" /></button>
            </div>
          </div>

          <div className="col-lg-5">
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
              className="stat-card p-4 bg-white rounded-4 border-start border-warning border-5 mb-4 shadow-sm"
            >
              <h2 className="fw-bold text-dark">250k+</h2>
              <p className="text-muted mb-0">Concurrent Users Supported [cite: 118]</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
              className="stat-card p-4 bg-white rounded-4 border-start border-warning border-5 shadow-sm"
            >
              <h2 className="fw-bold text-dark">99.9%</h2>
              <p className="text-muted mb-0">System Uptime Guarantee [cite: 120]</p>
            </motion.div>
          </div>
        </section>
      </div>

      <section className="bg-white border-top border-bottom py-5">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-md-4 text-center">
              <div className="program-main-img shadow-sm p-3 rounded-4 bg-light">
                <HomeIcon size={120} color="#1e4d8b" strokeWidth={1} />
                <h4 className="mt-3 text-primary fw-bold">FinanceGov Housing</h4>
              </div>
            </div>
            <div className="col-md-8">
              <h2 className="fw-bold">National Housing Subsidy - Urban 2.0</h2>
              <p className="text-muted">
                This initiative aims to provide financial assistance to 1 crore urban families to construct, purchase, or rent a house at an affordable cost in cities. 
                The system supports workflows for financial program management and subsidy distribution[cite: 5]. 
                It ensures transparency across financial governance by maintaining audit trails and performance metrics[cite: 6].
              </p>
              <p className="text-muted">
                The program ensures equity by addressing the housing requirements of widows, single women, persons with disabilities, and senior citizens. 
                Central assistance of up to ₹2.50 lakh is provided under the scheme to eligible beneficiaries.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {verticals.map((item, idx) => (
              <div className="col-lg-3 col-md-6" key={idx}>
                <div className="card h-100 border-0 shadow-sm p-3">
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold text-primary mb-3 text-center">{item.title}</h5>
                    <p className="small text-muted mb-3">{item.desc}</p>
                    
                    <AnimatePresence>
                      {expandedCard === idx && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mb-3"
                        >
                          <p className="small text-dark border-top pt-2">{item.moreInfo}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button 
                      className="btn btn-warning btn-sm mt-auto px-4 text-white fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2"
                      onClick={() => toggleExpand(idx)}
                    >
                      {expandedCard === idx ? "Show Less" : "Read More..."}
                      {expandedCard === idx ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
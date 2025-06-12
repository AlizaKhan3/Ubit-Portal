import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">UBIT Portal</h3>
            <p className="text-gray-400 mb-4">
              Department of Computer Science
              <br />
              University of Karachi
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/semesters" className="text-gray-400 hover:text-white transition-colors">Semesters</Link></li>
              <li><Link to="/faculty" className="text-gray-400 hover:text-white transition-colors">Faculty</Link></li>
              <li><Link to="/announcements" className="text-gray-400 hover:text-white transition-colors">Announcements</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources" className="text-gray-400 hover:text-white transition-colors">Course Materials</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">University Library</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Research Portal</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Student Services</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic text-gray-400">
              Main Campus Road,<br />
              University of Karachi,<br />
              Karachi - 75270<br />
              <a href="mailto:info@ubit.edu" className="hover:text-white transition-colors">info@ubit.edu</a><br />
              <a href="tel:+922199261300" className="hover:text-white transition-colors">+92-21-99261300</a>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Department of Computer Science (UBIT). All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
          Made by Aliza Khan & Isha Hasham
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
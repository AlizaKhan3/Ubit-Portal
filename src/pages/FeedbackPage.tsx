import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

type FeedbackType = 'general' | 'course' | 'facility' | 'teacher';

interface FeedbackForm {
  name: string;
  email: string;
  type: FeedbackType;
  message: string;
  anonymous: boolean;
}


const FeedbackPage: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackForm>({
    name: '',
    email: '',
    type: 'general',
    message: '',
    anonymous: false
  });


  const [errors, setErrors] = useState<Partial<FeedbackForm>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FeedbackForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FeedbackForm> = {};

    if (!formData.anonymous) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const { name, email, type, message, anonymous } = formData;

      try {
        const response = await fetch('http://localhost:3001/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, type, message, anonymous }),
        });

        if (response.ok) {
          await Swal.fire({
            title: 'Success!',
            text: 'Feedback submitted successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          setFormData({
            name: '',
            email: '',
            type: 'general',
            message: '',
            anonymous: false,
          });
          setSubmitted(true);

        } else {
          console.error('Error:', await response.text());
          Swal.fire({
            title: 'Error!',
            text: 'Submission failed. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        console.error('Fetch failed:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Network error. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };


  if (submitted) {
    return (
      <div className="pt-24 pb-12 flex items-center justify-center">
        <Card className="max-w-lg w-full">
          <CardContent className="text-center py-12">
            <CheckCircle size={64} className="mx-auto text-success mb-4" />
            <h2 className="text-2xl font-bold mb-2">Feedback Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your valuable feedback. We appreciate your input and will use it to improve our services.
            </p>
            <Button
              variant="primary"
              onClick={() => setSubmitted(false)}
            >
              Submit Another Feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Student Feedback</h1>
        <p className="text-gray-600">
          We value your feedback! Please share your thoughts, suggestions, or concerns with us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Anonymous Option */}
                <div className="mb-6">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="anonymous"
                      checked={formData.anonymous}
                      onChange={handleCheckboxChange}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="ml-2">Submit anonymously</span>
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    If checked, you don't need to provide personal information.
                  </p>
                </div>

                {/* Personal Information (hidden if anonymous) */}
                {!formData.anonymous && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'border-error' : ''}`}
                      />
                      {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'border-error' : ''}`}
                      />
                      {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
                    </div>

                  </div>
                )}

                {/* Feedback Type */}
                <div className="mb-6">
                  <label htmlFor="type" className="form-label">
                    Feedback Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="general">General Feedback</option>
                    <option value="course">Course Related</option>
                    <option value="teacher">Teacher Related</option>
                    <option value="facility">Facilities & Services</option>
                  </select>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label htmlFor="message" className="form-label">
                    Your Feedback
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`form-input ${errors.message ? 'border-error' : ''}`}
                    placeholder="Please provide detailed information..."
                  />
                  {errors.message && <p className="text-error text-sm mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  icon={<Send size={16} />}
                >
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="bg-primary-light/5 border border-primary-light/20">
            <CardContent>
              <h3 className="text-xl font-bold mb-4">Why Your Feedback Matters</h3>
              <p className="text-gray-700 mb-6">
                Your feedback helps us improve our academic programs, facilities, and services to provide a better learning experience for all students.
              </p>

              <h4 className="font-bold mb-2">Guidelines:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                <li>Be specific and provide examples when possible</li>
                <li>Focus on facts rather than personal attacks</li>
                <li>Suggest constructive improvements</li>
                <li>Include both positive aspects and areas for improvement</li>
              </ul>

              <div className="bg-white p-4 rounded-md border border-gray-200">
                <h4 className="font-bold mb-2">Need Immediate Assistance?</h4>
                <p className="text-gray-700 mb-3">
                  For urgent matters, please contact:
                </p>
                <p className="mb-1">
                  <strong>Email:</strong> <a href="mailto:support@ubit.edu" className="text-primary hover:underline">support@ubit.edu</a>
                </p>
                <p>
                  <strong>Phone:</strong> <a href="tel:+922199261300" className="text-primary hover:underline">+92-21-99261300</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Layout from '../components/Layout';

// Validation schema
const schema = yup.object({
  name: yup.string().required('School name is required').min(2, 'Name must be at least 2 characters'),
  address: yup.string().required('Address is required').min(10, 'Address must be at least 10 characters'),
  city: yup.string().required('City is required').min(2, 'City must be at least 2 characters'),
  state: yup.string().required('State is required').min(2, 'State must be at least 2 characters'),
  contact: yup.string()
    .required('Contact number is required')
    .matches(/^\d{10}$/, 'Contact number must be exactly 10 digits'),
  email_id: yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  image: yup.mixed()
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value || value.length === 0) return true; // Optional file
      return value[0]?.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value || value.length === 0) return true; // Optional file
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(value[0]?.type);
    })
});

export default function AddSchool() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(schema)
  });

  // Watch image field for preview
  const watchImage = watch('image');

  // Handle image preview
  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [watchImage]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'image' && data[key].length > 0) {
          formData.append(key, data[key][0]);
        } else if (key !== 'image') {
          formData.append(key, data[key]);
        }
      });

      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('School added successfully! 🎉');
        reset();
        setImagePreview(null);
      } else {
        setSubmitMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setSubmitMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
          <h2 style={{ 
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#1a202c',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #c026d3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em'
          }}>
            Add New School
          </h2>
          <p style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#52525b', 
            fontSize: '1.1rem',
            fontWeight: '500',
            letterSpacing: '0.2px'
          }}>
            Fill in the details to register a new educational institution
          </p>
        </div>

        {submitMessage && (
          <div className={submitMessage.includes('successfully') ? 'success-message' : 'error-message'}>
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name" className="form-label" style={{ 
              fontWeight: '600', 
              color: '#374151',
              fontSize: '0.95rem'
            }}>
              🏫 School Name *
            </label>
            <input
              type="text"
              id="name"
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="e.g., Delhi Public School"
              {...register('name')}
            />
            {errors.name && <div className="error-message">{errors.name.message}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label" style={{ 
              fontWeight: '600', 
              color: '#374151',
              fontSize: '0.95rem'
            }}>
              🏠 Address *
            </label>
            <textarea
              id="address"
              className={`form-input form-textarea ${errors.address ? 'error' : ''}`}
              placeholder="Enter complete address with locality and landmarks"
              {...register('address')}
              style={{ minHeight: '120px' }}
            />
            {errors.address && <div className="error-message">{errors.address.message}</div>}
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '1.5rem',
            marginBottom: '1rem'
          }}>
            <div className="form-group">
              <label htmlFor="city" className="form-label" style={{ 
                fontWeight: '600', 
                color: '#374151',
                fontSize: '0.95rem'
              }}>
                🏙️ City *
              </label>
              <input
                type="text"
                id="city"
                className={`form-input ${errors.city ? 'error' : ''}`}
                placeholder="e.g., Mumbai, Delhi"
                {...register('city')}
              />
              {errors.city && <div className="error-message">{errors.city.message}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="state" className="form-label" style={{ 
                fontWeight: '600', 
                color: '#374151',
                fontSize: '0.95rem'
              }}>
                🗺️ State *
              </label>
              <input
                type="text"
                id="state"
                className={`form-input ${errors.state ? 'error' : ''}`}
                placeholder="e.g., Maharashtra, Delhi"
                {...register('state')}
              />
              {errors.state && <div className="error-message">{errors.state.message}</div>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contact" className="form-label" style={{ 
              fontWeight: '600', 
              color: '#374151',
              fontSize: '0.95rem'
            }}>
              📞 Contact Number *
            </label>
            <input
              type="tel"
              id="contact"
              className={`form-input ${errors.contact ? 'error' : ''}`}
              placeholder="9876543210"
              {...register('contact')}
            />
            {errors.contact && <div className="error-message">{errors.contact.message}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email_id" className="form-label" style={{ 
              fontWeight: '600', 
              color: '#374151',
              fontSize: '0.95rem'
            }}>
              ✉️ Email Address *
            </label>
            <input
              type="email"
              id="email_id"
              className={`form-input ${errors.email_id ? 'error' : ''}`}
              placeholder="admin@school.edu.in"
              {...register('email_id')}
            />
            {errors.email_id && <div className="error-message">{errors.email_id.message}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label" style={{ 
              fontWeight: '600', 
              color: '#374151',
              fontSize: '0.95rem'
            }}>
              📸 School Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className={`form-input ${errors.image ? 'error' : ''}`}
              {...register('image')}
              style={{ 
                paddingTop: '0.8rem',
                paddingBottom: '0.8rem'
              }}
            />
            {errors.image && <div className="error-message">{errors.image.message}</div>}
            
            {imagePreview && (
              <div style={{ 
                marginTop: '1.5rem', 
                textAlign: 'center',
                padding: '1rem',
                background: 'rgba(248, 250, 252, 0.8)',
                borderRadius: '12px',
                border: '1px solid rgba(226, 232, 240, 0.6)'
              }}>
                <p style={{ 
                  color: '#64748b', 
                  fontSize: '0.9rem', 
                  marginBottom: '1rem',
                  fontWeight: '500'
                }}>
                  Image Preview:
                </p>
                <img
                  src={imagePreview}
                  alt="School preview"
                  style={{
                    maxWidth: '250px',
                    maxHeight: '200px',
                    borderRadius: '12px',
                    border: '3px solid rgba(102, 126, 234, 0.2)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{ 
              width: '100%', 
              marginTop: '2rem',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '700',
              borderRadius: '15px',
              boxShadow: isSubmitting ? 'none' : '0 8px 25px rgba(102, 126, 234, 0.3)'
            }}
          >
            {isSubmitting ? '⏳ Adding School...' : '🎓 Add School'}
          </button>
        </form>
      </div>
    </Layout>
  );
}
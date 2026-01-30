/**
 * Chancity Sports Club - Registration Form Handler
 * Handles form submission to backend API
 */

class RegistrationHandler {
    constructor() {
        // API Configuration - Update this with your actual API URL
        this.API_URL = localStorage.getItem('chancity_api_url') || 'http://localhost:5000/api/register';

        this.form = document.getElementById('tournamentRegistration');
        this.submitBtn = this.form?.querySelector('button[type="submit"]');
        this.originalBtnText = this.submitBtn?.innerHTML || 'Submit Registration';

        this.init();
    }

    init() {
        if (!this.form) {
            console.warn('Registration form not found');
            return;
        }

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Add real-time validation
        this.addFieldValidation();

        console.log('Registration handler initialized');
    }

    addFieldValidation() {
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');

        if (emailField) {
            emailField.addEventListener('blur', () => this.validateEmail(emailField));
        }

        if (phoneField) {
            phoneField.addEventListener('blur', () => this.validatePhone(phoneField));
        }
    }

    validateEmail(field) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (field.value && !pattern.test(field.value)) {
            field.classList.add('error');
            this.showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        field.classList.remove('error');
        this.clearFieldError(field);
        return true;
    }

    validatePhone(field) {
        const cleaned = field.value.replace(/[\s\-\(\)\+]/g, '');
        if (field.value && cleaned.length < 10) {
            field.classList.add('error');
            this.showFieldError(field, 'Phone number must be at least 10 digits');
            return false;
        }
        field.classList.remove('error');
        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        let errorEl = field.parentElement.querySelector('.field-error');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'field-error';
            errorEl.style.cssText = 'color: #c9302c; font-size: 0.85rem; margin-top: 5px; display: block;';
            field.parentElement.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }

    clearFieldError(field) {
        const errorEl = field.parentElement.querySelector('.field-error');
        if (errorEl) {
            errorEl.remove();
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        // Collect form data
        const formData = this.collectFormData();

        // Show loading state
        this.setLoading(true);

        try {
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                this.showSuccess(result);
            } else {
                this.showError(result.errors || [result.error || 'Registration failed']);
            }

        } catch (error) {
            console.error('Registration error:', error);

            // Check if it's a network error (backend not available)
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                this.simulateSuccess(formData);
            } else {
                this.showError(['Unable to connect to server. Please try again later.']);
            }
        } finally {
            this.setLoading(false);
        }
    }

    collectFormData() {
        return {
            teamName: document.getElementById('teamName')?.value || '',
            category: document.getElementById('category')?.value || '',
            teamSize: document.getElementById('teamSize')?.value || '',
            contactName: document.getElementById('contactName')?.value || '',
            designation: document.getElementById('designation')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            altPhone: document.getElementById('altPhone')?.value || '',
            players: document.getElementById('players')?.value || '',
            terms: document.getElementById('terms')?.checked || false,
            newsletter: document.getElementById('newsletter')?.checked || false
        };
    }

    setLoading(isLoading) {
        if (!this.submitBtn) return;

        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            this.submitBtn.style.opacity = '0.7';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = this.originalBtnText;
            this.submitBtn.style.opacity = '1';
        }
    }

    showSuccess(result) {
        // Create success modal
        const modal = document.createElement('div');
        modal.className = 'registration-modal';
        modal.innerHTML = `
            <div class="modal-content success">
                <div class="modal-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Registration Successful! 🏆</h2>
                <p>Your team has been registered for the Chancity Open Kabaddi Tournament.</p>
                <div class="registration-id">
                    <strong>Registration ID:</strong>
                    <code>${result.registration_id ? result.registration_id.substring(0, 8).toUpperCase() : 'PENDING'}</code>
                </div>
                <p class="email-notice">
                    ${result.email_sent ? 'A confirmation email has been sent to your email address.' : 'You will receive a confirmation email shortly.'}
                </p>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="window.location.href='tournaments.html'">
                        View Tournament Details
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.registration-modal').remove()">
                        Close
                    </button>
                </div>
            </div>
        `;

        // Add modal styles
        this.addModalStyles();

        document.body.appendChild(modal);

        // Reset form
        this.form.reset();
    }

    simulateSuccess(formData) {
        // Simulate success for demo/development when backend is not available
        const mockId = 'DEMO-' + Math.random().toString(36).substring(2, 8).toUpperCase();

        const modal = document.createElement('div');
        modal.className = 'registration-modal';
        modal.innerHTML = `
            <div class="modal-content success">
                <div class="modal-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Demo Registration Received! 🏆</h2>
                <p><strong>${formData.teamName}</strong> has been registered.</p>
                <div class="registration-id">
                    <strong>Demo ID:</strong>
                    <code>${mockId}</code>
                </div>
                <p class="email-notice" style="color: #DAA520;">
                    <i class="fas fa-info-circle"></i> Backend not connected. In production, data will be saved to AWS.
                </p>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="this.closest('.registration-modal').remove()">
                        Got It!
                    </button>
                </div>
            </div>
        `;

        this.addModalStyles();
        document.body.appendChild(modal);
        this.form.reset();
    }

    showError(errors) {
        const modal = document.createElement('div');
        modal.className = 'registration-modal';
        modal.innerHTML = `
            <div class="modal-content error">
                <div class="modal-icon error">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <h2>Registration Failed</h2>
                <p>Please fix the following errors:</p>
                <ul class="error-list">
                    ${errors.map(e => `<li>${e}</li>`).join('')}
                </ul>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="this.closest('.registration-modal').remove()">
                        Try Again
                    </button>
                </div>
            </div>
        `;

        this.addModalStyles();
        document.body.appendChild(modal);
    }

    addModalStyles() {
        if (document.getElementById('registration-modal-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'registration-modal-styles';
        styles.textContent = `
            .registration-modal {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .registration-modal .modal-content {
                background: white;
                padding: 40px;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                animation: slideUp 0.4s ease;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            
            .registration-modal .modal-icon {
                font-size: 60px;
                color: #28a745;
                margin-bottom: 20px;
            }
            
            .registration-modal .modal-icon.error {
                color: #c9302c;
            }
            
            .registration-modal h2 {
                color: #302626;
                margin-bottom: 15px;
            }
            
            .registration-modal .registration-id {
                background: #f5f5f5;
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
            }
            
            .registration-modal .registration-id code {
                font-size: 1.2rem;
                color: #DAA520;
                font-weight: bold;
            }
            
            .registration-modal .error-list {
                text-align: left;
                color: #c9302c;
                margin: 15px 0;
                padding-left: 20px;
            }
            
            .registration-modal .modal-actions {
                margin-top: 25px;
                display: flex;
                gap: 15px;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .registration-modal .btn-secondary {
                background: transparent;
                border: 2px solid #302626;
                color: #302626;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { 
                    opacity: 0;
                    transform: translateY(30px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new RegistrationHandler();
});

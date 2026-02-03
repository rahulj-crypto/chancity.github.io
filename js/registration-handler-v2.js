/**
 * Tournament Registration Form Handler
 * Handles form submission to backend API
 */

class RegistrationHandler {
    constructor() {
        this.form = document.getElementById('tournamentRegistration');
        this.submitBtn = document.getElementById('submitBtn');
        this.submitMessage = document.getElementById('submitMessage');
        this.originalBtnText = this.submitBtn?.innerHTML || '<i class="fas fa-paper-plane"></i> Submit Registration';
        this.init();
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        // Check registration status on page load
        this.checkRegistrationStatus();
    }

    async checkRegistrationStatus() {
        try {
            // Add timestamp to prevent caching
            const response = await fetch('https://chancity-backend.onrender.com/api/admin/settings/public/registration-status?t=' + Date.now());
            if (response.ok) {
                const data = await response.json();
                if (!data.registration_open) {
                    this.showRegistrationClosed();
                }
            }
        } catch (err) {
            console.warn('Could not check registration status:', err.message);
            // If we can't check, assume open (graceful degradation)
        }
    }

    showRegistrationClosed() {
        // Hide the form
        if (this.form) {
            this.form.style.display = 'none';
        }

        // Create closed message
        const closedMessage = document.createElement('div');
        closedMessage.id = 'registration-closed-message';
        closedMessage.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                border: 2px solid #e74c3c;
                border-radius: 20px;
                padding: 60px 40px;
                text-align: center;
                max-width: 600px;
                margin: 40px auto;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 30px;
                ">
                    <i class="fas fa-lock" style="font-size: 2rem; color: white;"></i>
                </div>
                <h2 style="
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 2.5rem;
                    color: #e74c3c;
                    margin-bottom: 20px;
                    letter-spacing: 3px;
                ">REGISTRATIONS CLOSED</h2>
                <p style="
                    font-family: 'Poppins', sans-serif;
                    color: #cbd5e1;
                    font-size: 1.1rem;
                    line-height: 1.8;
                    margin-bottom: 30px;
                ">
                    Thank you for your interest in the Chancity Open Kabaddi Tournament!
                    <br><br>
                    Registrations are currently closed. Please check back later or follow our social media for updates on the next tournament.
                </p>
                <a href="contact.html" style="
                    display: inline-block;
                    background: linear-gradient(135deg, #f5a623, #f7b844);
                    color: #1a1a2e;
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 1.2rem;
                    letter-spacing: 2px;
                    padding: 15px 40px;
                    border-radius: 50px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                ">
                    <i class="fas fa-envelope" style="margin-right: 10px;"></i>
                    CONTACT US
                </a>
            </div>
        `;

        // Insert after the form's parent (registration section)
        const formParent = this.form.parentElement;
        if (formParent) {
            formParent.insertBefore(closedMessage, this.form);
        }
    }


    async handleSubmit(event) {
        event.preventDefault();

        // Collect form data
        const data = {
            team_name: (document.getElementById('teamName')?.value || '').trim(),
            category: (document.getElementById('category')?.value || '').trim(),
            team_size: parseInt(document.getElementById('teamSize')?.value || '0'),
            contact_name: (document.getElementById('contactName')?.value || '').trim(),
            designation: (document.getElementById('designation')?.value || '').trim(),
            email: (document.getElementById('email')?.value || '').trim(),
            phone: (document.getElementById('phone')?.value || '').trim(),
            alt_phone: (document.getElementById('altPhone')?.value || '').trim(),
            players: (document.getElementById('players')?.value || '').trim(),
            terms_accepted: document.getElementById('terms')?.checked || false,
            newsletter_subscribed: document.getElementById('newsletter')?.checked || false
        };

        this.setLoading(true);

        try {
            const response = await fetch('https://chancity-backend.onrender.com/api/v1/registrations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    errorData = { detail: response.statusText || 'Unknown error' };
                }

                if (errorData.detail && Array.isArray(errorData.detail)) {
                    const errorMessages = errorData.detail.map(err => {
                        const field = err.loc[err.loc.length - 1];
                        const msg = err.msg;
                        const fieldName = field.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
                        return `${fieldName}: ${msg}`;
                    });
                    this.showError(errorMessages);
                } else {
                    this.showError([errorData.detail || 'Registration failed']);
                }
                return;
            }

            const result = await response.json();
            this.showSuccess(result);

        } catch (error) {
            this.showError(['Network error. Please check your connection and try again.']);
        } finally {
            this.setLoading(false);
        }
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

    showSuccess(response) {
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
                    <code>${response.registration_id ? response.registration_id.substring(0, 8).toUpperCase() : 'PENDING'}</code>
                </div>
                <p class="success-notice">
                    <i class="fas fa-info-circle"></i> ${response.message || 'Registration submitted successfully'}
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
                    ${Array.isArray(errors) ? errors.map(e => `<li>${e}</li>`).join('') : `<li>${errors}</li>`}
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
            .registration-modal .success-notice {
                color: #666;
                font-size: 0.95rem;
                margin: 10px 0;
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
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Initialize when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        if (document.getElementById('tournamentRegistration')) {
            new RegistrationHandler();
        }
    }, 100);
});

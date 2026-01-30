// ============================================================================
// ERROR HANDLING & USER NOTIFICATIONS
// Added 2026-01-30 for improved user experience
// ============================================================================

/**
 * Show user-facing error message with toast notification
 * @param {string} message - Error message to display
 * @param {number} duration - How long to show message (ms)
 */
function showUserError(message, duration = 5000) {
    // Remove any existing error toasts
    const existingToast = document.querySelector('.error-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');

    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
        zIndex: '10000',
        maxWidth: '400px',
        animation: 'slideInRight 0.3s ease',
        fontFamily: 'Inter, sans-serif'
    });

    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="margin-left: auto; background: none; border: none; color: white; cursor: pointer; font-size: 1.5rem; line-height: 1; padding: 0;"
                    aria-label="Close notification">
                ×
            </button>
        </div>
    `;

    document.body.appendChild(toast);

    // Auto-remove after duration
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);
}

/**
 * Show success message with toast notification
 * @param {string} message - Success message to display
 * @param {number} duration - How long to show message (ms)
 */
function showSuccess(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#28a745',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        fontFamily: 'Inter, sans-serif'
    });

    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);
}

/**
 * Handle Facebook "Coming Soon" notification
 */
function showFbComingSoon() {
    showUserError('Facebook page coming soon! Follow us on Instagram and YouTube in the meantime.', 4000);
}

// Global error handler - catch unhandled errors
window.addEventListener('error', function (event) {
    console.error('Global error:', event.error);

    // Don't show technical errors to users, just log them
    // In production, you'd send this to a logging service

    // Only show user-friendly messages for specific cases
    if (event.message && event.message.includes('Failed to fetch')) {
        showUserError('Unable to connect. Please check your internet connection.');
    }

    // Prevent default browser error UI
    event.preventDefault();
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function (event) {
    console.error('Unhandled promise rejection:', event.reason);

    // Log but don't necessarily show to user unless it's critical

    event.preventDefault();
});

// Add CSS animations for toasts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

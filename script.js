// 1. Scroll Reveal Animations
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on initial load

// 2. FAQ Accordion Logic
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const button = item.querySelector('.faq-question');
    if(button) {
        button.addEventListener('click', () => {
            // Close all other open items for a clean look
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle the clicked item
            item.classList.toggle('active');
        });
    }
});

// 3. Detailed Booking Form Background Submission with Success Pop-up
const detailedForm = document.getElementById('detailed-booking-form');

if (detailedForm) {
    detailedForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents the standard Formspree redirect/captcha screen
        
        const form = event.target;
        const data = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Temporarily change button text to show it's working
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = "Sending Proposal Request...";
        
        // Send the data silently via Formspree
        fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Success pop-up message
                alert("Proposal Requested Successfully! We look forward to designing your epic moment.");
                
                // Clear the form 
                form.reset(); 
                
                // Redirect back to the home page
                window.location.href = "index.html"; 
            } else {
                alert("Oops! There was a problem submitting your form. Please try again or contact us on WhatsApp.");
                submitButton.innerHTML = originalText;
            }
        }).catch(error => {
            alert("Oops! There was a network problem submitting your form. Please check your connection and try again.");
            submitButton.innerHTML = originalText;
        });
    });
}

// 4. Policy Page "Read More" Accordion Logic
const policyButtons = document.querySelectorAll('.read-more-btn');

policyButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Toggle the active class on the button (for the rotating arrow)
        this.classList.toggle('active');
        
        // Find the full text div right next to the summary container
        const fullText = this.parentElement.nextElementSibling;
        
        // Toggle the expanded class to slide it open
        if (fullText.classList.contains('expanded')) {
            fullText.classList.remove('expanded');
            this.innerHTML = `Read Full Policy <i class="fas fa-chevron-down"></i>`;
        } else {
            fullText.classList.add('expanded');
            this.innerHTML = `Hide Full Policy <i class="fas fa-chevron-up"></i>`;
        }
    });
});

// 5. Live Review Submission Magic
const openReviewBtn = document.getElementById('open-review-btn');
const reviewFormWrapper = document.getElementById('review-form-wrapper');
const liveReviewForm = document.getElementById('live-review-form');
const reviewContainer = document.querySelector('.review-container');

if (openReviewBtn && reviewFormWrapper && liveReviewForm) {
    
    // Toggle form visibility
    openReviewBtn.addEventListener('click', () => {
        if (reviewFormWrapper.style.display === 'none') {
            reviewFormWrapper.style.display = 'block';
            openReviewBtn.innerHTML = 'Cancel Review';
        } else {
            reviewFormWrapper.style.display = 'none';
            openReviewBtn.innerHTML = 'Write a Review';
        }
    });

    // Handle the submission
    liveReviewForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop standard Formspree page load
        
        const name = document.getElementById('rev-name').value;
        const location = document.getElementById('rev-location').value;
        const text = document.getElementById('rev-text').value;
        const submitBtn = liveReviewForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = "Posting...";

        // Send data silently to Formspree
        const formData = new FormData(liveReviewForm);
        fetch(liveReviewForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                // 1. Instantly build the review card for the user to see
                const newCard = document.createElement('div');
                newCard.className = 'review-card';
                newCard.innerHTML = `
                    <i class="fas fa-quote-left"></i>
                    <p>"${text}"</p>
                    <h4>— ${name}</h4>
                    <span>${location}</span>
                `;
                
                // 2. Insert it at the very beginning of the slider
                reviewContainer.insertBefore(newCard, reviewContainer.firstChild);
                
                // 3. Scroll the container back to the start so they see it
                reviewContainer.scrollLeft = 0;
                
                // 4. Clean up and notify
                alert("Thank you! Your review has been posted.");
                liveReviewForm.reset();
                reviewFormWrapper.style.display = 'none';
                openReviewBtn.innerHTML = 'Write a Review';
                submitBtn.innerHTML = originalBtnText;

            } else {
                alert("Oops! There was a problem sending your review. Please try again.");
                submitBtn.innerHTML = originalBtnText;
            }
        }).catch(error => {
            alert("Network error. Please check your connection and try again.");
            submitBtn.innerHTML = originalBtnText;
        });
    });
}

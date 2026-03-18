// Scroll Reveal Animations
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

// Detailed Booking Form Background Submission with Success Pop-up
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
                // 1. Success pop-up message
                alert("Proposal Requested Successfully! We look forward to designing your epic moment.");
                
                // 2. Clear the form 
                form.reset(); 
                
                // 3. Redirect back to the home page
                window.location.href = "index.html"; 
            } else {
                // If Formspree has an issue
                alert("Oops! There was a problem submitting your form. Please try again or contact us on WhatsApp.");
                submitButton.innerHTML = originalText;
            }
        }).catch(error => {
            alert("Oops! There was a network problem submitting your form. Please check your connection and try again.");
            submitButton.innerHTML = originalText;
        });
    });
}

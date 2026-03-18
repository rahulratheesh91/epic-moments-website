// 1. Scroll Reveal Animations (Ensures a smooth, premium loading experience)
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

// 2. Quick Contact Form Submission (Runs only if the short form exists on the page)
const quickForm = document.getElementById('whatsapp-form');

if (quickForm) {
    quickForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const form = e.target;
        
        const name = document.getElementById('wa-name').value;
        const email = document.getElementById('wa-email').value;
        const phone = document.getElementById('wa-phone').value;
        const event = document.getElementById('wa-event').value;
        const vision = document.getElementById('wa-vision').value;
        
        // Send data silently to Formspree
        const formData = new FormData(form);
        fetch('https://formspree.io/f/mqaleyql', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).catch(error => console.error('Formspree Error:', error));

        // Format and open WhatsApp
        const message = `*New Event Inquiry - Epic Moments*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Event Type:* ${event}%0A*Vision:* ${vision}`;
        
        const whatsappNumber = "447351733080";
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(whatsappURL, '_blank');
        
        form.reset();
    });
}

// 3. Detailed Booking Form Submission (Runs only on booking.html)
const detailedForm = document.getElementById('detailed-booking-form');

if (detailedForm) {
    detailedForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const form = e.target;
        
        // Send data silently to Formspree
        const formData = new FormData(form);
        fetch('https://formspree.io/f/mqaleyql', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).catch(error => console.error('Formspree Error:', error));

        // Gather values for WhatsApp Formatting
        const name = document.getElementById('df-name').value;
        const phone = document.getElementById('df-phone').value;
        const date = document.getElementById('df-date').value;
        const venue = document.getElementById('df-venue').value;
        const service = document.getElementById('df-service').value;
        const notes = document.getElementById('df-notes').value;

        // Gather checked decor items
        const checkboxes = document.querySelectorAll('input[name="Decor[]"]:checked');
        let decorItems = [];
        checkboxes.forEach((checkbox) => {
            decorItems.push(checkbox.value);
        });
        const decorString = decorItems.length > 0 ? decorItems.join(', ') : "None selected";

        // Format the WhatsApp Message
        const message = `*Detailed Event Enquiry*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Date:* ${date}%0A*Venue:* ${venue}%0A%0A*Service:* ${service}%0A*Decor Needed:* ${decorString}%0A*Notes:* ${notes}`;
        
        // Open WhatsApp
        const whatsappNumber = "447351733080";
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(whatsappURL, '_blank');
        
        form.reset();
    });
}

// Scroll reveal animations
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
reveal(); // Trigger on load

// Dual Form Submission: Formspree + WhatsApp
document.getElementById('whatsapp-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the default page reload
    
    const form = e.target;
    
    // Grab the values for WhatsApp formatting
    const name = document.getElementById('wa-name').value;
    const email = document.getElementById('wa-email').value;
    const phone = document.getElementById('wa-phone').value;
    const event = document.getElementById('wa-event').value;
    const vision = document.getElementById('wa-vision').value;
    
    // 1. Send data silently to Formspree
    const formData = new FormData(form);
    fetch('https://formspree.io/f/mqaleyql', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).catch(error => console.error('Formspree Error:', error)); // Logs error quietly if Formspree fails

    // 2. Format the message for WhatsApp (%0A creates a line break)
    const message = `*New Event Inquiry - Epic Moments*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Event Type:* ${event}%0A*Vision:* ${vision}`;
    
    // Your WhatsApp Business Number
    const whatsappNumber = "447351733080";
    
    // Create the final WhatsApp API URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Open WhatsApp in a new tab/app
    window.open(whatsappURL, '_blank');
    
    // Reset the form so it's clean when they return to the website
    form.reset();
});

function goToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error("Element with ID " + id + " not found.");
    }
} 
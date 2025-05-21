document.addEventListener('DOMContentLoaded', function () {
    const enquiryTypeSelect = document.getElementById('enquiryType');
    const instrumentsSection = document.getElementById('instrumentsSection');
    const productSection = document.getElementById('productSection');

    // Toggle between instruments and products based on selection
    function toggleSections() {
        const selectedEnquiryType = enquiryTypeSelect.value;

        if (selectedEnquiryType === 'products') {
            productSection.style.display = 'block';
            instrumentsSection.style.display = 'none';
        } else if (selectedEnquiryType === 'instruments') {
            instrumentsSection.style.display = 'block';
            productSection.style.display = 'none';
        }
    }

    toggleSections();

    enquiryTypeSelect.addEventListener('change', toggleSections);

    // Intercept form submission and use AJAX
    document.getElementById('enquiryForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        const name = document.getElementById('name').value;
        const phoneNumber = document.getElementById('mobileNo').value;
        const message = document.getElementById('message').value;
        const enquiryType = document.getElementById('enquiryType').value;

        let subject = '';
        if (enquiryType === 'products') {
            subject = document.getElementById('chooseProducts').value;
        } else if (enquiryType === 'instruments') {
            subject = document.getElementById('chooseInstruments').value;
        }

        // Validate form inputs
        if (!name || !phoneNumber || !subject || !message) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all required fields.',
            });
            return;
        }

        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phoneNumber)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Phone Number',
                text: 'Please enter a valid phone number (e.g., 9876543210).',
            });
            return;
        }

        // Prepare form data
        const formData = new FormData(document.getElementById('enquiryForm'));

        // Send the data using fetch and AJAX
        fetch('enquiry.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sent Successfully!',
                        text: 'We’ll be in touch with you shortly!',
                    });

                    // Reset the form and toggle sections
                    document.getElementById('enquiryForm').reset();
                    toggleSections();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'There was an issue submitting your enquiry. Please try again.',
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'An error occurred while submitting the form. Please try again.',
                });
            });
    });
});
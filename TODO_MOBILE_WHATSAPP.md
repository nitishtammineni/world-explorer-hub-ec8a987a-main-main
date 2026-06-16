# TODO: Fixed WhatsApp Redirect for Mobile View Domestic/International Search

## Task
Make the "Submit via WhatsApp" button in mobile-view work to send domestic and international data to WhatsApp

## Steps Completed:
- [x] 1. Add state for form fields (fromLocation, toLocation, departureDate, travelers, checkInDate, checkOutDate, travelDate, hotelCity)
- [x] 2. Create handleSubmitViaWhatsApp function with custom message format
- [x] 3. Use window.location.href for proper WhatsApp redirect
- [x] 4. Update button onClick and bind state to all input fields
- [x] 5. Add Guests selector for hotels section

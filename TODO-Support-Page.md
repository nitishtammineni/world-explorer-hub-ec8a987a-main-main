# Support Page Enhancement Plan

## Information Gathered

### Current Implementation

- **Files to Edit:** `src/routes/mobile-view/contact.tsx`, `src/routes/contact.tsx`
- **WhatsApp Number:** +91 86398 88490
- **Design Framework:** Tailwind CSS with custom theme (coral/orange primary, gradient effects)
- **Icons Library:** Lucide React
- **Layout System:** MobileViewLayout with animated drawer menu, bottom nav

### Current Features

- Basic contact form (name, email, phone, message)
- WhatsApp direct chat button
- Call and Email quick actions
- Success confirmation state
- Simple office info card

---

## Plan

### Phase 1: Create Advanced Mobile-View Support Page (`src/routes/mobile-view/contact.tsx`)

#### 1.1 Hero Section - Animated & Eye-catching

- Gradient background with floating decorative elements (airplane icons, world shapes)
- Animated typing text showing "24/7 Travel Support"
- Pulsing WhatsApp CTA button

#### 1.2 Service Category Selector

- Grid of selectable inquiry types (Visa, Passport, Tour Packages, General Inquiry)
- Each category has icon, title, and description
- Selection highlights the card and pre-selects in form
- Categories:
  - ✈️ Visa Services
  - 📘 Passport Help
  - 🏖️ Tour Packages
  - 💼 Business/Corporate
  - ❓ General Inquiry

#### 1.3 Enhanced Quick Action Cards

- Larger, more prominent cards with gradient backgrounds
- Hover animation effects (scale + shadow)
- Direct integration:
  - WhatsApp Chat (green gradient)
  - Phone Call (blue gradient)
  - Email (purple gradient)
  - Location/Map (orange gradient)

#### 1.4 Multi-Section Form with Organized Data

- **Step 1:** Personal Info (Name, Email, Phone)
- **Step 2:** Service Selection (dropdown with categories)
- **Step 3:** Trip Details (Destination, Travel Date, Number of Travelers)
- **Step 4:** Message with templates suggestions

#### 1.5 Organized WhatsApp Message Format

```
🌍 ═══════════════════════════ 🇮🇳
          VICKY RYOKO TOURS
         SUPPORT ENQUIRY
═══════════════════════════════

📋 ENQUIRY TYPE: [Selected Service]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 PERSONAL INFORMATION
───────────────────────────────
• Name: [User Name]
• Email: [User Email]
• Phone: [User Phone]

✈️ TRIP DETAILS
───────────────────────
• Destination: [Destination]
• Travel Date: [Date]
• Travelers: [Count]

💬 MESSAGE
───────────────────────
[User Message]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 Submitted: [Current Date & Time]
🌐 Source: World Explorer Hub
```

#### 1.6 FAQ Accordion Section

- Expandable FAQ questions with smooth animation
- Top 5 relevant questions:
  - "What services do you offer?"
  - "How long does visa processing take?"
  - "Do you offer group discounts?"
  - "Can I customize tour packages?"
  - "What's your response time?"

#### 1.7 Trust Badges Section

- 24/7 Support badge with pulse animation
- Years of Experience counter
- Happy Customers counter
- Verified Agent badge

#### 1.8 Enhanced Footer

- Social media links with hover effects
- Quick links to other pages
- Office address with "Get Directions" button

---

### Phase 2: Update Desktop Support Page (`src/routes/contact.tsx`)

Apply similar enhancements adapted for desktop layout:

- Two-column layout (contact options left, form right)
- Larger typography
- Horizontal service selector
- Desktop-optimized animations

---

### Phase 3: Custom CSS Animations (in `src/styles.css`)

Add new keyframe animations:

- Float animation for hero elements
- Pulse glow for WhatsApp button
- Slide-up entrance for form sections
- Shimmer effect for trust badges

---

## Files to Edit

| File                                 | Changes                                      |
| ------------------------------------ | -------------------------------------------- |
| `src/routes/mobile-view/contact.tsx` | Complete redesign with all advanced features |
| `src/routes/contact.tsx`             | Enhanced desktop version                     |
| `src/styles.css`                     | Add custom animations                        |

---

## Follow-up Steps

1. Apply edits to the files
2. Test WhatsApp link format works correctly
3. Verify responsive behavior
4. Test form submission flow

---

## Approval Required

Please confirm the plan above before proceeding with implementation.

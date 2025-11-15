# Design Guidelines: Taqwa Tours and Travels Landing Page

## Design Approach
**Reference-Based**: Draw inspiration from modern travel booking platforms (Booking.com, Airbnb) combined with Islamic travel aesthetics. The design should feel trustworthy, professional, and culturally appropriate for Bangladeshi Muslim travelers.

## Language & Typography
- **Primary Language**: Bengali (Bangla)
- **Font Family**: Use Bengali-optimized web fonts like Noto Sans Bengali or similar Google Fonts
- **Hierarchy**: 
  - Hero headline: Extra bold, large (text-4xl to text-6xl)
  - Section headings: Bold (text-3xl to text-4xl)
  - Service cards: Medium weight (text-xl to text-2xl)
  - Body text: Regular weight (text-base to text-lg)

## Layout System
**Spacing Units**: Use Tailwind spacing of 4, 6, 8, 12, 16, 20, and 24 (p-4, p-6, p-8, etc.)
- Section padding: py-16 to py-24 on desktop, py-12 on mobile
- Container: max-w-7xl with px-4 to px-8
- Card spacing: gap-6 to gap-8 in grids

## Page Structure & Sections

### 1. Hero Section
- **Layout**: Full-width with background image
- **Background Image**: Mecca-Medina skyline with subtle world map overlay (30% opacity)
- **Content**: Centered with max-w-4xl container
- **Elements**:
  - Main headline: "আপনার স্বপ্নের ভ্রমণ এখনই শুরু করুন!"
  - Subheadline: "Taqwa Tours and Travels-এর সঙ্গে নিরাপদ ও আরামদায়ক সফর"
  - Two CTA buttons side-by-side with blurred backgrounds
  - Floating contact buttons (WhatsApp + Facebook Messenger) - fixed bottom-right

### 2. Services Section (আমাদের সেবা)
- **Layout**: 3-column grid on desktop (lg:grid-cols-3), 2-column on tablet (md:grid-cols-2), single column on mobile
- **Cards**: 
  - Service icon/emoji at top
  - Service title in bold
  - Bullet list of features
  - Hover effect: subtle lift with shadow
- **Services to display**:
  - 🇸🇦 Hajj & Umrah (with 5 sub-services listed)
  - 🌍 World Tour Packages
  - 🎓 Student Consultancy

### 3. World Tour Packages Section
- **Layout**: Horizontal scrolling cards or 4-column grid
- **Countries**: Malaysia, Singapore, Thailand, Dubai, Turkey, Saudi Arabia, Europe
- **Card Design**: Country flag/image, name, brief description

### 4. Student Consultancy Section
- **Layout**: 2-column split (image left, content right)
- **Content**: Services list + destination countries in badge/pill format
- **Countries**: UK, Canada, Australia, Malaysia, China, Japan, Korea, Europe

### 5. Umrah Packages Pricing
- **Layout**: 2-column cards for two packages
- **Package Cards**:
  - Duration badge at top
  - Large price in Taka (১,৩০,০০০ টাকা / ১,৪০,০০০ টাকা)
  - Feature list
  - "আবেদন করুন" (Apply Now) button that scrolls to form

### 6. Customer Information Form
- **Layout**: Single column form, max-w-2xl centered
- **Fields** (all in Bangla):
  - নাম (Name) - text input
  - ফোন নম্বর (Phone) - tel input
  - সার্ভিসের ধরন (Service Type) - dropdown select
  - সফরের তারিখ (Travel Date) - date picker
  - পাসপোর্ট স্ট্যাটাস (Passport Status) - dropdown
  - বার্তা/অনুরোধ (Message) - textarea
- **Submit Button**: Full-width, prominent
- **Success Message**: "আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।"

### 7. Footer
- **Layout**: 3-column grid with contact info, quick links, social media
- **Contact**: Phone (০১৭২২ ৩৩৩ ৯১১), Facebook link
- **Style**: Dark background with light text

## Component Library

### Buttons
- **Primary CTA**: Large, rounded, with icon support, blurred background when on images
- **Floating Action Buttons**: Fixed position, circular, WhatsApp green and Facebook Messenger blue
- **Form Submit**: Full-width, bold

### Cards
- **Service Cards**: White background, rounded corners (rounded-xl), shadow on hover, padding p-6
- **Package Cards**: Border accent, price highlighted, feature list with checkmarks
- **Tour Cards**: Image-first with overlay text

### Form Elements
- **Inputs**: Bordered, rounded (rounded-lg), padding p-3, focus state with ring
- **Dropdowns**: Styled select with Bengali labels
- **Textarea**: Min height for messages

## Images
- **Hero Background**: Mecca-Medina panoramic view with Kaaba and Prophet's Mosque, world map overlay
- **Service Section Icons**: Use emoji or icon library (Heroicons via CDN)
- **Tour Destination Images**: Representative photos of each country/destination
- **Student Section**: Stock photo of international students

## Responsive Behavior
- **Desktop (lg:)**: Multi-column grids, side-by-side layouts
- **Tablet (md:)**: 2-column grids, stacked sections
- **Mobile (base)**: Single column, full-width elements, adjusted spacing (py-12 instead of py-20)

## Cultural Considerations
- Islamic aesthetic: Greens, golds, traditional patterns as subtle accents
- Right-to-left aware (though Bangla is LTR, Arabic elements may appear)
- Family-oriented imagery
- Trust indicators: certifications, years of service, customer count

## Animations (Minimal)
- Hero text fade-in on load
- Card hover effects (lift + shadow)
- Smooth scroll to form on CTA click
- Form field focus animations
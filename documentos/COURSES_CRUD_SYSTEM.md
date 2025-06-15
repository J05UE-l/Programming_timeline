# Courses CRUD System Documentation

## Overview
A complete Create, Read, Update, Delete (CRUD) system for managing programming courses. Built with vanilla JavaScript, CSS, and HTML connecting to your PostgreSQL database.

## Features
✅ **Create** new courses with title, description, and difficulty level
✅ **Read** all courses with beautiful card-based UI
✅ **Update** existing courses with inline editing
✅ **Delete** courses with confirmation modal
✅ **Real-time** database integration
✅ **Responsive** design for all screen sizes
✅ **Form validation** and error handling

## Files Created/Modified

### Backend
- `src/routes/coursesRoutes.js` - API endpoints for CRUD operations
- `server.js` - Added courses routes registration

### Frontend
- `src/views/pages/courses.ejs` - Main courses management page
- `src/views/css/courses.css` - Styling for courses page
- `src/public/js/courses-manager.js` - JavaScript for CRUD operations
- `src/routes/frontRoutes.js` - Added courses page route
- `src/views/layout/main.ejs` - Added courses link to navigation

## API Endpoints

### GET `/courses/api`
- Fetches all courses from database
- Returns: `{success: true, courses: [...]}` 

### POST `/courses/api`
- Creates a new course
- Body: `{title, description, difficulty}`
- Returns: `{success: true, course: {...}, message: "..."}`

### PUT `/courses/api/:id`
- Updates existing course
- Body: `{title, description, difficulty}`
- Returns: `{success: true, course: {...}, message: "..."}`

### DELETE `/courses/api/:id`
- Deletes a course
- Returns: `{success: true, message: "..."}`

## Database Schema
The system expects a `courses` table with:
```sql
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'expert'))
);
```

## How to Use

### 1. Access the Page
Navigate to `/courses` to see the course management interface.

### 2. Add New Course
- Click "Add New Course" button
- Fill in the form:
  - **Title**: Course name (required)
  - **Description**: Course details (required)
  - **Difficulty**: Select from dropdown (required)
- Click "Save Course"

### 3. Edit Course
- Click the "Edit" button on any course card
- Modify the details in the form
- Click "Update Course"

### 4. Delete Course
- Click the "Delete" button on any course card
- Confirm deletion in the modal
- Course is permanently removed

## UI Components

### Course Cards
- Display course title, description, and difficulty
- Color-coded difficulty badges
- Edit and Delete buttons
- Hover effects and animations

### Modals
- **Add/Edit Modal**: Form for course details
- **Delete Confirmation**: Safety check before deletion
- Click outside or X to close

### Messages
- Success messages (green)
- Error messages (red)
- Auto-hide after 5 seconds

## Difficulty Levels
- **Beginner**: Green badge
- **Intermediate**: Orange badge  
- **Advanced**: Red badge
- **Expert**: Purple badge

## Error Handling
- Form validation (required fields)
- Database connection errors
- Network request failures
- User-friendly error messages
- Graceful fallbacks

## Responsive Design
- Mobile-friendly layout
- Adaptive grid system
- Touch-friendly buttons
- Optimized for all screen sizes

## Testing the System

### 1. Start Server
```bash
node server.js
```

### 2. Navigate to Courses
Go to `http://localhost:3000/courses`

### 3. Test Operations
- Create a new course
- Edit an existing course
- Delete a course
- Refresh to see persistence

## Browser Console Commands
```javascript
// Access the courses manager
coursesManager.loadCourses(); // Refresh courses
coursesManager.openAddModal(); // Open add modal

// Check current courses
console.log(coursesManager.courses);
```

## Security Features
- Input sanitization (HTML escaping)
- SQL injection prevention (parameterized queries)
- XSS protection
- Server-side validation

## Performance Features
- Efficient DOM updates
- Minimal API calls
- Optimized CSS animations
- Lazy loading indicators

This system provides a complete, production-ready interface for managing courses with full CRUD functionality! 
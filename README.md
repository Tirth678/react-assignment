# College Course & Student Management System

A complete College Course Management System built with React, incorporating reusable components, routing, forms, events, arrays, conditional rendering, CSS, and performance optimization.

## Features

### 1. Dashboard
- Displays real-time statistics using React components and arrays
- Shows total students, total courses, average attendance, and low attendance warnings
- Interactive cards with hover effects and icons from react-icons

### 2. Student Management
- **Add Student**: Form to add new students with fields for name, enrollment number, email, course, semester, gender, and attendance
- **Edit Student**: Update existing student information
- **Delete Student**: Remove students from the system
- **Search Students**: Filter students by name, enrollment number, or email
- **Filter by Course**: View students enrolled in specific courses
- **Student List**: Display all students in a responsive card grid

### 3. Course Management
- **Add Courses**: Create new courses with name, code, credits, department, and description
- **Delete Courses**: Remove courses from the system
- **Search Courses**: Filter courses by name, code, or department
- **Filter by Department**: View courses from specific departments
- **Course Details**: View detailed information about each course

### 4. Student Details
- Detailed view of individual student information
- **Attendance Warning System**:
  - Attendance ≥ 75%: Eligible (Green with check icon)
  - Attendance 60-74%: Warning (Yellow with warning icon)
  - Attendance < 60%: Detained (Red with ban icon)
- Visual attendance bar showing percentage
- Links to navigate back to student list

### 5. Course Details
- Detailed view of individual course information
- List of enrolled students in the course
- Links to individual student details

### 6. Performance Optimization
- **React.memo()** is used in the following components:
  - `StudentCard`: Prevents unnecessary re-renders when the parent component updates but the student data hasn't changed
  - `CourseCard`: Optimizes rendering of course cards in the list
  - `DashboardCard`: Prevents re-renders when dashboard statistics are recalculated
  - `Alert`: Optimizes alert component rendering
  
  **Why memoization was used**: These components are rendered in lists where parent state changes frequently (e.g., during search/filter operations). By memoizing these components, we avoid unnecessary re-renders of individual cards when only the search term or filter changes, improving performance especially with larger datasets.

- **useMemo()** is used in:
  - `Students` page: For filtering students based on search and course filter
  - `Courses` page: For filtering courses and extracting unique departments
  
  **Why useMemo was used**: These computed values (filtered lists, unique departments) are expensive to recalculate on every render. useMemo ensures they only recalculate when their dependencies change, preventing unnecessary computations.

### 7. Styling
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Navigation Bar**: Sticky header with links to all main sections
- **Cards**: Modern card design with hover effects
- **Tables**: Clean table layout for detailed views
- **Forms**: Styled form inputs with focus states
- **Buttons**: Primary, secondary, and danger button styles
- **Alerts**: Success, error, warning, and info alert components

## Project Structure

```
src/
├── components/
│   ├── Alert.jsx              # Alert notification component (memoized)
│   ├── CourseCard.jsx         # Course display card (memoized)
│   ├── CourseForm.jsx         # Course creation/edit form
│   ├── DashboardCard.jsx      # Dashboard statistic card (memoized)
│   ├── Navbar.jsx             # Navigation bar
│   ├── StudentCard.jsx        # Student display card (memoized)
│   └── StudentForm.jsx        # Student creation/edit form
├── pages/
│   ├── CourseDetails.jsx      # Individual course details page
│   ├── Courses.jsx            # Course management page
│   ├── Dashboard.jsx          # Dashboard with statistics
│   ├── StudentDetails.jsx     # Individual student details page
│   └── Students.jsx           # Student management page
├── styles/
│   └── style.css              # Global styles
├── App.jsx                    # Main app with routing
└── main.jsx                   # Entry point
```

## Technologies Used

- **React**: UI library
- **React Router**: Client-side routing
- **React Icons**: Icon library
- **localStorage**: Client-side data persistence
- **Vite**: Build tool and dev server
- **CSS**: Styling with responsive design

## Getting Started

### Prerequisites
- Node.js installed on your machine

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

### Navigation
- **Dashboard**: View overall statistics
- **Students**: Manage student records
- **Courses**: Manage course offerings

### Student Management
1. Click "Add Student" to create a new student
2. Fill in the form with student details
3. Use the search bar to find specific students
4. Use the filter dropdown to view students by course
5. Click "View Details" to see full student information
6. Click "Edit" to modify student details
7. Click "Delete" to remove a student

### Course Management
1. Click "Add Course" to create a new course
2. Fill in the form with course details
3. Use the search bar to find specific courses
4. Use the filter dropdown to view courses by department
5. Click "View Details" to see full course information and enrolled students
6. Click "Edit" to modify course details
7. Click "Delete" to remove a course

### Attendance System
The attendance system automatically categorizes students based on their attendance percentage:
- **≥ 75%**: Eligible for exams (Green badge with check icon)
- **60-74%**: Warning - attendance below threshold (Yellow badge with warning icon)
- **< 60%**: Detained - critically low attendance (Red badge with ban icon)

## Performance Considerations

The application uses several performance optimization techniques:

1. **React.memo()**: Prevents unnecessary re-renders of card components
2. **useMemo()**: Caches expensive computations like filtered lists
3. **localStorage with useState + useEffect**: Simple state persistence without external dependencies
4. **CSS Animations**: Smooth transitions without JavaScript overhead

## Data Persistence

The application uses **localStorage** for data persistence:

- **Direct useState + useEffect**: Each component manages its own state with localStorage
- **Automatic Sync**: Data is automatically saved to localStorage whenever it changes via useEffect
- **Initial Data**: Default data is loaded on first visit if localStorage is empty
- **Browser Storage**: Data persists across browser sessions and page refreshes
- **No Backend**: Fully client-side with no server requirements

To clear data and reset to defaults, you can clear your browser's localStorage for this application.

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Future Enhancements

- Add backend API integration
- Implement data persistence (localStorage or database)
- Add more filtering options
- Implement export/import functionality
- Add charts and graphs to dashboard
- Implement authentication and authorization

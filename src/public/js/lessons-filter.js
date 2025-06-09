// Lessons Filter Manager - Handles filtering lessons by difficulty
class LessonsFilter {
    constructor() {
        this.allLessons = [];
        this.init();
    }

    // Initialize the filter system
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                this.storeLessons();
            });
        } else {
            this.setupEventListeners();
            this.storeLessons();
        }
    }

    // Store all lessons for filtering
    storeLessons() {
        const lessonCards = document.querySelectorAll('.lesson-card');
        this.allLessons = Array.from(lessonCards);
    }

    // Setup filter button listeners
    setupEventListeners() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filterLessons(filter);
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    // Filter lessons by difficulty
    filterLessons(difficulty) {
        const lessonsGrid = document.querySelector('.lessons-grid');
        
        // Clear current lessons
        lessonsGrid.innerHTML = '';
        
        let filteredLessons;
        
        if (difficulty === 'all') {
            filteredLessons = this.allLessons;
        } else {
            filteredLessons = this.allLessons.filter(lesson => {
                const difficultyElement = lesson.querySelector('.difficulty');
                if (difficultyElement) {
                    return difficultyElement.classList.contains(difficulty.toLowerCase());
                }
                return false;
            });
        }
        
        // Show filtered lessons or empty state
        if (filteredLessons.length === 0) {
            this.showEmptyState(difficulty);
        } else {
            filteredLessons.forEach(lesson => {
                lessonsGrid.appendChild(lesson.cloneNode(true));
            });
            
            // Re-initialize progress checker for cloned elements
            if (window.progressChecker) {
                window.progressChecker.checkAndUpdateProgress();
                window.progressChecker.addLessonButtonListeners();
            }
        }
    }

    // Show empty state when no lessons match filter
    showEmptyState(difficulty) {
        const lessonsGrid = document.querySelector('.lessons-grid');
        lessonsGrid.innerHTML = `
            <div class="empty-state">
                <h3>No ${difficulty} courses found</h3>
                <p>We don't have any ${difficulty} level courses available yet.</p>
                <button class="filter-btn" data-filter="all" onclick="lessonsFilter.filterLessons('all'); lessonsFilter.setActiveButton(this);">
                    View All Courses
                </button>
            </div>
        `;
    }

    // Set active button helper
    setActiveButton(button) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }
}

// Create global instance
const lessonsFilter = new LessonsFilter();

// Make it available globally
window.lessonsFilter = lessonsFilter; 
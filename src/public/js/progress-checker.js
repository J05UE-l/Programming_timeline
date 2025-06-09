// Progress Checker - Fetches user progress from database and updates completion tags
class ProgressChecker {
    constructor() {
        this.currentUserId = this.getCurrentUserId();
        this.lessonMapping = {
            'Python Fundamentals': 'python-fundamentals',
            'React Development': 'react-development',
            'Java Programming': 'java-programming',
            'Full-Stack Web Development': 'full-stack-web-development'
        };
    }

    // Get current user ID (you'll need to implement this based on your auth system)
    getCurrentUserId() {
        // For now, using a test user ID - replace with your actual user ID logic
        // This could come from session storage, local storage, or a cookie
        return localStorage.getItem('userId') || '3535c99f-fada-403d-a6be-886b67fc5dfc';
    }

    // Helper function to set user ID for testing
    setUserId(userId) {
        localStorage.setItem('userId', userId);
        this.currentUserId = userId;
        console.log('User ID set to:', userId);
        // Refresh progress data
        this.checkAndUpdateProgress();
    }

    // Fetch user progress from the database
    async fetchUserProgress() {
        try {
            const response = await fetch(`/progress/user/${this.currentUserId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                return data.progress;
            } else {
                console.error('Failed to fetch progress:', data.error);
                return [];
            }
        } catch (error) {
            console.error('Error fetching user progress:', error);
            return [];
        }
    }

    // Update completion tags on the lessons page
    updateCompletionTags(progressData) {
        // Create a map of lesson IDs to completion status
        const progressMap = {};
        progressData.forEach(item => {
            progressMap[item.lesson_id] = item.completed;
        });

        // Find all lesson cards and update their completion tags
        const lessonCards = document.querySelectorAll('.lesson-card');
        
        lessonCards.forEach(card => {
            const lessonId = card.getAttribute('data-lesson-id');
            if (!lessonId) return;

            const completionTag = card.querySelector('.completion-tag');
            if (!completionTag) return;

            // Check if we have progress data for this lesson
            let isCompleted = progressMap[lessonId] || false;
            
            // Update the completion tag
            this.setCompletionStatus(completionTag, isCompleted);
            
            // Update button text based on completion status
            const button = card.querySelector('.lesson-btn');
            if (button) {
                if (isCompleted) {
                    button.textContent = 'Review Lesson';
                } else {
                    button.textContent = 'Start Learning';
                }
            }
        });
    }

    // Update completion tags on the challenges page
    updateChallengeCompletionTags(progressData) {
        // Create a map of challenge titles to completion status
        const progressMap = {};
        progressData.forEach(item => {
            progressMap[item.title] = item.completed;
        });

        // Find all challenge cards and update their completion tags
        const challengeCards = document.querySelectorAll('.challenge-card');
        
        challengeCards.forEach(card => {
            const titleElement = card.querySelector('h3');
            if (!titleElement) return;

            const challengeTitle = titleElement.textContent.trim();
            const completionTag = card.querySelector('.completion-tag');
            
            if (!completionTag) return;

            // Check if we have progress data for this challenge
            let isCompleted = progressMap[challengeTitle] || false;
            
            // Update the completion tag
            this.setCompletionStatus(completionTag, isCompleted);
            
            // Update button text based on completion status
            const button = card.querySelector('.challenge-btn');
            if (button) {
                if (isCompleted) {
                    button.textContent = 'View Solution';
                } else {
                    button.textContent = 'Start Challenge';
                }
            }
        });
    }

    // Set completion status for a tag element
    setCompletionStatus(tagElement, isCompleted) {
        // Remove existing classes
        tagElement.classList.remove('completed', 'in-progress', 'not-started');
        
        if (isCompleted) {
            tagElement.classList.add('completed');
            tagElement.textContent = 'Completed';
        } else {
            tagElement.classList.add('not-started');
            tagElement.textContent = 'Not Started';
        }
    }

    // Update progress in the database
    async updateProgress(lessonId, completed) {
        try {
            const response = await fetch('/progress/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: this.currentUserId,
                    lessonId: lessonId,
                    completed: completed
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                console.log('Progress updated successfully');
                // Refresh the page progress
                this.checkAndUpdateProgress();
            } else {
                console.error('Failed to update progress:', data.error);
            }
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    }

    // Main function to check and update progress
    async checkAndUpdateProgress() {
        const progressData = await this.fetchUserProgress();
        
        // Determine which page we're on and update accordingly
        if (document.querySelector('.lessons-grid')) {
            this.updateCompletionTags(progressData);
        } else if (document.querySelector('.challenges-grid')) {
            this.updateChallengeCompletionTags(progressData);
        }
    }

    // Add click event listeners to lesson buttons
    addLessonButtonListeners() {
        const lessonButtons = document.querySelectorAll('.lesson-btn');
        
        lessonButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const card = button.closest('.lesson-card');
                const lessonId = card.getAttribute('data-lesson-id');
                
                if (!lessonId) return;
                
                // For demo purposes, mark as completed when clicked
                // In a real app, this would happen when the lesson is actually completed
                this.updateProgress(lessonId, true);
            });
        });
    }

    // Initialize progress checking when page loads
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.checkAndUpdateProgress();
                this.addLessonButtonListeners();
            });
        } else {
            this.checkAndUpdateProgress();
            this.addLessonButtonListeners();
        }
    }
}

// Create global instance
const progressChecker = new ProgressChecker();

// Auto-initialize when script loads
progressChecker.init();

// Make it available globally for manual calls
window.progressChecker = progressChecker; 
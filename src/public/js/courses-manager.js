// Courses Manager - Handles CRUD operations for courses
class CoursesManager {
    constructor() {
        this.courses = [];
        this.currentEditingId = null;
        this.init();
    }

    // Initialize the courses manager
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                this.loadCourses();
            });
        } else {
            this.setupEventListeners();
            this.loadCourses();
        }
    }

    // Setup all event listeners
    setupEventListeners() {
        // Main action buttons
        const addCourseBtn = document.getElementById('addCourseBtn');
        const refreshCoursesBtn = document.getElementById('refreshCoursesBtn');
        
        if (addCourseBtn) {
            addCourseBtn.addEventListener('click', () => this.openAddModal());
        }
        
        if (refreshCoursesBtn) {
            refreshCoursesBtn.addEventListener('click', () => this.loadCourses());
        }

        // Modal event listeners
        this.setupModalEventListeners();
    }



    // Setup modal event listeners
    setupModalEventListeners() {
        // Course modal
        const closeModalBtn = document.getElementById('closeModalBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const courseForm = document.getElementById('courseForm');
        const courseModal = document.getElementById('courseModal');

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => this.closeModal());
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeModal());
        }
        
        if (courseForm) {
            courseForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        
        if (courseModal) {
            courseModal.addEventListener('click', (e) => {
                if (e.target === courseModal) {
                    this.closeModal();
                }
            });
        }

        // Delete modal
        const closeDeleteModalBtn = document.getElementById('closeDeleteModalBtn');
        const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        const deleteModal = document.getElementById('deleteModal');

        if (closeDeleteModalBtn) {
            closeDeleteModalBtn.addEventListener('click', () => this.closeDeleteModal());
        }
        
        if (cancelDeleteBtn) {
            cancelDeleteBtn.addEventListener('click', () => this.closeDeleteModal());
        }
        
        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', () => this.confirmDelete());
        }
        
        if (deleteModal) {
            deleteModal.addEventListener('click', (e) => {
                if (e.target === deleteModal) {
                    this.closeDeleteModal();
                }
            });
        }
    }

    // Load courses from the API
    async loadCourses() {
        try {
            this.showLoading();
            
            const response = await fetch('/courses/api', {
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
                this.courses = data.courses;
                this.renderCourses();
            } else {
                this.showMessage('Failed to load courses', 'error');
                this.renderEmptyState();
            }
        } catch (error) {
            console.error('Error loading courses:', error);
            this.showMessage('Error loading courses. Please try again.', 'error');
            this.renderEmptyState();
        }
    }

    // Show loading state
    showLoading() {
        const coursesGrid = document.getElementById('coursesGrid');
        if (coursesGrid) {
            coursesGrid.innerHTML = `
                <div class="loading-message">
                    <p>Loading courses...</p>
                </div>
            `;
        }
    }

    // Render courses grid
    renderCourses() {
        const coursesGrid = document.getElementById('coursesGrid');
        if (!coursesGrid) return;

        if (this.courses.length === 0) {
            this.renderEmptyState();
            return;
        }

        this.filteredCourses = this.courses; // Initialize filtered courses
        this.renderFilteredCourses();
    }

    // Render filtered courses
    renderFilteredCourses(courses = this.filteredCourses) {
        const coursesGrid = document.getElementById('coursesGrid');
        if (!coursesGrid) return;

        if (courses.length === 0) {
            coursesGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No courses found</h3>
                    <p>No courses match the selected filter.</p>
                </div>
            `;
            return;
        }

        coursesGrid.innerHTML = courses.map(course => `
            <div class="course-card" data-course-id="${course.id}" data-difficulty="${course.difficulty.toLowerCase()}">
                <div class="course-header">
                    <h3 class="course-title">${this.escapeHtml(course.title)}</h3>
                </div>
                <p class="course-description">${this.escapeHtml(course.description)}</p>
                <div class="course-actions-row">
                    <button class="btn-small btn-edit" onclick="coursesManager.openEditModal('${course.id}')">
                        <span>✏️</span>
                        Edit
                    </button>
                    <button class="btn-small btn-delete" onclick="coursesManager.openDeleteModal('${course.id}', '${this.escapeHtml(course.title)}')">
                        <span>🗑️</span>
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Render empty state
    renderEmptyState() {
        const coursesGrid = document.getElementById('coursesGrid');
        if (!coursesGrid) return;

        coursesGrid.innerHTML = `
            <div class="empty-state">
                <h3>No courses found</h3>
                <p>Get started by creating your first course.</p>
                <button class="btn-primary" onclick="coursesManager.openAddModal()">
                    <span class="btn-icon">➕</span>
                    Add New Course
                </button>
            </div>
        `;
    }

    // Open add modal
    openAddModal() {
        this.currentEditingId = null;
        this.resetForm();
        
        const modalTitle = document.getElementById('modalTitle');
        const submitBtn = document.getElementById('submitBtn');
        
        if (modalTitle) modalTitle.textContent = 'Add New Course';
        if (submitBtn) {
            submitBtn.innerHTML = '<span class="btn-icon">💾</span> Save Course';
        }
        
        this.showModal();
    }

    // Open edit modal
    openEditModal(courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (!course) return;

        this.currentEditingId = courseId;
        this.populateForm(course);
        
        const modalTitle = document.getElementById('modalTitle');
        const submitBtn = document.getElementById('submitBtn');
        
        if (modalTitle) modalTitle.textContent = 'Edit Course';
        if (submitBtn) {
            submitBtn.innerHTML = '<span class="btn-icon">💾</span> Update Course';
        }
        
        this.showModal();
    }

    // Open delete modal
    openDeleteModal(courseId, courseTitle) {
        this.currentEditingId = courseId;
        
        const deleteCourseName = document.getElementById('deleteCourseName');
        if (deleteCourseName) {
            deleteCourseName.textContent = courseTitle;
        }
        
        this.showDeleteModal();
    }

    // Show modal
    showModal() {
        const modal = document.getElementById('courseModal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Focus on first input
            const firstInput = modal.querySelector('input[type="text"]');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    // Close modal
    closeModal() {
        const modal = document.getElementById('courseModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            this.resetForm();
        }
    }

    // Show delete modal
    showDeleteModal() {
        const modal = document.getElementById('deleteModal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    // Close delete modal
    closeDeleteModal() {
        const modal = document.getElementById('deleteModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Reset form
    resetForm() {
        const form = document.getElementById('courseForm');
        if (form) {
            form.reset();
            document.getElementById('courseId').value = '';
        }
    }

    // Populate form with course data
    populateForm(course) {
        document.getElementById('courseId').value = course.id;
        document.getElementById('courseTitle').value = course.title;
        document.getElementById('courseDescription').value = course.description;
        document.getElementById('courseDifficulty').value = course.difficulty;
    }

    // Handle form submit
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const courseData = {
            title: formData.get('title').trim(),
            description: formData.get('description').trim(),
            difficulty: formData.get('difficulty')
        };

        // Validation
        if (!courseData.title || !courseData.description || !courseData.difficulty) {
            this.showMessage('Please fill in all required fields', 'error');
            return;
        }

        try {
            this.setFormLoading(true);
            
            let response;
            if (this.currentEditingId) {
                // Update existing course
                response = await fetch(`/courses/api/${this.currentEditingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(courseData)
                });
            } else {
                // Create new course
                response = await fetch('/courses/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(courseData)
                });
            }

            const data = await response.json();
            
            if (data.success) {
                this.showMessage(data.message, 'success');
                this.closeModal();
                this.loadCourses(); // Refresh the list
            } else {
                this.showMessage(data.error || 'Operation failed', 'error');
            }
        } catch (error) {
            console.error('Error saving course:', error);
            this.showMessage('Error saving course. Please try again.', 'error');
        } finally {
            this.setFormLoading(false);
        }
    }

    // Confirm delete
    async confirmDelete() {
        if (!this.currentEditingId) return;

        try {
            const response = await fetch(`/courses/api/${this.currentEditingId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            
            if (data.success) {
                this.showMessage(data.message, 'success');
                this.closeDeleteModal();
                this.loadCourses(); // Refresh the list
            } else {
                this.showMessage(data.error || 'Delete failed', 'error');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            this.showMessage('Error deleting course. Please try again.', 'error');
        }
    }

    // Set form loading state
    setFormLoading(loading) {
        const submitBtn = document.getElementById('submitBtn');
        const form = document.getElementById('courseForm');
        
        if (submitBtn) {
            if (loading) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Saving...';
            } else {
                submitBtn.disabled = false;
                const isEditing = this.currentEditingId !== null;
                submitBtn.innerHTML = `<span class="btn-icon">💾</span> ${isEditing ? 'Update' : 'Save'} Course`;
            }
        }
        
        if (form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.disabled = loading;
            });
        }
    }

    // Show message
    showMessage(message, type = 'success') {
        const messageContainer = document.getElementById('messageContainer');
        const messageText = document.getElementById('messageText');
        
        if (messageContainer && messageText) {
            messageText.textContent = message;
            messageText.className = `message ${type}`;
            messageContainer.style.display = 'block';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                messageContainer.style.display = 'none';
            }, 5000);
        }
    }



    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Create global instance
const coursesManager = new CoursesManager();

// Make it available globally
window.coursesManager = coursesManager; 
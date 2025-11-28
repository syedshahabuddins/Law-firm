// App state
let currentCircle = 1;
let currentStep = 1;
let completedCircles = [];

// DOM elements
const circleIndicator = document.querySelector('.circle-indicator');
const step1Element = document.getElementById('step1');
const step2Element = document.getElementById('step2');
const step3Element = document.getElementById('step3');
const contentArea = document.querySelector('.content-area');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const completionMessage = document.getElementById('completionMessage');
const scrollTopBtn = document.getElementById('scrollTop');

// Initialize the app
function initApp() {
    createCircleIndicators();
    updateUI();
    
    // Event listeners
    prevBtn.addEventListener('click', goToPrevStep);
    nextBtn.addEventListener('click', goToNextStep);
    resetBtn.addEventListener('click', resetTawaf);
    scrollTopBtn.addEventListener('click', scrollToTop);
}

// Create circle indicators
function createCircleIndicators() {
    circleIndicator.innerHTML = '';
    for (let i = 1; i <= 7; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.textContent = i;
        circleIndicator.appendChild(circle);
    }
}

// Update the UI based on current state
function updateUI() {
    // Update circle indicators
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        circle.classList.remove('active', 'completed');
        
        if (index + 1 === currentCircle) {
            circle.classList.add('active');
        } else if (completedCircles.includes(index + 1)) {
            circle.classList.add('completed');
        }
    });
    
    // Update step indicators
    step1Element.classList.toggle('active', currentStep === 1);
    step2Element.classList.toggle('active', currentStep === 2);
    step3Element.classList.toggle('active', currentStep === 3);
    
    // Update content
    updateContent();
    
    // Update buttons
    prevBtn.disabled = currentCircle === 1 && currentStep === 1;
    nextBtn.textContent = currentCircle === 7 && currentStep === 3 ? 'Finish Tawaf' : 'Next';
    
    // Show/hide completion message
    if (currentCircle > 7) {
        completionMessage.classList.remove('hidden');
        contentArea.innerHTML = '';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    } else {
        completionMessage.classList.add('hidden');
    }
}

// Update content based on current circle and step
function updateContent() {
    if (currentCircle > 7) return;
    
    let content = '';
    let icon = '';
    let shortDuaNote = '<div class="short-dua-note"><i class="fas fa-info-circle"></i> If short, recite: "Bismillahi Allahu Akbar Wa Lillahil Hamd."</div>';
    
    if (currentStep === 1) {
        icon = '<i class="fas fa-play-circle"></i>';
        content = `
            <div class="content-card">
                <h2 class="section-title">${icon} Circle ${currentCircle} - Starting Dua</h2>
                <p class="arabic-text">${tawafData.startingDua.arabic}</p>
                <div class="transliteration">${tawafData.startingDua.transliteration}</div>
                ${shortDuaNote}
                <div class="translation">${tawafData.startingDua.translation}</div>
            </div>
        `;
    } else if (currentStep === 2) {
        icon = '<i class="fas fa-arrow-right"></i>';
        const circleData = tawafData.circles.find(c => c.circle === currentCircle);
        content = `
            <div class="content-card">
                <h2 class="section-title">${icon} Circle ${currentCircle} - From Black Stone to Yemeni Corner</h2>
                <p class="arabic-text">${circleData.step2.arabic}</p>
                <div class="transliteration">${circleData.step2.transliteration}</div>
                <div class="translation">${circleData.step2.translation}</div>
            </div>
        `;
    } else if (currentStep === 3) {
        icon = '<i class="fas fa-arrow-left"></i>';
        content = `
            <div class="content-card">
                <h2 class="section-title">${icon} Circle ${currentCircle} - From Yemeni Corner to Black Stone</h2>
                <p class="arabic-text">${tawafData.rabbanaDua.arabic}</p>
                <div class="transliteration">${tawafData.rabbanaDua.transliteration}</div>
                <div class="translation">${tawafData.rabbanaDua.translation}</div>
            </div>
        `;
    }
    
    contentArea.innerHTML = content;
}

// Navigate to next step
function goToNextStep() {
    if (currentCircle > 7) return;
    
    if (currentStep < 3) {
        currentStep++;
    } else {
        completedCircles.push(currentCircle);
        currentCircle++;
        currentStep = 1;
    }
    
    updateUI();
    
    // Scroll to top for better visibility
    scrollToTop();
}

// Navigate to previous step
function goToPrevStep() {
    if (currentCircle === 1 && currentStep === 1) return;
    
    if (currentStep > 1) {
        currentStep--;
    } else {
        currentCircle--;
        currentStep = 3;
        // Remove from completed circles if going back
        const index = completedCircles.indexOf(currentCircle);
        if (index > -1) {
            completedCircles.splice(index, 1);
        }
    }
    
    updateUI();
    
    // Scroll to top for better visibility
    scrollToTop();
}

// Reset the Tawaf
function resetTawaf() {
    currentCircle = 1;
    currentStep = 1;
    completedCircles = [];
    updateUI();
    
    // Scroll to top
    scrollToTop();
}

// Scroll to top of page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', initApp);
// DOM yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Proje butonlarına event listener ekle
    const projectButtons = document.querySelectorAll('.project-btn');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectType = this.getAttribute('data-project');
            scrollToProject(projectType);
        });
    });
    
    // Scroll animasyonları için intersection observer
    setupScrollAnimations();
});

// Proje detaylarına scroll et
function scrollToProject(projectType) {
    // Önce tüm projeleri tamamen gizle
    const allProjects = document.querySelectorAll('.project-details');
    allProjects.forEach(project => {
        project.classList.remove('visible');
        project.style.display = 'none';
    });
    
    // 3., 4. section'ları ve footer'ı da gizle
    const companyIntro = document.getElementById('company-intro');
    if (companyIntro) {
        companyIntro.classList.remove('visible');
        companyIntro.style.display = 'none';
    }
    
    const mapsSection = document.getElementById('maps-section');
    if (mapsSection) {
        mapsSection.classList.remove('visible');
        mapsSection.style.display = 'none';
    }
    
    const siteFooter = document.getElementById('site-footer');
    if (siteFooter) {
        siteFooter.classList.remove('visible');
        siteFooter.style.display = 'none';
    }
    
    // Sadece tıklanan projeyi göster
    const targetProject = document.getElementById(projectType + '-details');
    if (targetProject) {
        targetProject.style.display = 'block';
        
        // Kısa bir gecikme sonrası animasyonu başlat
        setTimeout(() => {
            targetProject.classList.add('visible');
        }, 50);
        
        // 3. section'ı da göster
        setTimeout(() => {
            if (companyIntro) {
                companyIntro.style.display = 'block';
                setTimeout(() => {
                    companyIntro.classList.add('visible');
                }, 100);
            }
        }, 200);
        
        // 4. section'ı da göster
        setTimeout(() => {
            if (mapsSection) {
                mapsSection.style.display = 'block';
                setTimeout(() => {
                    mapsSection.classList.add('visible');
                }, 100);
            }
        }, 400);
        
        // Footer'ı da göster
        setTimeout(() => {
            if (siteFooter) {
                siteFooter.style.display = 'block';
                setTimeout(() => {
                    siteFooter.classList.add('visible');
                }, 100);
            }
        }, 600);
        
        // Smooth scroll to project
        targetProject.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll animasyonlarını ayarla
function setupScrollAnimations() {
    // Intersection observer'ı kaldırdık çünkü artık manuel kontrol ediyoruz
    // Sadece scroll to top butonunu göster/gizle
    setupScrollToTopButton();
}

// Keyboard navigation desteği
document.addEventListener('keydown', function(event) {
    // ESC tuşu ile ana sayfaya dön
    if (event.key === 'Escape') {
        scrollToTop();
    }
});

// Ana sayfaya scroll et
function scrollToTop() {
    // Tüm projeleri gizle
    const allProjects = document.querySelectorAll('.project-details');
    allProjects.forEach(project => {
        project.classList.remove('visible');
        project.style.display = 'none';
    });
    
    // 3., 4. section'ları ve footer'ı da gizle
    const companyIntro = document.getElementById('company-intro');
    if (companyIntro) {
        companyIntro.classList.remove('visible');
        companyIntro.style.display = 'none';
    }
    
    const mapsSection = document.getElementById('maps-section');
    if (mapsSection) {
        mapsSection.classList.remove('visible');
        mapsSection.style.display = 'none';
    }
    
    const siteFooter = document.getElementById('site-footer');
    if (siteFooter) {
        siteFooter.classList.remove('visible');
        siteFooter.style.display = 'none';
    }
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


// Scroll to top butonunu ayarla
function setupScrollToTopButton() {
    // Scroll event listener ekle
    window.addEventListener('scroll', function() {
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        }
    });
}

// Carousel işlevselliği - 4 farklı kombinasyon için
let currentSlideIndex = {
    'ata-center-2+1': 0,
    'ata-center-3+1': 0,
    'ata-deluxe-2+1': 0,
    'ata-deluxe-3+1': 0
};

// Daire seçimi işlevselliği
let selectedApartment = {
    'ata-center': null,
    'ata-deluxe': null
};

function selectApartment(projectType, apartmentType) {
    console.log('selectApartment called:', projectType, apartmentType);
    
    // Seçilen daireyi kaydet
    selectedApartment[projectType] = apartmentType;
    
    // Daire seçeneklerini gizle
    const selection = document.getElementById(projectType + '-selection');
    if (selection) {
        selection.style.display = 'none';
    }
    
    // Geri tuşunu göster
    const backBtn = document.querySelector(`#${projectType}-details .back-to-selection-btn`);
    if (backBtn) {
        backBtn.classList.add('show');
    }
    
    // İlgili içeriği göster
    const contentId = projectType + '-' + apartmentType + '-content';
    const content = document.getElementById(contentId);
    if (content) {
        content.style.display = 'block';
        setTimeout(() => {
            content.classList.add('show');
        }, 100);
    }
}

function backToSelection(projectType) {
    console.log('backToSelection called:', projectType);
    
    // Daire seçeneklerini göster
    const selection = document.getElementById(projectType + '-selection');
    if (selection) {
        selection.style.display = 'block';
    }
    
    // Geri tuşunu gizle
    const backBtn = document.querySelector(`#${projectType}-details .back-to-selection-btn`);
    if (backBtn) {
        backBtn.classList.remove('show');
    }
    
    // Tüm içerikleri gizle
    const allContents = document.querySelectorAll(`[id*="${projectType}-"][id*="-content"]`);
    allContents.forEach(content => {
        content.classList.remove('show');
        setTimeout(() => {
            content.style.display = 'none';
        }, 300);
    });
}

function changeSlide(projectType, direction) {
    console.log('changeSlide called:', projectType, direction);
    
    const carousel = document.getElementById(projectType + '-carousel');
    if (!carousel) {
        console.log('Carousel not found:', projectType + '-carousel');
        return;
    }
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const carouselContainer = carousel.closest('.carousel-container');
    const dots = carouselContainer.querySelectorAll('.dot');
    
    console.log('Found slides:', slides.length);
    console.log('Found dots:', dots.length);
    console.log('Current index:', currentSlideIndex[projectType]);
    
    // Mevcut slide'ı gizle
    if (slides[currentSlideIndex[projectType]]) {
        slides[currentSlideIndex[projectType]].classList.remove('active');
    }
    if (dots[currentSlideIndex[projectType]]) {
        dots[currentSlideIndex[projectType]].classList.remove('active');
    }
    
    // Yeni slide index'ini hesapla
    currentSlideIndex[projectType] += direction;
    
    // Sınırları kontrol et
    if (currentSlideIndex[projectType] >= slides.length) {
        currentSlideIndex[projectType] = 0;
    } else if (currentSlideIndex[projectType] < 0) {
        currentSlideIndex[projectType] = slides.length - 1;
    }
    
    console.log('New index:', currentSlideIndex[projectType]);
    
    // Yeni slide'ı göster
    if (slides[currentSlideIndex[projectType]]) {
        slides[currentSlideIndex[projectType]].classList.add('active');
    }
    if (dots[currentSlideIndex[projectType]]) {
        dots[currentSlideIndex[projectType]].classList.add('active');
    }
}

function currentSlide(projectType, slideNumber) {
    const carousel = document.getElementById(projectType + '-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const carouselContainer = carousel.closest('.carousel-container');
    const dots = carouselContainer.querySelectorAll('.dot');
    
    // Mevcut slide'ı gizle
    if (slides[currentSlideIndex[projectType]]) {
        slides[currentSlideIndex[projectType]].classList.remove('active');
    }
    if (dots[currentSlideIndex[projectType]]) {
        dots[currentSlideIndex[projectType]].classList.remove('active');
    }
    
    // Yeni slide index'ini ayarla
    currentSlideIndex[projectType] = slideNumber - 1;
    
    // Yeni slide'ı göster
    if (slides[currentSlideIndex[projectType]]) {
        slides[currentSlideIndex[projectType]].classList.add('active');
    }
    if (dots[currentSlideIndex[projectType]]) {
        dots[currentSlideIndex[projectType]].classList.add('active');
    }
}

// Proje butonlarına hover efekti
document.addEventListener('DOMContentLoaded', function() {
    const projectButtons = document.querySelectorAll('.project-btn');
    
    projectButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Sayfa yüklendiğinde hero section animasyonu
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'all 1s ease-out';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);
});

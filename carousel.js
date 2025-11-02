// Carousel modülü - Ayrı dosya olarak
let currentSlideIndex = {
    'ata-deluxe-2+1': 0,
    'ata-deluxe-3+1': 0
};

// Lazy loading için yüklenen embedleri takip et
let loadedEmbeds = new Set();

// Lazy loading fonksiyonu
function loadEmbed(iframe) {
    if (loadedEmbeds.has(iframe)) return;
    
    const dataSrc = iframe.getAttribute('data-src');
    if (dataSrc) {
        iframe.src = dataSrc;
        loadedEmbeds.add(iframe);
        console.log('Embed yüklendi:', iframe.title);
    }
}

// Aktif slide'ın embedini yükle
function loadActiveSlideEmbed(projectType) {
    const carousel = document.getElementById(projectType + '-carousel');
    if (!carousel) return;
    
    const activeSlide = carousel.querySelector('.carousel-slide.active');
    if (activeSlide) {
        const iframe = activeSlide.querySelector('iframe');
        if (iframe) {
            loadEmbed(iframe);
        }
    }
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
        // Yeni aktif slide'ın embedini yükle
        loadActiveSlideEmbed(projectType);
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
        // Yeni aktif slide'ın embedini yükle
        loadActiveSlideEmbed(projectType);
    }
    if (dots[currentSlideIndex[projectType]]) {
        dots[currentSlideIndex[projectType]].classList.add('active');
    }
}

// Export functions for use in main script
window.carouselModule = {
    changeSlide,
    currentSlide,
    loadActiveSlideEmbed
};

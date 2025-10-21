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
    
    // Intersection Observer'ı başlat
    setupIntersectionObserver();
    
    // Görsel optimizasyonunu başlat
    setupImageOptimization();
    
    // Mobil cihazlar için iframe optimizasyonlarını başlat
    setupMobileIframeOptimizations();
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
        
        // Mobil cihazlar için iframe yükleme sonrası optimizasyonlar
        iframe.addEventListener('load', function() {
            optimizeIframeForMobile(iframe);
        });
    }
}

// Mobil cihazlar için iframe optimizasyonu
function optimizeIframeForMobile(iframe) {
    // Mobil cihaz kontrolü
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Touch event'leri için optimizasyon
        iframe.style.touchAction = 'manipulation';
        iframe.style.webkitTouchCallout = 'none';
        iframe.style.webkitUserSelect = 'none';
        iframe.style.userSelect = 'none';
        
        // Hardware acceleration
        iframe.style.webkitTransform = 'translateZ(0)';
        iframe.style.transform = 'translateZ(0)';
        
        // Pointer events optimizasyonu
        iframe.style.pointerEvents = 'auto';
        
        // Mobil cihazlarda iframe içeriğinin düzgün görüntülenmesi
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        
        console.log('Mobil iframe optimizasyonu uygulandı:', iframe.title);
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

// Intersection Observer ile görünür alan optimizasyonu
function setupIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                if (iframe) {
                    loadEmbed(iframe);
                }
                // Görünür hale geldikten sonra observer'ı kaldır
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Tüm carousel slide'larını gözlemle
    const allSlides = document.querySelectorAll('.carousel-slide');
    allSlides.forEach(slide => {
        observer.observe(slide);
    });
}

// Görsel lazy loading ve WebP desteği
function setupImageOptimization() {
    // WebP desteği kontrolü
    const supportsWebP = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    // Lazy loading için intersection observer
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const dataSrc = img.getAttribute('data-src');
                if (dataSrc) {
                    // WebP desteği varsa WebP formatını kullan
                    if (supportsWebP() && dataSrc.includes('.jpg')) {
                        img.src = dataSrc.replace('.jpg', '.webp');
                    } else {
                        img.src = dataSrc;
                    }
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    // Tüm lazy loading görselleri gözlemle
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

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
            // İlk slide'ın embedini yükle
            loadActiveSlideEmbed(projectType + '-' + apartmentType);
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
    
    // Service Worker'ı kaydet
    registerServiceWorker();
});

// Service Worker kaydı
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker kaydedildi:', registration.scope);
                })
                .catch(error => {
                    console.log('Service Worker kaydı başarısız:', error);
                });
        });
    }
}

// Mobil cihazlar için iframe optimizasyonları
function setupMobileIframeOptimizations() {
    // Mobil cihaz kontrolü
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Viewport meta tag optimizasyonu
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
        
        // Touch event'leri için global optimizasyonlar
        document.addEventListener('touchstart', function(e) {
            // iframe içindeki touch event'leri için optimizasyon
            if (e.target.closest('.matterport-embed-wrapper')) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // iframe yükleme sonrası ek optimizasyonlar
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    const iframes = mutation.target.querySelectorAll('iframe[data-src]');
                    iframes.forEach(iframe => {
                        iframe.addEventListener('load', function() {
                            // Mobil cihazlarda iframe içeriğinin düzgün görüntülenmesi
                            setTimeout(() => {
                                iframe.style.opacity = '1';
                                iframe.style.visibility = 'visible';
                            }, 100);
                        });
                    });
                }
            });
        });
        
        // Tüm iframe'leri gözlemle
        const allIframes = document.querySelectorAll('.matterport-embed-wrapper');
        allIframes.forEach(wrapper => {
            observer.observe(wrapper, { childList: true, subtree: true });
        });
        
        console.log('Mobil iframe optimizasyonları aktif');
    }
}

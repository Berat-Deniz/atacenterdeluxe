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
    
    // Görsel optimizasyonunu başlat
    setupImageOptimization();
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

// Carousel ve iframe özellikleri kaldırıldı - artık gerekli değil

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

// Carousel fonksiyonları kaldırıldı - artık gerekli değil

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

// Iframe optimizasyonları kaldırıldı - artık gerekli değil

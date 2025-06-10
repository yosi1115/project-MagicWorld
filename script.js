// --- 魔法を動かす呪文 (JavaScript) ---
// このコードは、ページが読み込まれた後に実行される
document.addEventListener('DOMContentLoaded', () => {

    // --- 初期化関数 ---
    // すべての魔法をここから呼び出す
    function init() {
        initCheerPopup(); 
        initCustomCursor(); 
        initHeroAnimation();
        initScrollAnimations();
        initSparkleEffect();
        initDiagnosis();
        initSoundEffects();
    }

    // --- 1. ファーストビューのアニメーション ---
    function initHeroAnimation() {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;

        // 500ミリ秒後に本が開き始める
        setTimeout(() => {
            heroSection.classList.add('open');
        }, 500);
    }

    // --- 2. スクロール連動アニメーション ---
    function initScrollAnimations() {
        const revealElements = document.querySelectorAll('.reveal');
        if (revealElements.length === 0) return;
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // --- 3. キラキラエフェクトの魔法 ---
    function initSparkleEffect() {
        const sparkleContainer = document.getElementById('sparkle-container');
        if (!sparkleContainer) return;

        document.body.addEventListener('click', (e) => {
            for (let i = 0; i < 20; i++) {
                createSparkle(e.clientX, e.clientY);
            }
        });
    }

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        document.getElementById('sparkle-container').appendChild(sparkle);

        const angle = Math.random() * 2 * Math.PI;
        sparkle.style.setProperty('--dx', Math.cos(angle));
        sparkle.style.setProperty('--dy', Math.sin(angle));
        
        sparkle.style.top = `${y - 5}px`;
        sparkle.style.left = `${x - 5}px`;

        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
    
    // --- 4. 魔法タイプ診断のロジック ---
    function initDiagnosis() {
        const answerButtons = document.querySelectorAll('#diagnosis .answers button');
        const questionBox = document.getElementById('question-box');
        const resultA = document.getElementById('result-a');
        const resultB = document.getElementById('result-b');
        const successSound = document.getElementById('success-sound');

        if (!questionBox || answerButtons.length === 0) return;

        answerButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const type = e.currentTarget.getAttribute('data-type');
                
                if (successSound) successSound.play().catch(e => console.log("Audio play failed."));
                
                questionBox.style.transition = 'opacity 0.5s';
                questionBox.style.opacity = '0';
                
                setTimeout(() => {
                    questionBox.style.display = 'none';
                    if (type === 'A') {
                        resultA.style.display = 'block';
                    } else {
                        resultB.style.display = 'block';
                    }
                }, 500);
            });
        });
    }

    // --- 5. サウンドエフェクトの準備 ---
    function initSoundEffects() {
        const clickSound = document.getElementById('click-sound');
        const interactiveElements = document.querySelectorAll('button, a.cta-button');

        if (!clickSound) return;

        interactiveElements.forEach(el => {
            el.addEventListener('click', () => {
                clickSound.currentTime = 0;
                clickSound.play().catch(e => console.log("Audio play failed."));
            });
        });
    }
    
    // --- 6. 魔法の光カーソルのロジック ---
    function initCustomCursor() {
        const cursor = document.querySelector('.magic-cursor');
        const dot = document.querySelector('.magic-cursor-dot');
    
        if (!cursor || !dot) return;
    
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;
    
        window.addEventListener('mousemove', e => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            dot.style.opacity = '1';
            cursor.style.opacity = '1';
        });
    
        function animateCursor() {
            dotX += (cursorX - dotX) * 0.7;
            dotY += (cursorY - dotY) * 0.7;
    
            dot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;
            cursor.style.transform = `translate(${dotX - 20}px, ${dotY - 20}px)`;
    
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
    
        document.addEventListener('mouseleave', () => {
            dot.style.opacity = '0';
            cursor.style.opacity = '0';
        });
    }

    // --- 7. 魔法の応援ポップアップのロジック ---
    function initCheerPopup() {
        const popup = document.getElementById('cheer-popup');
        if (!popup) return;
    
        let hasCheered = false; 
    
        window.addEventListener('scroll', () => {
            if (!hasCheered && isScrolledPast(60)) {
                hasCheered = true; 
    
                popup.classList.add('is-visible');
    
                setTimeout(() => {
                    popup.classList.remove('is-visible');
                }, 6000);
            }
        });
    
        function isScrolledPast(percentage) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const scrollableHeight = scrollHeight - clientHeight;
            
            if (scrollableHeight <= 0) return false;
    
            const scrollPercent = (scrollTop / scrollableHeight) * 100;
    
            return scrollPercent >= percentage;
        }
    }

    // --- すべての魔法を発動！ ---
    init();

});

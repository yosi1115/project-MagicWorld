// --- 魔法を動かす呪文 (JavaScript) ---
document.addEventListener('DOMContentLoaded', () => {

    function init() {
        initCheerPopup(); 
        initCustomCursor(); 
        initHeroAnimation();
        initScrollAnimations();
        initSparkleEffect();
        initDiagnosis();
        initSoundEffects();
    }

    // (中略... 全てのJavaScript関数)
    
    function isScrolledPast(percentage) {
        // ... (中略)
        return scrollPercent >= percentage;
    }
}
// --- すべての魔法を発動！ ---
init();

});

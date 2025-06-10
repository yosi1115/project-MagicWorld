// --- 魔法を動かす呪文 (JavaScript) ---
// このコードは、ページが読み込まれた後に実行される
document.addEventListener('DOMContentLoaded', () => {

// --- 初期化関数 ---
// すべての魔法をここから呼び出す
function init() {
    initCheerPopup(); // ★ この行を新しく追加しました！
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
        
        // 要素が画面に入ったかどうかを監視するオブザーバー
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // 画面内に入ったら 'visible' クラスを追加
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // 一度表示されたら監視を解除する（パフォーマンス向上のため）
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // 要素が10%見えたらトリガー
            rootMargin: '0px 0px -50px 0px' // 少し早めにトリガー
        });

        // 全ての.reveal要素を監視対象に追加
        revealElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // --- 3. キラキラエフェクトの魔法 ---
    function initSparkleEffect() {
        const sparkleContainer = document.getElementById('sparkle-container');
        if (!sparkleContainer) return;

        document.body.addEventListener('click', (e) => {
            // 20個のキラキラを生成
            for (let i = 0; i < 20; i++) {
                createSparkle(e.clientX, e.clientY);
            }
        });
    }

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        document.getElementById('sparkle-container').appendChild(sparkle);

        // ランダムな方向へ飛ばす
        const angle = Math.random() * 2 * Math.PI;
        sparkle.style.setProperty('--dx', Math.cos(angle));
        sparkle.style.setProperty('--dy', Math.sin(angle));
        
        sparkle.style.top = `${y - 5}px`;
        sparkle.style.left = `${x - 5}px`;

        // アニメーションが終わったら要素を削除
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
                
                // 成功音を再生
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
                }, 500); // フェードアウトの時間と合わせる
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
                // 他の音と重ならないように、現在の再生を止めてから再生
                clickSound.currentTime = 0;
                clickSound.play().catch(e => console.log("Audio play failed."));
            });
        });
    }

    // ... （initCustomCursor 関数の定義など） ...
// ★★★★★ ここまでが追加分 ★★★★★


// ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
// ★★★★★ ここからが、ポップアップ用の新しい呪文です ★★★★★
// ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

// --- 7. 魔法の応援ポップアップのロジック ---
function initCheerPopup() {
    const popup = document.getElementById('cheer-popup');
    if (!popup) return;

    let hasCheered = false; // 一度だけ応援するためのフラグ

    // スクロールを監視する
    window.addEventListener('scroll', () => {
        // まだ応援しておらず、かつ、ページの60%までスクロールしたら
        if (!hasCheered && isScrolledPast(60)) {
            hasCheered = true; // 応援フラグを立てる

            // ポップアップを表示する
            popup.classList.add('is-visible');

            // 6秒後に自動的に消える
            setTimeout(() => {
                popup.classList.remove('is-visible');
            }, 6000);
        }
    });

    // ページの指定された割合までスクロールしたかを判定する関数
    function isScrolledPast(percentage) {
        // 現在のスクロール位置
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // ページ全体の高さ
        const scrollHeight = document.documentElement.scrollHeight;
        // ブラウザの表示領域の高さ
        const clientHeight = document.documentElement.clientHeight;

        // スクロール可能な最大値
        const scrollableHeight = scrollHeight - clientHeight;
        
        // スクロールが全くできないページでは何もしない
        if (scrollableHeight <= 0) return false;

        // 現在のスクロール率
        const scrollPercent = (scrollTop / scrollableHeight) * 100;

        return scrollPercent >= percentage;
    }
}
    
    // --- すべての魔法を発動！ ---
    init();

});

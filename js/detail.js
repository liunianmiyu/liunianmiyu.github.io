// 创建星级评分HTML
function createStarsHtml(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            starsHtml += '<div class="star">★</div>';
        } else if (i <= Math.ceil(rating) && i > Math.floor(rating)) {
            // 半星表示（简化为整星）
            starsHtml += '<div class="star">★</div>';
        } else {
            starsHtml += '<div class="star-empty">★</div>';
        }
    }
    return starsHtml;
}

// 生成评论列表HTML
function generateReviewsHTML(reviews) {
    let reviewsHTML = '';
    
    reviews.forEach(review => {
        reviewsHTML += `
            <div class="review-item">
                <div class="review-header">
                    <div class="reviewer-name">${review.name}</div>
                    <div class="review-date">${review.date}</div>
                </div>
                <div class="review-stars">
                    ${createStarsHtml(review.rating)}
                </div>
                <div class="review-text">${review.text}</div>
            </div>
        `;
    });
    
    return reviewsHTML;
}

// 获取URL参数
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// 初始化游戏详情
function initGameDetail() {
    const gameId = getUrlParameter('id'); // 直接获取字符串形式的ID
    const game = games.find(g => g.id == gameId); // 使用==进行宽松比较
    
    if (!game) {
        // 游戏不存在，重定向到首页
        window.location.href = 'index.html';
        return;
    }
    
    // 设置页面标题
    document.title = `${game.title} - GoGame！`;
    
    // 更新页面内容
    document.getElementById('detailTitle').textContent = game.title;
    document.getElementById('gameFrame').src = game.play_url;
    document.getElementById('gameDescription').innerHTML = game.description;
    // document.getElementById('gameInstructions').textContent = game.instructions;
    
    // 设置评分详情
    document.getElementById('detailRatingValue').textContent = game.rating.toFixed(1);
    document.getElementById('detailRatingStars').innerHTML = createStarsHtml(game.rating);
    document.getElementById('detailReviewCount').textContent = `基于 ${game.reviewCount} 条评价`;
    
    // 生成评论列表
    document.getElementById('reviewsList').innerHTML = generateReviewsHTML(game.reviews);
}

// 初始化页面
window.onload = function() {
    initGameDetail();
};

const fullScreenButton = document.getElementById('FullScreenPlay');
const gameFrame = document.getElementById('gameFrame');

fullScreenButton.addEventListener('click', function() {
    if (gameFrame.requestFullscreen) {
        gameFrame.requestFullscreen();
    } else if (gameFrame.webkitRequestFullscreen) {
        gameFrame.webkitRequestFullscreen();
    } else if (gameFrame.msRequestFullscreen) {
        gameFrame.msRequestFullscreen();
    }
});
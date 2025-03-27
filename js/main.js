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

// 初始化游戏网格
function initGameGrid() {
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = '';
    
    games.forEach(game => {
        gameGrid.appendChild(createGameCard(game));
    });
}

// 过滤游戏
function filterGames(category) {
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = '';
    
    const filteredGames = category ? games.filter(game => game.category === category) : games;
    
    filteredGames.forEach(game => {
        gameGrid.appendChild(createGameCard(game));
    });
}

// 搜索游戏
function searchGames() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = '';
    
    const filteredGames = games.filter(game => 
        game.title.toLowerCase().includes(searchInput) || 
        game.category.toLowerCase().includes(searchInput) ||
        game.subCategory.toLowerCase().includes(searchInput)
    );
    
    if (filteredGames.length === 0) {
        gameGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 40px;">没有找到相关游戏</div>';
        return;
    }
    
    filteredGames.forEach(game => {
        gameGrid.appendChild(createGameCard(game));
    });
}

// 导航到游戏详情页
function navigateToGameDetail(gameId) {
    window.location.href = `game-detail.html?id=${gameId}`;
}

// 切换侧边栏
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
});

// 搜索框回车事件
document.getElementById('searchInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchGames();
    }
});

// 初始化页面
window.onload = function() {
    initGameGrid();
};

// 点击主内容区域关闭侧边栏（移动设备）
document.querySelector('.main-content').addEventListener('click', function() {
    if (window.innerWidth <= 768 && document.getElementById('sidebar').classList.contains('active')) {
        document.getElementById('sidebar').classList.remove('active');
    }
});


function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.setAttribute('data-id', game.id);
    
    card.innerHTML = `
        <div class="game-thumbnail" style="${game.cover_url ? `background-image: url('${game.cover_url}');` : `background: ${game.thumbnail}`}">
            <div class="game-rating-badge">
                <i>★</i> ${game.rating.toFixed(1)}
            </div>
        </div>
        <div class="game-info">
            <div class="game-title">${game.title}</div>
            <div class="game-description">${game.description}</div>
            <div class="game-info-bottom">
                <div class="game-stars">
                    <div class="stars">
                        ${createStarsHtml(game.rating)}
                    </div>
                    <span class="review-count">(${game.reviews})</span>
                </div>
                <button class="play-btn" onclick="window.open('game-detail.html?id=${game.id}', '_blank')">Play</button>
            </div>
        </div>
    `;
    return card;
}


let currentPage = 1;
const pageSize = 15;
let currentGames = []; // 当前显示的游戏列表

// 初始化游戏网格
function initGameGrid() {
    currentGames = games; // 初始化时显示所有游戏
    resetPagination();
    loadMoreGames();
}

// 过滤游戏
function filterGames(category) {
    currentGames = category ? games.filter(game => game.category === category) : games;
    resetPagination();
    loadMoreGames();
}

// 搜索游戏
function searchGames() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    currentGames = games.filter(game => 
        game.title.toLowerCase().includes(searchInput) || 
        game.category.toLowerCase().includes(searchInput) ||
        game.subCategory.toLowerCase().includes(searchInput)
    );
    resetPagination();
    loadMoreGames();
}

function resetPagination() {
    currentPage = 1;
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = '';
    const loadMoreBtn = document.getElementById('loadMore');
    const noMoreGames = document.getElementById('noMoreGames');
    
    // 如果游戏总数小于等于pageSize，隐藏加载更多按钮并显示提示
    if (currentGames.length <= pageSize) {
        loadMoreBtn.style.display = 'none';
        noMoreGames.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'block';
        noMoreGames.style.display = 'none';
        loadMoreBtn.disabled = false;
    }
}

function loadMoreGames() {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const gamesToShow = currentGames.slice(start, end);
    const loadMoreBtn = document.getElementById('loadMore');
    const noMoreGames = document.getElementById('noMoreGames');
    
    if (gamesToShow.length === 0) {
        loadMoreBtn.style.display = 'none';
        noMoreGames.style.display = 'block';
        return;
    }
    
    gamesToShow.forEach(game => {
        gameGrid.appendChild(createGameCard(game));
    });
    
    currentPage++;
    
    // 如果剩余游戏数量小于等于0，隐藏加载更多按钮并显示提示
    if (currentGames.length <= currentPage * pageSize) {
        loadMoreBtn.style.display = 'none';
        noMoreGames.style.display = 'block';
    }
}

// 初始化加载第一页
loadMoreGames();

// 添加加载更多按钮事件
document.getElementById('loadMore').addEventListener('click', loadMoreGames);
function renderCategories() {
    const sidebar = document.getElementById('sidebar');
    
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'category-title';
        titleDiv.innerHTML = `<i class="${category.iconClass}"></i>${category.name}`;
        
        const itemsUl = document.createElement('ul');
        itemsUl.className = 'category-items';
        
        category.subCategories.forEach(subCategory => {
            const itemLi = document.createElement('li');
            itemLi.setAttribute('data-category', category.id);
            itemLi.textContent = subCategory.name;
            itemLi.onclick = () => filterGames(category.id);
            itemsUl.appendChild(itemLi);
        });
        
        categoryDiv.appendChild(titleDiv);
        categoryDiv.appendChild(itemsUl);
        sidebar.appendChild(categoryDiv);
    });
}

// 在页面加载时渲染分类
window.addEventListener('DOMContentLoaded', renderCategories);


function filterGames(categoryId) {
    console.log('Selected category ID:', categoryId);
    console.log('All games:', games);
    
    // 过滤游戏逻辑
    const filteredGames = games.filter(game => game.categoryId === categoryId);
    
    // 清空当前游戏列表
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = '';
    
    // 渲染过滤后的游戏
    filteredGames.forEach(game => {
        const gameCard = createGameCard(game);
        gameGrid.appendChild(gameCard);
    });
}
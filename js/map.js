// 全局变量
let map;
let markers = [];
let infoWindows = [];
let currentSelectedMarker = null;

// 初始化地图
function initMap() {
    // 创建地图实例
    map = new AMap.Map('map', {
        zoom: campusData.school.zoom,
        center: [campusData.school.centerLng, campusData.school.centerLat],
        viewMode: '2D'
    });

    // 加载建筑物标记
    loadBuildingMarkers(campusData.buildings);
    
    // 初始化建筑物列表
    initBuildingList(campusData.buildings);
    
    // 绑定事件
    bindEvents();
}

// 加载建筑物标记
function loadBuildingMarkers(buildings) {
    buildings.forEach(building => {
        // 创建标记
        const marker = new AMap.Marker({
            position: new AMap.LngLat(building.lng, building.lat),
            title: building.name,
            icon: new AMap.Icon({
                size: new AMap.Size(32, 32),
                image: getMarkerIcon(building.type),
                imageSize: new AMap.Size(32, 32)
            })
        });

        marker.setMap(map);
        marker.building = building; // 绑定建筑物数据到标记

        // 点击标记事件
        marker.on('click', function() {
            selectMarker(marker);
        });

        markers.push(marker);
    });
}

// 获取标记图标
function getMarkerIcon(type) {
    // 返回一个简单的圆形图标 URL
    // 可以根据需要替换为实际的图标 URL
    const color = getBuildingColor(type).replace('#', '');
    return `https://webapi.amap.com/theme/v1.3/markers/b/mark_b${color}.png`;
}

// 选择标记
function selectMarker(marker) {
    // 取消之前的选择
    if (currentSelectedMarker) {
        currentSelectedMarker.setIcon(new AMap.Icon({
            size: new AMap.Size(32, 32),
            image: getMarkerIcon(currentSelectedMarker.building.type),
            imageSize: new AMap.Size(32, 32)
        }));
    }

    // 设置当前选择的标记
    currentSelectedMarker = marker;
    marker.setIcon(new AMap.Icon({
        size: new AMap.Size(40, 40),
        image: `https://webapi.amap.com/theme/v1.3/markers/n/mark_${marker.building.type}.png`,
        imageSize: new AMap.Size(40, 40)
    }));

    // 显示信息面板
    showInfoPanel(marker.building);

    // 在地图上显示信息窗口
    const infoWindow = new AMap.InfoWindow({
        content: createInfoWindowContent(marker.building),
        offset: new AMap.Pixel(0, -30)
    });

    infoWindow.open(map, marker.getPosition());

    // 移动地图中心到标记位置
    map.setCenter(marker.getPosition());
}

// 创建信息窗口内容
function createInfoWindowContent(building) {
    return `
        <div style="padding: 10px; font-size: 12px;">
            <div style="font-weight: bold; margin-bottom: 5px;">${building.name}</div>
            <div style="color: #999; margin-bottom: 5px;">📍 ${building.type}</div>
            <div style="color: #666;">${building.description}</div>
            <div style="color: #999; margin-top: 5px; font-size: 11px;">
                坐标: ${building.lat.toFixed(4)}, ${building.lng.toFixed(4)}
            </div>
        </div>
    `;
}

// 初始化建筑物列表
function initBuildingList(buildings) {
    const listContainer = document.getElementById('buildingList');
    listContainer.innerHTML = '';

    buildings.forEach(building => {
        const item = document.createElement('div');
        item.className = 'building-item';
        item.innerHTML = `
            <div class="building-item-name">${building.name}</div>
            <div class="building-item-type">${building.type}</div>
        `;

        item.addEventListener('click', () => {
            // 找到对应的标记并选择
            const marker = markers.find(m => m.building.id === building.id);
            if (marker) {
                selectMarker(marker);
            }
        });

        listContainer.appendChild(item);
    });
}

// 显示信息面板
function showInfoPanel(building) {
    const panel = document.getElementById('infoPanel');
    document.getElementById('buildingName').textContent = building.name;
    document.getElementById('buildingType').textContent = building.type;
    document.getElementById('buildingCoord').textContent = `${building.lat.toFixed(4)}, ${building.lng.toFixed(4)}`;
    document.getElementById('buildingDesc').textContent = building.description;
    panel.classList.add('active');
}

// 关闭信息面板
function closeInfoPanel() {
    const panel = document.getElementById('infoPanel');
    panel.classList.remove('active');
}

// 绑定事件
function bindEvents() {
    // 搜索功能
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 地图点击关闭信息面板
    map.on('click', () => {
        // 可以选择点击地图时不关闭面板
        // closeInfoPanel();
    });
}

// 执行搜索
function performSearch() {
    const keyword = document.getElementById('searchInput').value;
    const results = searchBuildings(keyword);

    // 更新建筑物列表
    initBuildingList(results);

    // 如果有搜索结果，选择第一个
    if (results.length > 0) {
        const firstMarker = markers.find(m => m.building.id === results[0].id);
        if (firstMarker) {
            selectMarker(firstMarker);
        }
    }
}

// 清空搜索
function clearSearch() {
    document.getElementById('searchInput').value = '';
    initBuildingList(campusData.buildings);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 检查高德地图 API 是否加载
    if (typeof AMap !== 'undefined') {
        initMap();
    } else {
        console.error('高德地图 API 未加载');
        alert('地图加载失败，请检查高德地图 API key 是否配置正确');
    }
});

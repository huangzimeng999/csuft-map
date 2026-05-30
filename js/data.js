// 校园建筑物数据
// 坐标基准：28.1316°N, 112.9949°E（学校主校区中心）
// 所有坐标均为 WGS84 格式

const campusData = {
    // 学校基本信息
    school: {
        name: '中南林业科技大学',
        address: '湖南省长沙市天心区韶山南路 498 号',
        centerLat: 28.1316,
        centerLng: 112.9949,
        zoom: 16
    },
    
    // 校园建筑物
    buildings: [
        {
            id: 1,
            name: '图书馆',
            type: '教学楼',
            lat: 28.1316,
            lng: 112.9949,
            description: '校园中心图书馆，提供丰富的学习资源和阅读环境'
        },
        {
            id: 2,
            name: '学生食堂',
            type: '生活服务',
            lat: 28.1325,
            lng: 112.9955,
            description: '主要学生食堂，提供多样化的饮食选择'
        },
        {
            id: 3,
            name: '学生宿舍 A',
            type: '宿舍',
            lat: 28.1310,
            lng: 112.9940,
            description: '学生公寓 A 区，为学生提供舒适的住宿环境'
        },
        {
            id: 4,
            name: '学生宿舍 B',
            type: '宿舍',
            lat: 28.1305,
            lng: 112.9960,
            description: '学生公寓 B 区，为学生提供舒适的住宿环境'
        },
        {
            id: 5,
            name: '行政楼',
            type: '行政楼',
            lat: 28.1320,
            lng: 112.9935,
            description: '学校行政办公楼，处理各类教务事务'
        },
        {
            id: 6,
            name: '教学楼 1',
            type: '教学楼',
            lat: 28.1315,
            lng: 112.9960,
            description: '主要教学楼，承载大部分理论课程'
        },
        {
            id: 7,
            name: '教学楼 2',
            type: '教学楼',
            lat: 28.1308,
            lng: 112.9945,
            description: '教学楼 2，承载专业实践课程'
        },
        {
            id: 8,
            name: '实验室中心',
            type: '科研设施',
            lat: 28.1322,
            lng: 112.9955,
            description: '各学科实验室集中地，进行科学研究和实验教学'
        },
        {
            id: 9,
            name: '体育馆',
            type: '体育设施',
            lat: 28.1328,
            lng: 112.9940,
            description: '校园体育馆，提供篮球、羽毛球等运动场地'
        },
        {
            id: 10,
            name: '医疗中心',
            type: '医疗服务',
            lat: 28.1312,
            lng: 112.9925,
            description: '学校卫生所，为师生提供医疗服务'
        },
        {
            id: 11,
            name: '学生活动中心',
            type: '文娱活动',
            lat: 28.1330,
            lng: 112.9950,
            description: '学生社团和文艺活动场所'
        },
        {
            id: 12,
            name: '校门',
            type: '出入口',
            lat: 28.1335,
            lng: 112.9945,
            description: '学校正大门，主要出入口'
        }
    ]
};

// 建筑物类别颜色映射
const typeColorMap = {
    '教学楼': '#667eea',
    '宿舍': '#764ba2',
    '生活服务': '#f093fb',
    '行政楼': '#4facfe',
    '科研设施': '#43e97b',
    '体育设施': '#fa709a',
    '医疗服务': '#fee140',
    '文娱活动': '#30b0fe',
    '出入口': '#a8edea'
};

// 获取建筑物颜色
function getBuildingColor(type) {
    return typeColorMap[type] || '#667eea';
}

// 按类别分组建筑物
function groupBuildingsByType() {
    const grouped = {};
    campusData.buildings.forEach(building => {
        if (!grouped[building.type]) {
            grouped[building.type] = [];
        }
        grouped[building.type].push(building);
    });
    return grouped;
}

// 搜索建筑物
function searchBuildings(keyword) {
    if (!keyword.trim()) {
        return campusData.buildings;
    }
    
    const lowercaseKeyword = keyword.toLowerCase();
    return campusData.buildings.filter(building => 
        building.name.toLowerCase().includes(lowercaseKeyword) ||
        building.type.toLowerCase().includes(lowercaseKeyword) ||
        building.description.toLowerCase().includes(lowercaseKeyword)
    );
}

# 🗺️ CSUFT 校园地图

中南林业科技大学校园地图应用，为新生提供清晰的校园方位导航。

## 📍 学校信息

- **学校名称**：中南林业科技大学
- **地址**：湖南省长沙市天心区韶山南路 498 号
- **坐标 (WGS84)**：
  - 东经：112.9949°
  - 北纬：28.1316°
  - 度分秒：28°08′21″N，112°59′31″E

## 🎯 功能特性

- ✅ 高德地图集成
- ✅ 校园建筑物位置显示
- ✅ 清晰的方位标注
- ✅ 新生导航支持
- ✅ 建筑物搜索功能
- ✅ 点击显示建筑信息

## 🛠️ 技术栈

- HTML5 / CSS3 / JavaScript
- 高德地图 API
- 响应式设计

## 📦 项目结构

```
csuft-map/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── map.js          # 地图功能
│   └── data.js         # 建筑物数据
└── README.md           # 项目说明
```

## 🚀 快速开始

### 1. Clone 项目
```bash
git clone https://github.com/huangzimeng999/csuft-map.git
cd csuft-map
```

### 2. 配置高德地图 API Key

- 访问 [高德开放平台](https://lbs.amap.com/)
- 注册账号并创建应用
- 获取 Web 服务 API Key
- 在 `index.html` 中替换 `YOUR_AMAP_KEY`

```html
<script src="https://webapi.amap.com/maps?v=2.0&key=YOUR_AMAP_KEY"></script>
```

### 3. 在浏览器中打开

直接打开 `index.html` 文件，或使用本地服务器：
```bash
python -m http.server 8000
# 或
npx http-server
```

然后访问 `http://localhost:8000`

## 📚 使用说明

### 搜索建筑物
- 在顶部搜索框输入建筑物名称
- 点击搜索按钮或按 Enter 键
- 支持按名称、类别、描述搜索

### 查看建筑物信息
- 点击地图上的标记或右侧列表中的建筑物
- 在左下角信息面板查看详细信息
- 地图自动移动到选中的建筑物

### 建筑物类别
- 🏫 教学楼 - 主要教学场所
- 🏠 宿舍 - 学生住宿区
- 🍽️ 生活服务 - 食堂、超市等
- 🏢 行政楼 - 办公区
- 🔬 科研设施 - 实验室中心
- ⚽ 体育设施 - 体育馆等
- 🏥 医疗服务 - 校医院
- 🎭 文娱活动 - 活动中心
- 🚪 出入口 - 校门

## 🔧 开发指南

### 添加新建筑物

编辑 `js/data.js`，在 `buildings` 数组中添加新项：

```javascript
{
    id: 13,
    name: '新建筑名称',
    type: '建筑类别',
    lat: 28.1316,
    lng: 112.9949,
    description: '建筑描述信息'
}
```

### 修改地图配置

在 `js/map.js` 中修改地图初始化参数：

```javascript
map = new AMap.Map('map', {
    zoom: 16,  // 缩放级别
    center: [112.9949, 28.1316],  // 中心坐标
    viewMode: '2D'  // 视图模式
});
```

## 📄 文件说明

- **index.html** - 应用主页，包含页面布局和高德地图脚本引入
- **css/style.css** - 完整的样式设计，包括响应式设计
- **js/data.js** - 校园建筑物数据和工具函数
- **js/map.js** - 地图交互逻辑和事件处理

## 🐛 故障排除

### 地图不显示
- 检查高德地图 API Key 是否正确配置
- 确保网络连接正常
- 检查浏览器控制台是否有错误信息

### 标记不显示
- 确认坐标数据格式正确（WGS84）
- 检查坐标是否在合理范围内

### 搜索功能无效
- 确保输入的建筑物名称存在于数据中
- 检查浏览器控制台是否有 JavaScript 错误

## 📝 许可证

MIT License

## 👨‍💻 作者

创建者：huangzimeng999

## 📞 支持

如有问题或建议，欢迎在 GitHub 上提交 Issue 或 Pull Request！

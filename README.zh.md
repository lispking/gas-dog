# Gas Dog 🐕

[English](README.md) | [简体中文](README.zh.md)

一个Monad链Gas费用分析工具，帮助用户追踪和分析Monad网络上的Gas消耗情况。

## 功能特点 ✨

- 🔍 Monad链Gas费用追踪和分析
- 📊 直观的数据可视化展示
- 🕒 灵活的时间范围选择
- 📱 响应式设计，支持移动端
- 🌐 多语言支持（中文/英文）
- 💾 本地数据缓存，提升加载速度

## 技术栈 🛠️

- **前端框架**: React + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **数据可视化**: React Heat Map
- **区块链数据**: Flipside API
- **状态管理**: React Context
- **数据缓存**: IndexedDB

## 快速开始 🚀

### 环境要求

- Node.js >= 16
- pnpm

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/lispking/gas-dog.git
cd gas-dog
```

2. 安装依赖
```bash
pnpm install
```

3. 配置环境变量
```bash
cp .env.example .env
```
编辑 .env 文件，填入必要的配置信息

4. 启动开发服务器
```bash
pnpm dev
```

## 项目结构 📁

```
src/
├── components/     # UI组件
├── contexts/       # React Context
├── hooks/          # 自定义Hooks
├── queries/        # Flipside查询
├── types/          # TypeScript类型定义
└── utils/          # 工具函数
```

## 主要功能 💡

### Gas费用追踪
- 实时查看Monad链上的Gas消耗
- 支持按时间范围筛选数据
- 展示Gas费用统计和趋势分析

### 数据可视化
- Gas消耗热力图
- 交易类型分布图
- Gas费用趋势图

### 多语言支持
- 支持中文和英文界面切换
- 易于扩展其他语言

## 贡献指南 🤝

欢迎提交Issue和Pull Request！

## 许可证 📄

本项目基于 Apache-2.0 许可证开源，详见[LICENSE](LICENSE)文件。

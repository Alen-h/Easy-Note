# Easy Note 打包脚本使用说明

## 脚本功能

`package.sh` 是一个自动化的Chrome扩展打包脚本，用于：
- 自动打包项目文件
- 生成适合Chrome Web Store提交的zip文件
- 将打包文件统一存放在 `releases/` 文件夹中
- 生成包含版本信息的详细文档

## 使用方法

### 1. 直接运行脚本
```bash
./package.sh
```

### 2. 脚本会自动完成以下步骤：
- 从 `manifest.json` 读取版本号
- 创建 `releases/` 目录
- 复制必要的文件到临时目录
- 验证文件完整性
- 生成带时间戳的zip文件
- 生成包信息文档
- 清理临时文件

## 生成的文件

打包完成后，在 `releases/` 目录中会生成：
- `Easy-Note_v{版本号}_{时间戳}.zip` - 扩展包文件
- `package_info.txt` - 包含版本信息和安装说明的文档

## 包含的文件

脚本会自动打包以下文件：
- `manifest.json` - 扩展配置文件
- `background.js` - 后台脚本
- `content.js` - 内容脚本
- `sidebar.html` - 侧边栏界面
- `sidebar.css` - 样式文件
- `README.md` - 项目说明
- `PRIVACY_POLICY.md` - 隐私政策
- `icons/` - 图标文件夹

## 排除的文件

脚本会自动排除以下文件：
- `.DS_Store` - macOS系统文件
- `.git*` - Git版本控制文件
- `.svn*` - SVN版本控制文件
- `*.tmp*` - 临时文件
- `*.temp*` - 临时文件
- `*.log*` - 日志文件

## 脚本特性

- ✅ 彩色输出和进度提示
- ✅ 自动版本识别
- ✅ 文件验证检查
- ✅ 错误处理和清理
- ✅ 时间戳命名
- ✅ 包大小显示

## 首次使用

如果脚本没有执行权限，请先运行：
```bash
chmod +x package.sh
```

## 注意事项

1. 确保在项目根目录运行脚本
2. 确保 `manifest.json` 文件存在且格式正确
3. 确保所有必要的文件都在项目目录中
4. 生成的zip文件可以直接上传到Chrome Web Store

## 示例输出

```
[INFO] Starting Easy Note Chrome Extension packaging...
[INFO] Project: Easy-Note
[INFO] Version: 1.0
[INFO] Created releases directory: releases
[INFO] Preparing package...
[SUCCESS] Files copied to temporary directory
[INFO] Validating package contents...
[SUCCESS] Package validation completed
[INFO] Creating zip package: Easy-Note_v1.0_20250704_223645.zip
[SUCCESS] Package created: releases/Easy-Note_v1.0_20250704_223645.zip
[INFO] Package size: 627K
[SUCCESS] Package info generated: releases/package_info.txt
[SUCCESS] ✅ Packaging completed successfully!
[INFO] 📦 Package location: releases/
[INFO] 🚀 Ready for Chrome Web Store submission
``` 
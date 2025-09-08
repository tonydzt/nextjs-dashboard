## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Google Analytics 配置

本项目已集成Google Analytics 4 (GA4)功能，用于监控网站流量情况。要启用此功能，请按照以下步骤操作：

### 1. 获取Google Analytics测量ID

1. 访问[Google Analytics官网](https://analytics.google.com/)
2. 登录您的Google账号
3. 创建一个新的GA4属性
4. 在"数据流"中创建一个网站数据流
5. 获取生成的测量ID（通常格式为：G-XXXXXXXXXX）

### 2. 配置环境变量

1. 在项目根目录创建`.env.local`文件
2. 复制`.env.local.example`文件中的内容
3. 用您实际的Google Analytics测量ID替换`G-XXXXXXXXXX`

```env
# Google Analytics 配置
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# 可选：启用调试模式（仅在开发环境使用）
# NEXT_PUBLIC_GA_DEBUG=true
```

### 3. 手动事件跟踪（可选）

项目中包含了一个`trackEvent`函数，可以用于手动跟踪用户交互事件：

```tsx
import { trackEvent } from '@/app/components/google-analytics';

// 在用户点击按钮时跟踪事件
trackEvent('button_click', 'engagement', 'submit_form');
```

### 4. 验证配置

配置完成后，重新启动开发服务器：

```bash
pnpm dev
```

访问网站并在Google Analytics控制台中验证数据是否正常收集。

### 注意事项

- `.env.local`文件包含敏感信息，请确保它已添加到`.gitignore`中（本项目已配置）
- 在生产环境中，请确保使用正确的测量ID并移除调试模式
- 更多关于Google Analytics 4的信息，请参考[官方文档](https://developers.google.com/analytics/devguides/collection/ga4)

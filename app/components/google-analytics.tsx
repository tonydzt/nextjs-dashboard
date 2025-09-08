'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// 扩展Window接口以支持gtag函数
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// 获取Google Analytics测量ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

interface GoogleAnalyticsProps {
  debug?: boolean;
}

/**
 * Google Analytics 4 组件
 * 用于在Next.js 15.x项目中集成GA4
 */
export default function GoogleAnalytics({ debug = false }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 检查是否配置了GA测量ID
  if (!GA_MEASUREMENT_ID) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Google Analytics未配置，请在.env文件中添加NEXT_PUBLIC_GA_MEASUREMENT_ID');
    }
    return null;
  }

  // 监听路由变化并发送页面浏览事件
  useEffect(() => {
    if (!pathname) return;

    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    // 发送页面浏览事件
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        debug_mode: debug,
      });
    }
  }, [pathname, searchParams, debug]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {
          `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              debug_mode: ${debug},
            });
          `
        }
      </Script>
    </>
  );
}

/**
 * 用于手动触发Google Analytics事件的工具函数
 * @param action 事件动作名称
 * @param category 事件类别
 * @param label 事件标签
 * @param value 事件值
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!GA_MEASUREMENT_ID) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Google Analytics未配置，无法发送事件');
    }
    return;
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
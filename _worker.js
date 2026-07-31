/**
 * Cloudflare Worker 入口文件
 * 
 * 这个 Worker 提供静态文件服务,并可以扩展 API 功能
 * 如果只需要静态部署,推荐直接使用 Cloudflare Pages
 */

import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  try {
    // 尝试从 KV 返回静态资源
    return await getAssetFromKV(event)
  } catch (e) {
    // 如果找不到文件,返回 index.html(用于 SPA 路由)
    try {
      let notFoundResponse = await getAssetFromKV(event, {
        mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
      })
      return new Response(notFoundResponse.body, { ...notFoundResponse, status: 200 })
    } catch (e) {
      return new Response('Not Found', { status: 404 })
    }
  }
}

/**
 * 示例: 添加 API 端点
 * 取消注释以下代码可以添加后端功能
 */

/*
async function handleEvent(event) {
  const url = new URL(event.request.url)
  
  // API 端点示例
  if (url.pathname.startsWith('/api/')) {
    return handleAPI(event, url)
  }
  
  // 静态文件服务
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    return new Response('Not Found', { status: 404 })
  }
}

async function handleAPI(event, url) {
  // 示例: 获取歌单
  if (url.pathname === '/api/songs' && event.request.method === 'GET') {
    // 从 KV 读取歌单数据
    const songs = await SONGS_KV.get('songs', 'json')
    return new Response(JSON.stringify(songs || []), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  // 示例: 保存点歌记录
  if (url.pathname === '/api/orders' && event.request.method === 'POST') {
    const order = await event.request.json()
    // 保存到 KV
    await SONGS_KV.put(`order-${Date.now()}`, JSON.stringify(order))
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  return new Response('Not Found', { status: 404 })
}
*/
import {request} from './request'

export function getCategoryMenu() {
  return request({
    url: '/category'
  })
}

export function getCategoryDetail(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryGoods(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
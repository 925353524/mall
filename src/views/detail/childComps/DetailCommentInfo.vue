<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="comment-info-title">
      <div class="comment-info-head">用户评价</div>
      <div class="comment-info-more">更多</div>
    </div>
    <div class="comment-user-info">
      <img :src="commentInfo.user.avatar">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="comment-info-content">
      <p>{{ commentInfo.content }}</p>
      <div class="comment-info-other">
        <span class="comment-info-time">{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="comment-info-imgs">
        <img :src="item" v-for="(item, index) in commentInfo.images">
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'common/utils'

export default {
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      // 1.初始化
      const date = new Date(value * 1000)
      return formatDate(date,'yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .comment-info-title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .comment-info-head {
    float: left;
    font-size: 15px;
  }

  .comment-info-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .comment-user-info {
    padding: 10px 0 5px;
  }

  .comment-user-info img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .comment-user-info span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .comment-info-content {
    padding: 0 5px 15px;
  }

  .comment-info-content p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .comment-info-content .comment-info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .comment-info-other .comment-info-time {
    margin-right: 8px;
  }

  .comment-info-imgs {
    margin-top: 10px;
  }

  .comment-info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
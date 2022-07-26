<template>
  <div class="comment">
    <!--    评论列表-->
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index">
        <template #title>
          <div class="item">
            <van-image
                width="40"
                height="40"
                :src="item.aut_photo"
                round
                fit="cover"
            ></van-image>
            <div class="msg">
              <div class="name">{{ item.aut_name }}</div>
              <div class="com">{{ item.content }}</div>
              <div class="other">
                <span class="time">{{ item.pubdate | timefromnow }}</span>
                <van-button size="mini" @click="openReply(item)">回复({{ item.reply_count }})</van-button>
              </div>
            </div>
            <van-icon name="like-o"/>
          </div>
        </template>
      </van-cell>
    </van-list>
    <!--    评论输入框-->
    <van-field
        class="myfield"
        v-model="content"
        clearable
        placeholder="请输入评论"
    >
      <template #button>
        <van-button size="small" type="info" @click="sendCom">发布</van-button>
      </template>
    </van-field>
    <!--    回复组件-->
    <van-action-sheet v-model="sheetShow" title="发表回复">
      <reply v-if="sheetShow" :currentCom="currentCom"></reply>
    </van-action-sheet>
  </div>
</template>

<script>
import {getCommentsAPI, setCommentAPI} from "@/api";

export default {
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      content: '',
      //获取文章id
      art_id: this.$route.query.id,
      //分页表示
      offset: undefined,
      //结束的表示
      end_id: 0,
      //控制回复面板的显示与隐藏
      sheetShow: false,
      //当前点击的评论对象
      currentCom:{}
    }
  },
  methods: {
    //打开回复面板
    openReply(item){
      this.sheetShow = true
      //将点击的数据赋值给currentCom
      this.currentCom = item;
    },
    //发送评论内容到服务器
    async sendCom() {
      const res = await setCommentAPI({
        target: this.art_id,
        content: this.content
      })
      //提示成功
      this.$toast.success('评论成功')
      //更新评论，将最新的评论添加到list的最前面
      this.list.unshift(res.data.data.new_obj)
      //清空输入框
      this.content = ''
    },
    async onLoad() {
      //请求评论数据
      const res = await getCommentsAPI({
        type: 'a',
        source: this.art_id,
        offset: this.offset,
      });
      //接受返回的数据源
      this.list = [...this.list, ...res.data.data.results]
      //保存下一页的表示
      this.offset = res.data.data.last_id
      //保存结束的表示
      this.end_id = res.data.data.end_id
      //将加载状态改为false
      this.loading = false
      //判断数据源是否加载完毕
      if (this.offset === this.end_id) {
        this.finished = true
      }
    }
  },
  components: {
    reply: () => import('./reply')
  }
}
</script>
<style lang="less">
.comment {
  margin-bottom: 56px;
  margin-top: 50px;

  .item {
    display: flex;

    .msg {
      margin-left: 20px;
      flex: 1;

      .name {
        color: #4a6c9d;
      }

      .other {
        display: flex;

        .time {
          margin-right: 5px;
        }
      }
    }
  }

  .myfield {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
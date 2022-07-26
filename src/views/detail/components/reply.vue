<template>
  <div class="reply">
<!--需要回复的评论-->
    <van-cell>
      <template #title>
        <div class="item">
          <van-image
              width="40"
              height="40"
              :src="currentCom.aut_photo"
              round
              fit="cover"
          ></van-image>
          <div class="msg">
            <div class="name">{{ currentCom.aut_name }}</div>
            <div class="com">{{  currentCom.content }}</div>
            <div class="other">
              <span class="time">{{currentCom.pubdate | timefromnow}}</span>
            </div>
          </div>
        </div>
      </template>
    </van-cell>

    <div class="line">-- 全部回复 --</div>
<!--评论的回复列表-->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onload">

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
              <div class="com">{{  item.content }}</div>
              <div class="other">
                <span class="time">{{item.pubdate | timefromnow}}</span>
              </div>
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
<!--回复的输入框-->
    <van-field
        class="myfield"
        v-model="content"
        clearable
        placeholder="请输入拼论"
    >
      <template #button>
        <van-button size="small" type="info" @click="sendCom">发布</van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
import {getCommentsAPI, setCommentAPI} from "@/api";

export default {
  //currentCom当前评论点击的对象
  props:['currentCom'],
  data(){
    return{
      list:[],
      loading:false,
      finished:false,
      content:'',
      offset:undefined,
      limit:10,
    }
  },
  methods:{
    async onload(){
      const res = await getCommentsAPI({
        type:'c',
        source:this.currentCom.com_id,//评论的id
        offset:this.offset,
        limit:this.limit
      })
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
    },
    //提交回复数据
    async sendCom() {
      const res = await setCommentAPI({
        target:this.currentCom.com_id,//评论的id
        content:this.content,//回复的内容
        art_id:this.$route.query.id
      })
      //将返回的回复数据添加到list中前面
      this.list.unshift(res.data.data.new_obj);
      //清空输入框
      this.content = '';
      this.currentCom.reply_count++;
    }
  },
}
</script>

<style lang="less">
  .reply {
    .line{
      font-size: 14px;
      color: #666;
      text-align: center;
      margin: 30px 0;
    }
  }
</style>
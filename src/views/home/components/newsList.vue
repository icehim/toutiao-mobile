<template>
  <div class="newsList">
    <van-list @load="onload" v-model="loading" :finished="finished" finished-text="没有更多数据了">
      <van-cell v-for="(item,index) in newList" :key="index" :title="item.title">
        <template #label>
          <!--图片区域-->
          <van-grid v-if="item.cover.type!==0" :border="false" :column-num="3">
            <van-grid-item v-for="(subitem,subindex) in item.cover.images" :key="subindex">
              <van-image :src="subitem"/>
            </van-grid-item>
          </van-grid>
          <!--文章详情-->
          <div class="detail">
            <span>{{item.aut_name}}</span>
            <span>{{item.comm_count}}</span>
            <span>{{item.pubdate}}</span>
            <van-icon class="myicon" name="cross"/>
          </div>
        </template>
      </van-cell>

    </van-list>
  </div>
</template>

<script>
import {getNewListAPI} from "@/api";

export default {
  //接受外界传入的参数:channel_id(频道的id)
  props: ['channel_id'],
  data() {
    return {
      //文章的数据源列表
      newList: [],
      //控制list组件的加载状态
      loading: false,
      //判断list组件的数据源是否加载完毕
      finished: false,
      timestamp:Date.now()
    }
  },
  methods: {
    //list组件的加载方法
    //触发时机:1.list组件渲染时会触发 2.list组件触底时会触发
    //注意点:如果list组件默认有数据，初始化也不会执行
    //触发后会自动将 v-model改为 true，无法继续执行 onload ，需要手动将v-model 改为 false
    async onload() {
      //获取文章列表数据
      const res = await getNewListAPI({
        channel_id: this.channel_id,
        timestamp: this.timestamp,
      });
      // res.data.data 中有两个属性: results:新闻数据源 pre_timestamp:下一次请求的时间戳
      //保存数据源
      // this.newList = res.data.data.results  //新数据会将就数据覆盖掉
      //这里的数据不能覆盖，应该拼接
      this.newList = [...this.newList,...res.data.data.results]
      //保存下一次请求的时间戳
      this.timestamp = res.data.data.pre_timestamp;
      //手动将v-model改为false
      this.loading = false
      //判断是否还有后续数据
      if (this.timestamp === null) {
        //将list设置为数据源加载完毕的状态
        this.finished = true
      }
    },
  }
}
</script>

<style lang="less">
.newsList {
  position: fixed;
  top: 90px;
  bottom: 50px;
  left: 0;
  width: 100%;
  overflow: auto;

  .detail {
    span {
      margin-right: 10px;
    }

    .myicon {
      float: right;
      color: #999;
    }
  }
}
</style>
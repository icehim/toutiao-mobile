<template>
  <div class="result">
<!--    顶部导航栏-->
    <van-nav-bar :title="`“${key}”的搜索结果`" fixed left-arrow @click-left="$router.back()"/>
<!--    搜索结果-->
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" @click="toDetail(item.art_id)"/>
    </van-list>
  </div>
</template>

<script>
import {getResultAPI} from "@/api";

export default {
  data() {
    return {
      //搜索的关键字
      key: this.$route.query.key,
      // list的加载状态
      loading:false,
      // list的数据源是否加载完毕
      finished:false,
      // 数据源
      list:[],
      //当前页
      page:1,
      // 页容量
      pre_page:10,
      //总数量
      total:-1
    }
  },
  methods:{
    //跳转到文章相亲
    toDetail(art_id){
      this.$router.push(`/home/detail?id=${art_id}`)
    },
    async onLoad(){
      const res= await getResultAPI({
        page:this.page,
        pre_page:'',
        q:this.key
      })
      //保存数据到list中（不能直接赋值，要进行拼接）
      this.list = [...this.list,...res.data.data.results]
      //保存总数量
      this.total = res.data.data.total_count
      //将加载状态设置为false
      this.loading = false
      //判断数据源是否加载完毕
      if (this.list.length >= this.total){
        this.finished = true;
      }
    }
  }
}
</script>

<style lang="less">
.result {
  margin-top: 50px;
}
</style>
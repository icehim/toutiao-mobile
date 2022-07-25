<template>
  <div class="home">
    <!--    顶部导航:navbar-->
    <van-nav-bar>
      <template #left>
        <van-image
            width="100"
            fit="contain"
            :src="require('../../assets/logo.png')"
        />
      </template>
      <template #right>
        <van-button>
          <van-icon class="myicon" name="search"/>
          搜索
        </van-button>
      </template>

    </van-nav-bar>
    <!--    频道区域-->
    <van-tabs>
      <van-tab v-for="(item,index) in channelList" :key="item.id" :title="item.name">
        <newList>

        </newList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {getUserChannelAPI} from "@/api";

export default {
  data() {
    return {
      //用来保存用户的频道数据
      channelList: []
    }
  },
  methods: {
    //单独封装一个放来用来得到频道数据
    async getUserChannel() {
      //请求接口得到用户的频道数据
      const res = await getUserChannelAPI()
      // 保存数据
      this.channelList = res.data.data.channels
    }
  },
  created() {
    //得到用户频道
    this.getUserChannel()
  },
  components: {
    newList: () => import('./components/newsList')
  }
}
</script>

<style lang="less">
.home {
  button.van-button.van-button--default.van-button--normal {
    background: #5aabfb;
    color: #fff;
    border: none;
    border-radius: 20px;
    height: 30px;
    padding: 0 20px;
  }

  .myicon {
    color: #fff;
    margin-right: 6px;
  }
}

</style>
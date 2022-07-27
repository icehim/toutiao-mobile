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
    <van-tabs v-model="active">
      <van-tab v-for="(item,index) in channelList" :key="index" :title="item.name">
        <newList :channel_id="item.id">
        </newList>
      </van-tab>

      <!--      频道管理图标-->
      <van-icon class="channelIcon" name="wap-nav" @click="openChannel"/>
    </van-tabs>

    <!--    频道组件-->
    <van-action-sheet v-model="channelShow" title="频道管理">
      <!--      <channel :channelList="channelList" :value="active" @input="(index) => (active=index)"> </channel>-->
      <channel v-model="active" :channelList="channelList"></channel>
    </van-action-sheet>
  </div>
</template>

<script>
import {getUserChannelAPI} from "@/api";
import {getChannel} from "@/utils/auth";

export default {
  data() {
    return {
      //用来保存用户的频道数据
      channelList: [],
      // 控制频道结构的显示与隐藏
      channelShow: false,
      //选中元素的下标
      active: 0
    }
  },
  methods: {

    //打开频道
    openChannel() {
      this.channelShow = true
    },
    //单独封装一个放来用来得到频道数据
    async getUserChannel() {
      //请求接口得到用户的频道数据
      const res = await getUserChannelAPI()
      // 保存数据
      this.channelList = res.data.data.channels
    }
  },
  created() {
    //得到用户token
    const token = this.$store.state.token.token
    // 得到本地数据
    const local = getChannel();
//发请求到服务器:已登录或者未登录且本地没有数据时
// 从本地获取:其他
    if (token || !local) {
      this.getUserChannel()
    } else {
      // 未登录：
      this.channelList = local
    }
  },
  components: {
    newList: () => import('./components/newsList'),
    channel: () => import('./components/channel')
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

  .channelIcon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    height: 44px;
    line-height: 44px;
    width: 10%;
    text-align: center;
    background-color: #fff;
  }

  .van-tabs__nav--line.van-tabs__nav--complete {
    width: 90%;
  }
}

</style>
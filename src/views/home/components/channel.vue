<template>
  <div class="channel">
    <!--    我的频道-->
    <div class="myChannel">
      <div class="head">
        <span class="name">我的频道</span>
        <van-button type="danger" plain size="mini" @click="showCross = !showCross">{{
            showCross ? '取消' : '编辑'
          }}
        </van-button>
      </div>

      <van-grid>
        <van-grid-item @click="changeIndex(index)" v-for="(item,index) in channelList" :key="index">
          <template #text>
            <span :class="{active:value===index}">{{ item.name }}</span>
            <van-icon @click.stop="delChannel(index,item.id)" v-if="showCross && index" class="mycross" name="cross"/>
          </template>
        </van-grid-item>
      </van-grid>

    </div>
    <!--    可选频道-->
    <div class="myChannel">
      <div class="head">
        <span class="name">可选频道</span>
      </div>
      <van-grid>
        <van-grid-item @click="addChannel(item)" v-for="(item,index) in selectChannels" :key="index" :text="item.name"/>

      </van-grid>

    </div>
  </div>
</template>

<script>
import {getAllChannelAPI, addChanelAPI, delChannelAPI} from "@/api";
import {setChannel} from "@/utils/auth";

export default {
  //接受到的我的频道数据
  props: ['channelList', 'value'],
  data() {
    return {
      allChannels: [],
      // 控制x的显示与隐藏
      showCross: false
    }
  },
  computed: {
    //切换选中频道
    // 利用计算属性得到可选频道
    selectChannels() {
      //得到我的频道中的每个元素的id
      const idArr = this.channelList.map(item => {
        return item.id
      })
      //筛选出所有频道中不包括我的频道的数据
      return this.allChannels.filter(item => {
        //剔除掉我的频道
        return !idArr.includes(item.id)
      })
    }
  },
  async created() {
    const res = await getAllChannelAPI()
    //保存所有的频道数据
    this.allChannels = res.data.data.channels
  },
  methods: {
    //删除选中的我的频道
    //index要删除元素的下标
    async delChannel(index, id) {
      this.channelList.splice(index, 1);
      //判断下标
      if (this.value > index) {
        this.$emit('input', this.value - 1);
      }
      //保存操作后的频道数据
      // 得到用户的token
      const token = this.$store.state.token.token
      if (token) {
        // 已登陆：请求服务器
        await delChannelAPI(id)
      } else {
        // 未登：录保存本地
        //将我的频道保存到本地
        setChannel(this.channelList)
      }
      this.$toast.success('删除频道成功')
    },
    //直接将item添加到我的频道
    async addChannel(item) {
      //直接将item 添加到我的频道中
      this.channelList.push(item)
      //数据的持久化
      //得到token
      const token = this.$store.state.token.token
      //判断用户是否登录
      if (token) {
        // 已登陆：请求服务器
        await addChanelAPI({
          channels: [{
            id: item.id,
            seq: this.channelList.length + 1,
          }]
        })
        //提示新增频道成功
        this.$toast.success('新增频道成功')
      } else {
        // 未登：录保存本地
        //将我的频道保存到本地
        setChannel(this.channelList)
        this.$toast.success('新增频道成功')
      }

    },
    changeIndex(index) {
      // 不能在子组件中直接修改value，
      // 因为他是父组件传入的，强行修改会报错:单项数据流
      // 直接传回给父组件
      this.$emit('input', index)
    },
  }
}
</script>

<style lang="less">
.channel {
  font-size: 12px;

  .myChannel {
    .head {
      display: flex;
      justify-content: space-between;
      margin: 10px;
      align-content: center;
    }

    .active {
      color: red;
    }

    .mycross {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
}
</style>
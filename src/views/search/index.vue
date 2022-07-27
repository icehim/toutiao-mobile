<template>
  <div class="search">
    <!--顶部导航-->
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!--搜索区域-->
    <div class="sear">
      <van-icon class="myicon" name="search"/>
      <input class="ipt" type="text" v-model="key" placeholder="请输入搜索关键字" @input="inputFn">
      <button @click="toResult" class="btn">搜索</button>
    </div>
    <!--历史记录-->
    <van-cell-group v-if="!key">
      <van-cell class="mytitle" title="历史记录">
        <template #default>
          <van-icon name="cross" @click="clear"/>
        </template>
      </van-cell>
      <van-cell v-for="(item,index) in historyList" :key="index" :title="item" @click="hisToResult(item)"/>
    </van-cell-group>
    <!--联想区域-->
    <van-cell-group v-else>
      <van-cell class="mytitle" title="联想区域"/>
      <van-cell v-for="(item,index) in thinkList" :key="index" icon="search">
        <template #title>
          <span @click="toThinkResult(item)" v-html="item"></span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import {getThinkAPI} from "@/api";

export default {
  data() {
    return {
      //搜索框中的关键字
      key: '',
      //用来保存联想后的结果
      thinkList: [],
      //定义一个防抖的定时器
      timer: null,
      //定义一个保存历史记录的数组
      historyList: JSON.parse(window.localStorage.getItem('history')) || []
    }
  },
  methods: {
    hisToResult(item) {
      this.$router.push(`/search/result?key=${item}`);
    },
    //清除历史记录
    clear() {
      this.$dialog.confirm({
        title: '警告',
        message: '是否删除历史记录',
      })
          .then(() => {
            // on confirm
            //清除historyList
            this.historyList = []
            //清除localstorage
            window.localStorage.removeItem('history')
          })
          .catch(() => {
            // on cancel
          });
    },
    //将搜索记录保存到本地
    saveToLocal(item) {
      //将关键字保存到historyList中
      //排序
      this.historyList.unshift(item);
      //去重
      this.historyList = [...new Set(this.historyList)]
      //限制长度
      if (this.historyList.length > 5) {
        this.historyList.splice(5);
      }
      //再将historyList保存到localstorage中
      window.localStorage.setItem('history', JSON.stringify(this.historyList))
    },
    //点击联想cell跳转到结果页面
    toThinkResult(item) {
      //将item中的span替换回来
      item = item.replace(
          `<span style="color:red">${this.key}</span>`,
          this.key
      );
      this.$router.push(`/search/result?key=${item}`);
      //保存
      this.saveToLocal(item)
    },
    //跳转到搜索结果页面
    toResult() {
      this.$router.push(`/search/result?key=${this.key}`);
      //保存
      this.saveToLocal(this.key)
    },
    // 当输入框中输入内容时会触发
    inputFn() {
      clearTimeout(this.timer)

      // 得到关键字
      // 判断key中是否有值
      if (!this.key) return;
      this.timer = setTimeout(async () => {
        // 根据关键字发送到服务器
        const res = await getThinkAPI({
          q: this.key
        })
        //创建一个不区分大小写的正则
        const reg = new RegExp(this.key, "ig")
        //让联想内容中的关键字高亮 key => span
        this.thinkList = res.data.data.options.map(item => {
          return item.replace(reg, `<span style="color:red">${this.key}</span>`)
        })
      }, 500)
    }
  }
}
</script>

<style lang="less">
.search {
  font-size: 14px;

  .sear {
    margin: 10px;
    display: flex;
    position: relative;

    .myicon {
      position: absolute;
      left: 10px;
      top: 10px;
    }

    .ipt {
      height: 34px;
      line-height: 34px;
      background-color: #f7f8fa;
      border-radius: 20px;
      border: none;
      flex: 1;
      padding-left: 30px;

    }

    .btn {
      border: none;
      line-height: 34px;
      background-color: #ffffff;
    }

  }

  .mytitle {
    font-weight: 700;
  }
}
</style>
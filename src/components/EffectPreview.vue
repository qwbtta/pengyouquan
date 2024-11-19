<template>
  <div class="EffectPreview">
    <div class="head flex">
      <span>朋友圈预览</span>
      <img src="@/assets/img/close.svg" alt="" @click="close" />
    </div>
    <div class="main">
      <img class="main_left" src="@/assets/img/test.svg" alt="" />
      <div class="main_right column">
        <span class="nickname">昵称</span>
        <span class="content">{{ args.content }}</span>
        <div class="file_con">
          <img
            class="file_item"
            v-for="(item, index) in fileList"
            :key="index"
            :src="item.uri"
            alt=""
          />
        </div>
        <div class="footer_con flex">
          <span class="time">1分钟前</span>
          <img class="more" src="@/assets/img/more.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script  setup>
import { ref } from "vue";

const { args, fileList } = defineProps({
  args: {
    type: Object,
    required: true,
  },
  fileList: {
    type: Array,
  },
});

console.log(args, "args");
const emits = defineEmits(["close"]);
function close() {
  emits("close");
}
</script>
  
  <style lang="scss" scoped>
.EffectPreview {
  width: 598px;
  height: 100%;
  background: #fcfcfc;
  box-shadow: -20px 0px 20px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 0;
  top: 0;
  .head {
    width: 598px;
    height: 58px;
    border-bottom: 1px solid #d8d8d8;
    justify-content: space-between;
    padding: 0 20px;
    font-weight: 500;
    font-size: 18px;
    color: #191919;
    > img {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    padding: 32px;
    .main_left {
      width: 56px;
      height: 56px;
      border-radius: 8px;
      margin-right: 24px;
    }
    .main_right {
      .nickname {
        height: 26px;
        font-family: Source Han Sans, Source Han Sans;
        font-weight: 500;
        font-size: 18px;
        color: #409eff;
        line-height: 26px;
      }
      .content {
        font-family: Source Han Sans, Source Han Sans;
        font-weight: 500;
        font-size: 18px;
        color: #3d3d3d;
        line-height: 26px;
        margin-top: 4px;
        margin-bottom: 12px;
      }
      .file_con {
        display: flex;
        flex-wrap: wrap;
        .file_item {
          width: 146px;
          height: 146px;
          margin-right: 8px;
          margin-bottom: 8px;
          &:nth-of-type(3n) {
            margin-right: 0;
          }
        }
      }
      .footer_con {
        margin-top: 4px;
        justify-content: space-between;
        .time {
          font-family: Source Han Sans, Source Han Sans;
          font-weight: 700;
          font-size: 16px;
          color: #888888;
        }
        .more {
          width: 32px;
          height: 20px;
        }
      }
    }
  }
}
</style>
  
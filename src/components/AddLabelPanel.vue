<template>
  <div
    @click.stop
    class="absolutePositon"
    :class="{ fixedPositon: activeFuncItem }"
  >
    <div class="add_panel" @click.stop>
      <div class="panel_top">
        <div class="subtitle">标签名称</div>
        <div class="input_con">
          <input type="text" v-model="editLabel" maxlength="16" /><span
            class="count"
            >{{ editLabel.length }}/16</span
          >
        </div>
      </div>
      <div
        class="panel_middle"
        v-if="!activeFuncItem || !activeFuncItem.tag_group"
      >
        <div class="subtitle">选择要添加的分类</div>
        <div class="radio_list">
          <div
            v-for="(item, index) in classificationList"
            :key="index"
            class="radio_item flex"
          >
            <input
              type="radio"
              :id="item"
              :value="item"
              name="classification"
              v-model="classificationAttribution"
            /><label :for="item">{{ item }}</label>
          </div>
        </div>
      </div>
      <div class="panel_bottom flex">
        <div class="btn btn1" @click="confirm">确认</div>
        <div class="btn btn2" @click="close()">取消</div>
      </div>
    </div>
  </div>
</template>
  
  <script  setup>
import { defineProps, ref } from "vue";
import {
  getTagTypes,
  addTags,
  editTags,
  deleteTags,
} from "@/assets/js/request";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";

const { classificationList, activeFuncItem } = defineProps({
  classificationList: {
    type: Array,
    required: true,
  },
  activeFuncItem: {
    type: Object,
  },
});

let editLabel = ref(""); //新建/编辑标签
let classificationAttribution = ref(""); //所属分类
if (activeFuncItem) {
  editLabel.value = activeFuncItem.tag_name;
  // classificationAttribution.value = activeFuncItem.tag_group;
}
console.log(activeFuncItem);
const emits = defineEmits(["close"]);
function close(getList) {
  emits("close", getList);
}
function errorTips() {
  ElMessage({
    message: "标签名称和分类都必须填写!",
    type: "error",
  });
}

function confirm() {
  if (
    !editLabel.value ||
    (!classificationAttribution.value && !activeFuncItem?.tag_group)
  ) {
    console.log(editLabel.value);
    console.log(classificationAttribution.value);
    console.log(activeFuncItem?.tag_group);
    errorTips();
    return;
  }
  if (activeFuncItem) {
    //编辑
    editTags({
      id: activeFuncItem.id, //id
      tag_name: editLabel.value, //标签名称
      tag_group: classificationAttribution.value || activeFuncItem.tag_group, //标签分类
    }).then((res) => {
      close("getList");
    });
  } else {
    //新增
    addTags({
      tag_name: editLabel.value, //标签名称
      tag_group: classificationAttribution.value, //标签分类
    }).then((res) => {
      close("getList");
    });
  }
}
</script>
  
<style lang="scss" scoped>
.fixedPositon {
  position: fixed !important;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba($color: #000000, $alpha: 0.6);
  z-index: 999;
}
.absolutePositon {
  position: absolute;
  right: 0;
  top: 40px;
}
.add_panel {
  width: 400px;
  border-radius: 8px;
  background: #fcfcfc;
  box-shadow: 0px 0px 20px 0px #00000019;
  .subtitle {
    height: 22px;
    color: #3d3d3d;
    font-size: 14px;
    line-height: 22px;
  }
  .panel_top {
    padding: 20px;
    height: 110px;
    border-bottom: 1px solid #e0e0e0;
    .input_con {
      margin-top: 8px;
      position: relative;
      input {
        width: 360px;
        height: 40px;
        border-radius: 4px;
        background: #ffffff;
        border: 1px solid #dcdfe6;
        padding: 0 16px;
      }
      .count {
        position: absolute;
        top: 12px;
        right: 16px;
        color: #86909c;
        font-size: 14px;
      }
    }
  }
  .panel_middle {
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
    .radio_list {
      max-height: 400px;
      overflow: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      .radio_item {
        height: 22px;
        margin-top: 12px;
        input[type="radio"] {
          margin: 0 6px 0 0;
        }
        label {
          color: #000000e5;
          font-size: 14px;
        }
      }
    }
  }
  .panel_bottom {
    height: 76px;
    padding: 0 20px;
    .btn {
      width: 110px;
      height: 44px;
      border-radius: 757px;
      text-align: center;
      line-height: 44px;
      font-size: 14px;
      margin-right: 16px;
      cursor: pointer;
    }
    .btn1 {
      background: #4485ff;
      color: #ffffff;
    }
    .btn2 {
      border: 1px solid #909399;
      color: #60656e;
    }
  }
}
</style>
  
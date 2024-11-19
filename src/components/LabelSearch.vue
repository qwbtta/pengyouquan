<template>
  <div class="LabelSearch flex" @click="clickHandle">
    <img @click.stop class="search" src="@/assets/img/search.svg" alt="" />
    <!-- 选中标签列表 -->
    <div
      v-if="checkedLabelList.length > 0"
      @click.stop
      class="checked_list flex"
    >
      <div
        class="checked_item flex"
        v-for="(item, index) in checkedLabelList"
        :key="index"
      >
        {{ item }}
        <img src="@/assets/img/close.svg" alt="" @click="deleteLabel(index)" />
      </div>
    </div>
    <!-- 输入框部分 -->
    <div @click.stop class="input_con">
      <span class="hide_span">{{ inputValue }}</span>
      <input
        id="searchInput"
        class="LabelSearch_input"
        type="text"
        v-model="inputValue"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="showResultArea = true"
        placeholder="请选择"
      />
    </div>
    <!-- 弹窗部分 -->
    <div v-if="showResultArea" @click.stop class="result_area">
      <div v-if="showAddRow" class="add_row flex" @click="addLabel">
        <img class="add" src="@/assets/img/add.svg" alt="" />
        新增朋友圈标签“<span class="inputValue">{{ inputValue }}</span
        >”
      </div>
      <el-checkbox-group class="column" v-model="checkedLabelList">
        <el-checkbox
          v-for="(item, index) in fliterLabelList.length > 0
            ? fliterLabelList
            : labelList"
          :key="index"
          :label="item"
          :value="item"
        >
          {{ item }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
  
  <script  setup>
import { ref, computed, watch } from "vue";
import { getTagTypes, addTags } from "@/assets/js/request";
let inputValue = ref("");
let inputEventBound = ref(false); //输入监听--针对拼音防抖
let labelList = ref([]); //所有的标签列表
let fliterLabelList = ref([]); //输入筛选的标签列表
let checkedLabelList = ref([]); //选中的标签列表
let showResultArea = ref(false); //展示下拉区域
let showAddRow = computed(() => {
  fliterLabelList.value = [];
  //是否展示新增标签区域
  if (!inputValue.value) {
    return false;
  }
  for (let i = 0; i < labelList.value.length; i++) {
    if (labelList.value[i].includes(inputValue.value)) {
      fliterLabelList.value.push(labelList.value[i]);
    }
  }
  return fliterLabelList.value.length > 0 ? false : true;
});

const emits = defineEmits(["valueChange"]);
watch(checkedLabelList, (newVal, oldVal) => {
  emits("valueChange", newVal.join(","));
});

function handleCompositionStart() {
  // 开始拼音输入时，移除input事件监听
  inputEventBound = false;
}
function handleCompositionEnd() {
  // 拼音输入结束时，重新绑定input事件监听
  inputEventBound = true;
  // 触发input事件，以便处理拼音输入后的逻辑
  handleInput();
}
function handleInput() {
  if (inputEventBound) {
    // 只有当input事件监听器是绑定状态时才执行处理逻辑
  }
}
function addLabel() {
  addTags({
    tag_name: inputValue.value, //标签名称
    tag_group: "朋友圈标签", //标签分类
  }).then((res) => {
    getList();
  });
}
function deleteLabel(index) {
  checkedLabelList.value.splice(index, 1);
}
function clickHandle() {
  showResultArea.value = !showResultArea.value;
  if (showResultArea.value) {
    let searchInput = document.getElementById("searchInput");
    searchInput.focus();
  }
}
function getList() {
  labelList.value = [];
  getTagTypes({ tag_group: "朋友圈标签" }).then((res) => {
    let temp = [];
    for (let i = 0; i < res.data.length; i++) {
      temp = [...temp, ...res.data[i].group_children];
    }
    for (let y = 0; y < temp.length; y++) {
      labelList.value.push(temp[y].tag_name);
    }
  });
}
getList();
</script>
  
<style lang="scss" scoped>
.LabelSearch {
  position: relative;
  width: 634px;
  height: 40px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding-right: 32px;
  .input_con {
    display: inline-block;
    position: relative;
    height: 100%;
    font-size: 14px;
    color: #191919;
    min-width: 56px;
    .hide_span {
      display: inline-block;
      height: 100%;
      opacity: 0;
      padding-left: 12px;
    }
    .LabelSearch_input {
      display: inline-block;
      width: 100%;
      height: 100%;
      background: #ffffff;
      padding-left: 12px;
      position: absolute;
      left: 0;
      top: 0;
      &::placeholder {
        font-size: 14px;
        color: #a8abb2;
      }
    }
  }

  .search {
    position: absolute;
    top: 12px;
    right: 10px;
    width: 16px;
    height: 16px;
    z-index: 1;
  }
  .checked_list {
    height: 40px;
    padding-left: 16px;
    .checked_item {
      height: 24px;
      background: #e7e7e7;
      border-radius: 3px;
      padding: 0 8px;
      margin-right: 7px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.9);
      img {
        width: 14px;
        height: 14px;
        cursor: pointer;
        margin-left: 8px;
      }
    }
  }
  .result_area {
    position: absolute;
    top: 48px;
    left: 0;
    padding: 0 14px;
    width: 634px;
    background: #ffffff;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.1),
      0px 8px 10px 1px rgba(0, 0, 0, 0.06), 0px 3px 14px 2px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    border: 1px solid #dcdcdc;
    .add_row {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.9);
      height: 32px;
      padding: 8px 0;
      border-bottom: 1px solid #d8d8d8;
      box-sizing: content-box;
      cursor: pointer;
      .add {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
      .inputValue {
        color: #56a7fe;
      }
    }
  }
}
</style>
  
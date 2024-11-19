<template>
  <div class="labelManage">
    <div class="router" @click="router.push('/')">去首页</div>
    <div class="main">
      <div class="main_left">
        <div class="label_classification flex">
          <span>标签分类</span>
          <!-- <span class="add" @click="addClassification">+</span> -->
        </div>
        <div class="classification_list">
          <div
            class="classification_item flex"
            :class="{
              active_classification_item: item == activeLabel,
            }"
            v-for="(item, index) in classificationList"
            :key="index"
            @click="checkActiveLabel(item)"
          >
            <!-- @dblclick="showEdit(index)" -->
            {{ item }}
            <!-- <input
              :id="`input${index}`"
              class="label_input"
              v-if="index === activeEditLabel"
              type="text"
              v-model="classificationList[index]"
              @blur="editBlur"
            /> -->
          </div>
          <div
            v-if="showNewClassification"
            class="classification_item active_classification_item flex"
          >
            <input
              id="newClassification"
              class="label_input"
              type="text"
              @blur="newAddBlur"
              v-model="newClassification"
            />
          </div>
        </div>
      </div>
      <div class="main_right">
        <div class="head_row flex">
          <span class="activeLabel">{{ activeLabel }}</span>
          <div class="add_btn flex" @click="toShowAddPanel(null)">
            <span class="add_icon">+</span>新建标签
            <AddLabelPanel
              v-if="showAddPanel"
              @close="closeAddPanel"
              :classificationList="classificationList"
              :activeFuncItem="activeFuncItem"
            />
          </div>
        </div>
        <div class="devide_line"></div>
        <div
          class="labelList_item"
          v-for="item in labelList"
          :key="item.tag_capital"
        >
          <div class="tag_capital">{{ item.tag_capital }}</div>
          <div class="label_list">
            <div
              class="label_item"
              v-for="(childrenItem, index) in item.group_children"
              :key="index"
              @click="labelItemClick(item.tag_capital, index)"
              @contextmenu.prevent="labelItemClick(item.tag_capital, index)"
            >
              {{ childrenItem.tag_name }}
              <div
                v-if="
                  activeFuncPanel == `${item.tag_capital}childrenItem${index}`
                "
                class="func_panel"
              >
                <!-- <div
                  class="func_item"
                  @click="toShowAddPanel(childrenItem, index)"
                >
                  分类
                </div> -->
                <div class="func_item" @click="toShowAddPanel(childrenItem)">
                  编辑
                </div>
                <div class="func_item" @click="deleteLabel(childrenItem)">
                  删除
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script  setup>
import { ref, nextTick } from "vue";
import { getTagTypes, deleteTags } from "@/assets/js/request";
import AddLabelPanel from "@/components/AddLabelPanel.vue";
import { useRouter } from "vue-router";

const router = useRouter();
let classificationList = ref([
  "朋友圈分类",
  "时辰",
  "适合人群",
  "季节",
  "朋友圈标签",
  "天气",
]); //分类列表
let activeLabel = ref("朋友圈分类"); //选中分类
let activeEditLabel = ref(null); //双击编辑状态分类
let newClassification = ref("未命名分类"); //新建分类
let showNewClassification = ref(false); //显示新建分类面板
let showAddPanel = ref(false); //显示新建标签panel
let activeFuncPanel = ref(""); //正在操作的功能栏
let activeFuncItem = ref(null); //右键编辑的对象
let labelList = ref([]); //标签列表

async function addClassification() {
  showNewClassification.value = true;
  await nextTick();
  document.getElementById("newClassification").focus();
}
function checkActiveLabel(item) {
  activeLabel.value = item;
  getLabelList(item);
}
async function showEdit(index) {
  activeEditLabel.value = index;
  await nextTick();
  document.getElementById(`input${index}`).focus();
}
function editBlur() {
  activeEditLabel.value = null;
}
function newAddBlur() {
  classificationList.value.push(newClassification.value);
  newClassification.value = "未命名分类";
  showNewClassification.value = false;
}

function closeAddPanel(e) {
  showAddPanel.value = false;
  activeFuncPanel.value = null;
  if (e == "getList") getLabelList(activeLabel.value);
}
function labelItemClick(tag_capital, index) {
  if (`${tag_capital}childrenItem${index}` == activeFuncPanel.value) {
    activeFuncPanel.value = null;
    return;
  }
  activeFuncPanel.value = `${tag_capital}childrenItem${index}`;
}
function toShowAddPanel(item) {
  activeFuncItem.value = item;
  showAddPanel.value = true;
}
function getLabelList(tagGroupName) {
  if (tagGroupName == "全部标签") tagGroupName = null;
  getTagTypes({ tag_group: tagGroupName }).then((res) => {
    labelList.value = res.data;
  });
}

function deleteLabel(childrenItem) {
  deleteTags({
    id: childrenItem.id, //已被使用的标签不得删除
    tag_group: childrenItem.tag_group,
  }).then((res) => {
    getLabelList(activeLabel.value);
  });
}
getLabelList(activeLabel.value);
</script>
  
<style lang="scss" scoped>
.labelManage {
  height: 100%;
  padding: 24px;
  .main {
    height: 100%;
    width: 100%;
    background: #fcfcfc;
    border-radius: 12px;
    display: flex;
    .main_left {
      width: 296px;
      flex-shrink: 0;
      border-right: 1px solid #e0e0e0;
      padding: 12px;
      .fold_row {
        height: 40px;
        opacity: 1;
        font-size: 14px;
        line-height: 22px;
        cursor: pointer;
        .triangle {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 3px 5px 3px 5px;
          border-color: transparent transparent transparent black;
          margin-left: 18px;
          margin-right: 8px;
        }
      }
      .label_classification {
        height: 40px;
        font-weight: bold;
        font-size: 14px;
        justify-content: space-between;
        padding: 0 12px;
        margin-top: 12px;
        .add {
          font-size: 24px;
          cursor: pointer;
        }
      }
      .classification_list {
      }
      .classification_item {
        width: 270px;
        height: 40px;
        border-radius: 8px;
        color: #1a1a1a;
        font-size: 14px;
        padding: 0 12px;
        position: relative;
        cursor: pointer;
        &:hover {
          background: #e0eaff;
        }
        .label_input {
          position: absolute;
          left: 8px;
          top: 6px;
          width: 255px;
          height: 28px;
          border-radius: 4px;
        }
      }
      .active_classification_item {
        background: #409eff;
        color: #fcfcfc;
        &:hover {
          background: #409eff; //覆盖非active的hover
        }
      }
    }
    .main_right {
      flex-grow: 1;
      padding: 20px 24px;
      .head_row {
        justify-content: space-between;
        .activeLabel {
          opacity: 1;
          color: #3d3d3d;
          font-family: Source Han Sans;
          font-weight: bold;
          font-size: 18px;
        }
        .add_btn {
          position: relative;
          .add_icon {
            font-size: 18px;
            margin-right: 8px;
          }
          width: 112px;
          height: 32px;
          border-radius: 3px;
          background: #409eff;
          color: #ffffff;
          font-size: 14px;
          justify-content: center;
          cursor: pointer;
        }
      }
      .devide_line {
        height: 1px;
        background: #e0e0e0;
        margin-top: 16px;
      }
      .labelList_item {
        .tag_capital {
          height: 26px;
          color: #3d3d3d;
          font-size: 18px;
          line-height: 26px;
          margin-top: 28px;
          &:first-of-type {
            margin-top: 12px;
          }
        }
        .label_list {
          display: flex;
          flex-wrap: wrap;
          .label_item {
            height: 32px;
            border-radius: 3px;
            color: #000000e5;
            font-family: PingFang SC;
            font-size: 14px;
            background: #e7e7e7;
            text-align: center;
            line-height: 32px;
            padding: 0 12px;
            margin-top: 12px;
            margin-right: 12px;
            position: relative;
            cursor: pointer;
            .func_panel {
              position: absolute;
              left: 0;
              top: 40px;
              width: 156px;
              padding: 4px;
              z-index: 1;
              border-radius: 6px;
              background: #ffffff;
              box-shadow: 0px 5px 5px -3px #00000019, 0px 8px 10px 1px #0000000f,
                0px 3px 14px 2px #0000000c;

              .func_item {
                width: 148px;
                height: 28px;
                text-align: left;
                line-height: 28px;
                color: #000000e5;
                font-size: 14px;
                padding-left: 8px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
  
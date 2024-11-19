<template>
  <div class="contain">
    <div class="main">
      <div class="page_head">
        <span class="page_title">新增朋友圈</span
        ><span class="page_des"
          >/ 请根据要求输入对应的参数，请核对输入正确！</span
        >
      </div>
      <div class="title_row flex">
        <div class="color_block"></div>
        <span>新增朋友圈</span>
      </div>
      <div class="sub_item">
        <span class="subtitle">文字</span>
        <textarea
          class="textarea"
          placeholder="请输入"
          v-model="args.content"
        ></textarea>
      </div>
      <div class="sub_item">
        <span class="subtitle">图片/视频</span>
        <div
          class="file_con"
          @dragenter.prevent
          @dragover.prevent
          @dragleave.prevent
          @drop.prevent="dropImages($event)"
        >
          <div class="file_item" v-for="(item, index) in fileList" :key="index">
            <div class="mask flex">
              <div @click="toDeleteFile(item.file_id, index)">
                <img class="func_icon" src="@/assets/img/delete.svg" alt="" />
              </div>
            </div>
            <img class="file" :src="item.imgPreUrl" alt="" />
          </div>
          <div
            v-if="fileList.length < 9"
            class="upload_area column"
            @click="uploadFile"
          >
            <img class="add_icon" src="@/assets/img/plus.svg" alt="" />
            <span>点击或拖拽至此上传图片</span>
          </div>
        </div>
      </div>
      <div class="title_row flex">
        <div class="color_block"></div>
        <span>附加信息</span>
      </div>
      <div class="flex">
        <div class="sub_item" style="margin-right: 40px">
          <span class="subtitle">
            <span class="required_icon">*</span>朋友圈分类</span
          >
          <el-select v-model="args.type">
            <el-option
              v-for="item in classificationList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="sub_item">
          <span class="subtitle">
            <span class="required_icon">*</span>时辰</span
          >
          <el-select v-model="args.time">
            <el-option
              v-for="item in timeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="flex">
        <div class="sub_item" style="margin-right: 40px">
          <span class="subtitle">
            <span class="required_icon">*</span>适合人群</span
          >
          <el-select v-model="args.fit">
            <el-option
              v-for="item in pepleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="sub_item">
          <span class="subtitle">
            <span class="required_icon">*</span>季节</span
          >
          <el-select v-model="args.season">
            <el-option
              v-for="item in seasonList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="flex">
        <div class="sub_item" style="margin-right: 40px">
          <span class="subtitle">
            <span class="required_icon">*</span>朋友圈标签</span
          >
          <LabelSearch @valueChange="setTags" />
        </div>
        <div class="sub_item">
          <span class="subtitle">
            <span class="required_icon">*</span>天气</span
          >
          <el-select v-model="args.weather">
            <el-option
              v-for="item in weatherList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="flex" style="margin-top: 24px">
        <div class="btn btn_type_1" @click="confirm">新 增</div>
        <div class="btn btn_type_2" @click="goPreview">预 览</div>
        <div class="btn btn_type_2" @click="router.push('/')">取 消</div>
      </div>
    </div>
    <EffectPreview
      v-if="showPreview"
      @close="showPreview = false"
      :args="args"
      :fileList="fileList"
    />
  </div>
</template>
  
<script  setup>
import { useRouter } from "vue-router";
import EffectPreview from "@/components/EffectPreview.vue";
import LabelSearch from "@/components/LabelSearch.vue";
import "element-plus/es/components/cascader/style/css";
import "element-plus/es/components/select/style/css";
import {
  addMoments,
  upload,
  deleteFile,
  getFitTags,
  getTypeTags,
  getTagTypes,
  getAccountList,
  getVisibleList,
} from "@/assets/js/request";
import { ref } from "vue";
const router = useRouter();
let showPreview = ref(false);
let fileList = ref([]);
let args = ref({
  content: "",
  type: "",
  fit: "",
  tags: "",
  time: "",
  weather: "",
  season: "",
});
let classificationList = ref([]); //朋友圈分类列表
let pepleList = ref([]); //适合人群标签列表
// let labelList = ref([]); //朋友圈标签列表
let timeList = ref([]); //时辰标签列表
let weatherList = ref([]); //天气标签列表
let seasonList = ref([]); //季节标签列表
function getLabelList(tagGroupName, refName) {
  let tempList1 = [];
  let tempList2 = [];
  getTagTypes({ tag_group: tagGroupName }).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      tempList1 = [...tempList1, ...res.data[i].group_children];
    }
    for (let y = 0; y < tempList1.length; y++) {
      let tempItem = {
        value: tempList1[y].tag_name,
        label: tempList1[y].tag_name,
      };
      tempList2.push(tempItem);
    }
    refName.value = tempList2;
  });
}
getLabelList("朋友圈分类", classificationList);
getLabelList("适合人群", pepleList);
// getLabelList("朋友圈标签", labelList);
getLabelList("时辰", timeList);
getLabelList("天气", weatherList);
getLabelList("季节", seasonList);
function uploadFile() {
  if (document.getElementById("fileInput")) {
    document.body.removeChild(document.getElementById("fileInput"));
  }
  let input = document.createElement("input");
  input.id = "fileInput";
  input.type = "file";
  input.accept = ".png,.jpg,.jpeg,.gif,.PNG,.JPG,.JPEG,.GIF";
  input.style.display = "none";

  document.body.appendChild(input);
  input.addEventListener("change", (e) => {
    dealFile(input.files[0]);
  });
  input.click();
}
function dropImages(e) {
  let datas = e.dataTransfer.files;
  if (datas.length < 1 || fileList.length >= 9) return;
  dealFile(datas[0]);
}
function dealFile(file) {
  upload({ file: file }).then((res) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      let item = {
        uri: "https://crm.jisudonghua.com/" + res.uri,
        imgPreUrl: e.target.result,
        file_id: res.file_id,
      };
      fileList.value.push(item);
      console.log(fileList.value);
    };
    reader.readAsDataURL(file);
  });
}
function toDeleteFile(file_id, index) {
  deleteFile({ file_id: file_id }).then((res) => {});
  fileList.value.splice(index, 1);
}
function setTags(e) {
  args.value.tags = e;
}
function goPreview() {
  showPreview.value = true;
}
function confirm() {
  let imgUri = "";
  for (let i = 0; i < fileList.value.length; i++) {
    imgUri =
      imgUri +
      fileList.value[i].uri +
      (i == fileList.value.length - 1 ? "" : ",");
  }
  let params = {
    type: args.value.type, //朋友圈分类
    fit: args.value.fit, //适合人群
    tags: args.value.tags, //适合人群
    time: args.value.time, //适合人群
    season: args.value.season, //适合人群
    weather: args.value.weather, //适合人群
    // visible_group: "1,2", //可见人员分组（id逗号分隔）
    // pub_account: "4,5,6", //发布账号（id逗号分隔）
    content: args.value.content, //朋友圈内容
    img_uri: imgUri, //配图（路径逗号分隔）
    // publish_time: 1727452800, //预计发布时间
  };
  console.log(params);
  addMoments(params).then((res) => {
    router.push("/");
  });
}
// getFitTags();
// getTypeTags();
// getAccountList();
// getVisibleList();
</script>
  
  <style lang="scss" scoped>
::v-deep .el-input,
.el-select,
.el-select__wrapper {
  width: 634px;
  height: 40px;
}
::v-deep .el-select__wrapper {
  min-height: 40px;
}
.contain {
  height: 100%;
  padding: 24px;
  position: relative;
}
.main {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 24px 32px;
  .page_head {
    display: flex;
    align-items: flex-end;
    margin-bottom: 4px;
    .page_title {
      font-weight: 500;
      font-size: 36px;
      color: #1d2129;
    }
    .page_des {
      font-weight: 500;
      font-size: 14px;
      color: #ababab;
      margin-left: 4px;
    }
  }
  .title_row {
    font-weight: 500;
    font-size: 24px;
    color: #3d3d3d;
    margin-top: 40px;
    margin-bottom: 24px;
    .color_block {
      width: 6px;
      height: 20px;
      background: #4485ff;
      border-radius: 4px;
      margin-right: 8px;
    }
  }
  .sub_item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
  }
  .subtitle {
    margin-top: 9px;
    font-weight: 500;
    font-size: 14px;
    color: #3d3d3d;
    margin-right: 12px;
    text-align: right;
    width: 84px;
  }
  .required_icon {
    font-size: 14px;
    color: #f53f3f;
    margin-right: 5px;
  }

  .input {
    width: 634px;
    height: 40px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    padding: 0 16px;
  }
  .textarea {
    width: 634px;
    height: 96px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    font-size: 14px;
    color: #17273d;
    padding: 9px 16px;
    &::placeholder {
      color: #86909c;
    }
  }
  .file_con {
    display: flex;
    flex-wrap: wrap;
    width: 400px;
  }
  .file_item {
    width: 120px;
    height: 120px;
    margin-right: 12px;
    margin-bottom: 12px;
    position: relative;
    &:hover {
      .mask {
        display: flex;
      }
    }
    .mask {
      display: none;
      width: 120px;
      height: 120px;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba($color: #000000, $alpha: 0.6);
      justify-content: center;
      > div {
        cursor: pointer; //偏移量改色的无奈之举
      }
      .func_icon {
        width: 17px;
        height: 17px;
        filter: drop-shadow(#fff 1000px 0);
        transform: translateX(-1000px);
        cursor: pointer;
      }
    }

    .file {
      width: 120px;
      height: 120px;
    }
  }
  .upload_area {
    width: 120px;
    height: 120px;
    background: #fcfcfc;
    border: 1px dashed #dcdcdc;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.4);
    cursor: pointer;

    .add_icon {
      width: 24px;
      height: 24px;
      margin-bottom: 10px;
      filter: drop-shadow(#262626 1000px 0);
      transform: translateX(-1000px);
    }
    span {
      width: 88px;
      text-align: center;
    }
  }
  .btn {
    width: 110px;
    height: 44px;
    border-radius: 757px;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    cursor: pointer;
  }
  .btn_type_1 {
    color: #ffffff;
    background: #4485ff;
  }
  .btn_type_2 {
    border: 1px solid #909399;
    color: #60656e;
  }
}
</style>
  
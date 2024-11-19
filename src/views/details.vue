<template>
  <div class="details_page">
    <div class="page_left generic">
      <div class="head flex">
        <span class="title">朋友圈详情</span>
        <div v-if="isEdit" class="btn btn_type_1" @click="edit">编 辑</div>
        <div class="btn btn_type_2">发 布</div>
      </div>
      <div class="middle">
        <div class="main">
          <img class="main_left" src="@/assets/img/test.svg" alt="" />
          <div class="main_right column">
            <span class="nickname">昵称</span>
            <!-- <textarea
              v-if="isEdit"
              :value="details.content"
              class="content"
            ></textarea> -->
            <span class="content">
              {{ details.content }}
            </span>
            <div class="file_con">
              <div
                class="file_item"
                v-for="(item, index) in details.img_uri"
                :key="index"
              >
                <!-- <div v-if="isEdit" class="mask flex">
                  <div @click="tempDelete(item.file_id, index)">
                    <img
                      class="func_icon"
                      src="@/assets/img/delete.svg"
                      alt=""
                    />
                  </div>
                </div> -->
                <img class="file" :src="item" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="title_row flex">
          <div class="color_block"></div>
          <span>发布账号</span>
        </div>

        <div class="account_item" v-for="(item, index) in 2" :key="index">
          <div class="account_item_head flex">
            <img src="@/assets/img/test.svg" alt="" />
            <span class="account_name">账户名</span>
            <span class="delete">删除</span>
          </div>
          <div class="set_item">
            <span class="subtitle">定时发布</span>
            <input type="text" class="input" />
          </div>
          <div class="set_item">
            <span class="subtitle">发布位置</span>
            <input type="text" class="input" />
          </div>
          <div class="set_item">
            <span class="subtitle">谁可以看</span>
            <input type="text" class="input" />
          </div>
        </div>
        <span class="add">+ 添加</span>
      </div>
    </div>
    <div class="page_right generic">
      <div class="head flex">
        <span class="title">附加信息</span>
      </div>
      <div class="information_main">
        <div class="title_row2 flex">
          <img src="@/assets/img/row_icon.svg" alt="" />
          <span>附加信息</span>
        </div>
        <div class="flex" style="margin-bottom: 16px">
          <span class="subtitle2">朋友圈标签：</span>
          <div
            class="label label_red"
            :class="{ label_blue: index2 == 1, label_green: index2 == 2 }"
            v-for="(tags, index2) in details.tags?.slice(0, 3)"
            :key="index2"
          >
            {{ tags }}
          </div>
        </div>
        <div class="flex">
          <div class="row_item flex">
            <span class="subtitle2">朋友圈分类：</span>
            <span class="info">{{ details.type }}</span>
          </div>
          <div class="row_item flex">
            <span class="subtitle2">时辰：</span>
            <span class="info">{{ details.time }}</span>
          </div>
        </div>
        <div class="flex">
          <div class="row_item flex">
            <span class="subtitle2">适合人群：</span>
            <span class="info">{{ details.fit }}</span>
          </div>
          <div class="row_item flex">
            <span class="subtitle2">季节：</span>
            <span class="info">{{ details.season }}</span>
          </div>
        </div>
        <div class="flex">
          <div class="row_item flex">
            <span class="subtitle2">发布时间：</span>
            <span class="info">{{ details.publish_time }}</span>
          </div>
          <div class="row_item flex">
            <span class="subtitle2">天气：</span>
            <span class="info">{{ details.weather }}</span>
          </div>
        </div>
        <div class="title_row2 flex">
          <img src="@/assets/img/row_icon.svg" alt="" />
          <span>发布记录</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>发布人</th>
              <th>发布时间</th>
              <th>可看人员</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in 5" :key="index">
              <td>熊泊</td>
              <td>2023-11-23 00:00:00</td>
              <td>熊浩 熊浩 熊浩 熊浩</td>
            </tr>
          </tbody>
        </table>
        <div class="title_row2 flex">
          <img src="@/assets/img/row_icon.svg" alt="" />
          <span>修改记录</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>创建人</th>
              <th>修改人</th>
              <th>修改时间</th>
              <th>原值</th>
              <th>新值</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in 5" :key="index">
              <td>熊泊</td>
              <td>熊泊</td>
              <td class="pad12">2023-11-23 00:00:00</td>
              <td class="pad12">文案：关于跑步的海报设计分享</td>
              <td class="pad12">文案：关于跑步的海报设计分享</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
  
<script  setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { getMomentsList } from "@/assets/js/request";
const route = useRoute();
let isEdit = ref(!!Number(route.query.isEdit)); //是否为编辑状态
let temp = JSON.parse(sessionStorage.getItem("details"));
temp.img_uri = temp.img_uri.split(",");
let details = ref(temp); //页面数据详情
let tempDeleteList = [];
console.log(details.value, "details");
function tempDelete(file_id, index) {
  details.value.img_uri.splice(index, 1);
  tempDeleteList.push(file_id);
}
function edit() {
  let params = {
    id: details.value.id,
    type: details.value.type,
    fit: details.value.fit,
    visible_group: "1,2",
    pub_account: "4,5,6",
    content: details.value.content,
    img_uri: "public/files/01.png,public/files/02.png",
    publish_time: 1727452800,
  };
  // getMomentsList(params)
}
</script>
  
<style lang="scss" scoped>
.details_page {
  min-height: 100%;
  padding: 24px;
  display: flex;
  .generic {
    min-height: 100%;
    background: #fff;
    border-radius: 12px;
    .head {
      width: 100%;
      height: 56px;
      padding: 0 24px;
      background: #fcfcfc;
      border-bottom: 1px solid #f4f4f4;
      border-radius: 12px 12px 0 0;
      .title {
        font-weight: 500;
        font-size: 20px;
        color: #1d2129;
        margin-right: auto;
      }
      .btn {
        width: 78px;
        height: 32px;
        border-radius: 757px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
      }
      .btn_type_1 {
        border: 1px solid #909399;
        color: #60656e;
      }
      .btn_type_2 {
        background: #4485ff;
        color: #fcfcfc;
        margin-left: 16px;
      }
    }
  }
  .page_left {
    width: 772px;
    margin-right: 20px;
    flex-shrink: 0;
    .middle {
      padding: 20px 24px;
    }
    .main {
      display: flex;
      border-bottom: 1px solid #f4f4f4;
      padding-bottom: 14px;
      .main_left {
        width: 72px;
        height: 72px;
        border-radius: 11px;
        margin-right: 24px;
      }
      .main_right {
        .nickname {
          height: 32px;
          font-family: Source Han Sans, Source Han Sans;
          font-weight: 500;
          font-size: 24px;
          color: #409eff;
          line-height: 32px;
        }
        .content {
          font-family: Source Han Sans, Source Han Sans;
          font-weight: 500;
          font-size: 24px;
          color: #3d3d3d;
          line-height: 32px;
          margin-top: 5px;
          margin-bottom: 17px;
        }
        .file_con {
          display: flex;
          flex-wrap: wrap;
          .file_item {
            width: 202px;
            height: 202px;
            margin-right: 10px;
            margin-bottom: 10px;
            position: relative;
            &:nth-of-type(3n) {
              margin-right: 0;
            }
            &:hover {
              .mask {
                display: flex;
              }
            }
            .mask {
              display: none;
              width: 202px;
              height: 202px;
              position: absolute;
              left: 0;
              top: 0;
              background: rgba($color: #000000, $alpha: 0.6);
              justify-content: center;
              > div {
                cursor: pointer; //偏移量改色的无奈之举
              }
              .func_icon {
                width: 24px;
                height: 24px;
                filter: drop-shadow(#fff 1000px 0);
                transform: translateX(-1000px);
                cursor: pointer;
              }
            }
            .file {
              width: 202px;
              height: 202px;
            }
          }
        }
      }
    }
    .title_row {
      font-weight: 500;
      font-size: 24px;
      color: #3d3d3d;
      margin: 24px 0;
      .color_block {
        width: 6px;
        height: 20px;
        background: #4485ff;
        border-radius: 4px;
        margin-right: 8px;
      }
    }
    .account_item {
      padding-bottom: 8px;
      border-bottom: 1px solid #e0e0e0;
      &:last-of-type {
        border-bottom: unset;
      }
      &:first-of-type {
        .account_item_head {
          margin-top: 0;
        }
      }
      .account_item_head {
        margin-top: 24px;
        margin-bottom: 20px;

        > img {
          width: 40px;
          height: 40px;
          border-radius: 11px;
        }
        .account_name {
          font-weight: 500;
          font-size: 16px;
          color: #191919;
          margin-left: 12px;
        }
        .delete {
          font-weight: 500;
          font-size: 14px;
          color: #59a9fe;
          margin-left: auto;
          cursor: pointer;
        }
      }
      .set_item {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        .subtitle {
          font-weight: 500;
          font-size: 14px;
          color: #3d3d3d;
          margin-right: 12px;
        }
        .input {
          width: 656px;
          height: 40px;
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          padding: 0 16px;
        }
      }
    }
    .add {
      height: 22px;
      font-weight: 500;
      font-size: 14px;
      color: #59a9fe;
      line-height: 22px;
    }
  }
  .page_right {
    flex-grow: 1;
    .information_main {
      padding: 0 24px;
      .title_row2 {
        margin-top: 24px;
        margin-bottom: 16px;
        > img {
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }
        > span {
          font-weight: 500;
          font-size: 18px;
          color: #3d3d3d;
        }
      }
      .subtitle2 {
        height: 20px;
        font-family: Source Han Sans, Source Han Sans;
        font-weight: 500;
        font-size: 14px;
        color: #838589;
        line-height: 20px;
      }

      .label {
        padding: 0 8px;
        height: 24px;
        border-radius: 5px;
        font-weight: 400;
        font-size: 14px;
        text-align: center;
        line-height: 24px;
        margin-right: 12px;
        &:last-of-type {
          margin-right: 0;
        }
      }
      .label_red {
        background: #ffe3e3;
        color: #f53f3f;
      }
      .label_blue {
        background: #dcedff;
        color: #409eff;
      }
      .label_green {
        background: #deffd5;
        color: #00b368;
      }
      .row_item {
        width: 354px;
        height: 24px;
        margin-right: 16px;
        .info {
          font-family: Source Han Sans, Source Han Sans;
          font-weight: 500;
          font-size: 14px;
          color: #3d3d3d;
        }
      }
      table {
        border-spacing: 0;
        border-collapse: collapse;
        table-layout: fixed;
      }
      tr {
        height: 66px;
        background: #fff;
      }

      th {
        font-family: Source Han Sans, Source Han Sans;
        font-size: 18px;
        color: #676767;
        background: #f8fbff;
        border: 1px solid #e2eaf1;
      }
      td {
        text-align: center;
        font-family: Source Han Sans, Source Han Sans;
        font-weight: 500;
        font-size: 18px;
        color: #3d3d3d;
        border: 1px solid #e2eaf1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .pad12 {
        padding: 0 12px;
      }
    }
  }
}
</style>
  
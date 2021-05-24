<template>
  <div class="wapperDiv">
    <div class="header secondLv">
      <div class="header__nav">
        <a class="icons icon-icons__ResourceCentre" @click="goResourceCenter"></a>
        <a class="top--menu__close" @click="promptShow=true"></a>
      </div>
    </div>

    <div class="page__content--wrapper contents">
      <div class="nav--list__items txtCtr">
        <h5>{{$t('policyHolder.createquote')}}</h5>
        <div class="steps__wrapper">
          <div class="steps">
            <!-- <div class="steps__item completed"></div> -->
            <div class="steps__item process"></div>
            <div class="steps__item disabled"></div>
          </div>
        </div>
      </div>
      <div class="page__content w100p">
        <h4 class="last">{{$t('policyHolder.plcholderinfo')}}</h4>
      </div>
      <div>
        <div class="nav--list__items bg_white" @click="prospectList">
          <button class="full last">{{$t('policyHolder.rtrfrmrec')}}</button>
        </div>
      </div>
      <!-- <ocrButton
        v-show="ocrshow"
        :logo="logo"
        :OCRArr.sync="OCRArr"
        :idInfo="idInfo"
        :iddInfo="iddInfo"
      />-->
      <div v-show="ocrshow">
        <div class="nav--list__items pB0">
          <h6 class="title">{{$t('ocrButton.Identitydocumentype')}}</h6>
          <div class="row photo__actions">
            <div class="row">
              <div class="columns shrink">
                <div class="dropdown noVal">
                  <select
                    value="public-choice"
                    v-model="couponSelected"
                    @change="getCouponSelected"
                  >
                    <option
                      :value="coupon.id"
                      v-for="coupon in couponList"
                      :key="coupon.id"
                    >{{coupon.value}}</option>
                  </select>
                  <span class="arrow"></span>
                </div>
              </div>
              <div class="columns shrink">
                <button
                  :disabled="couponSelected==7||couponSelected==4||couponSelected==null"
                  class="small secondary iconOnly icon-takephoto button"
                  @click="OCRPhotograph(couponSelected, false)"
                ></button>
              </div>
              <div class="columns shrink">
                <button
                  :disabled="couponSelected==7||couponSelected==4||couponSelected==null"
                  class="small secondary iconOnly icon-upload button"
                  @click="OCRPhotograph(couponSelected, true)"
                ></button>
              </div>
            </div>
          </div>
        </div>
        <!-- 证件详情录入框 -->
        <div v-show="couponSelected">
          <div class="nav--list__items row pB0">
            <h6 class="title">{{$t('ocrButton.IDno')}}</h6>
            <input
              :class="errorCard?'':'hasError'"
              type="text"
              :placeholder="exlandingSlipNo"
              v-model="OCRArr.firstIdInfo.idNo"
              @blur="identityCard(couponSelected,OCRArr.firstIdInfo.idNo)"
            />
            <p v-if="!errorCard" class="small errMsg">{{errorCardMessage}}</p>
          </div>
          <div class="nav--list__items row pB0">
            <h6 class="title">{{$t('ocrButton.IssueDate')}}</h6>
            <div class="row">
              <div class="column">
                <datePicker
                  @setDateVal="getDateVal1"
                  :mydateVal="OCRArr.firstIdInfo.lssueDate"
                  :myNum="7"
                ></datePicker>
              </div>
            </div>
          </div>
        </div>
        <!-- 第二证件类型 -->
        <div v-show="couponSelected==2||couponSelected==3">
          <div class="nav--list__items pB0">
            <h6 class="title">{{$t('ocrButton.SecondaryIdentityDocumentType')}}</h6>
            <!-- 证件选择 -->
            <div class="row photo__actions">
              <div class="row">
                <div class="columns shrink">
                  <div class="dropdown noVal">
                    <select
                      value="public-choice"
                      v-model="couponSelectedTwo"
                      @change="getCouponSelectedTwo"
                    >
                      <option
                        :value="coupon.id"
                        v-for="coupon in couponListTwo"
                        :key="coupon.id"
                      >{{coupon.value}}</option>
                    </select>
                    <span class="arrow"></span>
                  </div>
                </div>
                <div class="columns shrink">
                  <button
                    :disabled="couponSelectedTwo==8||couponSelectedTwo==9||couponSelectedTwo==null"
                    class="small secondary iconOnly icon-takephoto button"
                    @click="OCRPhotograph(couponSelectedTwo, false)"
                  ></button>
                </div>
                <div class="columns shrink">
                  <button
                    :disabled="couponSelectedTwo==8||couponSelectedTwo==9||couponSelectedTwo==null"
                    class="small secondary iconOnly icon-upload button"
                    @click="OCRPhotograph(couponSelectedTwo, true)"
                  ></button>
                </div>
              </div>
            </div>
          </div>
          <!-- 证件详情录入框 -->
          <div v-show="couponSelectedTwo">
            <div class="nav--list__items row pB0">
              <h6 class="title">{{$t('ocrButton.IDno')}}</h6>
              <input
                :class="errorCardTwo?'':'hasError'"
                type="text"
                :placeholder="exlandingSlipNo"
                v-model="OCRArr.secondIdInfo.idNo"
                @blur="identityCard(couponSelectedTwo,OCRArr.secondIdInfo.idNo)"
              />
              <p v-if="!errorCardTwo" class="small errMsg">{{errorCardMessageTwo}}</p>
            </div>
            <div class="nav--list__items row pB0">
              <h6 class="title">{{$t('ocrButton.IssueDate')}}</h6>
              <div class="row">
                <div class="column">
                  <datePicker
                    @setDateVal="getDateVal2"
                    :mydateVal="OCRArr.secondIdInfo.lssueDate"
                    :myNum="7"
                  ></datePicker>
                </div>
              </div>

              <!-- <input type="date" v-model="OCRArr.secondIdInfo.expiryDate" :max="max" /> -->
              <h6 class="title">{{$t('ocrButton.ExpiryDate')}}</h6>
              <div class="row">
                <div class="column">
                  <datePicker
                    @setDateVal="getDateVal3"
                    :mydateVal="OCRArr.secondIdInfo.expiryDate"
                    :myNum="9"
                  ></datePicker>
                </div>
              </div>

              <!-- <input type="date" v-model="OCRArr.secondIdInfo.lssueDate" :max="max" /> -->
            </div>
          </div>
        </div>
      </div>
      <div class="nav--list__items row pB0">
        <h6 class="title titlePadding">{{$t('addProspect.engname')}}</h6>
        <p class="title small" v-show="ocrshow">{{$t('ocrButton.AsShowncertificate')}}</p>
        <input
          type="text"
          :placeholder="$t('addProspect.englastname')"
          maxlength="30"
          :class="errorVal.englishLastName?'':'hasError'"
          v-model="valData.enLastName"
          @blur="msgVerify('englishLastName')"
        />
        <p
          v-if="ocrshow ===1 && !errorVal.englishLastName"
          class="small errMsg"
        >{{$t('eApplicationConfigure.H4')}}</p>
        <p
          v-else-if="!errorVal.englishLastName"
          class="small errMsg"
        >{{$t('QuotationErrorMessage.H10')}}</p>
        <input
          type="text"
          :placeholder="$t('addProspect.engfirstname')"
          maxlength="45"
          :class="errorVal.englishFirstName?'':'hasError'"
          v-model="valData.enFirstName"
          @blur="msgVerify('englishFirstName')"
        />
        <p
          v-if="ocrshow ===1 && !errorVal.englishFirstName"
          class="small errMsg"
        >{{$t('eApplicationConfigure.H5')}}</p>
        <p
          v-else-if="!errorVal.englishFirstName"
          class="small errMsg"
        >{{$t('QuotationErrorMessage.H10')}}</p>
      </div>
      <div class="nav--list__items row pB0">
        <h6 class="title">{{$t('addProspect.chinesename')}}</h6>
        <p class="title small" v-show="ocrshow">{{$t('ocrButton.AsShowncertificate')}}</p>
        <input
          type="text"
          :placeholder="chineselastname"
          ref="cnLastName"
          @change="changeValue"
          :maxlength="[this.$store.state.source === 'eApplication' ? 10 : 50]"
          :class="[errorVal.cnLastName?'':'hasError',isShowLname? '' : 'hasError']"
          v-model="valData.cnLastName"
          @blur="msgVerify('cnLastName')"
        />
        <p v-if="!isShowLname" class="small errMsg">{{$t('LoginErrorMessage.S28')}}</p>
        <p
          v-if="ocrshow ===1 && !errorVal.cnLastName"
          class="small errMsg"
        >{{$t('eApplicationConfigure.C5')}}</p>
        <p v-else-if="!errorVal.cnLastName" class="small errMsg">{{$t('QuotationErrorMessage.H10')}}</p>
        <input
          type="text"
          :placeholder="chinesefirstname"
          ref="cnFirstName"
          @change="changeValue2"
          :maxlength="[this.$store.state.source === 'eApplication' ? 10 : 100]"
          :class="[errorVal.cnFirstName?'':'hasError',isShowFname ?'':'hasError']"
          v-model="valData.cnFirstName"
          @blur="msgVerify('cnFirstName')"
        />
        <p class="small errMsg" v-if="!isShowFname">{{$t('LoginErrorMessage.S27')}}</p>
        <p
          v-if="ocrshow ===1 && !errorVal.cnFirstName"
          class="small errMsg"
        >{{$t('eApplicationConfigure.C6')}}</p>
        <p
          v-else-if="!errorVal.cnFirstName"
          class="small errMsg"
        >{{$t('QuotationErrorMessage.H10')}}</p>
      </div>

      <div class="smokingGender">
        <div class="nav--list__items pB0">
          <h6 class="title">{{$t('addProspect.gender')}}</h6>
          <div class="input--selects" :class="{hasVal:gender!=''}">
            <label class="select iconOnly">
              <input type="radio" name="gender" v-model="gender" value="M" />
              <div class="select__content icon-icons__Male" @click="msgVerify('gender', 'M')"></div>
            </label>

            <label class="select iconOnly">
              <input type="radio" name="gender" v-model="gender" value="F" />
              <div class="select__content icon-icons__Female" @click="msgVerify('gender', 'F')"></div>
            </label>
          </div>
        </div>
        <div class="nav--list__items pB0">
          <h6 class="title">
            {{$t('addProspect.smokestatus')}}
            <span
              class="icons small icon-icons__Information"
              @click="stateTipsShow=1"
            >
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
            </span>
          </h6>
          <div class="input--selects" :class="{hasVal:smoke!=''}">
            <label class="select iconOnly">
              <input type="radio" name="smoke" v-model="smoke" value="1" />
              <div class="select__content icon-icons__Smoke" @click="msgVerify('smoke', 1)"></div>
            </label>
            <label class="select iconOnly">
              <input type="radio" name="smoke" v-model="smoke" value="2" />
              <div class="select__content icon-icons__No-Smoke" @click="msgVerify('smoke', 2)"></div>
            </label>
          </div>
        </div>
      </div>
      <div class="11"></div>
      <div v-show="toggle">
        <div class="nav--list__items row">
          <h6 class="title">{{$t('addProspect.dob')}}</h6>
          <div class="row">
            <div class="column">
              <datePicker @setDateVal="getDateVal" :mydateVal="dateVal" :myNum="num" :isAge="Age"></datePicker>
            </div>
          </div>
        </div>
        <div>
          <div class="font">
            <p class="col_blue small last">{{$t('addProspect.anb')}}{{age!==''?'':'-'}}{{age}}</p>
          </div>
          <div class="nav--list__items bg_white" v-show="!ocrshow">
            <label class="select full last" @click="handleToogle(1)">
              <input type="checkbox" name="ANB" />
              <div class="select__content icon-icons__Switch">
                <span class="select__txt">{{$t('addProspect.switchtodob')}}</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div v-show="!toggle">
        <div>
          <div class="nav--list__items row pB0">
            <h6>{{$t('addProspect.anb')}}</h6>
            <div class="row input--field">
              <div class="column shrink actionR">
                <button
                  class="secondary iconOnly icon-icons__decrease input"
                  :disabled="age==19?true:false"
                  @click="handleAge(1)"
                ></button>
              </div>
              <div class="column">
                <input
                  type="text"
                  :placeholder="$t('prospectList.pspname')"
                  v-model="age"
                  @blur="number($event)"
                />
              </div>
              <div class="column shrink actionL">
                <button
                  class="secondary iconOnly icon-icons__increase input"
                  @click="handleAge(0)"
                  :disabled="age==99?true:false"
                ></button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="nav--list__items bg_white">
            <label class="select full last" @click="handleToogle(2)">
              <input type="checkbox" name="ANB" />
              <div class="select__content icon-icons__Switch">
                <span class="select__txt">{{$t('addProspect.switchtodob')}}</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div class="nav--list__items pB0">
        <h6 class="title titlePadding">{{$t('addProspect.nationality')}}</h6>
        <search
          :full="true"
          :placeholder="plzselect"
          @sendValue="getVal"
          :value="Nationalitydata"
          :options="nationalityArr"
          :hasDropDown="true"
          :isShow="Show"
          :isActive="Active"
        ></search>
      </div>
      <div class="nav--list__items pB0">
        <h6 class="title">{{$t('addProspect.placeofrsd')}}</h6>
        <div class="input--selects" :class="{hasVal:regionSelect!=''}">
          <label class="select">
            <input type="radio" name="region" value="1" v-model="regionSelect" />
            <div class="select__content icon-" @click="msgVerify('regionSelect', 1)">
              <span class="icons icon-icons__HK">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
                <span class="path5"></span>
                <span class="path6"></span>
                <span class="path7"></span>
                <span class="path8"></span>
                <span class="path9"></span>
                <span class="path10"></span>
                <span class="path11"></span>
                <span class="path12"></span>
                <span class="path13"></span>
                <span class="path14"></span>
                <span class="path15"></span>
                <span class="path16"></span>
              </span>
              <span class="select__txt">{{$t('addProspect.hongkong')}}</span>
            </div>
          </label>
          <label class="select">
            <input type="radio" name="region" value="2" v-model="regionSelect" />
            <div class="select__content icon-" @click="msgVerify('regionSelect', 2)">
              <span class="icons icon-icons__China">
                <span class="path1"></span>
                <span class="path2"></span>
              </span>
              <span class="select__txt">{{$t('addProspect.china')}}</span>
            </div>
          </label>
        </div>
      </div>
      <div class="nav--list__items pB0">
        <h6 class="title">{{$t('addProspect.occupation')}}</h6>
        <!-- <search
          :full="false"
          :placeholder="stdoccupation"
          @sendValue="getOoccupation"
          :options="occupationArr"
          :value="Occupationdata"
          :flag="1"
        ></search>-->
        <search
          :full="true"
          :placeholder="stdoccupation"
          @getInput="getOccupations"
          @sendValue="getOoccupation"
          :options="occupationArr"
          :isDefault="false"
          :value="Occupationdata"
          :flag="1"
        ></search>
      </div>
      <div class="nav--list__items row footers">
        <h6 class="title">{{$t('policyHolder.lifeinsureinfo')}}</h6>
        <div class="row align-middle">
          <div class="columns">
            <p class="small last">{{$t('policyHolder.sameperson')}}</p>
          </div>
          <div class="columns shrink">
            <label class="toggle yesno">
              <input type="checkbox" v-model="yesNo" />
              <span class="slider" :title="title" :title2="title2">
                <span class="handler"></span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="footerDiv bg_white">
      <button
        class="full last"
        :disabled="disabled"
        @click="newProspect"
        v-show="hidshow"
        v-preventReClick
      >{{$t('policyHolder.next')}}</button>
    </div>
    <prompt
      v-show="promptShow"
      :promptBoxClass="promptBoxClass"
      :promptBoxH="promptBoxH"
      :promptBoxText="promptBoxText"
      @closeTip="closeTip"
      @confirmPrompt="confirmPrompt"
    />
    <prompt
      v-show="promptShow1"
      :promptBoxClass="promptBoxClass1"
      :promptBoxH="promptBoxH1"
      :promptBoxText="promptBoxText1"
      @closeTip="closeTip1"
      @confirmPrompt="confirmPrompt1"
    />
    <prompt
      v-show="promptShow2"
      :promptBoxClass="promptBoxClass2"
      :promptBoxH="promptBoxH2"
      :promptBoxText="promptBoxText2"
      @closeTip="closeTip2"
      @confirmPrompt="confirmPrompt2"
    />
    <stateTips
      v-show="stateTipsShow"
      @closeState="closeState"
      :stateTipsClass="stateTipsClass"
      :stateTipsH="stateTipsH"
      :stateTipsText="stateTipsText"
    />
  </div>
</template>
<script>
import ocrButton from "@/views/eApplication/OCR/ocrButton.vue";
import moment from "moment";
import stateTips from "../../components/stateTips";
// import { Toast } from "vant";
import prompt from "../../components/promptBox";
import datePicker from "../../vue/datePicker";
import search from "../../vue/search";
import {
  addAndUpdateAppnt,
  queryAppnt,
  CustomerDetails,
  sanctionNationality,
  takeSuggestCrntPage,
  PostOccupation,
  updateStep,
  RetrieveIdType,
} from "../../http/api.js";
export default {
  name: "QuotationPolicyholder",
  beforeRouteEnter(to, from, next) {
    if (from.name == "OCR_02") {
      // 这个name是下一级页面的路由name
      from.meta.keepAlive = true; // 设置为true说明你是返回到这个页面，而不是通过跳转从其他页面进入到这个页面
    } else {
      from.meta.keepAlive = false;
    }
    console.log(from.meta.keepAlive);
    next();
  },
  data() {
    return {
      errorCard: true, //证件错误提示
      errorCardTwo: true,
      errorCardMessage: "", //证件错误语言
      errorCardMessageTwo: "", //第二证件错误语言
      logo: "A",
      ocrshow: 0, //是否显示ocr
      chineselastname: this.$t("addProspect.chineselastname"),
      chinesefirstname: this.$t("addProspect.chinesefirstname"),
      plzselect: this.$t("addProspect.plzselect"),
      stdoccupation: this.$t("addProspect.stdoccupation"),
      stateTipsClass: "icons large icon-icons__Information",
      stateTipsH: this.$t("addProspect.smokestatus"),
      stateTipsText: this.$t("addProspect.smokerdefinition"),
      screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要），
      originHeight: document.body.clientHeight, //默认高度在watch里拿来做比较
      isOriginHei: true,
      stateTipsShow: 0,
      disabled: true,
      smoke: "",
      gender: "",
      slider1: [0, 80],
      regionSelect: "",
      age: "",
      nationalityText: "",
      toggle: true,

      errorVal: {
        englishLastName: true,
        englishFirstName: true,
        cnLastName: true,
        cnFirstName: true,
      },
      valData: {
        // 姓名
        enLastName: "",
        enFirstName: "",
        cnLastName: "",
        cnFirstName: "",
      },
      nationality: {},
      ooccupation: {},
      Occupationdata: {},
      dateValue: "",
      Nationalitydata: {},
      dateVal: "", // 选择后的日期
      nationalityArr: [], //获取国籍
      occupationArr: [], //用来存储获取职业的数组
      promptShow: 0,
      promptShow1: 0,
      promptShow2: 0,
      promptBoxClass: "icons large icon-icons__Leave",
      promptBoxH: this.$t("general.leavepage"),
      promptBoxText: this.$t("general.inputwillbelost"),
      promptBoxClass1: "icons large  icon-error",
      promptBoxH1: this.$t("ProspectErrorMessage.S17.h1"),
      promptBoxText1: this.$t("ProspectErrorMessage.S17.p"),
      promptBoxClass2: "icons large icon-error blue", //提示
      promptBoxH2: this.$t("eApplicationConfigure.B9.h1"),
      promptBoxText2: this.$t("eApplicationConfigure.B9.p"),
      yesNo: 1, // 投保人被保人是否为同一人
      isType: 0, //判断是从受保人跳转到准客户资讯
      contNo: "", //保单号 唯一标识
      appntCustomerNo: "", //投保人客户号
      types: "", //新增或修改标识
      title: this.$t("leadIn.no"),
      title2: this.$t("leadIn.yes"),
      isTrue: 0,
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow: true, //显示或者隐藏footer
      isShowFname: true, //提示输入中文名
      isShowLname: true, //提示输入中文姓
      yearNums: this.$t("QuotationErrorMessage.S14"),
      idInfo: {
        idType: "06",
        idNo: "88888888888888",
        expiryDate: "2020-08-22",
      },
      iddInfo: {
        idType: "10",
        idNo: "888888888888888",
        lssueDate: "2020-08-22",
        expiryDate: "2020-08-21",
      },
      Age: -1, //日历年龄
      num: this.$store.state.source === "eApplication" ? 5 : 1, // 投保人调用日历的标识
      isFail: 0, //国籍为制裁国家时 点击提示信息的确认按钮停留在本页面
      Active: false, // 国家为制裁国家的错误提示
      Show: false, //国籍为美国的错误提示信息
      exlandingSlipNo: this.$t("eMCV.exlandingSlipNo"),
      //第一身份
      couponList: [],
      //第二身份
      couponListTwo: [],
      couponSelected: "",
      couponSelectedTwo: "",
      //OCR相关信息
      OCRArr: {
        IdCode: "qweqwesdfsdff123", //证件编号（仅在电子投保流程中使用），新增时为空字符串
        IdCode2: "qweqwesdfsdff123", //第二身份證明编号（不存在时为空字符串即””，仅在电子投保流程中使用）
        firstIdInfo: {
          //第一身份证明
          birthday: "",
          idType: "", //证件类型
          lssueDate: "", //生效日
          gender: "M",
          birthCountryCode: "", //出生国编码
          lastNameCn: "",
          idNo: "", //证件编码
          lastNameEn: "",
          expiryDate: "", //失效日
          firstNameCn: "",
          firstNameEn: "",
          picture1Base64: "", //不做ocr时可为空
          picture2Base64: "", //
          pictureType: ".jpg", //照片类型，如“.jpg”格式   “.”+类型
        },
        secondIdInfo: {
          //第二身份证明存在时该字段存在
          birthday: "",
          idType: "", //证件类型
          lssueDate: "", //生效日
          gender: "", //证件类型
          birthCountryCode: "", //出生国家编码
          lastNameCn: "",
          idNo: "", //证件编号
          lastNameEn: "",
          expiryDate: "", //失效日
          firstNameCn: "",
          firstNameEn: "",
          picture1Base64: "",
          picture2Base64: "",
          pictureType: ".jpg", //照片类型，如“.jpg”格式   “.”+类型
        },
      },
      searchValue: "",
      ocrSelectTwo: false, // 选第二身份证标识
    };
  },
  created() {
    this.retrieveIdType();
    this.getNewStep();
    this.msgVerify();
    //从电子投保来
    if (this.$store.state.source === "eApplication") {
      this.ocrshow = 1;
    } else {
      this.ocrshow = 0;
    }
    if (this.$route.params.dataSource) {
      this.customerDetails(this.$store.state.customNo);
    }
    //是否是excel导入以及数据回显
    if (this.$store.state.isUploadexcel) {
      let result = this.$store.state.eapplicationarr.result.excelData.Applicant; //
      console.log("回显返回", result);
      this.contNo = result.contNo;
      console.log("0000000", this.contNo);
      this.appntCustomerNo = result.customerNo;
      console.log("回显contNo", this.contNo);
      // this.$store.commit("QUERYAPPNT", queryAppnt);
      this.valData.enLastName = result.lastNameEn;
      this.valData.enFirstName = result.firstNameEn;
      this.valData.cnLastName = result.lastNameCn;
      this.valData.cnFirstName = result.firstNameCn;
      this.gender = result.sex === "男" || result.sex === "Male" ? "M" : "F";
      this.smoke =
        result.smoke === "吸烟者" ||
        result.smoke === "Smoker" ||
        result.smoke === "吸煙者"
          ? 1
          : 2;
      this.age = result.age;
      this.Age = result.age;
      // this.dateVal !== ''?moment(this.dateVal).format("YYYY-MM-DD"): '',
      this.dateVal =
        result.birthday !== ""
          ? moment(result.birthday).format("YYYY-MM-DD")
          : "";
      console.log("fanhuizhi", result.birthday, "转换后", this.dateVal);
      // this.calbill(result.birthday);
      this.regionSelect = result.placeOfResidency;
      // this.yesNo = this.$route.params.yesno
      this.yesNo = result.relationToAppnt === "1" ? true : false;
      console.log("是否为同一人1", this.yesNo);
      this.Occupationdata = {
        text: result.occupationName,
        code: result.occupationCode,
      };
      this.ooccupation = {
        text: result.occupationName,
        code: result.occupationCode,
      };
      this.Nationalitydata = {
        text: result.nationalityName,
        code: result.nationalityCode,
      };
      this.nationality = {
        text: result.nationalityName,
        code: result.nationalityCode,
      };
      this.isActive();

      console.log("投被人标识", this.yesNo);
    }
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
    //获取国籍
    this.nationalityArr = this.$store.state.nationalityArr.map((item) => {
      return {
        text: item.value,
        code: item.id,
      };
    });
    // 职业
    this.getOccupations("");
  },
  mounted() {
    // 获取职业
    // this.occupationArr = this.$store.state.occupationArr;
    // console.log(this.occupationArr, this.nationalityArr);
    console.log(this.$route.params.dataSource, "50333333333333333333");
    // 从职业列表过来的回显
    if (this.$route.params.id) {
      this.$store.commit("CUSTOMNO", this.$route.params.id);
      this.customerDetails(this.$route.params.id);
    }

    // 选择第二身份证回显数据
    if (this.$route.query.ocrSelectTwo) {
      //  this.policyhoder(this.$store.state.contNo, this.$store.state.appntNo);
    }

    // 回显回显
    if (
      this.$route.query.from ||
      this.$route.query.isQuota ||
      this.$route.query.contNos
    ) {
      console.log("从建议书管理复制回显");
      this.policyhoder(this.$store.state.contNo, this.$store.state.appntNo);
    }
    this.takeSuggestCrntPage();
  },

  watch: {
    OCRArr: {
      handler(val) {
        // console.log("bianhua");
        this.$emit("update:OCRArr", val);
      },
      deep: true,
    },
    couponSelected: {
      handler(val) {
        if (val == "02" || val == "03") {
          this.retrieveIdTypeTwo(this.couponSelected);
        } else {
          this.OCRArr.secondIdInfo = {};
        }
      },
    },
    showHeight: function () {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    },
    "valData.cnFirstName": function () {
      if (this.valData.cnFirstName !== "" && this.valData.cnLastName == "") {
        this.isShowLname = false;
      } else if (
        this.valData.cnFirstName == "" &&
        this.valData.cnLastName !== ""
      ) {
        this.isShowFname = false;
        this.errorVal.cnFirstName = true;
      } else {
        this.isShowLname = true;
        this.isShowFname = true;
      }
      this.msgVerify();
    },
    "valData.cnLastName": function () {
      if (this.valData.cnLastName !== "" && this.valData.cnFirstName == "") {
        this.isShowFname = false;
      } else if (
        this.valData.cnLastName == "" &&
        this.valData.cnFirstName !== ""
      ) {
        this.isShowLname = false;
        this.errorVal.cnLastName = true;
      } else {
        this.isShowFname = true;
        this.isShowLname = true;
      }
      this.msgVerify();
    },
  },

  methods: {
    //第二证件的校验
    identityCardTwo(type, num) {
      // switch (type) {
      //   case "01":
      //     this.errorCardTwo = /^[A-Z]{1,2}[0-9]{6,10}[0-9A-Z]$/.test(num);
      //     this.errorCardMessageTwo = this.$t("eApplicationConfigure.B6");
      //     break;
      //   default:
      //     this.errorCardTwo = /^[\s\S]*.*[^\s][\s\S]*$/.test(num);
      //     this.errorCardMessageTwo = this.$t("eApplicationConfigure.B5");
      // }
      this.msgVerify();
    },
    //不同证件的校验
    identityCard(type, num) {
      // console.log(type, num, "PPPPPPPPPPPPPP");
      switch (type) {
        case "01":
          this.errorCard =
            /^[A-Z]{1,2}\d{6}（[\dA]）$/.test(num) ||
            /^[A-Z]{1,2}\d{6}\([\dA]\)$/.test(num);
          // /^[A-Z]{1,2}[0-9]{6,10}[0-9A-Z]$/.test(num);
          this.errorCardMessage = this.$t("eApplicationConfigure.B6");
          break;
        case "02":
          this.errorCard =
            /^[A-Z]{1,2}\d{6}（[\dA]）$/.test(num) ||
            /^[A-Z]{1,2}\d{6}\([\dA]\)$/.test(num);
          this.errorCardMessage = this.$t("eApplicationConfigure.B6");
          break;
        case "03":
          // this.errorCard = this.validid.cnid(num);
          // this.errorCard = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(num);
          // this.errorCard = this.CheckIdCard(num);
          this.CheckIdCard(num);
          this.errorCardMessage = this.$t("eApplicationConfigure.B7");
          break;
        case "04":
          this.errorCard = /^[1|5|7][0-9]{6}\([0-9Aa]\)/.test(num);
          this.errorCardMessage = this.$t("eApplicationConfigure.B8");
          break;
        default:
          this.errorCard = num.length > 20 ? false : true;
          this.errorCardMessage = this.$t("eApplicationConfigure.B5");
      }
      this.msgVerify();
    },

    // 中国内地身份证校验
    CheckIdCard(idcard) {
      var area = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外",
      };
      var idcard, Y, JYM;
      var S, M;
      var ereg;
      var idcard_array = new Array();
      idcard_array = idcard.split(""); // 地区校验
      // 位数校验
      if (area[parseInt(idcard.substr(0, 2))] == null || idcard.length < 18) {
        this.errorCard = false;
      } else {
        this.errorCard = true;
      }
      // 身份号码位数及格式检验
      if (idcard.length === 18) {
        if (
          parseInt(idcard.substr(6, 4)) % 4 == 0 ||
          (parseInt(idcard.substr(6, 4)) % 100 == 0 &&
            parseInt(idcard.substr(6, 4)) % 4 == 0)
        ) {
          // 闰年
          ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
        } else {
          // 平年
          ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
        }
        // 如果出生日期合法 则继续校验最后一位检验码是否合法
        if (ereg.test(idcard)) {
          // 计算校验位 校验码的规则为前十七位的每一位数字依次乘以每一位的系数 1-17位（对应的系数分别为 7-9-10-5-8-4-2-1-6-3-7-9-10-5-8-4-2）的总和 / 11所得余数，余数只可能为0、1、2、3、4、5、6、7、8、9、10这10个数，分别对应最后一位检验码为1-0-X-9-8-7-6-5-4-3-2。例如：如果余数为2 则最后一位检验码就是X,如果满足则说明校验码正确 前7位跟后面7位的系数一样（7、9、10、5、8、4、2）所有会出现下面这个计算规则
          S = 
            (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 +
            (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 +
            (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 +
            (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 +
            (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 +
            (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 +
            (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 +
            parseInt(idcard_array[7]) * 1 +
            parseInt(idcard_array[8]) * 6 +
            parseInt(idcard_array[9]) * 3;
          Y = S % 11; // 总和除以11所得余数
          M = "F";
          JYM = "10X98765432";
          M = JYM.substr(Y, 1); // 判断校验码
          if (M !== idcard_array[17]) {
            this.errorCard = false;
          } else {
            this.errorCard = true;
          }
        }
      } else {
        this.errorCard = false;
      }
    },
    gohref() {
      window.location.reload();
    },
    getDateVal1(msg) {
      this.OCRArr.firstIdInfo.lssueDate = msg;
    },
    getDateVal2(msg) {
      this.OCRArr.secondIdInfo.lssueDate = msg;
    },
    getDateVal3(msg) {
      this.OCRArr.secondIdInfo.expiryDate = msg;
    },
    //查询所有第一身份类型
    async retrieveIdType() {
      const res = await RetrieveIdType({
        typeNo: "00", // 00 - 查询所有第一身份类型，02 - 第一身份类型为香港非永久身份証时，获取对应的第二身份类型，03 - 第一身份类型为中国身份証时，获取对应的第二身份类型，其余证件类型没有对应的第二证件
        logo: this.logo, //A(代表投保人身份类型信息)/B(代表被保人身份类型信息)
      });
      this.couponList = res.data.result.idTypeList;
      let data = this.$store.state.ocrData.firstIdInfo;
      console.log(data, "信息QWWWWWQQQQ");
      data != undefined
        ? (this.couponSelected = this.couponList[data.idType - 0].id)
        : (this.couponSelected = this.couponList[0].id);

      if (this.couponSelected == "01" || this.couponSelected == "02") {
        this.regionSelect = 1;
      } else if (this.couponSelected == "03") {
        this.regionSelect = 2;
      }
      this.valData.enLastName = data.lastNameEn;
      this.valData.enFirstName = data.firstNameEn;
      this.valData.cnLastName = data.lastNameCn;
      this.valData.cnFirstName = data.firstNameCn;

      // this.couponSelected =
      //   this.couponList[data.idType - 0].id || this.couponList[0].id;
      this.OCRArr.firstIdInfo.expiryDate = data.expiryDate;
      this.OCRArr.firstIdInfo.lssueDate = data.lssueDate;
      this.OCRArr.firstIdInfo.idNo = data.idNo;
      this.OCRArr.firstIdInfo.idType = data.idType;
      this.OCRArr.firstIdInfo.picture1Base64 = data.picture1Base64;
      this.OCRArr.firstIdInfo.picture2Base64 = data.picture2Base64;
      this.gender = data.gender;
      this.dateVal = data.birthday;
      this.yearNum(this.dateVal);
    },
    //第二身份类型
    async retrieveIdTypeTwo(a) {
      const res = await RetrieveIdType({
        typeNo: a, //02 - 第一身份类型为香港非永久身份証时，获取对应的第二身份类型，03 - 第一身份类型为中国身份証时，获取对应的第二身份类型
        logo: this.logo, //A(代表投保人身份类型信息)/B(代表被保人身份类型信息)
      });
      this.couponListTwo = res.data.result.idTypeList;
      this.OCRArr.secondIdInfo.lssueDate = this.$store.state.ocrData.secondIdInfo.lssueDate;
      this.OCRArr.secondIdInfo.expiryDate = this.$store.state.ocrData.secondIdInfo.expiryDate;
      this.OCRArr.secondIdInfo.idNo = this.$store.state.ocrData.secondIdInfo.idNo;
      this.OCRArr.secondIdInfo.picture1Base64 = this.$store.state.ocrData.secondIdInfo.picture1Base64;
      // this.OCRArr.secondIdInfo.idNo = ;
      this.couponSelectedTwo =
        this.couponListTwo[this.$store.state.ocrData.secondIdInfo.idType - 0]
          .id || this.couponListTwo[0].id;
    },
    getCouponSelected() {
      this.errorCard = true;
      this.OCRArr.firstIdInfo.idNo = "";
      this.OCRArr.firstIdInfo.lssueDate = "";
      //获取选中id
      // this.OCRArr.firstIdInfo.birthday = "2222";
      console.log(this.couponSelected, "第一中身份id");
      if (this.couponSelected == "01" || this.couponSelected == "02") {
        this.regionSelect = 1;
        this.Nationalitydata = {
          text: this.$t("nationality.HKG"),
          code: "HKG",
        };
      } else if (this.couponSelected == "03") {
        this.regionSelect = 2;
        this.Nationalitydata = {
          text: this.$t("nationality.PRC"),
          code: "PRC",
        };
      } else if (this.couponSelected == "04") {
        this.Nationalitydata = {
          text: this.$t("nationality.MAC"),
          code: "MAC",
        };
      } else if (this.couponSelected == "05") {
        this.Nationalitydata = {
          text: this.$t("nationality.SOU"),
          code: "SOU",
        };
      } else if (this.couponSelected == "06") {
        this.Nationalitydata = {
          text: this.$t("nationality.TAI"),
          code: "TAI",
        };
      }
      this.nationality = this.Nationalitydata;
      this.OCRArr.firstIdInfo.idType = this.couponSelected;
      if (this.couponSelected == "02" || this.couponSelected == "03") {
        this.retrieveIdTypeTwo(this.couponSelected);
      } else {
        this.OCRArr.secondIdInfo = "";
        console.log(this.OCRArr.secondIdInfo, "pppppppppppppppppppppppp");
      }
    },
    getCouponSelectedTwo() {
      this.errorCardTwo = true;
      this.OCRArr.secondIdInfo.idNo = "";
      this.OCRArr.secondIdInfo.lssueDate = "";
      this.OCRArr.secondIdInfo.expiryDate = "";
      console.log(this.couponSelectedTwo, "第二中身份id");
      this.OCRArr.secondIdInfo.idType = this.couponSelectedTwo;
      this.ocrSelectTwo = true; //
    },
    // OCR识别
    OCRPhotograph(certificatesType, chooseImg) {
      // console.log(certificatesType, "pppppppppppppppppppp");
      var type = "";
      switch (certificatesType) {
        case "01":
          type = cordova.plugin.OCR.Type.F_HK_PERMANENT_RESIDENT_ID_CARD;
          break; // 香港永久居民ID卡
        case "02":
          type = cordova.plugin.OCR.Type.F_HK_NON_PERMANENT_RESIDENT_ID_CARD;
          break; // 香港非永久居民ID卡
        case "03":
          type = cordova.plugin.OCR.Type.F_CHINA_ID;
          break; // 身份证
        case "05":
          type = cordova.plugin.OCR.Type.F_KOREAN_PASSPORT;
          break; // 韩国護照
        case "06":
          type = cordova.plugin.OCR.Type.F_TAIWAN_PASSPORT;
          break; // 中國台湾護照
        case "10":
          type = cordova.plugin.OCR.Type.F_ENTRY_PERMIT;
          break; // 港澳通行證(紙本)
        case "11":
          type = cordova.plugin.OCR.Type.F_ENTRY_PERMIT_CARD;
          break; // 港澳通行卡
        case "F_NEW_ENTRY_PERMIT":
          type = cordova.plugin.OCR.Type.F_NEW_ENTRY_PERMIT;
          break; // 新版港澳通行卡
        case "12":
          type = cordova.plugin.OCR.Type.F_CHINA_PASSPORT;
          break; // 中國護照

        default:
          type = "未知证件类型";
          break;
      }
      console.log("传过来的:", certificatesType, "cardType:", type);
      var params = {
        cardType: type, // 证件类型
        needImg: true, // 是否需要上传缩略图和大图，如果不传或者传false是不会返回scaledImg和bigImg两个字段的
        chooseImg: chooseImg,
        isScan: true,
        selectNum: 1,
      };
      // eslint-disable-next-line no-undef
      cordova.plugin.OCR.recognize(
        params,
        (data) => {
          console.log("success", data);
          // if (certificatesType == "01" && data.scanResult.length !== 12) {
          //   this.promptShow2 = true;
          //   return;
          // } else if (
          //   certificatesType == "02" &&
          //   data.scanResult.length !== 12
          // ) {
          //   this.promptShow2 = true;
          //   return;
          // } else if (certificatesType == "03" && data.scanResult.length !== 7) {
          //   this.promptShow2 = true;
          //   return;
          // } else if (
          //   certificatesType == "05" &&
          //   data.scanResult.length !== 35
          // ) {
          //   this.promptShow2 = true;
          //   return;
          // } else if (
          //   certificatesType == "06" &&
          //   data.scanResult.length !== 35
          // ) {
          //   this.promptShow2 = true;
          //   return;
          // } else {
          //   this.$router.push({
          //     name: "OCR_02",
          //     params: {
          //       data: data,
          //       couponSelected: certificatesType,
          //       logo: this.logo,
          //     },
          //   });
          // }
          this.$router.push({
            name: "OCR_02",
            params: {
              data: chooseImg === true ? data.imgs[0] : data,
              couponSelected: certificatesType,
              logo: this.logo,
            },
          });
        },
        (data) => {
          console.log("OCRFail", data);
          // if (!chooseImg) {
          //   // 如果不是上传图片
          //   if (certificatesType === "F_CHINA_ID") {
          //     if (data.bigImg) {
          //       // 拍照时，点返回也会fail但没有bigImg，此时要判断一下，有没有bigImg
          //       this.idCardData.push(data);
          //       this.idTakePhoto = true;
          //     }
          //   } else if (
          //     certificatesType === "F_NEW_ENTRY_PERMIT" ||
          //     certificatesType === "F_CHINA_PASSPORT"
          //   ) {
          //     if (data.bigImg) {
          //       this.permitPassportData.push(data);
          //     }
          //   } else if (certificatesType === "F_HK_ENTRY_TICKET") {
          //     if (data.bigImg) {
          //       this.landingSlipData.push(data);
          //     }
          //   }
          // } else {
          //   // 上传图片，识别失败
          console.log("错误原因:", data.errMsg);
          // }
        }
      );
    },

    // 职业
    async getOccupations(val) {
      // console.log(val);
      // let searchValue = val;
      this.searchValue = val;
      const { data } = await PostOccupation({
        occupationScope: "part",
        searchValue: this.searchValue,
        // occupationScope:'all',
        // searchValue: this.ooccupation.text
      });
      if (data.flagStr === "Succ" && data.result.nodes) {
        // console.log(data.result.nodes)
        // this.$store.commit("OCCUPATIONARR", data.result.nodes);
        this.occupationArr = data.result.nodes;
      }
    },
    // 中文长度
    changeValue() {
      let leng = this.validateTextLength(this.valData.cnLastName);
      if (this.$store.state.source === "eApplication") {
        // 电子投保 中文姓  数字不超过十个
        if (leng > 10) {
          leng = 10;
          this.valData.cnLastName = this.valData.cnLastName.slice(0, 10);
          this.$refs.cnLastName.maxLength = leng;
        } else {
          this.$refs.cnLastName.maxLength = 10;
        }
      } else {
        if (leng > 25) {
          leng = 25;
          this.valData.cnLastName = this.valData.cnLastName.slice(0, 25);
          this.$refs.cnLastName.maxLength = leng;
        } else {
          this.$refs.cnLastName.maxLength = 50;
        }
      }
    },
    changeValue2() {
      let leng = this.validateTextLength(this.valData.cnFirstName);
      if (this.$store.state.source === "eApplication") {
        // 电子投保 中文名  数字不超过十个
        if (leng > 10) {
          leng = 10;
          this.valData.cnFirstName = this.valData.cnFirstName.slice(0, 10);
          this.$refs.cnFirstName.maxLength = leng;
        } else {
          this.$refs.cnFirstName.maxLength = 10;
        }
      } else {
        if (leng > 50) {
          leng = 50;
          this.valData.cnFirstName = this.valData.cnFirstName.slice(0, 50);
          this.$refs.cnFirstName.maxLength = leng;
        } else {
          this.$refs.cnFirstName.maxLength = 100;
        }
      }
    },
    validateTextLength(value) {
      // 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
      let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
      let mat = value.match(cnReg);
      let length;
      if (mat) {
        length = mat.length + (value.length - mat.length) * 0.5;
        return length;
      } else {
        return value.length * 0.5;
      }
    },
    // 回显 回显!!!!!!!!
    policyhoder(contNo, appntNo) {
      queryAppnt({
        // contNo: this.$store.state.contNo,
        contNo: contNo,
        // appntCustomerNo: this.$store.state.customerNo
        appntCustomerNo: appntNo,
      }).then((res) => {
        console.log(res);
        if (res.data.flagStr === "Succ") {
          // this.$store.commit('TOKEN', token)
          console.log(res);
          let result = res.data.result.data; //
          console.log("回显返回", result);
          this.contNo = result.contNo;
          console.log("0000000", this.contNo);
          this.appntCustomerNo = result.customerNo;
          console.log("回显contNo", this.contNo);
          // this.$store.commit("QUERYAPPNT", queryAppnt);
          this.valData.enLastName = result.lastNameEn;
          this.valData.enFirstName = result.firstNameEn;
          this.valData.cnLastName = result.lastNameCn;
          this.valData.cnFirstName = result.firstNameCn;
          this.gender =
            result.sex === "男" || result.sex === "Male" ? "M" : "F";
          this.smoke =
            result.smoke === "吸烟者" ||
            result.smoke === "Smoker" ||
            result.smoke === "吸煙者"
              ? 1
              : 2;
          this.age = result.age;
          this.Age = result.age;
          // this.dateVal !== ''?moment(this.dateVal).format("YYYY-MM-DD"): '',
          this.dateVal =
            result.birthday !== ""
              ? moment(result.birthday).format("YYYY-MM-DD")
              : "";
          console.log("fanhuizhi", result.birthday, "转换后", this.dateVal);
          // this.calbill(result.birthday);
          this.regionSelect = result.placeOfResidency;
          // this.yesNo = this.$route.params.yesno
          this.yesNo = result.relationToAppnt === "1" ? true : false;
          console.log("是否为同一人1", this.yesNo);
          this.Occupationdata = {
            text: result.occupationName,
            code: result.occupationCode,
          };
          this.ooccupation = {
            text: result.occupationName,
            code: result.occupationCode,
          };
          this.Nationalitydata = {
            text: result.nationalityName,
            code: result.nationalityCode,
          };
          this.nationality = {
            text: result.nationalityName,
            code: result.nationalityCode,
          };
          this.isActive();

          console.log("投被人标识", this.yesNo);
        }
      });
    },
    takeSuggestCrntPage() {
      takeSuggestCrntPage({
        tab: "1",
        contNo: this.$route.query.contNos || this.$store.state.contNo,
      }).then((res) => {
        console.log(res);
        if (res.data.flagStr === "Succ") {
          // this.$router.push({name:res.data.result.tab,params: { tab: res.data.result.tab }})
        } else {
          console.log("失败");
        }
      });
    },
    // 判断是否全部有内容 按钮可点击
    isActive() {
      console.log(
        this.valData.enLastName,
        this.valData.enFirstName,
        this.gender,
        this.smoke,
        this.age
      );
      if (
        this.valData.enLastName !== "" &&
        this.valData.enFirstName !== "" &&
        this.gender !== "" &&
        this.smoke !== "" &&
        this.age !== "" &&
        this.regionSelect !== "" &&
        this.nationality.text !== "" &&
        this.ooccupation.text !== ""
      ) {
        this.disabled = false;
        console.log("全部显示");
      } else {
        this.disabled = true;
        console.log("没有显示");
      }
    },

    //获取日历
    getDateVal(msg) {
      this.yearNum(msg);
      this.dateVal = msg;
      this.msgVerify();
    },
    //g关闭吸烟提示框
    closeState() {
      this.stateTipsShow = 0;
    },
    //1.2.7准客户详情页
    customerDetails(a) {
      this.contNo = this.$route.params.contNo;
      CustomerDetails({
        customerNo: a,
      }).then((res) => {
        if (res.data.flagStr === "Succ") {
          let data = res.data.result.data;
          console.log("data", data);
          if (this.$store.state.source !== "eApplication") {
            this.valData.enLastName = data.lastNameEn;
            this.valData.enFirstName = data.firstNameEn;
            this.valData.cnLastName = data.lastNameCn;
            this.valData.cnFirstName = data.firstNameCn;
          }
          this.gender = data.gender;
          this.smoke = data.smokingStatus === "0" ? 2 : 1;
          this.Occupationdata = {
            text: data.occUpationName,
            code: data.occUpationCode,
          };
          this.ooccupation = {
            text: data.occUpationName,
            code: data.occUpationCode,
          };
          this.Nationalitydata = {
            text: data.nationalityName,
            code: data.nationalityCode,
          };
          this.nationality = {
            text: data.nationalityName,
            code: data.nationalityCode,
          };
          // this.calbill(data.birthday);
          // this.dateVal = data.birthdayForEdit;
          this.dateVal =
            data.birthdayForEdit !== ""
              ? moment(data.birthdayForEdit).format("YYYY-MM-DD")
              : "";
          console.log(
            "fanhuizhi",
            data.birthdayForEdit,
            "转换后",
            this.dateVal
          );
          //  this.dateVal = data.birthday;
          console.log("生日11111111111111", this.dateVal);
          this.age = data.age;

          this.Age = data.age;

          this.regionSelect = data.placeOfResidency;

          this.appntCustomerNo = data.customerNo;
          console.log("投保人账号", this.appntCustomerNo);
          this.isActive();
        }
      });
    },
    number(e) {
      // console.log(e.target.value);
      this.age < 19 ? (this.age = "") : this.age;
      this.age > 99 ? (this.age = "19") : this.age;
      this.dateVal = "";
      let flag = new RegExp("^[1-9]([0-9])*$").test(e.target.value);

      if (!flag) {
        this.age = "";
      }
      this.msgVerify();
    },

    // 关闭提示框
    closeTip() {
      this.promptShow = false;
    },
    closeTip1() {
      this.promptShow1 = false;
    },
    closeTip2() {
      this.promptShow2 = false;
    },
    // 确认提示框
    confirmPrompt() {
      this.promptShow = false;
      //确认后做的事情
      this.$router.push({ name: "pageHome" });
    },
    confirmPrompt1() {
      this.promptShow1 = false;
    },
    confirmPrompt2() {
      this.promptShow2 = false;
    },
    // 跳转准客户资讯列表
    prospectList() {
      this.$router.push({
        name: "quotationProspectList",
        query: {
          type: this.isType,
        },
      });
    },
    handleAge(val) {
      this.dateVal = "";
      this.age == "" ? (this.age = 18) : this.age;
      if (Number(val) === 1) {
        if (this.age > 19) {
          this.age--;
        } else {
          this.age = 19;
        }
      } else {
        this.age++;
      }
      this.msgVerify();
    },
    handleToogle: function (n) {
      // console.log(this.toggle);
      // this.$refs.datepicker.clearDate();
      this.toggle = false;
      if (n === 2) this.toggle = true;
    },
    // 转换生日日期
    // calbill(birthday) {
    //   if (birthday == "") {
    //     this.dateVal = "";
    //     console.log("没有选择生日");
    //   } else {
    //     let myDate = new Date(birthday);
    //     console.log(myDate);
    //     let d = myDate.getDate();
    //     let m = myDate.getMonth();
    //     m += 1;
    //     let y = myDate.getFullYear();
    //     this.dateVal = m + "/" + d + "/" + y;
    //     console.log(this.dateVal);
    //   }
    // },
    yearNum(strBirthday) {
      var strBirthdayArr = strBirthday.split("-");
      var d = new Date();
      var yearDiff = d.getFullYear() - strBirthdayArr[0];
      var monthDiff = d.getMonth() + 1 - strBirthdayArr[1];
      var dayDiff = d.getDate() - strBirthdayArr[2];
      var age =
        monthDiff < 0 || (monthDiff == 0 && dayDiff < 0)
          ? yearDiff
          : yearDiff + 1; //判断有没有到生日,到了就加1
      age = age < 0 ? 0 : age;
      this.age = age < 100 ? age : "";
      this.Age = age;
      if (this.Age == 0) {
        this.num = 0;
      } else if (this.Age > 99) {
        this.num = 5;
      } else {
        this.num = 1;
      }
    },
    // 提交信息验证
    msgVerify(type, val, date) {
      if (this.$store.state.source === "eApplication") {
        //电子投保校验
        switch (type) {
          case "englishLastName":
            this.errorVal.englishLastName =
              this.valData.enLastName !== ""
                ? /^[a-zA-Z ]{1,30}$/.test(this.valData.enLastName) &&
                  /^(?!(\s+$))/.test(this.valData.enLastName)
                : true;
            break;
          case "englishFirstName":
            this.errorVal.englishFirstName =
              this.valData.enFirstName !== ""
                ? /^[a-zA-Z ]{1,45}$/.test(this.valData.enFirstName) &&
                  /^(?!(\s+$))/.test(this.valData.enFirstName)
                : true;
            break;
          case "cnLastName":
            this.errorVal.cnLastName =
              this.valData.cnLastName !== ""
                ? /^[\u4e00-\u9fa5 ]{0,10}$/.test(this.valData.cnLastName) &&
                  /^\S+$/.test(this.valData.cnLastName)
                : true;
            break;
          case "cnFirstName":
            this.errorVal.cnFirstName =
              this.valData.cnFirstName !== ""
                ? /^[\u4e00-\u9fa5 ]{0,10}$/.test(this.valData.cnFirstName) &&
                  /^\S+$/.test(this.valData.cnFirstName)
                : true;
            break;
          case "gender":
            this.gender = val ? val : "";
            break;
          case "smoke":
            this.smoke = val ? val : "";
            break;
          case "regionSelect":
            this.regionSelect = val ? val : "";
            break;
        }
      } else {
        // 建议书校验
        switch (type) {
          case "englishLastName":
            this.errorVal.englishLastName =
              this.valData.enLastName !== ""
                ? /^[a-zA-Z0-9 ]{1,30}$/.test(this.valData.enLastName) &&
                  /^(?!(\s+$))/.test(this.valData.enLastName)
                : true;
            console.log(this.errorVal.englishLastName, "英文是否为空");
            break;
          case "englishFirstName":
            this.errorVal.englishFirstName =
              this.valData.enFirstName !== ""
                ? /^[a-zA-Z0-9 ]{1,45}$/.test(this.valData.enFirstName) &&
                  /^(?!(\s+$))/.test(this.valData.enFirstName)
                : true;
            break;
          case "cnLastName":
            this.errorVal.cnLastName =
              this.valData.cnLastName !== ""
                ? /^[\u4e00-\u9fa50-9 ]{0,50}$/.test(this.valData.cnLastName) &&
                  /^(?!(\s+$))/.test(this.valData.cnLastName)
                : true;
            console.log(this.errorVal.cnLastName);
            break;
          case "cnFirstName":
            this.errorVal.cnFirstName =
              this.valData.cnFirstName !== ""
                ? /^[\u4e00-\u9fa50-9 ]{0,100}$/.test(
                    this.valData.cnFirstName
                  ) && /^(?!(\s+$))/.test(this.valData.cnFirstName)
                : true;
            console.log(this.errorVal.cnFirstName);
            break;
          case "gender":
            this.gender = val ? val : "";
            break;
          case "smoke":
            this.smoke = val ? val : "";
            break;
          case "regionSelect":
            this.regionSelect = val ? val : "";
            break;
        }
      }
      this.disabled = true;
      if (!this.valData.enLastName || !this.errorVal.englishLastName) {
        return;
      }
      if (!this.valData.enFirstName || !this.errorVal.englishFirstName) {
        return;
      }
      if (this.valData.cnLastName && !this.valData.cnFirstName) {
        return;
      }
      if (this.valData.cnFirstName && !this.valData.cnLastName) {
        return;
      }
      if (!this.errorVal.cnLastName) {
        return;
      }
      if (!this.errorVal.cnFirstName) {
        return;
      }
      if (!this.isShowFname) {
        return;
      }
      if (!this.isShowLname) {
        return;
      }
      if (!this.gender) {
        return;
      }
      if (!this.smoke) {
        return;
      }
      if (date) {
        return;
      }
      if (!this.age) {
        return;
      }
      if (!this.nationality.text) {
        return;
      }
      if (!this.Occupationdata) {
        return;
      }
      if (!this.regionSelect) {
        return;
      }
      if (this.$store.state.source === "eApplication") {
        if (!this.errorCard) {
          return;
        }
        if (!this.dateVal) {
          return;
        }
        if (
          !(this.OCRArr.firstIdInfo.idNo && this.OCRArr.firstIdInfo.lssueDate)
        ) {
          return;
        }
        if (this.couponSelected == "02" || this.couponSelected == "03") {
          if (!this.errorCardTwo) {
            return;
          }
          if (
            !(
              this.OCRArr.secondIdInfo.idNo &&
              this.OCRArr.secondIdInfo.lssueDate &&
              this.OCRArr.secondIdInfo.expiryDate
            )
          ) {
            return;
          }
        }
      }
      this.disabled = false;
    },

    getVal(val) {
      this.nationality = this.nationalityArr.indexOf(val) == -1 ? "" : val;
      console.log("是否存在国籍", this.nationality);
      this.msgVerify();
    },
    getOoccupation(val) {
      this.ooccupation = val;
      console.log("是否存在职业", this.ooccupation);
      this.msgVerify();
      this.getOccupations();
    },
    async getNewStep() {
      const { data } = await updateStep({
        // prtNo: "8ff0771f7e8c", //投保单批次号
        prtNo: this.$store.state.prtNo,
        stepNo: "1", //步骤编号如 1、 2、 3-01、 3-02、 4-05、 4-10...且在进入步骤 4 时更新步
        bubbleState: "2", //步骤状态 1 - Completed step - Blue
        pageNo: "Policyholder", //页面编号（前端路由， 长度在 100 以内）
      });
      console.log(data);
    },
    // 新建准客户
    newProspect() {
      console.log("00000ssss", this.yesNo);
      if (this.yesNo == true) {
        this.yesNo = 1;
      } else {
        this.yesNo = 0;
      }

      if (this.age > 18) {
        this.disabled = false;
        sanctionNationality({
          // 判断是否是制裁国家
          nationalityCode: this.nationality.code,
        }).then((res) => {
          console.log("看一下走到这了没？？？？？？？", this.dateVal);
          if (res.data.flagStr === "Succ") {
            addAndUpdateAppnt({
              type:
                this.contNo === "" || this.contNo === undefined
                  ? "add"
                  : "modify",
              appntCustomerNo:
                this.$store.state.source === "eApplication"
                  ? ""
                  : this.appntCustomerNo,
              contNo:
                this.$store.state.source === "eApplication" ? "" : this.contNo,
              // type:
              //   this.contNo === "" || this.contNo === undefined
              //     ? "add"
              //     : "modify",
              // appntCustomerNo: this.appntCustomerNo,
              // contNo: this.contNo,
              relationToAppnt: this.yesNo.toString(),
              LastNameEn: this.valData.enLastName,
              LastNameCn: this.valData.cnLastName,
              FirstNameCn: this.valData.cnFirstName,
              FirstNameEn: this.valData.enFirstName,
              gender: this.gender,
              smokingStatus: this.smoke === 1 ? "1" : "0",
              age: this.age.toString(),
              // birthday:this.dateVal !== ''?moment(this.dateVal).format("YYYY-MM-DD"): '',
              birthday: this.dateVal,
              placeOfResidency: this.regionSelect.toString(),
              nationalityCode: this.nationality.code,
              nationalityName: this.nationality.text,
              occupationCode: this.ooccupation.code
                ? this.ooccupation.code
                : "",
              occupationName: this.ooccupation.text
                ? this.ooccupation.text
                : this.searchValue,
              source: this.$store.state.source === "eApplication" ? "eApp" : "", //来源于电子投保,该字段仅在电子投保流程中存在
              firstIdInfo: this.OCRArr.firstIdInfo,
              secondIdInfo: this.OCRArr.secondIdInfo,
              dataSource: this.$route.params.dataSource,
            })
              .then((res) => {
                console.log("6666", res);
                if (res.data.flagStr === "Succ") {
                  this.getNewStep();
                  this.$store.commit("YESNO", this.yesNo);
                  let str = res.data.result;
                  if (str.type === "add") {
                    console.log("新增投保人", str.type);
                    // 合同号码
                    this.$store.commit("CONTNO", str.contNo);
                    // 保单号
                    this.$store.commit("POLNO", str.polNo);
                    // 投保人号
                    this.$store.commit("APPNTNO", str.appntCustomerNo);
                    // 主险保单号码
                    this.$store.commit("MAINPOLNO", str.mainPolNo);
                    //  被保人号
                    this.$store.commit("INSUREDNO", str.insuredCustomerNo);
                    //投保单批次号
                    this.$store.commit("PRTNO", str.prtNo);
                    // 客户number
                    this.$store.commit("CUSTOMNO", str.appntCustomerNo);
                    console.log(
                      "新增投保人返回",
                      str.insuredCustomerNo,
                      this.$store.state.insuredNo
                    );

                    this.$router.push({
                      path: "/reIifeInsured",
                      query: {
                        // contNos: str.contNo,
                        yesno: this.yesNo,
                        types: str.type,
                      },
                    });
                  } else {
                    // 建议书管理复制投保人修改
                    if (
                      this.$route.query.from ||
                      this.$route.query.relifeInsu == 1
                    ) {
                      console.log("llll");
                      this.$router.push({
                        path: "/reIifeInsured",
                        query: {
                          // contNos: str.contNo,
                          // policyHolders: this.yesNo == 1 ? 1 : 0,
                          yesno: this.yesNo,
                          islife: 1,
                          from: this.$route.query.from,
                        },
                      });
                    } else {
                      // 新增或者修改投保人
                      this.$router.push({
                        path: "/reIifeInsured",
                        query: {
                          // contNos: str.contNo,
                          policyHolders: this.yesNo == 1 ? 1 : 0,
                          yesno: this.yesNo,
                        },
                      });
                    }
                  }
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else if (res.data.flagStr == "Fail") {
            this.promptShow1 = true;
            this.isFail = 1;

            if (res.data.result.code === "USA") {
              console.log("美国");
              this.Show = true;
              this.Active = false;
            } else {
              this.Show = false;
              this.Active = true;
            }
            this.disabled = true;
            console.log(this.disabled, "按钮是否禁用");
          }
        });
      } else {
        this.disabled = true;
      }
    },
    // 进入资源中心页面
    goResourceCenter() {
      this.$router.push({
        name: "resourceCenter",
      });
    },
  },
  components: {
    datePicker,
    prompt,
    search,
    stateTips,
    ocrButton,
  },
};
</script>
<style scoped>
.wapperDiv {
  width: 100%;
  height: 100vh;
  position: relative;
}
.font {
  padding: 0 1.25rem 1.25rem 1.25rem;
}
.smokingGender {
  display: flex;
}

.footerDiv {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 1.25rem;
}
/* .footer {
  display: block;
  max-width: 23.4375rem;
  margin: auto;
} */
button.last {
  color: #fff;
}
.toggle.yesno .slider:after {
  content: attr(title);
}
.toggle.yesno input:checked + .slider:after {
  content: attr(title2);
}
.page__contents1 {
  z-index: -1;
}
.header {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
}
.contents {
  width: 100%;
  position: absolute;
  overflow-y: scroll;
  /* 增加弹性滚动,解决滚动不流畅的问题 */
  -webkit-overflow-scrolling: touch;
  z-index: 10;
  height: 100%;
}
.footers {
  padding-bottom: 6.75rem;
}
.titlePadding {
  padding-top: 1.25rem;
}
.wapperDiv >>> .popup {
  z-index: 1000;
}
.search__icons:before {
  z-index: 1;
}
</style>

<template>
  <div class="adminUpdateFormBox">
    <a-form-model
      class="adminUpdateForm"
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="账号">
        <a-input v-model="form.account" />
      </a-form-model-item>
      <a-form-model-item label="姓名">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="年龄">
        <a-input v-model="form.age" />
      </a-form-model-item>
      <a-form-model-item label="性别">
        <a-radio-group v-model="form.gender">
          <a-radio value="male">男</a-radio>
          <a-radio value="female">女</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="电话">
        <a-input v-model="form.phone" />
      </a-form-model-item>
      <a-form-model-item label="注册身份">
        <a-radio-group v-model="form.position">
          <a-radio value="plat">平台管理员</a-radio>
          <a-radio value="shop">门店管理员</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px;">Cancel</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import adminService from "../../service/admin.js";
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {
        account: { rule: /\w+/, text: "请填写正确的账号（数字字母构成）" },
        name: { rule: /.+/, text: "请填写正确的昵称（至少一位）" },
        age: { rule: /\d+/, text: "请填写正确的年龄（数字）" },
        gender: { rule: /^(male|female)$/, text: "请填写正确的性别" },
        phone: {
          rule: /^1[3-9]\d{9}$/,
          text: "请填写正确的手机号码"
        },
        position: { rule: /^(plat|shop)$/, text: "请填写正确的（状态）" }
      },
      form: {
        account: "", // 账号
        name: "", // 姓名
        age: "", // 年龄
        gender: "", // 性别
        phone: "", // 手机号
        position: "" // 职位（平台管理员/门店管理员） plat / shop
      }
    };
  },
  props: {
    successTo: {
      type: Object,
      default() {
        return { name: "adminList" };
      }
    }
  },
  methods: {
    async onSubmit() {
      const _id = this.form._id;
      delete this.form._id;
      delete this.form.password;
      delete this.form.status;
      const state = Object.entries(this.form).some(([key, val]) => {
        if (!this.rules[key].rule.test(val)) {
          this.$message.info(this.rules[key].text, 0.4);
          return true;
        }
      });
      if (!state) {
        const { statu, msg } = await adminService.update(
          Object.assign(this.form, { _id })
        );
        this.$notification.open({
          message: "Back Srver",
          description: msg
        });
        if (statu) {
          this.$router.replace(this.successTo);
        }
      }
    }
  },
  created() {
    this.form = {...this.$route.params};
  }
};
</script>

<style scoped>
.adminUpdateFormBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.adminUpdateForm {
  width: 45%;
}
</style>
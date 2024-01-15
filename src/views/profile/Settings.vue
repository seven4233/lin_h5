<script setup lang="ts">
import { getBankListAPI } from '@/apis/bank';
import { onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { updateAvatarAPI , updateUserInfoAPI} from '@/apis/user';
import { showSuccessToast } from 'vant';
const userStore = useUserStore()

const avatarUrl = ref([{ url: userStore.userInfo?.avatar }])

const updateForm = ref({
    account: userStore.userInfo?.account,
    nickname: userStore.userInfo?.nickname,
    email: userStore.userInfo?.email,
    gender: userStore.userInfo?.gender,
    sign: userStore.userInfo?.sign
})
const onSubmit =async (values: any) => {

    values.avatar = values.avatar[0].url
    console.log('submit', values);

    // 调用接口
    let res:any =   await updateUserInfoAPI(values) 
    console.log(res);

    if(res.code === 0 ){
        showSuccessToast({
            message: res.message||"操作成功",
        })
        await userStore.refreshUserInfo() //刷新存储
        setTimeout(() => {
        location.reload()   //刷新浏览器
            
        }, 1000);
        
    }

    
};

const afterRead = async (file: any) => {
    //   保证只有一个url
    avatarUrl.value.splice(0, 1)

    file.status = 'uploading';
    file.message = '上传中...';

    console.log(file.file);
    const fileObj = new FormData()
    fileObj.append('file', file.file)

    let res: any = await updateAvatarAPI(fileObj)
    avatarUrl.value[0].url = res.result


    //  await userStore.refreshUserInfo() //提交之后在reflesh
    file.status = 'success';
    file.message = '上传成功';
};

</script>

<template>
    <Navbar title="资料设置"  />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
        <van-field v-model="updateForm.account" name="account" label="账号/手机号" disabled />

        <van-field v-model="updateForm.nickname" name="nickname" label="昵称" clearable placeholder="请输入昵称"
            :rules="[{ required: true, message: '请填写昵称' }]" />

        <van-field v-model="updateForm.email" name="email" label="邮箱" placeholder="请输入邮箱" clearable
            :rules="[{ required: true, message: '请填写邮箱' }]" />
        <!-- 性别 -->
        <van-field name="gender" label="性别">
            <template #input>
                <van-radio-group v-model="updateForm.gender" direction="horizontal">
                    <van-radio :name="0">保密</van-radio>
                    <van-radio :name="1">男</van-radio>
                    <van-radio :name="2">女</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <!-- 头像 -->
        <van-field name="avatar" label="头像">
            <template #input>
                <van-uploader :max-count="2" v-model="avatarUrl" :after-read="afterRead" :deletable=false>
                    <van-button icon="edit" type="primary" size="small">更换头像</van-button>
                </van-uploader>
            </template>
        </van-field>

        <van-field name="sign" v-model="updateForm.sign" rows="2" autosize label="个性签名" type="textarea" maxlength="50" placeholder="请输入个性签名"
            show-word-limit />
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>
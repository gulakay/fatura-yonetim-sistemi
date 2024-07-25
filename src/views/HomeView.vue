<template>
    <div class="flex justify-content-start align-content-center h-screen">
        <div class="flex flex-column justify-content-center align-items-center gap-3 m-5 bg-blue-50 border-round-3xl" style="width: 50%;">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDRfyMwlBDS6GbohGG6nKoyZNeE-D6trkImSNahbfsfvc1mkzYFfTQj_dL27rhwKR_Hxc&usqp=CAU" alt="logo" class="w-2 h-2 border-round-3xl">
            <h1>Hoş Geldiniz!</h1>
            
                <form @submit.prevent="loginFunc" class="grid col-6 gap-3">
                    <PvInputText v-model="userEmail" class="col-12" type="email" name="email" placeholder="E-mail giriniz" />
                    <PvInputText v-model="userPassword" class="col-12" type="password" name="password" placeholder="Şifre giriniz" />
                    <PvButton type="submit" class="col-12" label="Giriş yap" />
                    
                </form>
                <PvDialog v-model:visible="isDialogVisible" header="Şifre Sıfırlama" modal>
                    <div class=" flex flex-column justify-content-center align-items-center gap-3 p-4">
                      <PvInputText v-model="resetEmail" type="email" placeholder="E-mail adresinizi girin"  />
                      <PvButton @click="sendPasswordReset" label="Şifre Sıfırlama E-maili Gönder" />
                    </div>
                  </PvDialog>
                  <PvButton @click="showForgotPasswordDialog" class=" text-white hover:text-800 cursor-pointer" label="Şifremi unuttum" />
               
        </div>
        <div class="flex flex-column justify-content-start align-items-center h-screen m-5">
            <h2>Biz Kimiz?</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, dolorem? Lorem ipsum dolor sit amet.</p>
            <img src="https://sbsnetyazilim.com/wp-content/uploads/2023/07/E-Belge-tab.png" alt="image" class="w-8 h-8 border-round-2xl m-5">
            
        </div>
        <PvToast/>
    </div>

</template>

<script>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "primevue/usetoast";

export default {
  name: "HomeView",
  setup() {
    const userEmail = ref('');
    const userPassword = ref('');
    const resetEmail = ref('');
    const isDialogVisible = ref(false);
    const toast = useToast();
    const router = useRouter();
    const auth = getAuth();

    const loginFunc = async () => {
      try {
        await signInWithEmailAndPassword(auth, userEmail.value, userPassword.value);
        toast.add({ severity: 'info', summary: 'Onaylandı', detail: 'Giriş yapıldı', life: 3000 });
        localStorage.setItem("id", auth.currentUser.uid);
        setTimeout(() => {
          router.push({ name: "invoiceList" });
        }, 2000);
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Hata', detail: 'Giriş yapılamadı', life: 3000 });
      }
    };

    const showForgotPasswordDialog = () => {
      isDialogVisible.value = true;
    };

    const sendPasswordReset = async () => {
      if (!resetEmail.value) {
        toast.add({ severity: 'warn', summary: 'Uyarı', detail: 'Lütfen e-mail adresinizi girin', life: 3000 });
        return;
      }
      try {
        await sendPasswordResetEmail(auth, resetEmail.value);
        toast.add({ severity: 'info', summary: 'E-mail Gönderildi', detail: 'Şifre sıfırlama e-maili gönderildi', life: 3000 });
        isDialogVisible.value = false;
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Hata', detail: 'Şifre sıfırlama e-maili gönderilemedi', life: 3000 });
      }
    };

    return { showForgotPasswordDialog, sendPasswordReset, userEmail, userPassword, resetEmail, isDialogVisible, loginFunc };
  }
};
</script>


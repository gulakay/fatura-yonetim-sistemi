<template>
    <div class="flex justify-content-center align-content-center h-screen ">
    <div class="flex flex-column justify-content-center align-items-center gap-3 m-5 bg-blue-50 border-round-3xl p-5" style="width: 50%;">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDRfyMwlBDS6GbohGG6nKoyZNeE-D6trkImSNahbfsfvc1mkzYFfTQj_dL27rhwKR_Hxc&usqp=CAU" alt="logo" class="w-2 h-2 border-round-3xl">
        
            <form @submit.prevent="loginFunc" class="grid col-6 gap-3 p-3">
                <PvInputText v-model="userEmail" class="col-12" type="email" name="email" placeholder="E-mail giriniz" />
               
                <PvButton type="submit" class="col-12" label="Şifremi yenile" />
                
            </form>
           
    </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
<template>
    <div class=" flex justify-content-between align-content-center bg-blue-500 border-round-3xl pl-3 pr-3">

      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDRfyMwlBDS6GbohGG6nKoyZNeE-D6trkImSNahbfsfvc1mkzYFfTQj_dL27rhwKR_Hxc&usqp=CAU" alt="logo" style="width:80px; height:80px" class=" border-round-3xl p-3">
       <div class="flex justify-content-center align-items-center" >
         <PvMenubar class=" bg-blue-500 ml-3 border-none border-round-3xl" :model="items"></PvMenubar>
       </div>
     </div>
     </template>
     
     <script>
     import {  ref } from 'vue';
     import { useRouter } from 'vue-router';
     import { getAuth, signOut } from "firebase/auth";
    
     
     export default {
    
       setup() {
         const router = useRouter(); 
         const auth = getAuth();

         
         const items = ref([
           
           {
             label: 'Fatura Listesi',
             icon: 'pi pi-list',
             command: () => router.push({name:"invoiceList" })
           },
           {
             label: 'Fatura Oluştur',
             icon: 'pi pi-star',
             command: () => router.push({name:"createInvoice" })
           },
          
           {
             label: 'Müşteri Yönetimi',
             icon: 'pi pi-users',
             command: () => router.push({name:"customerManagement" })
           },
           {
             label: 'Çıkış yap',
             icon: 'pi pi-sign-out',
             command: () => logoutFunc()
           }
         ]);
     
         const logoutFunc = () => {
            signOut(auth).then(() => {
                console.log('User signed out.');
                router.push({ name: "homeView" });
            });
        };
         return { items };
       }
     }
     </script>
     
     <style>
     
     </style>
     
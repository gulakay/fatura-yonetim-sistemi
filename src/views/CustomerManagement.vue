<template>
  <div class="p-5 bg-blue-100 border-round-xl m-5 flex flex-column justify-content-start align-content-center h-screen">
    <PvDataTable :value="customerList">
      <PvColumn field="customerName" header="Müşteri adı" />
      <PvColumn field="customerEmail" header="Müşteri e-mail adresi" />
      <PvColumn field="invoiceAddress" header="Fatura adresi" />
      <PvColumn field="customerPhone" header="Müşteri telefonu" />
      <PvColumn>
        <template #body="slotProps">
          <div>
            <PvButton 
              @click="requireConfirmation(slotProps.data, $event)" 
              class="bg-red-500" 
              icon="pi pi-trash"
            ></PvButton>
            <PvButton 
              @click="requireEditConfirmation(slotProps.data, $event)" 
              class="bg-teal-500 ml-2" 
              icon="pi pi-user-edit"
            ></PvButton>
          </div>
        </template>
      </PvColumn>
    </PvDataTable>
    <PvToast />
    <PvConfirmDialog group="delete">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="rounded p-4">
          <span>{{ message.message }}</span>
          <div class="flex items-center gap-2 mt-4">
            <PvButton label="Sil" class="bg-red-500" @click="acceptCallback" size="small"></PvButton>
            <PvButton label="İptal" outlined @click="rejectCallback" severity="secondary" size="small" text></PvButton>
          </div>
        </div>
      </template>
    </PvConfirmDialog>
    <PvConfirmDialog group="edit">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="rounded p-4">
          <span>{{ message.message }}</span>
          <div class="flex items-center gap-2 mt-4">
            <PvButton label="Düzenle" class="bg-teal-500" @click="acceptCallback" size="small"></PvButton>
            <PvButton label="İptal" outlined @click="rejectCallback" severity="secondary" size="small" text></PvButton>
          </div>
        </div>
      </template>
    </PvConfirmDialog>
    <PvDialog v-model:visible="editDialogVisible" header="Müşteri Düzenle">
      <div class="p-fluid">
        <div class="p-field">
          <label for="customerName">Müşteri adı</label>
          <PvInputText id="customerName" v-model="customerToEdit.name" />
        </div>
        <div class="p-field">
          <label for="customerEmail">Müşteri e-mail adresi</label>
          <PvInputText id="customerEmail" v-model="customerToEdit.email" />
        </div>
        <div class="p-field">
          <label for="invoiceAddress">Fatura adresi</label>
          <PvInputText id="invoiceAddress" v-model="customerToEdit.invoiceAddress" />
        </div>
        <div class="p-field">
          <label for="customerPhone">Müşteri telefonu</label>
          <PvInputText id="customerPhone" v-model="customerToEdit.phone" />
        </div>
        <div class="flex justify-content-end gap-2 mt-4">
          <PvButton label="Kaydet" @click="handleEdit" class="bg-teal-500" />
          <PvButton label="İptal" @click="closeEditDialog" class="bg-red-500" />
        </div>
      </div>
    </PvDialog>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getFirestore, query, collection, getDocs, doc, deleteDoc, updateDoc, where } from 'firebase/firestore';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

export default {
  name: 'CustomerManagement',
  
  setup() {
    const customerList = ref([]);
    const db = getFirestore();  
    const confirm = useConfirm();
    const toast = useToast();
    const editDialogVisible = ref(false);
    const customerToEdit = ref(null); 
    let customerToDelete = ref(null);

    const requireConfirmation = (customer, event) => {
      customerToDelete.value = customer; 
      confirm.require({
        target: event.currentTarget,
        group: 'delete',
        message: 'Müşteriyi silmek istediğinize emin misiniz?',
        accept: () => handleDelete(),
        reject: () => {
          toast.add({ severity: 'error', summary: 'Reddedildi', detail: 'İşlem iptal edildi', life: 3000 });
        }
      });
    }

    const handleDelete = async () => {
      if (customerToDelete.value) {
        try {
         
          const q = query(collection(db, "invoices"), where("customerEmail", "==", customerToDelete.value.customerEmail));
          const querySnapshot = await getDocs(q);
          let docId = null;

          querySnapshot.forEach((doc) => {
            docId = doc.id; 
          });

          if (docId) {
            await deleteDoc(doc(db, "invoices", docId));
            customerList.value = customerList.value.filter(c => c.customerEmail !== customerToDelete.value.customerEmail);
            toast.add({ severity: 'info', summary: 'Başarıyla Silindi', detail: 'Müşteri silindi', life: 3000 });
          } else {
            toast.add({ severity: 'error', summary: 'Hata', detail: 'Müşteri bulunamadı', life: 3000 });
          }

        } catch (error) {
          toast.add({ severity: 'error', summary: 'Hata', detail: 'Müşteri silinemedi', life: 3000 });
          console.log(error);
        }
      }
    }

    const requireEditConfirmation = (customer, event) => {
      customerToEdit.value = { ...customer }; 
      confirm.require({
        target: event.currentTarget,
        group: 'edit',
        message: 'Müşteriyi düzenlemek istediğinize emin misiniz?',
        accept: () => openEditDialog(),
        reject: () => {
          toast.add({ severity: 'error', summary: 'Reddedildi', detail: 'İşlem iptal edildi', life: 3000 });
        }
      });
    }

    const openEditDialog = () => {
      editDialogVisible.value = true;
    }

    const closeEditDialog = () => {
      editDialogVisible.value = false;
    }

    const handleEdit = async () => {
      if (customerToEdit.value) {
        try {
          const updatedCustomerData = { ...customerToEdit.value };
          await updateDoc(doc(db, "invoices", customerToEdit.value.id), updatedCustomerData);
          customerList.value = customerList.value.map(c => c.id === customerToEdit.value.id ? updatedCustomerData : c);
          toast.add({ severity: 'info', summary: 'Başarıyla Güncellendi', detail: 'Müşteri bilgileri güncellendi', life: 3000 });
          closeEditDialog();
        } catch (error) {
          toast.add({ severity: 'error', summary: 'Hata', detail: 'Müşteri bilgileri güncellenemedi', life: 3000 });
        }
      }
    }

    const getCustomerData = async () => {
      const q = query(collection(db, "invoices"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        customerList.value.push({ id: doc.id, ...doc.data() });
      });
    }

    onMounted(() => {
      getCustomerData();
    })

    return {
      customerList,
      requireConfirmation,
      requireEditConfirmation,
      openEditDialog,
      closeEditDialog,
      handleEdit,
      editDialogVisible,
      customerToEdit
    };
  }
};
</script>

<template>
  <div class="flex flex-column justify-content-start align-items-center h-screen max-w-screen m-8">
    <div class="grid col-6 border-round-xl p-3 shadow-2 bg-blue-100">
      <form @submit.prevent="submitForm" :value="invoiceCreateList">
        <h2 class="text-2xl font-semibold m-3">Fatura Oluştur</h2>
        <div class="p-2">
          <PvInputText class="col-12 mb-3" id="customerName" name="customerName" v-model="invoiceCreateList.customerName" placeholder="Müşteri Adı" required/>
          <PvInputText class="col-12 mb-3" id="customerEmail" name="customerEmail" v-model="invoiceCreateList.customerEmail" placeholder="Müşteri e-mail adresi" required/>
          <PvInputText class="col-12 mb-3" id="customerPhone" name="customerPhone" v-model="invoiceCreateList.customerPhone" placeholder="Müşteri telefonu" required/>
          <PvInputText class="col-12 mb-3" id="invoiceAddress" name="invoiceAddress" v-model="invoiceCreateList.invoiceAddress" placeholder="Fatura adresi" required/>
          <PvInputText type="number" class="col-12 mb-3" id="invoiceFee" name="invoiceFee" v-model="invoiceCreateList.invoiceFee" placeholder="Fatura Ücreti (₺)" required/>
          <PvInputText class="col-12 mb-3" id="invoiceDecs" name="invoiceDecs" v-model="invoiceCreateList.invoiceDecs" placeholder="Fatura açıklaması" required/>
         
        </div>
        <PvCalendar class="col-12 mb-3" id="invoiceDate" name="invoiceDate" v-model="invoiceCreateList.invoiceDate" dateFormat="dd/mm/yy"  placeholder="Fatura tarihi" required />
        <PvButton type="submit" class="col-12 mb-3" label="Oluştur"/>
      </form>
    </div>
    <PvToast ref="toast" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { collection, addDoc, getFirestore } from 'firebase/firestore';

export default {
  setup() {
    const invoiceCreateList = ref({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      invoiceAddress: '',
      invoiceFee: '',
      invoiceDate: '',
      invoiceDecs: '',
    });

    const toast = ref(null);

    const db = getFirestore();

    const addFormDataToFirestore = async (data) => {
      try {
        await addDoc(collection(db, "invoices"), data);
        toast.value.add({ severity: 'success', summary: 'Başarılı', detail: 'Fatura oluşturuldu', life: 3000 });
      } catch (e) {
        toast.value.add({ severity: 'error', summary: 'Hata', detail: 'Fatura oluşturulamadı', life: 3000 });
      }
    };

    const submitForm = async () => {
      await addFormDataToFirestore(invoiceCreateList.value);
      invoiceCreateList.value = {
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        invoiceAddress: '',
        invoiceFee: '',
        invoiceDate: '',
        invoiceDecs: ''
      };
    };

    return { invoiceCreateList, submitForm, toast };
  }
};

</script>


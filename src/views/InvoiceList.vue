<template>
  <div class="p-5 bg-blue-100 border-round-xl m-5 flex flex-column justify-content-start align-content-center h-screen">
<PvDataTable  :value="invoiceList">
  <PvColumn field="customerName" header="Müşteri Adı"/>
  <PvColumn field="invoiceDate" header="Fatura tarihi"/>
  <PvColumn field="invoiceDesc" header="Fatura açıklaması"/>
  <PvColumn field="invoiceAddress" header="Fatura adresi"/>
  <PvColumn field="invoiceFee" header="Fatura tutarı"/>
</PvDataTable>

</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getFirestore, query, collection, getDocs } from 'firebase/firestore';

export default {
  name: 'invoiceList',

  setup() {
    const invoiceList = ref([]);

    const db = getFirestore();

    const getInvoicesData = async () => {
      const q = query(collection(db, "invoices"));
      await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          const data = item.data();
          
          data.invoiceDate = formatDate(data.invoiceDate.toDate());
          invoiceList.value.push(data);
        });
      });
    };

   
    const formatDate = (date) => {
      return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    };

    onMounted(() => {
      getInvoicesData();
    });

    return {
      invoiceList
    };
  }
};
</script>
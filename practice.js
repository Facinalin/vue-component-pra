import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = createApp({
   data(){
    return{
      pagintaion:{},
      products:[],
      apiUrl:'https://vue3-course-api.hexschool.io/v2',
      apiPath:'lk1025cina'
    }
   },
   methods:{
    //default值寫法，因為頁數本來就會有預設載入
    getData(page = 1) {
        //拉出來宣告
        const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
        console.log(this.pagination);
        axios.get(url)
          .then((response) => {
            const { products, pagination } = response.data;
            this.products = products;
            this.pagination = pagination;
            console.log(this.pagination.current_page);
            //這邊有正常console.log
          }).catch((err) => {
            alert(err.response.data.message);
            //若抓到錯誤訊息，則將網址導回login.html
            window.location = 'login.html';
          })
      }
   },
   mounted() {
    //建議宣告在mounted裡
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common.Authorization = token;
    this.getData();//這個應該要確定登入後再then
    }
});

app.component('pagination',{
 template: '#paginationT',
 props:['pages'],
 methods:{
    emitPagesT(item){
    this.$emit('emitVerPage',item)
    }
 }

})




app.mount('#app')
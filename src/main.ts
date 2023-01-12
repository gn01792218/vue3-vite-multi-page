
//開發環境時，重新導向
if(import.meta.env.MODE === 'development'){
    console.log('測試環境',import.meta.env.MODE)
    const url = `./pages/${import.meta.env.VITE_TEMPLATE}/index.html`
    window.open(url,'_self')
}
const dataFetch = async (selectedCategory,dateFrom,dateTo) =>{
    let login = 'admin@terrenkur1'
    let password = 'Dostyk128'
    
require('isomorphic-fetch') // polyfill
const Moysklad = require('moysklad')
const ms = Moysklad({ login: login, password: password })
    let report1 =  await ms.GET('/report/profit/byvariant',{
        expand: 'assortment',
        limit: 100,
        momentFrom: dateFrom,
        momentTo: dateTo
      })
      let report2 =  await ms.GET('/report/profit/byvariant',{
        expand: 'assortment',
        offset: 101,
        limit: 100,
        momentFrom: dateFrom,
        momentTo: dateTo
      })
      let report3 =  await ms.GET('/report/profit/byvariant',{
        expand: 'assortment',
        offset: 201,
        limit: 100,
        momentFrom: dateFrom,
        momentTo: dateTo
      })
      let report4 =  await ms.GET('/report/profit/byvariant',{
        expand: 'assortment',
        offset: 301,
        limit: 100,
        momentFrom: dateFrom,
        momentTo: dateTo
      })
      let report5 =  await ms.GET('/report/profit/byvariant',{
        expand: 'assortment',
        offset: 401,
        limit: 100,
        momentFrom: dateFrom,
        momentTo: dateTo
      })
      let report6 =  await ms.GET('/report/profit/byvariant',{
        expand: 'assortment',
        offset: 501,
        limit: 100,
        momentFrom: dateFrom,
        momentTo: dateTo
      })
      let report7 =  await ms.GET('/report/profit/byvariant',{
        expand: 'assortment',
        offset: 601,
        limit: 100,
        momentFrom: dateFrom,
        momentTo: dateTo
      })
      let report8 =  await ms.GET('/report/profit/byvariant',{
        expand: 'assortment',
        offset: 701,
        limit: 100,
        momentFrom: dateFrom,
        momentTo: dateTo
      })
      let report9 =  await ms.GET('/report/profit/byvariant',{
        expand: 'assortment',
        offset: 801,
        limit: 100,
        momentFrom: dateFrom,
        momentTo: dateTo
      })
      let productFolder = await ms.GET('entity/productfolder',{
          filter: {
            name:selectedCategory
        }
      })
      let assortment = await ms.GET('entity/assortment',{
        filter: {
          productFolder:`https://online.moysklad.ru/api/remap/1.1/entity/productfolder/${productFolder.rows[0].id}`
      }
    })
    let arrSortedByCategory = []
      for(let i=0;i<assortment.rows.length;i++){
          for(let j=0;j<report1.rows.length;j++){
            if(assortment.rows[i].name===report1.rows[j].assortment.name){
                 arrSortedByCategory.push(report1.rows[j])
      
              }
          }
      }
    for(let i=0;i<assortment.rows.length;i++){
      for(let j=0;j<report2.rows.length;j++){
        if(assortment.rows[i].name===report2.rows[j].assortment.name){
             arrSortedByCategory.push(report2.rows[j])
  
          }
      }
  }
    for(let i=0;i<assortment.rows.length;i++){
      for(let j=0;j<report3.rows.length;j++){
        if(assortment.rows[i].name===report3.rows[j].assortment.name){
             arrSortedByCategory.push(report3.rows[j])
  
          }
      }
  }
  for(let i=0;i<assortment.rows.length;i++){
    for(let j=0;j<report4.rows.length;j++){
      if(assortment.rows[i].name===report4.rows[j].assortment.name){
           arrSortedByCategory.push(report4.rows[j])

        }
    }
}
for(let i=0;i<assortment.rows.length;i++){
  for(let j=0;j<report5.rows.length;j++){
    if(assortment.rows[i].name===report5.rows[j].assortment.name){
         arrSortedByCategory.push(report5.rows[j])
      }
  }
}
for(let i=0;i<assortment.rows.length;i++){
  for(let j=0;j<report6.rows.length;j++){
    if(assortment.rows[i].name===report6.rows[j].assortment.name){
         arrSortedByCategory.push(report6.rows[j])
      }
  }
}
for(let i=0;i<assortment.rows.length;i++){
  for(let j=0;j<report7.rows.length;j++){
    if(assortment.rows[i].name===report7.rows[j].assortment.name){
         arrSortedByCategory.push(report7.rows[j])
      }
  }
}
for(let i=0;i<assortment.rows.length;i++){
  for(let j=0;j<report8.rows.length;j++){
    if(assortment.rows[i].name===report8.rows[j].assortment.name){
         arrSortedByCategory.push(report8.rows[j])
      }
  }
}
for(let i=0;i<assortment.rows.length;i++){
  for(let j=0;j<report9.rows.length;j++){
    if(assortment.rows[i].name===report9.rows[j].assortment.name){
         arrSortedByCategory.push(report9.rows[j])
      }
  }
}
      console.log(arrSortedByCategory)
      return arrSortedByCategory
}
export default dataFetch

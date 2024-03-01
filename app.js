const loadAllCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const datas = await res.json()
    const data = datas.data.news_category
    // console.log(data)

    const btnContainer = document.getElementById('btn-container')
    data.forEach(category => {
        // console.log(category)
        const btns = document.createElement('div')

        btns.innerHTML = `<button onclick="loadNews('${category.category_id}')" class="btn btn-accent text-white">${category.category_name}</button>`
        btnContainer.appendChild(btns)
    })
}

const loadNews = async (id) => {

    const loader = document.getElementById('loader')
    loader.classList.remove('hidden')
    // console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    const datas = await res.json()
    const data = datas.data
    // console.log(data)

  

    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = ''

    data.forEach((news) =>{
        const loader = document.getElementById('loader')
        loader.classList.add('hidden')
    
        // console.log(news.details)
        const div = document.createElement('div')
        div.classList = 'card lg:card-side bg-base-100 shadow-xl '
        div.innerHTML = `
        <img class="w-64" src="${news.image_url}" alt="">

        <div class="card-body">
          <h2 class="card-title">${news.title}</h2>
          <p>${news.details.slice(0,200)}</p>

          <div class="card-actions justify-between items-center mt-4">
            <div class="flex gap-2">
                <img class="w-11 rounded-full" src="${news.author.img}" alt="">
                <div>
                    <p class="font-bold">${news.author.name}</p>
                    <p>${news.author.published_date}</p>
                </div>
            </div>
            
            <p>${news.total_view}</p>

            <button onclick="showDetails('${news.details}')" class="btn">details</button>
          </div>

        </div>
      </div>
        `
        newsContainer.appendChild(div)
    })

}


function showNewsBySearch (){
    const inputField = document.getElementById('search-input-field').value 
    console.log(inputField)
    loadNews(inputField)
}


const showDetails = (text) =>{
    console.log(text)
}



loadAllCategory()
loadNews('01')

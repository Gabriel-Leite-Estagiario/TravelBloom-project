let jsonData ;
fetch("travel_recommendation_api.json").then((response) => 
{return response.json()}).then(data => {jsonData = data;});


const search_btn = document.getElementById("search_btn");
search_btn.addEventListener("click", function(){
    const search = document.getElementById("search");
    searchByText(search.value);
});

const clear_btn = document.getElementById("clear_btn");
clear_btn.addEventListener("click", function(){
    const search = document.getElementById("search");
    search.value = "";
});

function searchByText(value){
    const converted = value.toLowerCase();
    let updated ;
    switch(converted){
        case "beach" :
            updated = "beaches";
            break;
        case "temple" :
            updated = "temples";
            break;
        case "country" :
            updated = "countries";
            break;
        default : 
            updated = converted;
            break;
    }
    if(jsonData[updated]){
        const list = openResults();
        let results ;
        if(updated === "countries"){
            console.log(jsonData[updated].length);
            jsonData.countries.forEach(country => {
                for(key in country){
                    if(key === "cities"){
                        country[key].forEach(city => {
                            append(list,buildResult(city));
                        });
                    }
                }
            });
           
        }else{
            if(jsonData[updated]){
                for(key in jsonData[updated]){
                    append(list,buildResult(jsonData[updated][key]));
                }
            }
            
        }
        display(list);
    }else{

    }
}

function buildResult(result){
    const item = document.createElement('li');
    const img = document.createElement("img");
    img.setAttribute('src',result.imageUrl);
    const paragraph = document.createElement("p"); 
    paragraph.innerText = result.description;
    const name = document.createElement("h6");
    name.innerText = result.name;
    item.appendChild(img);
    item.appendChild(name);
    item.appendChild(paragraph);
    return item;
}

function openResults(){
    return document.createElement("ul");
}

function display(results){
    const search_result_wrapper = document.getElementById("search_result_wrapper");
    search_result_wrapper.innerHTML = "";
    search_result_wrapper.appendChild(results);
}

function append(list,result){
    list.appendChild(result);
}
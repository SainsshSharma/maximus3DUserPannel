import { LoadHtml } from "./loadHtml";
import { Utility } from "./sidePannel";
import { LoadCss } from "./loadCss";
import { ThreeJsInitialiser } from "./threeJsMain";
import { CardComponent } from "../components/cardComponent";
const url="https://api.maximus3d.com/"

window.onload=()=>{
    // LoadHtml()
    LoadCss()
    Utility()    
    main()
}

async function getFile(id){
    try{
        let data=await fetch(`${url}api/v1/get_product/${id}`);
        let response=await data.json();
        return `${url}/${response.file_name}`;
    }catch(error){
        console.log(error);
    }
}

async function getJson(id)
{
    try{
        let data=await fetch(`${url}api/v1/get_product_details/${id}`)
        let response=await data.json()
        return response.data;
    }
    catch(err)
    {
        console.log(err)
    }
}

function getAllDataFromKey(Key,model,intializer)
{
    
    let keys=Object.keys(Key)
    let data=[]
    keys.map(i=>{
        let heading=[]
        let name=[]
        let image=[]
        let objectName=[]
        Key[i].forEach(item=>{
            
            if(model[item.parts_name]!=undefined)
            {   
                heading.push(i)
                name.push(model[item.parts_name].name)
                image.push(url+model[item.parts_name].image)
                objectName.push(item.parts_name)
            }
            
        })
        data.push({heading,name,image,objectName})
    })

    data.map((i,indx)=>{
        let card=new CardComponent(indx,i.heading[0],i,intializer,model)
        document.querySelector('.optionsPannel').appendChild(card)        
    })

    // let card=new CardComponent(data.length,"Color",undefined,intializer,model)
    // document.querySelector('.optionsPannel').appendChild(card)    

    // let card1=new CardComponent(data.length+1,"Length",undefined,intializer,model)
    // document.querySelector('.optionsPannel').appendChild(card1)    
    
}

async function main()
{
    const intializer=new ThreeJsInitialiser(await getFile(5))
    await intializer.start()
    let model=await getJson(5)
    console.log(model)
    getAllDataFromKey(model.segment,model,intializer)
    
}


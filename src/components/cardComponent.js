import stateManagement from "../states/stateManagement";
import { partComponent } from "./partComponent";
function sectionComponent(counter,heading){
    const cardTemplate=document.createElement('template')
    cardTemplate.innerHTML=`
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <style>
    .optionsHeading{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
      .optionsHeading>*{
        font-size: 22px;
        color: white;
        padding: 10px;
      }
    </style>
    <div class="optionsHeading over">
        <div>0${counter}</div>
        <div>${heading}</div>
        <i class='bx bx-chevrons-right optionsBtn'></i>
    </div>
    `

    return cardTemplate.content.cloneNode(true);
}

export class CardComponent extends HTMLElement{
    static counter=0;
    constructor(counter,heading,meshData,intializer,data,type)
    {
        super()
        this.counter=counter
        this.heading=heading
        this.meshData=meshData
        this.data=data
        this.intializer=intializer
        this.price=this.data[this.meshData.name[0]].price
        this.type=type;
        CardComponent.counter=0
        
        const shadowRoot=this.attachShadow({mode:'open'})
        shadowRoot.appendChild(sectionComponent(this.counter,this.heading.toUpperCase()))
        if(this.type==='segment')
        {
                this.LoadModel()

        stateManagement.segementSelected.push({name:this.meshData.name[0],price:this.data[this.meshData.name[0]].price})
        
        this.onclick=()=>{
            let overContainer=document.querySelector('.overContainer')
            overContainer.classList.toggle('open')

            if(CardComponent.counter%2===0)
            {
                Object.keys(this.data.segment).map(i=>{

                    if(i==this.heading)
                    {                        
                        this.data.segment[heading].map(i=>{
                            let img=this.data[i.parts_name].image
                            let name=this.data[i.parts_name].name
                            
                            let part=new partComponent(this.intializer,img,name,this.meshData.name[0],this.data)
                            overContainer.appendChild(part)
                        })
                    }
                })
            }
            else
            {
                while(overContainer.hasChildNodes())
                {
                    overContainer.removeChild(overContainer.firstChild)
                }   
            }
            CardComponent.counter++

        }    
    }
    else if(this.type==="color")
        {
            this.onclick=()=>{
                let overContainer=document.querySelector('.overContainer')
                overContainer.classList.toggle('open')
                
                if(CardComponent.counter%2===0)
                {
                    let arr=[]
                    stateManagement.segementSelected.map(i=>{
                        arr.push(i.name)
                    })
                    let keys=[]
                    arr.map(i=>{
                        let arr=Object.keys(this.data[i]).filter(i=>{
                            if(i=="name" || i=="image" || i=="price")
                                return false;
                            else 
                                return true;    
                        })
                        keys.push({name:i,child:arr})                        
                    })

                    
                    console.log(keys)
                }
                else
                {
                    while(overContainer.hasChildNodes())
                        {
                            overContainer.removeChild(overContainer.firstChild)
                        }   
                }
                CardComponent.counter++
            }
        }    
        
    }

    async LoadModel()
    {
        await this.intializer.ShowAllMeshesFromObject(await this.intializer.GetObjectByName(this.meshData.name[0]))
    }

    connectedCallback()
    {

    }

    disconnectedCallback()
    {

    }

    static get observedAttributes(){

    }

    get id(){
     return this.getAttribute(id)
    }

    set id(value){
        this.setAttribute("id",value)
    }
    
    attributeChangedCallback(attrName,oldVal,newVal)
    {
        if(attrName.toLowerCase()=='content')
        {
            console.log(newVal)          
        }        
    }
}

customElements.define('card-component',CardComponent)
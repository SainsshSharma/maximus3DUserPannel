import stateManagement from "../states/stateManagement";
function sectionComponent(counter,heading){
    const cardTemplate=document.createElement('template')
    cardTemplate.innerHTML=`
    <style>
    .optionsHeading{
        width: 100%;
        display: flex;
        
        cursor:pointer !important;
        background-color:#034951;
        border-bottom:  1px solid #aedde5;
        height:13vh;
        border-radius: 4px;
       
        }

    .optionsHeading:hover{
        background-color: #003135;
        transform: scale(.98);
        transition: transform .4s;
    }


    .optionsHeading>*{
        font-size: 20px;
        color: white;
        display: flex;
        margin-left:1vw;
        margin-top:3vh;
    }

    .imgg{
        border-radius:25px;
        box-shadow: 0 0 10px #003135;
    }
    .partsHeading{
        margin-left:1vw;
        margin-top:3vh;
        }
        
    </style>
    <div class="optionsHeading over">
        <div><img class="imgg" src="https://api.maximus3d.com/${counter}" width=50 height=50></div>
        <div class="partsHeading">${heading}</div>
        <i class='bx bx-chevrons-right optionsBtn'></i>
    </div>
    `

    return cardTemplate.content.cloneNode(true);
}

export class partComponent extends HTMLElement{
    static current=undefined
    constructor(intializer,counter,heading,current,data)
    {
        super()
        
        const shadowRoot=this.attachShadow({mode:'open'})
        this.intializer=intializer
        this.counter=counter
        this.heading=heading
        partComponent.current=current
        this.data=data
        
        shadowRoot.appendChild(sectionComponent(this.counter,this.heading))
        
        this.onclick=()=>{
            this.changeContent(partComponent.current,this.heading)
            this.removeObject()            
            partComponent.current=this.heading            
            this.showObject()
        }
    }    
    changeContent(prev,curr)
    {

        stateManagement.segementSelected=stateManagement.segementSelected.filter(i=>{
            if(prev===i.name)
                return false
            else
                return true
        })
        stateManagement.segementSelected.push({name:curr,price:this.data[curr].price})

        console.log(stateManagement)
    }
    
    async removeObject()
    {
        
        await this.intializer.HideMeshFromObjects(await this.intializer.GetObjectByName(partComponent.current))
    }
    
    async showObject()
    {        
        await this.intializer.ShowAllMeshesFromObject(await this.intializer.GetObjectByName(partComponent.current))
        
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

customElements.define('part-component',partComponent)
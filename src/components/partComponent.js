import stateManagement from "../states/stateManagement";
function sectionComponent(counter,heading){
    const cardTemplate=document.createElement('template')
    cardTemplate.innerHTML=`
    <style>
    .optionsHeading{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        cursor:pointer !important;
        background-color:#034951;
        border-bottom:  1px solid black;
        height:17vh;
       
        }

    .optionsHeading:hover{
          background-color: rgb(36, 34, 34);
           
           transform: scale(.91);
    }


      .optionsHeading>*{
        font-size: 22px;
        color: white;
        padding:10px;
        display: flex;
     
        width:5vw;
      
        
        
      }
        
    </style>
    <div class="optionsHeading over">
        <div><img src="https://api.maximus3d.com/${counter}" width=50 height=50></div>
        <div>${heading}</div>
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
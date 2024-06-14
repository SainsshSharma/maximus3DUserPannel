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
      }
      .optionsHeading>*{
        font-size: 22px;
        color: white;
        padding: 10px;
      }
      .color{
        background-color:${counter};
      }
    </style>
    <div class="optionsHeading over">
        <div class="color"></div>
        <div>${heading}</div>
        <i class='bx bx-chevrons-right optionsBtn'></i>
    </div>
    `

    return cardTemplate.content.cloneNode(true);
}

export class colorComponent extends HTMLElement{
    static current=undefined
    constructor(intializer,color)
    {
        super()
        
        const shadowRoot=this.attachShadow({mode:'open'})
        this.intializer=intializer
        this.data=color
        colorComponent.current=current
        
        
        shadowRoot.appendChild(sectionComponent(this.counter,this.heading))
        
        this.onclick=()=>{
            
        }
    }    

    

    async removeObject()
    {
        
        await this.intializer.HideMeshFromObjects(await this.intializer.GetObjectByName(colorComponent.current))
    }
    
    async showObject()
    {        
        await this.intializer.ShowAllMeshesFromObject(await this.intializer.GetObjectByName(colorComponent.current))
        
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

customElements.define('color-component',colorComponent)
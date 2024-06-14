import stateManagement from "../states/stateManagement";
function sectionComponent(counter,heading,colorName){
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
        border-bottom:  1px solid #aedde5;
        height:13vh;
        border-radius: 6px;
      }
      .optionsHeading>*{
        font-size: 18px;
        color: white;
        padding: 10px;
      }
      .color{
        background-color:${counter};
        width:30px;
        height:30px;
      }
      .properties{
        display:flex;
        justify-content:flex-start;
        align-items:center;
        flex-direction:column;
      }
    .optionsHeading:hover{
        background-color: #003135;
        transform: scale(.98);
        transition: transform .4s;
    }
    .colorHeading{
       border-radius:25px;
    }
    </style>
    <div class="optionsHeading over">
        <div class="color"></div>
        <div class="properties">
            <div class="colorHeading">${heading}</div>
            <div class="colorName">${colorName}</div>
        </div>
        <i class='bx bx-chevrons-right optionsBtn'></i>
    </div>
    `

    return cardTemplate.content.cloneNode(true);
}

export class colorComponent extends HTMLElement{
    // static current=undefined
    constructor(intializer,parent,name,heading,color,price,colorName)
    {
        super()
        
        const shadowRoot=this.attachShadow({mode:'open'})
        this.intializer=intializer
        this.meshParent=parent
        this.parent=name
        this.heading=heading
        this.color=color
        this.price=price
        this.colorName=colorName 
        // colorComponent.current=current
        
        
        shadowRoot.appendChild(sectionComponent(this.color,this.heading,this.colorName))
        
        this.onclick=()=>{
            this.changeColor()
            stateManagement.propertiesSelected.push({parent:this.meshParent,color:color,price:price})
            console.log(stateManagement)
        }
    }    

    async changeColor()
    {
        
        await this.intializer.SetColor(await this.intializer.GetObjectByName(this.parent),this.color)
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
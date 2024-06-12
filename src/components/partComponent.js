function sectionComponent(counter,heading){
    const cardTemplate=document.createElement('template')
    cardTemplate.innerHTML=`
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

export class partComponent extends HTMLElement{
    constructor()
    {
        super()
        
        const shadowRoot=this.attachShadow({mode:'open'})
        
        
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
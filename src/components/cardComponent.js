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
    constructor(counter,heading,meshData,intializer,data)
    {
        super()
        this.counter=counter
        this.heading=heading
        this.meshData=meshData
        this.data=data
        this.intializer=intializer
        this.price=this.data[this.meshData.name[0]].price
        
        const shadowRoot=this.attachShadow({mode:'open'})
        
        this.LoadModel()
        shadowRoot.appendChild(sectionComponent(this.counter,this.heading.toUpperCase()))
        this.onclick=()=>{
            let overContainer=document.querySelector('.overContainer')
            overContainer.classList.toggle('open')

            
            
            
            console.log()
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
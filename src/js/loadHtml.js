const HTMLValues=`
<div class='loading'>
<div class="loader">
    <svg viewBox="0 0 80 80">
        <circle id="test" cx="40" cy="40" r="32"></circle>
    </svg>
</div>

<div class="loader triangle">
    <svg viewBox="0 0 86 80">
        <polygon points="43 8 79 72 7 72"></polygon>
    </svg>
</div>

<div class="loader">
    <svg viewBox="0 0 80 80">
        <rect x="8" y="8" width="64" height="64"></rect>
    </svg>
</div>
</div>
<div id="app">
        <div class="threejs">

        </div>
        <div class="optionsPannel">
          <div class="optionsHeading">
            <i class='bx bx-cog optionsSettings' ></i>
            <div>OPTIONS</div>
            <i class='bx bx-chevrons-right optionsBtn'></i>
          </div>
          
          <div class="overContainer">

          </div>

        </div>        
        </div>
`


export function LoadHtml()
{
    
    let temp=document.createElement('span')
    const parser=new DOMParser()
    const doc=parser.parseFromString(HTMLValues,'text/html')
    temp.innerHTML=doc.body.innerHTML;    
    document.body.appendChild(temp)
    
}

class Node{
constructor(value){
this.value=value
this.left=null
this.right=null
this.height=1
}
}

let root=null

function height(node){
if(node==null) return 0
return node.height
}

function balanceFactor(node){
return height(node.left)-height(node.right)
}

function rightRotate(y){

let x=y.left
let T2=x.right

x.right=y
y.left=T2

y.height=Math.max(height(y.left),height(y.right))+1
x.height=Math.max(height(x.left),height(x.right))+1

return x
}

function leftRotate(x){

let y=x.right
let T2=y.left

y.left=x
x.right=T2

x.height=Math.max(height(x.left),height(x.right))+1
y.height=Math.max(height(y.left),height(y.right))+1

return y
}

function insert(node,value){

if(node==null)
return new Node(value)

if(value<node.value)
node.left=insert(node.left,value)

else if(value>node.value)
node.right=insert(node.right,value)

else
return node

node.height=1+Math.max(height(node.left),height(node.right))

let balance=balanceFactor(node)

if(balance>1 && value<node.left.value)
return rightRotate(node)

if(balance<-1 && value>node.right.value)
return leftRotate(node)

if(balance>1 && value>node.left.value){
node.left=leftRotate(node.left)
return rightRotate(node)
}

if(balance<-1 && value<node.right.value){
node.right=rightRotate(node.right)
return leftRotate(node)
}

return node
}

function insertValue(){

let value=parseInt(document.getElementById("value").value)

if(isNaN(value)) return

root=insert(root,value)

drawTree()

document.getElementById("value").value=""
}
function drawTree(){

let container=document.getElementById("tree")
container.innerHTML=""

if(!root) return

drawNode(root,container)

}
function drawTree(){

let container=document.getElementById("tree")
container.innerHTML=""

if(!root) return

let width=800
let height=500

let svg=document.createElementNS("http://www.w3.org/2000/svg","svg")
svg.setAttribute("width",width)
svg.setAttribute("height",height)

container.appendChild(svg)

drawNode(svg,root,width/2,40,width/4)

}

function drawNode(svg,node,x,y,offset){

if(!node) return

let circle=document.createElementNS("http://www.w3.org/2000/svg","circle")
circle.setAttribute("cx",x)
circle.setAttribute("cy",y)
circle.setAttribute("r",25)
circle.setAttribute("fill","#4CAF50")

svg.appendChild(circle)

let text=document.createElementNS("http://www.w3.org/2000/svg","text")
text.setAttribute("x",x)
text.setAttribute("y",y+5)
text.setAttribute("text-anchor","middle")
text.setAttribute("fill","white")
text.textContent=node.value

svg.appendChild(text)

if(node.left){

let line=document.createElementNS("http://www.w3.org/2000/svg","line")
line.setAttribute("x1",x)
line.setAttribute("y1",y+25)
line.setAttribute("x2",x-offset)
line.setAttribute("y2",y+80)
line.setAttribute("stroke","black")

svg.appendChild(line)

drawNode(svg,node.left,x-offset,y+80,offset/1.5)

}

if(node.right){

let line=document.createElementNS("http://www.w3.org/2000/svg","line")
line.setAttribute("x1",x)
line.setAttribute("y1",y+25)
line.setAttribute("x2",x+offset)
line.setAttribute("y2",y+80)
line.setAttribute("stroke","black")

svg.appendChild(line)

drawNode(svg,node.right,x+offset,y+80,offset/1.5)

}

}


function traverse(node,level,levels){

if(!node) return

if(!levels[level])
levels[level]=[]

levels[level].push(node.value)

traverse(node.left,level+1,levels)
traverse(node.right,level+1,levels)

}
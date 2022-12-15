import * as fs from 'node:fs'
import { v4 as uuidv4 } from 'uuid';

const input = fs.readFileSync('./input.txt').toString().split("\n");


class FileSystemTree{
  constructor (root){
    this._root = root || null;
  }

  _traverse(callback){
    function goThrough(node){
      callback(node);
          node.children.forEach(element => {
          if(element.values.type === "dir")
            goThrough(element);
        });
    }
    goThrough(this._root)
  }

  _addNode(child,parent){
    this._traverse((node)=>{
      if(node._id === parent._id){
        parent.children.push(child);
      }
    });
  }

  _getParent(node){
    let parent = new Node();  
  if (node._id === this._root._id){
    parent = this._root;
  }
  else{
      this._traverse((treeNode) => {
        if (treeNode.values.type === "dir" && treeNode.children.filter(child => child._id === node._id).length == 1)
          parent = treeNode;
      });
    }
    return parent;
  }

  _getchildNodebyName(parent, childName){
  let childNode = new Node();
  if (parent._id === this._root._id && childName === "/"){
    childNode = this._root;
  }
  else{
    this._traverse(node => {
        if (node._id === parent._id){
          childNode = node.children.filter(child => child.values.name === childName)[0];
         
        }
      });
    }
    return childNode
  }
}


class Node {
  constructor(Id, values, children){
    this._id = Id;
    this.values = values;
    this.children = children;
  }
}

class Session {
  constructor (tty, currentLineNum, fstree){
    this._tty = tty;
    this._currentLineNum = currentLineNum;
    this._fileSystem = fstree;
    this._cwd = this._fileSystem._root;
  }

  _checkIfCommand(input){
  let [prompt, cmd, args] = input.split(" ");
    if (prompt === "$")
      return true;
    else 
      return false;
  }

  _processCommand(cmd, args){
    if(cmd === "cd"){
      if (args === ".."){
        this._cwd = this._fileSystem._getParent(this._cwd);
      }
      else{
        this._cwd = this._fileSystem._getchildNodebyName(this._cwd,args);
      }
    }
    if(cmd === "ls"){
      while(this._currentLineNum < this._tty.length-1){
      let nextLine = this._readNextLine()
      if(! this._checkIfCommand(nextLine)){
      let [ret1, ret2, ret3] = nextLine.split(" "); 
        let newChildNode = new Node();
        newChildNode._id = uuidv4();
        newChildNode.values = {name : ret2 };
        if(ret1 === "dir"){
          newChildNode.values.type = "dir";
          newChildNode.values.size = 0;
          newChildNode.children = [];
        }
        else{
          newChildNode.values.type = "file";
          newChildNode.values.size = parseInt(ret1);
          newChildNode.children = null;
        }
        this._fileSystem._addNode(newChildNode,this._cwd);
        if (newChildNode.values.type === "file"){
          this._updateUpStreamDirSizes(newChildNode.values.size, this._cwd);
        }
      }
      else{
        break;
      }      
    }
    this._readPrevLine();
  }
}


  _updateUpStreamDirSizes(size, parentDir){
    if(parentDir.values.name === "/"){
      parentDir.values.size+=size;
      return;
    }
    else{
      parentDir.values.size += size;
      this._updateUpStreamDirSizes(size, this._fileSystem._getParent(parentDir));
    }
  }
  _readPrevLine(){
    this._currentLineNum--;
    return this._tty[this._currentLineNum];
  }
  _readNextLine(){
    this._currentLineNum++;
    return this._tty[this._currentLineNum];
  }
}

function findDirSizeNearestToUpdateSize(session, updateSize,TotalSize){
  const requiredSize = updateSize - (TotalSize - session._fileSystem._root.values.size);
  let currentNearestToRequiredSize = TotalSize;
  session._fileSystem._traverse((node) => {
    if (node.values.size >= requiredSize){
      currentNearestToRequiredSize = (node.values.size - requiredSize) < (currentNearestToRequiredSize - requiredSize) ? node.values.size : currentNearestToRequiredSize;
    }
  });
  return currentNearestToRequiredSize;
}


let rootNodeMetadata = {type : "dir", name:"/", size: 0}
let rootNode = new Node(uuidv4(),rootNodeMetadata,[]);
let fileSystem = new FileSystemTree(rootNode);


let currSession = new Session(input, -1, fileSystem);


while(currSession._currentLineNum < input.length-1){
  let nextline = currSession._readNextLine();
  if(currSession._checkIfCommand(nextline)){
    let [prompt, cmd, args] = nextline.split(" ");
    currSession._processCommand(cmd, args);
  }
}

console.log(findDirSizeNearestToUpdateSize(currSession,30000000,70000000));
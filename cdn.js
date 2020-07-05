const {getOrgServer, getServers, updateFailure, deleteServer} = require('./repository');
const {isAccessible,hasContent,getContent} = require('./gateway')
const dotenv = require('dotenv');
dotenv.config({ path: './conf.env' });




/**
 * @returns Promise<path => Promise<any>>
 */
async function select() {
  let selectedServer = await getSelectedServer()
  if(!selectedServer){
    selectedServer = getOrgServer()
  }
  console.log(selectedServer)
  return  async (item) => {
    return await  getContent(selectedServer,item)
  }
}

const getSelectedServer = async () => {
  const servers = getServers()
  for(let i = 0; i < servers.length; i++){
    if(await isSelectedServer(servers[i])){
     return  servers[i]
    }
  }
  return null
}

const isSelectedServer = async (server) => {
  const accessible = await isAccessible(server)
  const containsContent = await hasContent(server,"")
  if(!accessible){
    handelNotAccessibleServer(server)
  }
  return accessible && containsContent
}

const handelNotAccessibleServer = (server) => {
  if(server.failuresCount == 0){
    updateFailure(server)
  } else {
    deleteServer(server)
  }
}


module.exports = {select};
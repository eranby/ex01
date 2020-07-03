
const getServers = () => {
  const persistedServers = process.env.CDN_SERVERS.split(",")
  const failuresCount =  process.env.CDN_SERVERS_FAILURES
  const servers =[]
  for(let i=0; i<persistedServers.length; i++){
    const current = { server: persistedServers[i]}
    current.failuresCount = failuresCount && failuresCount.includes("["+current.server+"]") ? 1 : 0
    servers.push(current)
  }
  return servers
}

const getOrgServer = () => {
  return process.env.CDN_ORG
}

const updateFailure =  (server) => {
  process.env.CDN_SERVERS_FAILURES = process.env.CDN_SERVERS_FAILURES ? process.env.CDN_SERVERS_FAILURES + "["+server.server+"]" :"["+server.server+"]"
}

const deleteServer = (server) => {
  process.env.CDN_SERVERS = process.env.CDN_SERVERS.replace(server.server +",","").replace(server.server,"")
  process.env.CDN_SERVERS_FAILURES = process.env.CDN_SERVERS_FAILURES.replace( "["+server.server+"]","")
}


module.exports = {getServers,getOrgServer,updateFailure,deleteServer};
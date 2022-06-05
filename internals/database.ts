import { driver, auth, Session } from 'neo4j-driver'

function createSession(): Session {
    // neo4j+s://41343303.databases.neo4j.io

    //5J_MAV7RJSpNFavm3Q2r9_pMrRYl0uWtzO22-v1hXVc
    const drv = driver(
        'neo4j+s://3017767f.databases.neo4j.io:7687',
        auth.basic('neo4j', '5J_MAV7RJSpNFavm3Q2r9_pMrRYl0uWtzO22-v1hXVc')
    )
      
    // drv.verifyConnectivity().then(response => console.log(response))
      
    return drv.session()
}

export {createSession}
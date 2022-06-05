import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import { QueryResult } from 'neo4j-driver'
import { UserRepository } from '../repository/UserRepository'
import { createSession } from '../internals/database'

function MyApp({ Component, pageProps }: AppProps) {

  const [allUser, setAllUser] = useState<QueryResult>()
  const [user, setUser] = useState<string | null>()

  function getAllUser() {
    const postRepo = new UserRepository(createSession())
    postRepo.getAllUser().then(result => { 
      console.log(result)
      setAllUser(result) 
    })
  }

  function changeLogedInUser(e: any) {
    localStorage.setItem('logedinas', e.target.value)
    location.reload()
  }

  function createNewUser() {
    let person = prompt("Please enter new username:", "");
    if (person == null || person == "") {
      console.log('canceled')
    } else {
      
      //create user
      const postRepo = new UserRepository(createSession())
      postRepo.addUser(person).then(result => { 
        console.log(result)
        location.reload()
      }).catch(err => {
        console.log(err )
        alert(err)
      })
    }
  }

  useEffect(() => {
    if (localStorage.getItem('logedinas')) {
      setUser(localStorage.getItem('logedinas'))
    } else {
      localStorage.setItem('logedinas', 'PomanJR')
    }
    getAllUser()

  }, [0])

  return <>
    <div className='nav' style={{backgroundColor: 'rgb(201 200 188)', padding: 30}}>
    Logged in account: {user} 
      <button  style={{float: 'right', padding:5}} onClick={createNewUser}>Create new username</button>
      <select style={{float: 'left', padding:5}} onChange={changeLogedInUser} >
        {
          allUser?.records.map((opt, idx) => (
            <option key={idx}>{opt.get('user')}</option>
          ))
        }
      </select>
    </div>
    <Component {...pageProps} />
  </>
}

export default MyApp

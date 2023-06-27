import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
type Props = {}


const Logo = ({color, title}: {color: string, title: string}) => {
  const titleSplit = title.split(" ")
  return(
    <div className='logo-container'>
      <div style={{color: color}}>{titleSplit[0]}</div>
      <div>{titleSplit[1]}</div>
    </div>
  )
}

const Header = (props: Props) => {
  return (
    <nav className='nav-container'>
      <Link to="/" className='nav-logo-link'>
        <Logo color="#DDAE7E" title='Hr net'/>
      </Link>
    </nav>
  )
}

export default Header